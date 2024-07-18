/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  SelectInputComponent, TextInputComponent
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationMuestrariosArmazonesTraspaso } from "../../utils/validationFormSchemas";
// import { EnumGrid } from "../mantenedores/MAlmacenesArmazones";
import { BUTTON_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { AppStore, useAppSelector } from "../../../redux/store";
import { toast } from "react-toastify";
// import { toast } from 'react-toastify'

// import axios from "axios";
// import { toast } from "react-toastify";
// import { signal } from "@preact/signals-react";

const strBaseUrl = "/api/muestrariosarmazones/";
const strEntidad = "Traspaso de Armazones entre Almacenes";

export interface InputData {
  muestrario: string;
  origen: string;
  cantidad: string;
  usuario: string | undefined;
}

interface OutputData {
  query: string;
  _pkToDelete: string;
}

export function transformInsertQuery(jsonData: InputData, userID: string): OutputData | null {


  const kardex = [{
    'muestrario': jsonData.muestrario,
    'origen': jsonData.origen,
    'cantidad': jsonData.cantidad,
    'usuario': userID,
  }]

  const query: OutputData = {
    query: "07",
    _pkToDelete: encodeURIComponent(JSON.stringify(kardex)),
  };
  console.log("query", query)
  return query;
}

export function transformUpdateQuery(_jsonData: InputData): OutputData | null {
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

const FMuestrariosArmazonesTraspaso: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, isEditting, escritura_lectura }) => {
    const schema = validationMuestrariosArmazonesTraspaso();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const userState = useAppSelector((store: AppStore) => store.user);

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
      setValue("cantidad", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="muestrario"]'
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
        console.log(response)
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
            : transformInsertQuery(data, userState["id"]);

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
      [editEntity, createdEntity, handleApiResponse]
    );
    console.log(errors);

    return (
      <div className="useFormContainer centered-div w-[35rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{strEntidad}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[75%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Almacen Origen"
                    name="origen"
                    showRefresh={true}
                    control={control}
                    entidad={["/api/almacenes/", "02", "1"]}
                    error={errors.origen}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Cantidad"
                    name="cantidad"
                    control={control}
                    error={errors.cantidad}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Muestrario Destino"
                  name="muestrario"
                  showRefresh={true}
                  // data={data && data[EnumGrid.codigo_proyecto]}
                  control={control}
                  entidad={["/api/muestrarios/", "02"]}
                  error={errors.muestrario}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
              <div className="w-[50%] mx-auto">
              {escritura_lectura && (
                <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${BUTTON_MESSAGES.traspasar}`}
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

export default FMuestrariosArmazonesTraspaso;
