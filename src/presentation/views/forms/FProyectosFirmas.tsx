/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fechaActual, validationReporteFirmasSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosFirmas";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import {toast} from 'react-toastify'

const strBaseUrl = "/api/proyectoreportefirma/";
const strEntidad = "Reporte de Firmas ";

export interface InputData {
  proyecto              : string | undefined;
  titulo                : string | undefined;
  licitacion            : string | undefined;
  folio_reporte         : string | undefined;
  fecha_desde           : string | undefined;
  fecha_hasta           : string | undefined;
  observaciones         : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {

  if(jsonData.fecha_desde && jsonData.fecha_hasta){  
    if(new Date(jsonData.fecha_desde) > new Date(jsonData.fecha_hasta)){
      toast.error('Fecha desde mayor a la fecha hasta')
      throw new Error('')
    }
  }
  
    

  let _p1 = `"${jsonData.proyecto}", ${jsonData.folio_reporte}, "${jsonData.fecha_desde}", 
               "${jsonData.fecha_hasta}", "${jsonData.observaciones}"`;

   _p1 = _p1.replace(/'/g, '!');
  
  const query: OutputData = {
    query: "03",
    _p1,
  };
  console.log("query: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `observaciones = "${jsonData.observaciones}"`,
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
    _p2: jsonData.proyecto,
    _p3: jsonData.folio_reporte?.toString(),
  };
  console.log("query: ", query);
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

const FProyectosFirmas: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationReporteFirmasSchema();
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

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("folio_reporte", "");
      setValue("observaciones", "");
          if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="proyecto"]'
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
        if(response.mensaje.includes('Creado')){
          toastSuccess(isEditting);
        }
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

        if (!blnKeep && !isEditting) {
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
            ? transformUpdateQuery(data)
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
      [editEntity, createdEntity, handleApiResponse]
    );

    useEffect(() => {
      focusFirstInput("proyecto");
    }, []);

    return (
      <div className="useFormContainer centered-div">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario">
          <div className="userFormularioContainer !w-[40vw]">

          <div className="w-full items-center flex h-[70px] ">

            <div className="input-container items-center rowForm w-[50%]">
              <div className="w-full !mt-4 ">
                  <SelectInputComponent
                    label="Proyecto"
                    name="proyecto"
                    showRefresh={true}
                    data={data && data[EnumGrid.proyecto]}
                    control={control}
                    entidad={["/api/proyectos/", "02"]}
                    error={errors.proyecto}
                    inputRef={firstInputRef}
                    readOnly={isEditting}
                    />
              </div>
            </div>

            <div className="input-container items-center rowForm w-[50%]">
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="Folio"
                  name="folio_reporte"
                  data={data && data[EnumGrid.folio_reporte]}
                  control={control}
                  error={errors.folio_reporte}
                  onlyRead={isEditting}
                />
              </div>

            </div>
          </div>

          <div className="w-full items-center flex h-[60px]">
            <div className="input-container items-center rowForm w-[50%]">
              <div className="w-full ">
                <TextInputComponent
                  type="date"
                  label="Fecha Desde"
                  name="fecha_desde"
                  data={data && data[EnumGrid.fecha_desde]}
                  control={control}
                  error={errors.fecha_desde}
                  onlyRead={isEditting}
                />
              </div>
            </div>
            <div className="input-container items-center rowForm w-[50%]">
              <div className="w-full ">
                <TextInputComponent
                  type="date"
                  label="Fecha Hasta"
                  name="fecha_hasta"
                  data={data && data[EnumGrid.fecha_hasta]}
                  control={control}
                  error={errors.fecha_hasta}
                  onlyRead={isEditting}
                />
              </div>
            </div>
          </div>

          <div className="w-full items-center flex h-[60px]">
            <div className="input-copntainer items-center rowForm w-full">
              <div className="w-full ">
                <TextInputComponent
                  type="text"
                  label="Observaciones"
                  name="observaciones"
                  data={data && data[EnumGrid.observaciones]}
                  control={control}
                  error={errors.observaciones}
                />
              </div>
            </div>
          </div>
          </div>

          <div className="w-full">
            <div className="mx-auto w-[70%]">
                {escritura_lectura && (
                  <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                    {`${TITLES.guardar}`}
                  </button>
                )}
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FProyectosFirmas;
