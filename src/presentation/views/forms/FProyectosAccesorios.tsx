/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationParametrizacionAccesorios } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosAccesorios";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import axios from "axios";
import { signal } from "@preact/signals-react";
import { toast } from "react-toastify";
import { URLBackend } from "../../hooks/useCrud";

const strBaseUrl = "/api/proyectoaccesorios/";
const strEntidad = "Parametrización de Accesorios ";

export interface InputData {
  proyecto: string | undefined;
  codigo_accesorio: string | undefined;
  estado: string | undefined;
  valor_neto: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {

  let _p1 = ` "${jsonData.proyecto}", 
              "${jsonData.codigo_accesorio}",  
               ${jsonData.estado === "Disponible" ? 1 : 2},
               ${jsonData.valor_neto}`;
  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `estado   = ${jsonData.estado === "Disponible" ? 1 : 2}, valor_neto = ${jsonData.valor_neto}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }

  const _p1 = filteredFields.join(",");

  const query = {
    query: "04",
    _p1,
    _p2: jsonData.proyecto,
    _p3: jsonData.codigo_accesorio,
  };
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

const FProyectosAccesorios: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationParametrizacionAccesorios();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const [changeCodigo, setChangeCodigo] = useState()
    const accesorioData = signal([])

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && [data[EnumGrid.codigo_accesorio, EnumGrid.codigo_proyecto]];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo_accesorio", "");
      setValue("valor_neto", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo_accesorio"]'
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

    // const handleSaveChange = React.useCallback(

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        // console.log(data);
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
      [editEntity, createdEntity, handleApiResponse, intId]
    );
    const fetchArmazon = async (codigo: string | undefined) => {
      try {
        const { data } = await axios(`${URLBackend}/api/accesorios/listado/?query=01&_p1=${codigo}`)
        accesorioData.value = data
        console.log(data)
      } catch (error) {
        throw error
      }
    }

    useEffect(() => {
      if (changeCodigo) {
        fetchArmazon(changeCodigo)
          .then(() => {
            console.log(accesorioData.value)
            if (accesorioData.value.length >= 1) {
              accesorioData.value = []
            } else {
              toast.error('Código accesorio inválido')
              accesorioData.value = []
            }
          })
      }
    }, [changeCodigo])
    useEffect(() => {
      isEditting ? focusSecondInput("estado") : focusFirstInput("proyecto");
    }, []);

    return (
      <div className="useFormContainer centered-div use30rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center h-[4rem] ">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full ">
                  <SelectInputComponent
                    label="Proyecto"
                    name="proyecto"
                    showRefresh={true}
                    data={data && data[EnumGrid.codigo_proyecto]}
                    control={control}
                    entidad={["/api/proyectos/", "02"]}
                    error={errors.proyecto}
                    readOnly={isEditting}
                    customWidth={"!ml-[1rem] !w-[28rem] "}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center !my-4 h-[4rem]">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Código Accesorio"
                    name="codigo_accesorio"
                    data={data && data[EnumGrid.codigo_accesorio]}
                    control={control}
                    error={errors.codigo_accesorio}
                    onlyRead={isEditting}
                    handleChange={setChangeCodigo}
                    inputRef={firstInputRef}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Valor Neto $"
                    name="valor_neto"
                    data={data && data[EnumGrid.valor_neto]}
                    control={control}
                    error={errors.valor_neto}
                    textAlign="text-right"
                    />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center !my-4 h-[4rem]">
              <div className="input-container items-center rowForm w-[95%] ">
                <div className="w-full">
                  <RadioButtonComponent
                    control={control}
                    label="Estado"
                    name="estado"
                    data={data && data[EnumGrid.estado]}
                    options={["Disponible", "No disponible"]}
                    error={errors.estado}
                    horizontal={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-[70%] mx-auto">
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

export default FProyectosAccesorios;
