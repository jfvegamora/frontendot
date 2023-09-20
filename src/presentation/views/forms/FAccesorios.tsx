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
import { EnumGrid } from "../mantenedores/MAccesorios";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/accesorios/";
const strEntidad = "Accesorio ";

export interface InputData {
  codigo: string | undefined;
  descripcion: string | undefined;
  proveedor: string | undefined;
  precio_neto: number | undefined;
  stock_minimo: number | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` ${jsonData.codigo}, 
               '${jsonData.descripcion}', 
                ${jsonData.proveedor}, 
                ${jsonData.precio_neto}, 
                ${jsonData.stock_minimo}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `codigo       = ${jsonData.codigo}`,
    `descripcion  ='${jsonData.descripcion}'`,
    `proveedor    = ${jsonData.proveedor}`,
    `precio_neto  = ${jsonData.precio_neto}`,
    `stock_minimo = ${jsonData.stock_minimo}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  return {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
}

interface IUserFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
}

const FUsuarios: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationAccesoriosSchema(isEditting);
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
    const intId = data && data[EnumGrid.codigo];
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
      setValue("precio_neto", 0);
      setValue("stock_minimo", 0);
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
        const errorResponse = response?.response?.data.error;
        console.log("response", response);
        if (errorResponse || response.code === "ERR_BAD_RESPONSE") {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });
          return;
        }

        if (!blnKeep && !isEditting && !errorResponse) {
          const result = await showModal(
            MODAL.keep,
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

          toastSuccess(isEditting);
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
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
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
      <div className="useFormContainer">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   if (!isModalOpen) {
          //     handleSubmit((data) => handleSaveChange(data, isEditting))(e);
          //   }
          // }}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <TextInputComponent
              type="text"
              label="Código"
              name="codigo"
              data={data && data[EnumGrid.codigo]}
              control={control}
              error={!isEditting && errors.codigo}
              inputRef={firstInputRef}
              onlyRead={isEditting}
            />
            <TextInputComponent
              type="text"
              label="Descripción"
              name="descripcion"
              data={data && data[EnumGrid.descripcion]}
              control={control}
              error={!isEditting && errors.descripcion}
              inputRef={secondInputRef}
            />
            <div className="w-full ">
              <SelectInputComponent
                label="Proveedor"
                name="proveedor"
                showRefresh={true}
                data={data && data[EnumGrid.proveedor_id]}
                control={control}
                entidad={["/api/proveedores/", "02"]}
                error={!isEditting && errors.proveedor}
                customWidth={"345px"}
              />
            </div>

            <TextInputComponent
              type="number"
              label="Precio Neto"
              name="precio_neto"
              data={data && data[EnumGrid.precio_neto]}
              control={control}
              error={!isEditting && errors.precio_neto}
            />
            <TextInputComponent
              type="number"
              label="Stock Mínimo"
              name="stock_minimo"
              data={data && data[EnumGrid.stock_minimo]}
              control={control}
              error={!isEditting && errors.stock_minimo}
            />
          </div>

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FUsuarios;
