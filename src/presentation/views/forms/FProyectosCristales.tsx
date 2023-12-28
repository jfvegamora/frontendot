/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoCristalesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosCristales";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/proyectocristales/";
const strEntidad = "Parametrización de Cristales ";

export interface InputData {
  proyecto          : string | undefined;
  cod_grupo         : string | undefined;
  descripcion       : string | undefined;
  marca             : string | undefined;
  diseno            : string | undefined;
  indice            : string | undefined;
  material          : string | undefined;
  color             : string | undefined;
  tratamiento       : string | undefined;
  esferico_desde 		: string | undefined;
  cilindrico_desde 	: string | undefined;
  esferico_hasta 		: string | undefined;
  cilindrico_hasta 	: string | undefined;
  diametro 	        : string | undefined;
  precio_venta_neto : string | undefined;
  observaciones     : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
  _p4?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
//LA MRCA SE IGNORA. MARCA=0.
  let _p1 = `
 "${jsonData.proyecto}", 
 "${jsonData.cod_grupo}", 
 "${jsonData.descripcion}", 
  ${jsonData.marca}, 
  ${jsonData.diseno}, 
  ${jsonData.indice}, 
  ${jsonData.material}, 
  ${jsonData.color}, 
  ${jsonData.tratamiento}, 
  ${(jsonData.diametro && jsonData.diametro?.toString())?.length === 0 ? "0" : jsonData.diametro},
  ${(jsonData.esferico_desde && jsonData.esferico_desde?.toString())?.length === 0 ? "0" : jsonData.esferico_desde}, 
  ${(jsonData.esferico_hasta && jsonData.esferico_hasta?.toString())?.length === 0 ? "0" : jsonData.esferico_hasta}, 
  ${(jsonData.cilindrico_desde && jsonData.cilindrico_desde?.toString())?.length === 0 ? "0" : jsonData.cilindrico_desde}, 
  ${(jsonData.cilindrico_hasta && jsonData.cilindrico_hasta?.toString())?.length === 0 ? "0" : jsonData.cilindrico_hasta}, 
  ${(jsonData.precio_venta_neto && jsonData.precio_venta_neto?.toString())?.length === 0 ? "0" : jsonData.precio_venta_neto},
  "${jsonData.observaciones}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
    // _p2: jsonData.cristal?.toString(),
  };

  // console.log("query_insert: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `descripcion       ="${jsonData.descripcion}"`,
    `marca             = ${jsonData.marca}`,
    `diseno            = ${jsonData.diseno}`,
    `indice            = ${jsonData.indice}`, 
    `material          = ${jsonData.material}`, 
    `color             = ${jsonData.color}`, 
    `tratamiento       = ${jsonData.tratamiento}`, 
    `esferico_desde    = ${(jsonData.esferico_desde && jsonData.esferico_desde?.toString())?.length === 0 ? "0" : jsonData.esferico_desde}`,
    `cilindrico_desde  = ${(jsonData.cilindrico_desde && jsonData.cilindrico_desde?.toString())?.length === 0 ? "0" : jsonData.cilindrico_desde}`,
    `esferico_hasta    = ${(jsonData.esferico_hasta && jsonData.esferico_hasta?.toString())?.length === 0 ? "0" : jsonData.esferico_hasta}`,
    `cilindrico_hasta  = ${(jsonData.cilindrico_hasta && jsonData.cilindrico_hasta?.toString())?.length === 0 ? "0" : jsonData.cilindrico_hasta}`,
    `diametro          = ${(jsonData.diametro && jsonData.diametro?.toString())?.length === 0 ? "0" : jsonData.diametro}`,
    `precio_venta_neto = ${(jsonData.precio_venta_neto && jsonData.precio_venta_neto?.toString())?.length === 0 ? "0" : jsonData.precio_venta_neto}`,
    `observaciones     ="${jsonData.observaciones}"`,
  ];

  let _p1 = fields.join(",");
  _p1 = _p1.replace(/'/g, '!');


  const query = {
    query: "04",
    _p1,
    _p2: jsonData.proyecto,
    _p3: jsonData.cod_grupo?.toString(),
    // _p4: (jsonData.cristal && jsonData.cristal?.toString())?.length === 0 ? "0": jsonData.cristal
  };
  console.log('query', query)

  return query
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

const FProyectosCristales: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectoCristalesSchema();
    // const [idCristal, setIdCristal] = useState('');
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    // const {ListEntity:ListEntityCristales} = useCrud("/api/cristaleskardex/");

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
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
      setValue("cod_grupo", "");
      setValue("descripcion", "");
      setValue("esferico_desde", "");
      setValue("esferico_hasta", "");
      setValue("cilindrico_desde", "");
      setValue("cilindrico_hasta", "");
      setValue("precio_venta_neto", "");
      setValue("diametro", "");
      setValue("observaciones", "");
        if (firstInputRef.current) {
          const firstInput = firstInputRef.current.querySelector(
              'input[name="cod_grupo"]'
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
      isEditting ? focusSecondInput("cod_grupo") : focusFirstInput("cod_grupo");
    }, []);

    // const handleCristalesDescription = async (data: any) => {
    //   if (data) {
    //     const query = "01";
    //     const primaryKey = `&_p1=${data}`;
    //     const result = await ListEntityCristales(primaryKey, query);
    
    //     if (result && result[0] && result[0][3]) {
    //       setIdCristal(result[0][3]);
    //     } else {
    //       setIdCristal("Cristal no existe");
    //     }
    //   }
    // };
    

    // useEffect(() => {
    //   setValue('data_cristal', idCristal || '');
    // }, [idCristal, setValue]);

    // console.log('data', data)
    console.log(errors)
    return (
      <div className="useFormContainer centered-div use60rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">

            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                <div className="w-[50%]">
                  <SelectInputComponent
                    label="Proyecto"
                    name="proyecto"
                    showRefresh={true}
                    data={data && data[EnumGrid.proyecto]}
                    control={control}
                    entidad={["/api/proyectos/", "02"]}
                    error={errors.proyecto}
                    readOnly={isEditting}
                    inputRef={firstInputRef}
                    customWidth={"!w-[29rem] !ml-[1rem] !mt-[-0.6rem]"}
                    />
                </div>
                <div className="w-[50%] flex">
                  <div className="w-[25%]">
                    <TextInputComponent
                        type="text"
                        label="ID Grupo"
                        name="cod_grupo"
                        data={data && data[EnumGrid.cod_grupo]}
                        control={control}
                        error={errors.cod_grupo}
                        onlyRead={isEditting}
                        inputRef={firstInputRef}
                        customWidth={"!w-[8rem] !ml-[-12px]"}
                        />
                  </div>
                  <div className="w-[75%]">
                    <TextInputComponent
                      type="text"
                      label="Descripción"
                      name="descripcion"
                      data={data && data[EnumGrid.descripcion]}
                      control={control}
                      error={errors.descripcion}
                      customWidth={"!w-[20.8rem]"}
                      />
                  </div>
                </div>
              </div>
            </div>

            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                  <div className="!w-[50%]">
                    <SelectInputComponent
                      label="Marca"
                      name="marca"
                      showRefresh={true}
                      data={data && data[EnumGrid.marca_id]}
                      control={control}
                      entidad={["/api/marcas/", "02"]}
                      error={errors.marca}
                      tabIndex={1}
                      customWidth={"!w-[29rem] !ml-[1rem]"}
                    />
                  </div>

                  <div className="w-[50%]">
                    <SelectInputComponent
                      label="Diseño"
                      name="diseno"
                      showRefresh={true}
                      data={data && data[EnumGrid.diseno_id]}
                      control={control}
                      entidad={["/api/tipos/", "02", "CristalesDisenos"]}
                      error={errors.diseno}
                      inputRef={focusSecondInput}
                      customWidth={"!w-[30.3rem]"}
                    />
                  </div>
              </div>
            </div>

            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                <div className="!w-[50%]">
                  <SelectInputComponent
                    label="Índice"
                    name="indice"
                    showRefresh={true}
                    data={data && data[EnumGrid.indice_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesIndices"]}
                    error={errors.indice}
                      customWidth={"!w-[29rem] !ml-[1rem]"}
                  />
                </div>
                <div className="w-[50%]">
                  <SelectInputComponent
                    label="Material"
                    name="material"
                    showRefresh={true}
                    data={data && data[EnumGrid.material_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesMateriales"]}
                    error={errors.material}
                    customWidth={"!w-[30.3rem]"}
                  />
                </div>
              </div>
            </div>

            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                <div className="!w-[50%]">
                <SelectInputComponent
                  label="Color"
                  name="color"
                  showRefresh={true}
                  data={data && data[EnumGrid.color_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesColores"]}
                  error={errors.color}
                  customWidth={"!w-[29rem] !ml-[1rem]"}
                  />
                </div>
                <div className="w-[50%]">
                <SelectInputComponent
                  label="Tratamiento"
                  name="tratamiento"
                  showRefresh={true}
                  data={data && data[EnumGrid.tratamiento_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesTratamientos"]}
                  error={errors.tratamiento}
                  customWidth={"!w-[30.3rem]"}
                  />
              </div>
            </div>
          </div>


          <div className="!pt-[1rem] h-[4rem]">
            <div className="input-container items-center rowForm w-full flex">
            <div className="w-[50%] flex">
              <div className="">
                <TextInputComponent
                  type="number"
                  label="Diámetro"
                  name="diametro"
                  data={data && data[EnumGrid.diametro]}
                  control={control}
                  error={errors.diametro}
                />
              </div>
              <div className="">
                <TextInputComponent
                  type="number"
                  label="ESF desde"
                  name="esferico_desde"
                  data={data && data[EnumGrid.esferico_desde]}
                  control={control}
                  error={errors.esferico_desde}
                  step={0.01}
                  />
              </div>
              <div className="">
                <TextInputComponent
                  type="number"
                  label="ESF hasta"
                  name="esferico_hasta"
                  data={data && data[EnumGrid.esferico_hasta]}
                  control={control}
                  error={errors.esferico_hasta}
                  step={0.01}
                  />
              </div>
              </div>
              <div className="w-[50%] flex">
              <div className="">
                <TextInputComponent
                  type="number"
                  label="CIL desde"
                  name="cilindrico_desde"
                  data={data && data[EnumGrid.cilindrico_desde]}
                  control={control}
                  error={errors.cilindrico_desde}
                  step={0.01}
                  customWidth={"!pr-[0.4rem]"}
                  />
              </div>
              <div className="">
                <TextInputComponent
                  type="number"
                  label="CIL hasta"
                  name="cilindrico_hasta"
                  data={data && data[EnumGrid.cilindrico_hasta]}
                  control={control}
                  error={errors.cilindrico_hasta}
                  step={0.01}
                  customWidth={"!ml-[-1rem]"}
                  />
              </div>
              <div className="">
                <TextInputComponent
                  type="number"
                  label="$ Venta Neto"
                  name="precio_venta_neto"
                  data={data && data[EnumGrid.precio_venta_neto]}
                  control={control}
                  error={errors.precio_venta_neto}
                />
              </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center h-[4rem]">
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

export default FProyectosCristales;
