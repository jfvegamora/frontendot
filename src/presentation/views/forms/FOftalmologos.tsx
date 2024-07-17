/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOftalmologosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MOftalmologos";
import { MODAL, SUCCESS_MESSAGES, TITLES, validateRut } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/oftalmologos/";
const strEntidad = "Oftalmólogo ";

export interface InputData {
  rut: string | undefined;
  nombre: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  valor_consulta: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = ` "${jsonData.rut}", 
    "${jsonData.nombre}", 
    "${jsonData.telefono}", 
    "${jsonData.correo}", 
     ${jsonData.valor_consulta}`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `rut            ="${jsonData.rut}"`,
    `nombre         ="${jsonData.nombre}"`,
    `telefono       ="${jsonData.telefono}"`,
    `correo         ="${jsonData.correo}"`,
    `valor_consulta = ${jsonData.valor_consulta}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

  console.log("primaryKey", primaryKey);
  return {
    query: "04",
    _p1,
    _p2: primaryKey,
    _p3: "",
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
  escritura_lectura?: boolean;
}

const FOftalmologos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationOftalmologosSchema();
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
      setValue("rut", "");
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("correo", "");
      setValue("valor_consulta", "");

      if (firstInputRef.current) {
        const firstInput =
          firstInputRef.current.querySelector('input[name="rut"]');
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


        if (data["rut"]?.trim() !== '') {
          const response = validateRut(data["rut"]?.trim());
          if (!response) {
            toast.error('Rut no válido')
            return setValue("rut", "");
          }
        }

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
      focusFirstInput("rut");
    }, []);

    return (
      <div className="useFormContainer centered-div w-[35rem]">
        <div className="userFormBtnCloseContainer flex">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4 ">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="RUT"
                  name="rut"
                  data={data && data[EnumGrid.rut]}
                  control={control}
                  error={errors.rut}
                  inputRef={firstInputRef}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Nombre"
                  name="nombre"
                  data={data && data[EnumGrid.nombre]}
                  control={control}
                  error={errors.nombre}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="number"
                  label="Valor Consulta"
                  name="valor_consulta"
                  data={data && data[EnumGrid.valor_consulta]}
                  control={control}
                  error={errors.valor_consulta}
                  textAlign="text-right"
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
                  isOptional={true}
                  customWidth={"labelInputx2 inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="email"
                  label="Correo"
                  name="correo"
                  data={data && data[EnumGrid.correo]}
                  control={control}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-[60%]">
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

export default FOftalmologos;
