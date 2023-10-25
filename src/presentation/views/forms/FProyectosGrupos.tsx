/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoGruposSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosGrupos";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/proyectogrupos/";
const strEntidad = "Parametrización de Grupos ";

export interface InputData {
  proyecto          : string | undefined;
  cod_grupo         : string | undefined;
  descripcion       : string | undefined;
  // marca             : string | undefined;
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
  const _p1 = `
 '${jsonData.proyecto}', 
  ${jsonData.cod_grupo}, 
 '${jsonData.descripcion}', 
  0, 
  ${jsonData.diseno}, 
  ${jsonData.indice}, 
  ${jsonData.material}, 
  ${jsonData.color}, 
  ${jsonData.tratamiento}, 
  ${(jsonData.esferico_desde && jsonData.esferico_desde?.toString())?.length === 0 ? "0" : jsonData.esferico_desde}, 
  ${(jsonData.cilindrico_desde && jsonData.cilindrico_desde?.toString())?.length === 0 ? "0" : jsonData.cilindrico_desde}, 
  ${(jsonData.esferico_hasta && jsonData.esferico_hasta?.toString())?.length === 0 ? "0" : jsonData.esferico_hasta}, 
  ${(jsonData.cilindrico_hasta && jsonData.cilindrico_hasta?.toString())?.length === 0 ? "0" : jsonData.cilindrico_hasta}, 
  ${(jsonData.diametro && jsonData.diametro?.toString())?.length === 0 ? "0" : jsonData.diametro},
  ${(jsonData.precio_venta_neto && jsonData.precio_venta_neto?.toString())?.length === 0 ? "0" : jsonData.precio_venta_neto},
  '${jsonData.observaciones}'`;


  const query: OutputData = {
    query: "03",
    _p1: _p1,
    // _p2: jsonData.cristal?.toString(),
  };

  console.log("query_insert: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `descripcion       ='${jsonData.descripcion}'`,
    // `marca             = ${jsonData.marca}`,
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
    `observaciones     ='${jsonData.observaciones}'`,
  ];

  const _p1 = fields.join(",");


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
}

const FProyectosGrupos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationProyectoGruposSchema();
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
          'input[name="cristal"]'
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
        const errorResponse = response?.response?.data.error;
        console.log("response", response);
        if (errorResponse || response.code === "ERR_BAD_RESPONSE") {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });
          return;
        }

        if (!blnKeep && !isEditting && !errorResponse) {
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

          toastSuccess(isEditting);
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
      isEditting ? focusSecondInput("cristal") : focusFirstInput("proyecto");
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

    console.log('data', data)
    return (
      <div className="useFormContainer handleDerivarClick !top-[-6%]">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container items-center">
              <div className="w-full ">
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
                  />
              </div>
              <div className="w-full ">
                <TextInputComponent
                    type="number"
                    label="ID Grupo"
                    name="cod_grupo"
                    data={data && data[EnumGrid.cod_grupo]}
                    control={control}
                    error={errors.cod_grupo}
                    onlyRead={isEditting}
                    />
              </div>
              <div className="w-full ">
                <TextInputComponent
                  type="text"
                  label="Descripción"
                  name="descripcion"
                  data={data && data[EnumGrid.descripcion]}
                  control={control}
                  error={errors.descripcion}
                />
              </div>
            </div>

            <div className="input-container items-center">
              <div className="w-full ">
              <SelectInputComponent
                    label="Diseño"
                    name="diseno"
                    showRefresh={true}
                    data={data && data[EnumGrid.diseno_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesDisenos"]}
                    error={errors.diseno}
                    inputRef={focusSecondInput}
                    />
              </div>
              <div className="w-full ">
              </div>
            </div>
            
            <div className="input-container items-center">
              <div className="w-full ">
                <SelectInputComponent
                  label="Índice"
                  name="indice"
                  showRefresh={true}
                  data={data && data[EnumGrid.indice_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesIndices"]}
                  error={errors.indice}
                  customWidth={""}
                />
              </div>
              <div className="w-full ">
                <SelectInputComponent
                  label="Material"
                  name="material"
                  showRefresh={true}
                  data={data && data[EnumGrid.material_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesMateriales"]}
                  error={errors.material}
                />
              </div>
            </div>

            <div className="input-container items-center">
              <div className="w-full ">
                <SelectInputComponent
                  label="Color"
                  name="color"
                  showRefresh={true}
                  data={data && data[EnumGrid.color_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesColores"]}
                  error={errors.color}
                  customWidth={""}
                />
              </div>
              <div className="w-full ">
                <SelectInputComponent
                  label="Tratamiento"
                  name="tratamiento"
                  showRefresh={true}
                  data={data && data[EnumGrid.tratamiento_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "CristalesTratamientos"]}
                  error={errors.tratamiento}
                  customWidth={""}
                />
              </div>
            </div>

            <div className="input-container items-center">
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="ESF desde"
                  name="esferico_desde"
                  data={data && data[EnumGrid.esferico_desde]}
                  control={control}
                  error={errors.esferico_desde}
                />
              </div>
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="ESF hasta"
                  name="esferico_hasta"
                  data={data && data[EnumGrid.esferico_hasta]}
                  control={control}
                  error={errors.esferico_hasta}
                />
              </div>
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="CIL desde"
                  name="cilindrico_desde"
                  data={data && data[EnumGrid.cilindrico_desde]}
                  control={control}
                  error={errors.cilindrico_desde}
                />
              </div>
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="CIL hasta"
                  name="cilindrico_hasta"
                  data={data && data[EnumGrid.cilindrico_hasta]}
                  control={control}
                  error={errors.cilindrico_hasta}
                />
              </div>
              <div className="w-full ">
                <TextInputComponent
                  type="number"
                  label="Diametro"
                  name="diametro"
                  data={data && data[EnumGrid.diametro]}
                  control={control}
                  error={errors.diametro}
                />
              </div>
              <div className="w-full ">
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

            <div className="input-container">
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

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FProyectosGrupos;
