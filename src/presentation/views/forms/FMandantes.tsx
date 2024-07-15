/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationMandantesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MMandantes";
import { MODAL, SUCCESS_MESSAGES, TITLES, validateRut } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import RegProCom from "../../components/RegProCom";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/mandantes/";
const strEntidad = "Mandante ";

export interface InputData {
  codigo   : string | undefined;
  rut      : string | undefined;
  nombre   : string | undefined;
  region   : string | undefined;
  provincia: string | undefined;
  comuna   : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `${jsonData.codigo},"${jsonData.rut}","${jsonData.nombre}","${jsonData.comuna}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  console.log("query03", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: number
): OutputData | null {
  const fields = [
    `rut    ="${jsonData.rut}"`,
    `nombre ="${jsonData.nombre}"`,
    `comuna = ${jsonData.comuna}`,
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
  console.log("query04", query);
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

const FMandantes: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationMandantesSchema();
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
    const intId = data && data[EnumGrid.codigo];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      register
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo", "");
      setValue("rut", "");
      setValue("nombre", "");
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
        if(response.mensaje.includes('Creado')){
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

          // toastSuccsess(isEditting);
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
        

        if(data["rut"]?.trim() !== ''){
          const response = validateRut(data["rut"]?.trim());
          if(!response){
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
      focusFirstInput("codigo");
    }, []);

    // console.log('data', data)
    console.log(errors && errors)
    return (
      <div className="useFormContainer centered-div w-[30vw]">
        <div className="userFormBtnCloseContainer">
          <div className="w-[80%] mx-auto !text.center">
              <h1 className="userFormLabel">{label}</h1>
          </div>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer h-[25vw]">
            <div className="w-[29vw] flex items-center h-[4vw]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                    <TextInputComponent
                      type="number"
                      label="Código"
                      name="codigo"
                      data={data && data[EnumGrid.codigo]}
                      control={control}
                      error={errors.codigo}
                      inputRef={firstInputRef}
                      onlyRead={isEditting}
                      customWidth={"!h-[3vw] !text-[1vw] !w-[28vw]"}

                    />
                  </div>
              </div>
            </div>
            <div className="w-full flex items-center h-[3vw]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="RUT"
                      name="rut"
                      data={data && data[EnumGrid.rut]}
                      control={control}
                      error={errors.rut}
                      customWidth={"!h-[3vw] !text-[1vw] !w-[28vw]"}
                    />
                  </div>
              </div>
            </div>
            <div className="w-full flex items-center h-[3vw]">
              <div className="input-container items-center rowForm w-full">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="Nombre"
                      name="nombre"
                      data={data && data[EnumGrid.nombre]}
                      control={control}
                      error={errors.nombre}
                      customWidth={"!h-[3vw] !text-[1vw] !w-[28vw]"}
                    />
                  </div>
              </div>
            </div>

            <div className="w-full flex items-center translate-y-[4.5vw] h-[4rem]">
              <div className="input-container items-center rowForm w-full" >
                  <div className="w-full">
                      <RegProCom
                      name="comuna"
                      control={control}
                      register={register}
                      setValue={setValue}
                      defaultRegion={data && data[EnumGrid.region_id]}
                      defaultProvincia={data && data[EnumGrid.provincia_id]}
                      defaultComuna={data && data[EnumGrid.comuna_id]}
                      errors={errors.comuna}
                      />
                  </div>
              </div>
            </div>
          </div>

            <div className="w-full">
              <div className="w-[60%] mx-auto">
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

export default FMandantes;
