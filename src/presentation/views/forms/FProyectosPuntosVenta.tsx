/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  // RadioButtonComponent,
  SelectInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationParametrizacionPuntosVenta } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosPuntosVenta";
import {  MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";


const strBaseUrl = "/api/proyectopuntosventa/";
const strEntidad = "Parametrizacion de Punto de Venta ";

export interface InputData {
  proyecto   : string | undefined;
  punto_venta: string | undefined;
  // estado     : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {

  let _p1 = ` "${jsonData.proyecto}", 
               ${jsonData.punto_venta}`;  
                //  ${jsonData.estado === "Disponible" ? 1 : 2}`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  return query;
}

export function transformUpdateQuery(): OutputData | null {
  // export function transformUpdateQuery(jsonData: InputData): OutputData | null {
//   const fields = [
//     `estado   = ${jsonData.estado === "Disponible" ? 1 : 2}`,
//   ];

//   const filteredFields = fields.filter(
//     (field) => field !== null && field !== ""
//   );

//   if (filteredFields.length === 0) {
//     return null;
//   }

//   const _p1 = filteredFields.join(",");

//   const query = {
//     query: "04",
//     _p1,
//     _p2: jsonData.proyecto,
//     _p3: jsonData.punto_venta,
//   };
// // console.log("query: ", query);
//   return query;
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

const FProyectosPuntosVenta: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationParametrizacionPuntosVenta();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();


    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && [data[EnumGrid.punto_venta_id, EnumGrid.codigo_proyecto]];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("proyecto", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="punto_venta"]'
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery()
            // ? transformUpdateQuery(data)
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
      isEditting ? focusSecondInput("estado") : focusFirstInput("proyecto");
    }, []);

    return (
      <div className="useFormContainer centered-div w-[35rem]">
        <div className="userFormBtnCloseContainer">
        <h1 className="userFormLabel">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center h-[4rem] ">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full ">
                  <SelectInputComponent
                    label="Punto de Venta"
                    name="punto_venta"
                    showRefresh={true}
                    data={data && data[EnumGrid.punto_venta_id]}
                    control={control}
                    entidad={["/api/puntosventa/", "02"]}
                    error={errors.punto_venta}
                    readOnly={isEditting}
                    customWidth={"labelInput inputStyles"}
                    />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center !my-8 h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <SelectInputComponent
                    label="Proyecto"
                    name="proyecto"
                    showRefresh={true}
                    data={data && data[EnumGrid.codigo_proyecto]}
                    control={control}
                    entidad={["/api/proyectos/", "02"]}
                    error={errors.proyecto}
                    readOnly={isEditting}
                    customWidth={"labelInput inputStyles"}
                    />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
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

export default FProyectosPuntosVenta;
