/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPuntosVentaSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MPuntosVenta";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/puntosventa/";
const strEntidad = "Punto de Venta ";

export interface InputData {
  descripcion: string | undefined;
  tipo: string | undefined;
  direccion: string | undefined;
  almacen_armazones: string | undefined;
  almacen_cristales: string | undefined;
  almacen_accesorios: string | undefined;
  encargado: string | undefined;
  telefono: string | undefined;
  observaciones: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = ` ${jsonData.tipo}, 
              "${jsonData.descripcion}", 
              "${jsonData.direccion}", 
              "${jsonData.telefono}", 
               ${jsonData.encargado}, 
               ${jsonData.almacen_armazones},
               ${jsonData.almacen_cristales},
               ${jsonData.almacen_accesorios},
              "${jsonData.observaciones}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };
  // console.log("query", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `tipo                  = ${jsonData.tipo}`,
    `descripcion           ="${jsonData.descripcion}"`,
    `direccion             ="${jsonData.direccion}"`,
    `telefono              ="${jsonData.telefono}"`,
    `encargado             = ${jsonData.encargado}`,
    `almacen_armazones     = ${jsonData.almacen_armazones}`,
    `almacen_cristales     = ${jsonData.almacen_cristales}`,
    `almacen_accesorios    = ${jsonData.almacen_accesorios}`,
    `observaciones         ="${jsonData.observaciones}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "04",
    _p1,
    _p2: primaryKey,
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

const FPuntosVenta: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationPuntosVentaSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.id];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("descripcion", "");
      setValue("direccion", "");
      setValue("telefono", "");
      setValue("observaciones", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="descripcion"]'
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
      focusFirstInput("descripcion");
    }, []);

    return (
      <div className="useFormContainer centered-div w-[35rem]">
        <div className="userFormBtnCloseContainer flex ">
          <h1 className='userFormLabel mx-auto'>{label}</h1>
          <div className=''>
            <button onClick={closeModal} className="userFormBtnClose mr-4">
              X
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Descripción"
                  name="descripcion"
                  data={data && data[EnumGrid.descripcion]}
                  control={control}
                  error={errors.descripcion}
                  inputRef={firstInputRef}
                  customWidth={"labelInput inputStyles"}

                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputTiposComponent
                  label="Tipo"
                  name="tipo"
                  showRefresh={true}
                  data={data && data[EnumGrid.tipo_id]}
                  control={control}
                  entidad={"PuntosVentaTipos"}
                  error={errors.tipo}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Dirección"
                  name="direccion"
                  data={data && data[EnumGrid.direccion]}
                  control={control}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}

                />
              </div>
            </div>

            <div className="input-container items-center rowForm ">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Almacén Armazones"
                  name="almacen_armazones"
                  showRefresh={true}
                  data={data && data[EnumGrid.almacen_armazones_id]}
                  control={control}
                  entidad={["/api/almacenes/", "02", `1&_p3=2`]}
                  error={errors.almacen_armazones}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
            <div className="input-container items-center rowForm ">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Almacén Cristales"
                  name="almacen_cristales"
                  showRefresh={true}
                  data={data && data[EnumGrid.almacen_cristales_id]}
                  control={control}
                  entidad={["/api/almacenes/", "02", `2&_p3=2`]}
                  error={errors.almacen_cristales}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
            <div className="input-container items-center rowForm ">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Almacén Accesorios"
                  name="almacen_accesorios"
                  showRefresh={true}
                  data={data && data[EnumGrid.almacen_accesorios_id]}
                  control={control}
                  entidad={["/api/almacenes/", "02", `3&_p3=2`]}
                  error={errors.almacen_accesorios}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Encargado"
                  name="encargado"
                  showRefresh={true}
                  data={data && data[EnumGrid.encargado_id]}
                  control={control}
                  entidad={["/api/usuarios/", "02"]}
                  error={errors.encargado}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Teléfono"
                  name="telefono"
                  data={data && data[EnumGrid.telefono]}
                  control={control}
                  error={errors.telefono}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}

                />
              </div>
            </div>
          </div>

          <div className="input-container items-center rowForm">
            <div className="labelInputDiv">
              <TextInputComponent
                type="text"
                label="Observaciones"
                name="observaciones"
                data={data && data[EnumGrid.observaciones]}
                control={control}
                isOptional={true}
                customWidth={"labelInput inputStyles"}

              />
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
            <div className="w-[70%] mx-auto">
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

export default FPuntosVenta;
