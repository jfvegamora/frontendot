/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoDireccionesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosDirecciones";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { signal } from "@preact/signals-react";

const strBaseUrl = "/api/proyectodireccionesdespacho/";
const strEntidad = "Parametrización de Dirección de Despacho ";

export interface InputData {
  proyecto        : string | undefined;
  titulo          : string | undefined;
  establecimiento : string | undefined;
  lugar           : string | undefined;
  direccion       : string | undefined;
  telefono        : string | undefined;
  observaciones   : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // (proyecto, establecimiento, lugar, direccion, telefono, observaciones)
  let _p1 = `"${jsonData.proyecto}", ${jsonData.establecimiento}, "${jsonData.lugar}", 
               "${jsonData.direccion}", "${jsonData.telefono}", "${jsonData.observaciones}"`;
  
   _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1
  };
// console.log("query: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `lugar        = "${jsonData.lugar}"`,
    `direccion    = "${jsonData.direccion}"`,
    `telefono     = "${jsonData.telefono}"`,
    `observaciones= "${jsonData.observaciones}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');


  
  return {
    query: "04",
    _p1,
    _p2: jsonData.proyecto,
    _p3: jsonData.establecimiento,
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

const FProyectosDirecciones: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectoDireccionesSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const [strCodigoProyecto, setStrCodigoProyecto] = useState("");
    const strCodigoProyecto2 = signal("")


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
      setValue("lugar", "");
      setValue("direccion", "");
      setValue("telefono", "");
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

    const handleInputChange = (e:any) =>{
      const { name, value } = e;
      console.log(value)
      console.log(name)
      if(name === 'proyecto'){
        strCodigoProyecto2.value = (value as string)  
        setStrCodigoProyecto(value)
        console.log(strCodigoProyecto2.value)
      }
      console.log(strCodigoProyecto2.value)

    }

    // console.log('codigo proyecto', strCodigoProyecto)
    // console.log(errors)
    console.log(strCodigoProyecto2.value)
    return (
      <div className="useFormContainer centered-div">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">

            <div className="w-full items-center flex">

              <div className="input-container items-center rowForm w-[50%]">
                  <div className="w-full ">
                      <SelectInputComponent
                        label="Proyecto"
                        name="proyecto"
                        showRefresh={true}
                        data={data && data[EnumGrid.proyecto]}
                        handleSelectChange={handleInputChange}
                        control={control}
                        isOT={true}
                        entidad={["/api/proyectos/", "02"]}
                        error={errors.proyecto}
                        inputRef={firstInputRef}
                        readOnly={isEditting}
                        />
                  </div>
              </div>


              <div className="input-container items-center rowForm w-[50%]">
                <div className="w-full ">
                  <SelectInputComponent
                      label="Establecimiento"
                      name="establecimiento"
                      showRefresh={true}
                      isOT={true}
                      handleSelectChange={handleInputChange}
                      data={data && data[EnumGrid.establecimiento_id]}
                      control={control}
                      entidad={["/api/establecimientos/", "06", strCodigoProyecto]}
                      customWidth={"345px"}
                      tabIndex={1}
                  />
                </div>
              </div>
            </div>


            <div className="w-full items-center flex">

              <div className="input-container items-center rowForm w-[33%]">
                <div className="w-full ">
                  <TextInputComponent
                    type="text"
                    label="Lugar"
                    name="lugar"
                    data={data && data[EnumGrid.lugar]}
                    control={control}
                    error={errors.lugar}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[33%]">
                <div className="w-full ">
                  <TextInputComponent
                      type="text"
                      label="Dirección"
                      name="direccion"
                      data={data && data[EnumGrid.direccion]}
                      control={control}
                      error={errors.direccion}
                    />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[33%]">
                <div className="w-full ">
                  <TextInputComponent
                      type="text"
                      label="Teléfono"
                      name="telefono"
                      data={data && data[EnumGrid.telefono]}
                      control={control}
                      error={errors.telefono}
                    />
                </div>
              </div>
            </div>
      


            <div className="w-full items-center flex">
              <div className="input-container items-center rowForm w-full">
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

export default FProyectosDirecciones;
