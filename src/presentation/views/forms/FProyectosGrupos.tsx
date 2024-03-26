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
import { EnumGrid } from "../mantenedores/MProyectosCristales";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { toast } from "react-toastify";
import { Button, Switch } from "@material-tailwind/react";
import TextInputInteractive from "../../components/forms/TextInputInteractive";
import { signal } from "@preact/signals-react";

const strBaseUrl = "/api/proyectogrupos/";
const strEntidad = "Parametrización de Cristales ";

export const valor_neto_armazones     = signal(0);
export const valor_neto_cristales     = signal(0);
export const valor_neto_adulto_mayor  = signal(0);
export const adulto_mayor             = signal(false);

export interface InputData {
  proyecto: string | undefined;
  cod_grupo: string | undefined;
  descripcion: string | undefined;
  marca: string | undefined;
  diseno: string | undefined;
  indice: string | undefined;
  material: string | undefined;
  color: string | undefined;
  tratamiento: string | undefined;
  esferico_desde: string | undefined;
  cilindrico_desde: string | undefined;
  esferico_hasta: string | undefined;
  cilindrico_hasta: string | undefined;
  diametro: string | undefined;
  valor_neto_cristal: string | undefined;

  // armazon_tipo: string | undefined;
  armazon_material: string | undefined;
  // armazon_marca: string | undefined;
  // armazon_uso: string | undefined;
  valor_neto_armazon: string | undefined;

  valor_neto_adulto_mayor: string | undefined;
  valor_neto_total: string | undefined;
  observaciones: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
  _p4?: string;
}

