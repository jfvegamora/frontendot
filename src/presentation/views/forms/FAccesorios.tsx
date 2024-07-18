/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationAccesoriosSchema } from "../../utils/validationFormSchemas";
import { TITLES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { AccesoriosEnum } from "../../Enums";

const strBaseUrl = "/api/accesorios/";
const strEntidad = "Accesorio ";

export interface InputData {
  codigo: string | undefined;
  descripcion: string | undefined;
  marca: string | undefined;
  precio_neto: string | undefined;
  stock_minimo: string | undefined;
  stock_reservado: string | undefined;
  stock_disponible: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `  "${jsonData.codigo}", 
               "${jsonData.descripcion}", 
                ${jsonData.marca}, 
                ${jsonData.precio_neto || "0"}, 
                ${jsonData.stock_minimo}`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1
  };
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: number
): OutputData | null {
  const fields = [
    `descripcion  ="${jsonData.descripcion}"`,
    `marca        = ${jsonData.marca}`,
    `precio_neto  = ${jsonData.precio_neto || 0}`,
    `stock_minimo = ${jsonData.stock_minimo}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

  const query = {
    query: "04",
    _p1,
    _p2: `${primaryKey}`
  };
  // console.log("query", query);
  return query;

}

interface IUserFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
  escritura_lectura?: boolean;
}

const FAccesorios: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationAccesoriosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      secondInputRef,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[AccesoriosEnum.codigo];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo", "");
      setValue("descripcion", "");
      setValue("precio_neto", "");
      setValue("stock_minimo", "");
      setValue("stock_reservado", "");
      setValue("stock_disponible", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo"]'
        );
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, [setValue, firstInputRef]);

    const updateNewEntity = React.useCallback(async () => {
      const newEntityData = await ListEntity(params, "01");
      setEntities(newEntityData);
    }, [params, setEntities, ListEntity]);

    const toastSuccess = (isEditting: boolean) => {
      show({
        message: isEditting
          ? strEntidad.concat(SUCCESS_MESSAGES.edit)
          : strEntidad.concat(SUCCESS_MESSAGES.create),
        type: "success",
      });
    };

    const handleApiResponse = React.useCallback(
      async (response: any, isEditting: boolean) => {
        if (response.code === "ERR_BAD_RESPONSE" || response.stack) {
          const errorMessage = isEditting
            ? strEntidad.concat(": " + response.message)
            : strEntidad.concat(": " + response.message)
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }
        if (response.mensaje.includes('Creado')) {
          toastSuccess(isEditting);
        }

        if (!blnKeep && !isEditting) {
          const result = await showModal(
            MODAL.keep,
            '',
            MODAL.keepYes,
            MODAL.kepNo
          );
          if (result) {
            setblnKeep(true);
            resetTextFields();
            updateNewEntity();
          } else {
            closeModal();
            updateNewEntity();
          }

          // toastSuccess(isEditting);
        }

        if (isEditting) {
          updateNewEntity();
          closeModal();
          toastSuccess(isEditting);
        }

        resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, updateNewEntity, showModal]
    );

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [closeModal]);

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading)
        } catch (error: any) {
          toast.dismiss(toastLoading)
          show({
            message: error,
            type: "error",
          });
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );

    useEffect(() => {
      isEditting ? focusSecondInput("descripcion") : focusFirstInput("codigo");
    }, []);



    return (
      <div className="useFormContainer centered-div w-[45rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Código"
                    name="codigo"
                    maxLength={20}
                    data={data && data[AccesoriosEnum.codigo]}
                    control={control}
                    error={errors.codigo}
                    inputRef={firstInputRef}
                    onlyRead={isEditting}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Descripción"
                    name="descripcion"
                    data={data && data[AccesoriosEnum.descripcion]}
                    control={control}
                    error={errors.descripcion}
                    inputRef={secondInputRef}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Marca"
                    name="marca"
                    showRefresh={true}
                    data={data && data[AccesoriosEnum.marca_id]}
                    control={control}
                    entidad={["/api/marcas/", "02", "3"]}
                    error={errors.marca}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Stock Mínimo"
                    name="stock_minimo"
                    data={data && data[AccesoriosEnum.stock_minimo]}
                    control={control}
                    error={errors.stock_minimo}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Precio Neto"
                    name="precio_neto"
                    data={data && data[AccesoriosEnum.precio_neto]}
                    control={control}
                    error={errors.precio_neto}
                    isOptional={true}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Código FAB"
                    name="codigo_fab"
                    maxLength={20}
                    data={data && data[AccesoriosEnum.codigo]}
                    control={control}
                    onlyRead={isEditting}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Stock Reservado"
                    name="stock_reservado"
                    data={data && data[AccesoriosEnum.stock_reservado]}
                    control={control}
                    onlyRead={true}
                    tabIndex={-1}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Stock Disponible"
                    name="stock_disponible"
                    data={data && data[AccesoriosEnum.stock_disponible]}
                    control={control}
                    onlyRead={true}
                    tabIndex={-1}
                    customWidth={"labelInput inputStyles"}
                    textAlign="text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
            <div className="w-[40%] mx-auto">
              {escritura_lectura && (
                <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${TITLES.guardar}`}
                </Button>
              )}
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FAccesorios;
