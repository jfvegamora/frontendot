/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {  TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationEstablecimientosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MEstablecimientos";
import { MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
// import RegProCom from "../../components/RegProCom";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";

const strBaseUrl = "/api/establecimientos/";
const strEntidad = "Establecimiento ";

export interface InputData {
  codigo: string | undefined;
  nombre: string | undefined;
  tipo: string | undefined;
  mandante: string | undefined;
  region: string | undefined;
  provincia: string | undefined;
  comuna: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `"${jsonData.codigo}", "${jsonData.nombre}", ${jsonData.comuna}, ${jsonData.mandante}, ${jsonData.tipo}`;
  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1
  };
  console.log("query03", query);
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

const FEstablecimientos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, data, isEditting, escritura_lectura }) => {
    const schema = validationEstablecimientosSchema(isEditting);
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
      // register
    } = useForm({
      resolver: yupResolver(schema),
    });
    const { showModal, CustomModal } = useModal();

    function transformUpdateQuery(
      jsonData: InputData,
      primaryKey: string
    ): OutputData | null {
      const fields = [
        `codigo   ="${jsonData.codigo}"`,
        `nombre   ="${jsonData.nombre}"`,
        `comuna   = ${jsonData.comuna || data && data[EnumGrid.comuna_id]}`,
        `mandante = ${jsonData.mandante}`,
        `tipo     = ${jsonData.tipo}`,
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
        _p2: ` '${primaryKey}'`,
      };
      console.log("query04", query);
      return query;
    }
    const resetTextFields = React.useCallback(() => {
      setValue("codigo", "");
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

        // console.log(response)
        // console.log(blnKeep)


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
      focusFirstInput("codigo");
    }, []);

    // console.log(firstInputRef)

    return (
      <div className="useFormContainer centered-div use20rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">

          </button>
        </div>
        <h1 className="userFormLabel">RESERVA DE ARMAZONES</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer !h-[35rem]" style={{ display: 'inline-block' }}>
            <div className="input-container items-center rowForm w-[28.2rem] ">
              <div className="w-[100%] !mt-[1rem] mb-2">
                <SelectInputTiposComponent
                  label="PROYECTO"
                  name="tipo"
                  showRefresh={true}
                  data={data && data[EnumGrid.tipo_id]}
                  control={control}
                  entidad="EstablecimientosTipos"
                  error={errors.tipo}
                  customWidth={"!w-full ml-4"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm w-[28.2rem] ">
              <div className="w-[100%] !mt-[1rem] mb-2">
                <SelectInputTiposComponent
                  label="PUNTO DE VENTA"
                  name="tipo"
                  showRefresh={true}
                  data={data && data[EnumGrid.tipo_id]}
                  control={control}
                  entidad="EstablecimientosTipos"
                  error={errors.tipo}
                  customWidth={"!w-full ml-4"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm w-[28.2rem] ">
              <div className="w-[100%] !mt-[1rem] mb-2">
                <SelectInputTiposComponent
                  label="TIPO ANTEOJO"
                  name="tipo"
                  showRefresh={true}
                  data={data && data[EnumGrid.tipo_id]}
                  control={control}
                  entidad="EstablecimientosTipos"
                  error={errors.tipo}
                  customWidth={"!w-full ml-4"}
                />
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex input-container items-center rowForm w-[60%]  ">
                <div className="w-[100%] !mt-[1rem] mb-2">
                  <TextInputComponent
                    type="text"
                    label="RUT BENEFICIARIO"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
              <div className="flex input-container items-center rowForm w-[35%]  ">
                <div className="w-[100%] !mt-[1rem] mb-2">
                  <TextInputComponent
                    type="text"
                    label="DP"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex input-container items-center rowForm w-[28.2rem]  ">
                <div className="w-[100%] !mt-[1rem] mb-2">
                  <TextInputComponent
                    type="text"
                    label="ARMAZÓN 1"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex input-container items-center rowForm w-[28.2rem]  ">
                <div className="w-[100%] !mt-[1rem] mb-2">
                  <TextInputComponent
                    type="text"
                    label="ARMAZÓN 2"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="flex input-container items-center rowForm w-[28.2rem]  ">
                <div className="w-[100%] !mt-[1rem] mb-2">
                  <TextInputComponent
                    type="text"
                    label="ARMAZÓN 3"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                  />
                </div>
              </div>
            </div>


            <div className="input-container items-center rowForm w-[28.2rem]">
              <div className="flex justify-center">
                <div className="w-[50%]">
                  {escritura_lectura && (
                    <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                      {`RESERVAR`}
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FEstablecimientos;