const validateSelect = (value: string | undefined): string => {
  return value ? `"${value}"` : "0";
};

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const valorTotalArmazon      = parseInt(jsonData.valor_neto_armazon as any);
  const valorTotalCristal      = parseInt(jsonData.valor_neto_cristal as any);
  const valorTotalAdultoMayor  = parseInt(jsonData.valor_neto_adulto_mayor as any) || 0;

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
  ${(jsonData.valor_neto_cristal && jsonData.valor_neto_cristal?.toString())?.length === 0 ? "0" : jsonData.valor_neto_cristal},
  ${validateSelect(jsonData.armazon_material)},
  ${(jsonData.valor_neto_armazon && jsonData.valor_neto_armazon?.toString())?.length === 0 ? "0" : jsonData.valor_neto_armazon},
  ${adulto_mayor.value === true ? 1 : 0},
  ${jsonData.valor_neto_adulto_mayor === '' ? 0 : jsonData.valor_neto_adulto_mayor},
  ${valorTotalArmazon + valorTotalCristal + valorTotalAdultoMayor},
  "${jsonData.observaciones}"`;

  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
    // _p2: jsonData.cristal?.toString(),
  };

  console.log("query_insert: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const valorTotalArmazon      = parseInt(jsonData.valor_neto_armazon as any);
  const valorTotalCristal      = parseInt(jsonData.valor_neto_cristal as any);
  const valorTotalAdultoMayor  = parseInt(jsonData.valor_neto_adulto_mayor as any) || 0;

  console.log(jsonData.valor_neto_adulto_mayor || 0)

  console.log(valorTotalAdultoMayor)
  console.log(valorTotalArmazon)
  console.log(valorTotalCristal)

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
    `valor_neto_cristal= ${(jsonData.valor_neto_cristal && jsonData.valor_neto_cristal?.toString())?.length === 0 ? "0" : jsonData.valor_neto_cristal}`,
    // `armazon_tipo      = ${validateSelect(jsonData.armazon_tipo)}`,
    `armazon_material  = ${validateSelect(jsonData.armazon_material)}`,
    `adulto_mayor      = ${adulto_mayor.value === true ? 1 : 0}`,
    // `armazon_marca     = ${validateSelect(jsonData.armazon_marca)}`,
    // `armazon_uso       = ${validateSelect(jsonData.armazon_uso)}`,

    `valor_neto_armazon= ${(jsonData.valor_neto_armazon && jsonData.valor_neto_armazon?.toString())?.length === 0 ? "0" : jsonData.valor_neto_armazon}`,
    `valor_neto_adulto_mayor=${(jsonData.valor_neto_adulto_mayor && jsonData.valor_neto_adulto_mayor?.toString())?.length === 0 ? "0" : jsonData.valor_neto_adulto_mayor}`,
    `valor_neto_total  = ${valorTotalArmazon + valorTotalCristal + valorTotalAdultoMayor}`,
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

const FProyectosGrupos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectoGruposSchema();
    // const [idCristal, setIdCristal] = useState('');
    const { showModal, CustomModal } = useModal();
    const [totalNeto, setTotalNeto] = useState(0);
    const [totalNetoArmazones, setTotalNetoArmazones]      = useState(0);
    const [totalNetoCristales, setTotalNetoCristales]      = useState(0);
    const [totalNetoAdultoMayor, setTotalNetoAdultoMayor]  = useState(0);
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
      getValues
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
      setValue("valor_neto_cristal", "0");
      // setValue("diametro", "");
      setValue("valor_neto_armazon", "0");
      // setValue("valor_neto_total", "0");
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
          adulto_mayor.value = false;
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
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
      [editEntity, createdEntity, handleApiResponse]
    );

    useEffect(() => {
      isEditting ? focusSecondInput("cod_grupo") : focusFirstInput("cod_grupo");

      const totalNeto = data && (data[EnumGrid.valor_neto_cristal] + data[EnumGrid.valor_neto_armazon] + data[EnumGrid.valor_neto_adulto_mayor])
      setTotalNeto(totalNeto)
      console.log(totalNeto)
      setValue('valor_neto_total', totalNeto)
    }, []);



    useEffect(() => {
      const { valor_neto_cristal, valor_neto_armazon, valor_neto_adulto_mayor } = getValues()

      console.log((parseInt(valor_neto_cristal) + parseInt(valor_neto_armazon)) + parseInt(valor_neto_adulto_mayor || '0') as any)

      console.log(parseInt(valor_neto_adulto_mayor as any))
      console.log(parseInt(valor_neto_cristal))
      console.log(parseInt(valor_neto_armazon))

      setTotalNeto((parseInt(valor_neto_cristal) + parseInt(valor_neto_armazon)) + parseInt(valor_neto_adulto_mayor || '0') as any)
      setValue('valor_neto_total', totalNeto as any)
      console.log(totalNeto)
    }, [totalNetoArmazones, totalNetoCristales, totalNetoAdultoMayor])



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


    console.log(errors)

    console.log(data && data[EnumGrid.valor_neto_total])
    console.log(totalNeto)

    return (
      <div className="useFormContainer centered-div use60rem">
        {/* <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1> */}

        <div className="userFormBtnCloseContainer flex ">
          <div className='w-[50%] mx-auto !text-center  '>
            <h1 className='userFormLabel mx-auto  w-full '>{label}</h1>
          </div>
          <div className=''>
            <button onClick={closeModal} className="userFormBtnClose">
              X
            </button>
          </div>
        </div>

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
                      textAlign="text-center"
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
                <div className="!w-[33%]">
                  <SelectInputComponent
                    label="Marca"
                    name="marca"
                    showRefresh={true}
                    data={data && data[EnumGrid.marca_id]}
                    control={control}
                    entidad={["/api/marcas/", "02", "02"]}
                    error={errors.marca}
                    tabIndex={1}
                    customWidth={"!w-[] !ml-[1rem]"}
                  />
                </div>

                <div className="w-[33%]">
                  <SelectInputComponent
                    label="Diseño"
                    name="diseno"
                    showRefresh={true}
                    data={data && data[EnumGrid.diseno_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesDisenos"]}
                    error={errors.diseno}
                    customWidth={"!w-[]"}
                  />
                </div>

                <div className="!w-[33%]">
                  <SelectInputComponent
                    label="Índice"
                    name="indice"
                    showRefresh={true}
                    data={data && data[EnumGrid.indice_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesIndices"]}
                    error={errors.indice}
                    customWidth={"!w-[]"}
                  />
                </div>
              </div>
            </div>

            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                <div className="w-[33%]">
                  <SelectInputComponent
                    label="Material"
                    name="material"
                    showRefresh={true}
                    data={data && data[EnumGrid.material_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesMateriales"]}
                    error={errors.material}
                    customWidth={"!w-[] !ml-[1rem]"}
                  />
                </div>
                <div className="!w-[33%]">
                  <SelectInputComponent
                    label="Color"
                    name="color"
                    showRefresh={true}
                    data={data && data[EnumGrid.color_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesColores"]}
                    error={errors.color}
                    customWidth={"!w-[]"}
                  />
                </div>
                <div className="w-[33%]">
                  <SelectInputComponent
                    label="Tratamiento"
                    name="tratamiento"
                    showRefresh={true}
                    data={data && data[EnumGrid.tratamiento_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesTratamientos"]}
                    error={errors.tratamiento}
                    customWidth={"!w-[]"}
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
                      textAlign="text-center"
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
                      textAlign="text-center"
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
                      textAlign="text-center"
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
                      textAlign="text-center"
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
                      textAlign="text-center"
                    />
                  </div>
                  <div className="w-[70%]">
                    <TextInputComponent
                      type="number"
                      label="$ Venta Neto"
                      name="valor_neto_cristal"
                      data={data && data[EnumGrid.valor_neto_cristal]}
                      control={control}
                      error={errors.valor_neto_cristal}
                      isOptional={false}
                      textAlign="text-right"
                      handleChange={(e) => {
                        console.log(e)
                        setTotalNetoCristales(e)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[70%] flex items-center justify-between ml-4 ">
              <h1 className="userFormLabel mt-[2rem] ">Armazones</h1>
              <h1 className="userFormLabel mt-[2rem] mr-10">Usuarios</h1>

            </div>


            <div className="!pt-[1rem] h-[4rem]">
              <div className="input-container items-center rowForm w-full flex">
                {/* <div className="w-[20%]">
                  <SelectInputTiposComponent
                    label="Tipo"
                    name="armazon_tipo"
                    showRefresh={true}
                    data={data && data[EnumGrid.armazon_tipo_id]}
                    control={control}
                    entidad={"ArmazonesTipos"}
                    error={errors.armazon_tipo}
                    customWidth={"!w-[] "}
                  />
                </div> */}
                <div className="w-[30%]">
                  <SelectInputTiposComponent
                    label="Material"
                    name="armazon_material"
                    showRefresh={true}
                    data={data && data[EnumGrid.armazon_material_id]}
                    control={control}
                    entidad={"ArmazonesMaterial"}
                    error={errors.armazon_material}
                    customWidth={"!w-[] !ml-[1rem]"}
                  />
                </div>
                <div className="w-[30%]">
                  <TextInputComponent
                    type="number"
                    label="$ Neto Armazón"
                    // name="valor_neto_armazon"
                    name="valor_neto_armazon"
                    data={data && data[EnumGrid.valor_neto_armazon]}
                    // data={23}
                    control={control}
                    error={errors.valor_neto_armazon}
                    isOptional={false}
                    textAlign="text-right"
                    handleChange={(e) => { setTotalNetoArmazones(e) }}
                  />
                </div>
                <div className="w-[20%] ml-[6rem]">
                  {/* <SelectInputTiposComponent
                    label="Material"
                    name="armazon_material"
                    showRefresh={true}
                    data={data && data[EnumGrid.armazon_material_id]}
                    control={control}
                    entidad={"ArmazonesMaterial"}
                    error={errors.armazon_material}
                    customWidth={"!w-[] !ml-[1rem]"}
                  /> */}

                    {/* <RadioButtonComponent
                      control={control}
                      label=""
                      name="adulto_mayor"
                      // data={formValues && formValues["Venta/Post Venta"] || data && data[EnumGrid.permiso_venta]}
                      options={["Adulto Mayor"]}
                      onChange={(e)=>{
                        console.log(e)
                      }}
                      // error={errors.permiso_venta}
                      horizontal={true}
                      // onChange={(e:any)=>handleChange(e)}
                    /> */}

                    <div className=" items-center flex">
                         <Switch 
                           label="Adulto mayor" 
                           color="orange"
                           onChange={(e)=>{
                              adulto_mayor.value = e.target.checked
                           }}
                           defaultChecked={data ? data[EnumGrid.adulto_mayor] === 0 ? false : true : false}
                        />
                   </div>
                </div>
                <div className="w-[30%] ml-8">
                  {/* <SelectInputComponent
                    label="Marca"
                    name="armazon_marca"
                    showRefresh={true}
                    data={data && data[EnumGrid.armazon_marca_id]}
                    control={control}
                    entidad={["/api/marcas/", "02", "1"]}
                    error={errors.armazon_marca}
                    customWidth={"!w-[]"}
                  /> */}
                  <TextInputComponent
                    type="number"
                    label="$ Neto Adulto Mayor"
                    // name="valor_neto_armazon"
                    name="valor_neto_adulto_mayor"
                    data={data && data[EnumGrid.valor_neto_adulto_mayor]}
                    // data={23}
                    control={control}
                    error={errors.valor_neto_armazon}
                    isOptional={false}
                    textAlign="text-right"
                    handleChange={(e) => { 
                      setTotalNetoAdultoMayor(e) 
                    }}
                  />
                </div>
                <div className="w-[20%]">
                  {/* <SelectInputTiposComponent
                    label="Uso"
                    name="armazon_uso"
                    showRefresh={true}
                    data={data && data[EnumGrid.armazon_uso_id]}
                    control={control}
                    entidad={"ArmazonesUsos"}
                    customWidth={"!w-[] "}
                    error={errors.armazon_uso}
                  /> */}
                </div>
                {/* <div className="w-[20%]">
                  <TextInputComponent
                    type="number"
                    label="$ Venta Neto"
                    // name="valor_neto_armazon"
                    name="valor_neto_armazon"
                    data={data && data[EnumGrid.valor_neto_armazon]}
                    // data={23}
                    control={control}
                    error={errors.valor_neto_armazon}
                    isOptional={false}
                    textAlign="text-right"
                    handleChange={(e) => { setTotalNetoArmazones(e) }}
                  />
                </div> */}
              </div>
            </div>

            <div className="!pt-[1rem] h-[4rem] mt-6">
              <div className="input-container items-center rowForm w-full flex">
                <div className="w-[80%]">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.observaciones]}
                    control={control}
                    error={errors.observaciones}
                    isOptional={true}
                  />
                </div>
                <div className="w-[20%]">
                  <TextInputInteractive
                    type="number"
                    label="$ TOTAL NETO"
                    name="valor_neto_total"
                    // data={data && data[EnumGrid.valor_neto_total]}
                    data={totalNeto || data && data[EnumGrid.valor_neto_total]}
                    control={control}
                    // error={errors.valor_neto_total}
                    isOptional={false}
                    textAlign="text-right"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-[40%] mx-auto">
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

export default FProyectosGrupos;
