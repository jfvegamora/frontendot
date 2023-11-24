/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  RadioButtonComponent,
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


const strBaseUrl = "/api/proyectopuntosventa/";
const strEntidad = "Parametrizacion de Punto de Venta ";

export interface InputData {
  proyecto   : string | undefined;
  punto_venta: string | undefined;
  estado     : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {

  let _p1 = ` "${jsonData.proyecto}", 
                "${jsonData.punto_venta}",  
                 ${jsonData.estado === "Disponible" ? 1 : 2}`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
  };

  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `estado   = ${jsonData.estado === "Disponible" ? 1 : 2}`,
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
    _p3: jsonData.punto_venta,
  };
// console.log("query: ", query);
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
      setValue("punto_venta", "");

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

    // const fetchArmazon = async(codigo:string | undefined) =>{
    //     try {
    //         const {data} = await axios(`https://mtoopticos.cl/api/armazones/listado/?query=01&_p1=${codigo}`)
    //         armazonData.value = data       
    //     } catch (error) {
    //       throw error
    //     }
    // }

  //  useEffect(()=>{
  //       if(changeCodigo){
  //           fetchArmazon(changeCodigo)
  //            .then(()=>{
  //              if(armazonData.value.length >= 1){
  //                armazonData.value = []
  //               //  toast.error('codigo armazon existente')
  //              }else{
  //                toast.error('Código armazon inválido')
  //                armazonData.value = []
  //              }
  //            })
  //       }
  //  },[changeCodigo])
      

    
 
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
            <div className="rowForm">
              <SelectInputComponent
                label="Proyecto"
                name="proyecto"
                showRefresh={true}
                data={data && data[EnumGrid.codigo_proyecto]}
                control={control}
                entidad={["/api/proyectos/", "02"]}
                error={errors.proyecto}
                inputRef={firstInputRef}
                readOnly={isEditting}
              />
            </div>
            <div className="rowForm">
              <SelectInputComponent
                  label="Punto de Venta"
                  name="punto_venta"
                  showRefresh={true}
                  data={data && data[EnumGrid.punto_venta_id]}
                  control={control}
                  entidad={["/api/puntosventa/", "02"]}
                  error={errors.punto_venta}
                  inputRef={firstInputRef}
                  readOnly={isEditting}
                />
            </div>

            <div className="rowForm w-[100%] !h-auto">
              <div className="w-full !mt-8">
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

export default FProyectosPuntosVenta;
