/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProyectoGruposSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosCristales";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import { Button, Switch } from "@material-tailwind/react";
import TextInputInteractive from "../../components/forms/TextInputInteractive";
import { signal } from "@preact/signals-react";

const strBaseUrl = "/api/proyectogrupos/";
const strEntidad = "Parametrización de Cristales ";

export const valor_neto_armazones = signal(0);
export const valor_neto_cristales = signal(0);
export const armazon_flexible = signal(false);

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

  // valor_neto_adulto_mayor: string | undefined;
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

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const valorTotalArmazon = parseInt(jsonData.valor_neto_armazon as any);
  const valorTotalCristal = parseInt(jsonData.valor_neto_cristal as any);

  console.log(jsonData);

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
  ${
    (jsonData.diametro && jsonData.diametro?.toString())?.length === 0
      ? "0"
      : jsonData.diametro
  },
  ${
    (jsonData.esferico_desde && jsonData.esferico_desde?.toString())?.length ===
    0
      ? "0"
      : jsonData.esferico_desde
  }, 
  ${
    (jsonData.esferico_hasta && jsonData.esferico_hasta?.toString())?.length ===
    0
      ? "0"
      : jsonData.esferico_hasta
  }, 
  ${
    (jsonData.cilindrico_desde && jsonData.cilindrico_desde?.toString())
      ?.length === 0
      ? "0"
      : jsonData.cilindrico_desde
  }, 
  ${
    (jsonData.cilindrico_hasta && jsonData.cilindrico_hasta?.toString())
      ?.length === 0
      ? "0"
      : jsonData.cilindrico_hasta
  }, 
  ${
    (jsonData.valor_neto_cristal && jsonData.valor_neto_cristal?.toString())
      ?.length === 0
      ? "0"
      : jsonData.valor_neto_cristal
  },
  ${armazon_flexible.value === true ? "3" : "0"},
  ${
    (jsonData.valor_neto_armazon && jsonData.valor_neto_armazon?.toString())
      ?.length === 0
      ? "0"
      : jsonData.valor_neto_armazon
  },
  ${valorTotalArmazon + valorTotalCristal},
  "${jsonData.observaciones}"`;

  _p1 = _p1.replace(/'/g, "!");

  const query: OutputData = {
    query: "03",
    _p1,
    // _p2: jsonData.cristal?.toString(),
  };

  console.log("query_insert: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const valorTotalArmazon = parseInt(jsonData.valor_neto_armazon as any);
  const valorTotalCristal = parseInt(jsonData.valor_neto_cristal as any);

  const fields = [
    `descripcion       ="${jsonData.descripcion}"`,
    `marca             = ${jsonData.marca}`,
    `diseno            = ${jsonData.diseno}`,
    `indice            = ${jsonData.indice}`,
    `material          = ${jsonData.material}`,
    `color             = ${jsonData.color}`,
    `tratamiento       = ${jsonData.tratamiento}`,
    `esferico_desde    = ${
      (jsonData.esferico_desde && jsonData.esferico_desde?.toString())
        ?.length === 0
        ? "0"
        : jsonData.esferico_desde
    }`,
    `cilindrico_desde  = ${
      (jsonData.cilindrico_desde && jsonData.cilindrico_desde?.toString())
        ?.length === 0
        ? "0"
        : jsonData.cilindrico_desde
    }`,
    `esferico_hasta    = ${
      (jsonData.esferico_hasta && jsonData.esferico_hasta?.toString())
        ?.length === 0
        ? "0"
        : jsonData.esferico_hasta
    }`,
    `cilindrico_hasta  = ${
      (jsonData.cilindrico_hasta && jsonData.cilindrico_hasta?.toString())
        ?.length === 0
        ? "0"
        : jsonData.cilindrico_hasta
    }`,
    `diametro          = ${
      (jsonData.diametro && jsonData.diametro?.toString())?.length === 0
        ? "0"
        : jsonData.diametro
    }`,
    `valor_neto_cristal= ${
      (jsonData.valor_neto_cristal && jsonData.valor_neto_cristal?.toString())
        ?.length === 0
        ? "0"
        : jsonData.valor_neto_cristal
    }`,
    `armazon_material  = ${armazon_flexible.value === true ? "3" : "0"}`,

    `valor_neto_armazon= ${
      (jsonData.valor_neto_armazon && jsonData.valor_neto_armazon?.toString())
        ?.length === 0
        ? "0"
        : jsonData.valor_neto_armazon
    }`,
    `valor_neto_total  = ${valorTotalArmazon + valorTotalCristal}`,
    `observaciones     ="${jsonData.observaciones}"`,
  ];

  let _p1 = fields.join(",");
  _p1 = _p1.replace(/'/g, "!");

  const query = {
    query: "04",
    _p1,
    _p2: jsonData.proyecto,
    _p3: jsonData.cod_grupo?.toString(),
    // _p4: (jsonData.cristal && jsonData.cristal?.toString())?.length === 0 ? "0": jsonData.cristal
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

const FProyectosGrupos: React.FC<IUserFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    label,
    data,
    isEditting,
    escritura_lectura,
  }) => {
    const schema = validationProyectoGruposSchema();
    // const [idCristal, setIdCristal] = useState('');
    const { showModal, CustomModal } = useModal();
    const [totalNeto, setTotalNeto] = useState(0);
    const [totalNetoArmazones, setTotalNetoArmazones] = useState(0);
    const [totalNetoCristales, setTotalNetoCristales] = useState(0);
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
      getValues,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("cod_grupo", "");
      setValue("descripcion", "");
      // setValue("diametro", "");
      // setValue("esferico_desde", "");
      // setValue("esferico_hasta", "");
      // setValue("cilindrico_desde", "");
      // setValue("cilindrico_hasta", "");
      // setTotalNetoArmazones(0)
      // setTotalNetoCristales(0)
      // setTotalNeto(0);
      // setValue("valor_neto_armazon", '0');
      // setValue("valor_neto_cristal", '0');
      // setValue("valor_neto_total", '0');
      // setValue("esferico_desde", "");
      // setValue("esferico_hasta", "");
      // setValue("cilindrico_desde", "");
      // setValue("cilindrico_hasta", "");
      // setValue("valor_neto_cristal", "0");
      // setValue("diametro", "");
      // setValue("valor_neto_armazon", "0");
      // setValue("valor_neto_total", "0");
      // setValue("observaciones", "");
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
            : strEntidad.concat(": " + response.message);
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }

        if (response.mensaje.includes("Creado")) {
          toastSuccess(isEditting);
        }
        if (!blnKeep && !isEditting) {
          const result = await showModal(
            MODAL.keep,
            "",
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
          armazon_flexible.value = false;
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
        const toastLoading = toast.loading("Cargando...");
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading);
          armazon_flexible.value = false;
        } catch (error: any) {
          toast.dismiss(toastLoading);
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
      if (isEditting) {
        const totalNeto =
          data &&
          data[EnumGrid.valor_neto_cristal] + data[EnumGrid.valor_neto_armazon];
        setTotalNeto(totalNeto);
        setValue("valor_neto_total", totalNeto);
        if (data && data[EnumGrid.armazon_material_id] === 3) {
          armazon_flexible.value = true;
        }
      }
    }, []);

    useEffect(() => {
      const { valor_neto_cristal, valor_neto_armazon } = getValues();

      setTotalNeto(
        (parseInt(valor_neto_cristal) + parseInt(valor_neto_armazon)) as any
      );
      setValue("valor_neto_total", totalNeto as any);
    }, [totalNetoArmazones, totalNetoCristales]);

    // console.log(errors)

    // console.log(data && data[EnumGrid.valor_neto_total])
    // console.log(totalNeto)

    return (
      <div className="useFormContainer centered-div w-[67rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Proyecto"
                    name="proyecto"
                    showRefresh={true}
                    data={data && data[EnumGrid.proyecto]}
                    control={control}
                    entidad={["/api/proyectos/", "02"]}
                    error={errors.proyecto}
                    readOnly={isEditting}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="ID Grupo"
                    name="cod_grupo"
                    data={data && data[EnumGrid.cod_grupo]}
                    control={control}
                    error={errors.cod_grupo}
                    onlyRead={isEditting}
                    inputRef={firstInputRef}
                    customWidth={"labelInput inputStyles"}
                    textAlign="text-center"
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Descripción"
                    name="descripcion"
                    data={data && data[EnumGrid.descripcion]}
                    control={control}
                    error={errors.descripcion}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Marca"
                    name="marca"
                    showRefresh={true}
                    data={data && data[EnumGrid.marca_id]}
                    control={control}
                    entidad={["/api/marcas/", "02", "02"]}
                    error={errors.marca}
                    tabIndex={1}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Diseño"
                    name="diseno"
                    showRefresh={true}
                    data={data && data[EnumGrid.diseno_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesDisenos"]}
                    error={errors.diseno}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Índice"
                    name="indice"
                    showRefresh={true}
                    data={data && data[EnumGrid.indice_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesIndices"]}
                    error={errors.indice}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Material"
                    name="material"
                    showRefresh={true}
                    data={data && data[EnumGrid.material_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesMateriales"]}
                    error={errors.material}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Color"
                    name="color"
                    showRefresh={true}
                    data={data && data[EnumGrid.color_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesColores"]}
                    error={errors.color}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Tratamiento"
                    name="tratamiento"
                    showRefresh={true}
                    data={data && data[EnumGrid.tratamiento_id]}
                    control={control}
                    entidad={["/api/tipos/", "02", "CristalesTratamientos"]}
                    error={errors.tratamiento}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[20%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Diámetro"
                    name="diametro"
                    data={data && data[EnumGrid.diametro]}
                    control={control}
                    error={errors.diametro}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="ESF desde"
                    name="esferico_desde"
                    data={data && data[EnumGrid.esferico_desde]}
                    control={control}
                    error={errors.esferico_desde}
                    step={0.25}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="ESF hasta"
                    name="esferico_hasta"
                    data={data && data[EnumGrid.esferico_hasta]}
                    control={control}
                    error={errors.esferico_hasta}
                    step={0.25}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="CIL desde"
                    name="cilindrico_desde"
                    data={data && data[EnumGrid.cilindrico_desde]}
                    control={control}
                    error={errors.cilindrico_desde}
                    step={0.25}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="CIL hasta"
                    name="cilindrico_hasta"
                    data={data && data[EnumGrid.cilindrico_hasta]}
                    control={control}
                    error={errors.cilindrico_hasta}
                    step={0.25}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[20%] ">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="$ Venta Neto"
                    name="valor_neto_cristal"
                    data={data && data[EnumGrid.valor_neto_cristal]}
                    control={control}
                    error={errors.valor_neto_cristal}
                    isOptional={false}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                    handleChange={(e) => {
                      console.log(e);
                      setTotalNetoCristales(e);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center !mt-10">
              <h1 className="userFormLabel mx-auto">Armazón</h1>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm mx-auto">
                <div className="labelInputDiv">
                  <Controller
                    name="armazon_material"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        label="Armazón Flexible"
                        color="orange"
                        onChange={(e) => {
                          armazon_flexible.value = e.target.checked;
                        }}
                        defaultChecked={
                          data
                            ? data[EnumGrid.armazon_material_id] === 3
                              ? true
                              : false
                            : false
                        }
                      />
                    )}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[20%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="$ Neto Armazón"
                    name="valor_neto_armazon"
                    data={data && data[EnumGrid.valor_neto_armazon]}
                    control={control}
                    error={errors.valor_neto_armazon}
                    isOptional={false}
                    textAlign="text-right"
                    handleChange={(e) => {
                      setTotalNetoArmazones(e);
                    }}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[80%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.observaciones]}
                    control={control}
                    error={errors.observaciones}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[20%]">
                <div className="labelInputDiv">
                  <TextInputInteractive
                    type="number"
                    label="$ TOTAL NETO"
                    name="valor_neto_total"
                    data={
                      totalNeto || (data && data[EnumGrid.valor_neto_total])
                    }
                    control={control}
                    isOptional={false}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full !mt-5 !mb-5">
              <div className="w-[30%] mx-auto">
                {escritura_lectura && (
                  <Button
                    type="submit"
                    tabIndex={1}
                    className="userFormBtnSubmit"
                  >
                    {`${TITLES.guardar}`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FProyectosGrupos;
