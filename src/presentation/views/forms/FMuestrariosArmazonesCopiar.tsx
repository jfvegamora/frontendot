/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  SelectInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoParametrizacionCopiar } from "../../utils/validationFormSchemas";
// import { EnumGrid } from "../mantenedores/MAlmacenesArmazones";
import { BUTTON_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from 'react-toastify'
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/muestrariosarmazones/";
const strEntidad = "Parametrización de Muestrarios ";

export interface InputData {
  origen: string;
  destino: string;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // console.log("jsondata: ", jsonData.proyecto_origen, "-", jsonData.proyecto_destino)
  if (jsonData.origen === jsonData.destino) {
    toast.error('Debes seleccionar distintos Muestrarios.')
    throw new Error()
  }

  const query: OutputData = {
    query: "06",
    _p1: jsonData.origen,
    _p2: jsonData.destino,
  };
  console.log("query", query)
  return query;
}

export function transformUpdateQuery(_jsonData: InputData): OutputData | null {

  // const query = {
  //   query: "06",
  //   _p1: jsonData.proyecto_origen,
  //   _p2: jsonData.proyecto_destino,
  // };
  // console.log("query: ", query);
  // return query;
  return null;
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

const FMuestrariosArmazonesCopiar: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, isEditting, escritura_lectura }) => {
    const schema = validationProyectoParametrizacionCopiar();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    // const [changeCodigo, setChangeCodigo] = useState()
    // const armazonData = signal([])

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      // focusFirstInput,
      // focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    // const intId = data && [data[EnumGrid.almacen_id, EnumGrid.codigo_armazon]];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="origen"]'
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
      [editEntity, createdEntity, handleApiResponse]
    );

    return (
      <div className="useFormContainer centered-div w-[35rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Muestrario Origen"
                  name="origen"
                  showRefresh={true}
                  control={control}
                  entidad={["/api/muestrarios/", "02"]}
                  error={errors.origen}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Muestrario Destino"
                  name="destino"
                  showRefresh={true}
                  control={control}
                  entidad={["/api/muestrarios/", "02"]}
                  error={errors.destino}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
              <div className="w-[50%] mx-auto">
              {escritura_lectura && (
                <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${BUTTON_MESSAGES.copiar}`}
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

export default FMuestrariosArmazonesCopiar;
