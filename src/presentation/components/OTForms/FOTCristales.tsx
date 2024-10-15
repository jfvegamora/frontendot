import React, { useCallback } from "react";
import { SelectInputComponent, TextInputComponent } from "..";
import { EnumGrid } from "../../views/mantenedores/MOTHistorica";
import {
  validation_Cristal1_od,
  validation_Cristal1_od_color,
  validation_Cristal1_od_diametro,
  validation_Cristal1_od_diseño,
  validation_Cristal1_od_indice,
  validation_Cristal1_od_marca,
  validation_Cristal1_od_material,
  validation_Cristal1_od_tratamiento,
  validation_Cristal1_oi,
  validation_Cristal1_oi_color,
  validation_Cristal1_oi_diametro,
  validation_Cristal1_oi_diseño,
  validation_Cristal1_oi_indice,
  validation_Cristal1_oi_marca,
  validation_Cristal1_oi_material,
  validation_Cristal1_oi_tratamiento,
  validation_Cristal2_od,
  validation_Cristal2_od_color,
  validation_Cristal2_od_diametro,
  validation_Cristal2_od_diseño,
  validation_Cristal2_od_indice,
  validation_cristal2_od_marca,
  validation_Cristal2_od_material,
  validation_Cristal2_od_tratamiento,
  validation_Cristal2_oi,
  validation_Cristal2_oi_color,
  validation_Cristal2_oi_diametro,
  validation_Cristal2_oi_diseño,
  validation_Cristal2_oi_indice,
  validation_cristal2_oi_marca,
  validation_Cristal2_oi_material,
  validation_Cristal2_oi_tratamiento,
  validationOTlevel2,
  validationOTlevel3,
} from "../../utils/validationOT";
import SelectInputTiposComponent from "../forms/SelectInputTiposComponent";
import {
  A1_CR_OD,
  A1_CR_OI,
  A1_GRUPO_OD,
  A1_GRUPO_OI,
  A2_CR_OD,
  A2_CR_OI,
  A2_GRUPO_OD,
  A2_GRUPO_OI,
  codigoProyecto,
  EmpresaAdjudicadaOT_ID,
  inputOnlyReadBodegaProcesado,
  tipo_anteojo_title,
  tipo_anteojo_title_cristal2,
  tipo_de_anteojo,
  validacionIncompleta,
  validar_cristal1_od,
  validar_cristal1_oi,
  validar_cristal2_od,
  validar_cristal2_oi,
} from "../../utils";
import TextInputInteractive from "../forms/TextInputInteractive";
import { Checkbox } from "@material-tailwind/react";
import {
  CR1_OD_LAB,
  CR1_OI_LAB,
  CR2_OD_LAB,
  CR2_OI_LAB,
} from "../../utils/FOTCristales_utils";
import { toast } from "react-toastify";
import { disabledCristalDiseño } from "../../views/forms/FOT";
import { usePermissionAreasUsuario } from "../../hooks/usePermissionAreasUsuario";
// import { OTTextInputComponent } from '.';
// import { validationNivel3 } from '../../views/forms/FOT';
// import { AppStore, useAppSelector } from '../../../redux/store';

interface ICristales {
  control: any;
  onDataChange: any;
  formValues: any;
  formValuesCompleto?: any;
  data: any;
  onlyRead?: boolean;
  a2Grupo?: any;
  isEditting?: boolean;
  setValue?: any;
  permiso_usuario_cristales?: boolean;
  permiso_areas_cristales: boolean;
  permiso_areas_grupo_dioptria: boolean;
  permiso_usuario_grupo_dioptria: boolean;
  permiso_usuario_verificar_cristal: boolean;
  permiso_area_verificar_cristal: boolean;
}

const FOTCristales: React.FC<ICristales> = ({
  control,
  onDataChange,
  formValues,
  data,
  permiso_usuario_cristales,
  permiso_areas_cristales,
  permiso_areas_grupo_dioptria,
  permiso_usuario_grupo_dioptria,
  // permiso_usuario_verificar_cristal,
  // permiso_area_verificar_cristal,
  isEditting,
  setValue,
}) => {
  const [inputsRef] = React.useState({
    firstInputRef: React.useRef<HTMLInputElement>(null),
    lastInputRef: React.useRef<HTMLInputElement>(null),
  });
  const { permisoAreaUsuario } = usePermissionAreasUsuario();

  const handleInputChange = async (e: any) => {
    const { name, value } = e;

    if (name === "cristal1_tratamiento_adicional_od_id") {
      if (
        // (formValues && formValues["cristal1_marca_od_id"] !== "1") ||
        // (formValues && formValues["cristal1_indice_od_id"] !== "1") ||
        formValues &&
        formValues["cristal1_material_od_id"] !== "1"
        // (formValues && formValues["cristal1_color_od_id"] !== "1") ||
        // (formValues && formValues["cristal1_tratamiento_od_id"] !== "1") ||
        // (formValues && formValues["cristal1_diseno_od_id"] !== "1") ||
        // (formValues && formValues["cristal1_od_diametro"] !== "65")
      ) {
        toast.warning(
          "Tratamiento Adicional no compatible con opciones de Cristal, reiniciando opciones."
        );
        handleResetSelect("CR1");
      }
    }
    if (name !== "cristal1_tratamiento_adicional_id") {
      setValue("cristal1_tratamiento_adicional_id", "0");
    }

    if (name === "cristal2_tratamiento_adicional_id") {
      if (
        // (formValues && formValues["cristal2_marca_id"] !== "1") ||
        // (formValues && formValues["cristal2_indice_id"] !== "1") ||
        formValues &&
        formValues["cristal2_material_id"] !== "1"
        // (formValues && formValues["cristal2_color_id"] !== "1") ||
        // (formValues && formValues["cristal2_tratamiento_id"] !== "1") ||
        // (formValues && formValues["cristal2_diseno_id"] !== "1") ||
        // (formValues && formValues["cristal2_diametro"] !== "65")
      ) {
        toast.warning(
          "Tratamiento Adicional no compatible con opciones de Cristal, reiniciando opciones."
        );
        handleResetSelect("CR2");
      }
    }

    if (name !== "cristal2_tratamiento_adicional_id") {
      setValue("cristal2_tratamiento_adicional_id", "0");
    }

    onDataChange({ [name]: value.trim() });
    validationOTlevel2(name, value);
    validationOTlevel3(name, value);

    if (name === "validar_cristal1_od") {
      validar_cristal1_od.value = value.trim();
    }

    if (name === "validar_cristal1_oi") {
      validar_cristal1_oi.value = value.trim();
    }

    if (name === "validar_cristal2_od") {
      validar_cristal2_od.value = value.trim();
    }

    if (name === "validar_cristal2_oi") {
      validar_cristal2_oi.value = value.trim();
    }
  };

  const gruposDioptrias: any = {
    A1_GRUPO_OI: () => {
      return {
        label: "Grupo 1 OI",
        name: "cristal1_grupo1_oi",
        data: A1_GRUPO_OI.value,
      };
    },
    A1_GRUPO_OD: () => {
      return {
        label: "Grupo 1 OD",
        name: "cristal1_grupo1_od",
        data: A1_GRUPO_OD.value,
      };
    },
    A2_GRUPO_OI: () => {
      return {
        label: "Grupo 2 OI",
        name: "cristal2_grupo2_oi",
        data: A2_GRUPO_OI.value,
      };
    },
    A2_GRUPO_OD: () => {
      return {
        label: "Grupo 2 OD",
        name: "cristal2_grupo2_od",
        data: A2_GRUPO_OD.value,
      };
    },
  };

  const CodigosCristales: any = {
    A1_CR_OD: () => {
      return {
        name: "cristal1_od",
        label: "Código Cristal OD",
        className: "",
        data: A1_CR_OD.value,
      };
    },
    A1_CR_OI: () => {
      return {
        name: "cristal1_oI",
        label: "Código Cristal OI",
        className: "ml-5",
        data: A1_CR_OI.value,
      };
    },
    A2_CR_OD: () => {
      return {
        name: "cristal2_od",
        label: "Código cristal OD",
        className: "",
        data: A2_CR_OD.value,
      };
    },

    A2_CR_OI: () => {
      return {
        name: "cristal2_oi",
        label: "Código cristal OI",
        className: "ml-5",
        data: A2_CR_OI.value,
      };
    },
  };

  const renderInputCristal = useCallback(
    (cristal: string) => {
      const { label, name, data, className } = CodigosCristales[cristal]();

      return (
        <div className={`!w-[48%] !pr-[1rem]  !translate-y-4 ${className}`}>
          <TextInputInteractive
            type="text"
            label={label}
            name={name}
            isOT={true}
            handleChange={handleInputChange}
            data={data}
            control={control}
            // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
            onlyRead={true}
            textAlign="text-center"
            className={` custom-input !w-[15rem]  ${
              validacionIncompleta.value.a1_oi === true
                ? "!bg-red-600 opacity-60"
                : ""
            } `}
            customWidth={"labelInputx2 inputStyles"}
          />
        </div>
      );
    },
    [A1_CR_OD.value, A1_CR_OI.value]
  );

  const renderGrupo1 = (grupo: string) => {
    const { label, name, data } = gruposDioptrias[grupo]();

    return (
      <div className="w-[21vw]">
        <div className="">
          <TextInputInteractive
            type="text"
            label={label}
            name={name}
            data={data}
            control={control}
            // onlyRead={!(permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)}
            onlyRead={true}
            // onlyRead={ name === 'cristal2_grupo2_oi' || name === 'cristal2_grupo2_od' ? (!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3' ))) : !(isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)  }
            textAlign="text-center"
            className="!text-base custom-input !w-[15rem]"
            customWidth={"labelInput inputStyles"}
          />
        </div>
      </div>
    );
  };

  // const renderCristales = (grupo:string) =>{

  // }

  const handleKeyDown: any = React.useCallback(
    (e: KeyboardEvent) => {
      const focusedElement = document.activeElement;
      if (focusedElement instanceof HTMLInputElement) {
        const inputName = focusedElement.name;
        const inputRefName =
          tipo_de_anteojo.value === "3"
            ? "cristal2_tratamiento_adicional_id"
            : "cristal1_tratamiento_adicional_id";

        if (inputName === inputRefName && e.key === "Tab") {
          inputsRef.firstInputRef.current?.focus();
        }
      }
    },
    [inputsRef]
  );

  React.useEffect(() => {
    if (inputsRef.firstInputRef) {
      inputsRef.firstInputRef.current?.focus();
    }

    const {
      cristal1_marca_od_id,
      cristal1_marca_oi_id,
      cristal1_indice_od_id,
      cristal1_indice_oi_id,
      cristal1_material_od_id,
      cristal1_material_oi_id,
      cristal1_color_od_id,
      cristal1_color_oi_id,
      cristal1_tratamiento_od_id,
      cristal1_tratamiento_oi_id,
      cristal1_diseno_od_id,
      cristal1_diseno_oi_id,
      cristal1_od_diametro,
      cristal1_oi_diametro,
    } = formValues;

    validation_Cristal1_od_marca(cristal1_marca_od_id);
    validation_Cristal1_oi_marca(cristal1_marca_oi_id);
    validation_Cristal1_od_indice(cristal1_indice_od_id);
    validation_Cristal1_oi_indice(cristal1_indice_oi_id);
    validation_Cristal1_od_material(cristal1_material_od_id);
    validation_Cristal1_oi_material(cristal1_material_oi_id);
    validation_Cristal1_od_color(cristal1_color_od_id);
    validation_Cristal1_oi_color(cristal1_color_oi_id);
    validation_Cristal1_od_tratamiento(cristal1_tratamiento_od_id);
    validation_Cristal1_oi_tratamiento(cristal1_tratamiento_oi_id);
    validation_Cristal1_od_diseño(cristal1_diseno_od_id);
    validation_Cristal1_oi_diseño(cristal1_diseno_oi_id);
    validation_Cristal1_od_diametro(cristal1_od_diametro);
    validation_Cristal1_oi_diametro(cristal1_oi_diametro);

    if (tipo_de_anteojo.value === "3") {
      const {
        cristal2_marca_od_id,
        cristal2_marca_oi_id,
        cristal2_indice_od_id,
        cristal2_indice_oi_id,
        cristal2_material_od_id,
        cristal2_material_oi_id,
        cristal2_color_od_id,
        cristal2_color_oi_id,
        cristal2_tratamiento_od_id,
        cristal2_tratamiento_oi_id,
        cristal2_diseno_od_id,
        cristal2_diseno_oi_id,
        cristal2_od_diametro,
        cristal2_oi_diametro,
      } = formValues;

      validation_cristal2_od_marca(cristal2_marca_od_id);
      validation_cristal2_oi_marca(cristal2_marca_oi_id);
      validation_Cristal2_od_indice(cristal2_indice_od_id);
      validation_Cristal2_oi_indice(cristal2_indice_oi_id);
      validation_Cristal2_od_material(cristal2_material_od_id);
      validation_Cristal2_oi_material(cristal2_material_oi_id);
      validation_Cristal2_od_color(cristal2_color_od_id);
      validation_Cristal2_oi_color(cristal2_color_oi_id);
      validation_Cristal2_od_tratamiento(cristal2_tratamiento_od_id);
      validation_Cristal2_oi_tratamiento(cristal2_tratamiento_oi_id);
      validation_Cristal2_od_diseño(cristal2_diseno_od_id);
      validation_Cristal2_oi_diseño(cristal2_diseno_oi_id);
      validation_Cristal2_od_diametro(cristal2_od_diametro);
      validation_Cristal2_oi_diametro(cristal2_oi_diametro);
    }
  }, []);

  const handleCR1_OD_LABChange = (event: any) => {
    const { checked } = event;
    if (checked === true) {
      A1_CR_OD.value = "";
      A1_GRUPO_OD.value = "";
      validation_Cristal1_od("32");
    }

    CR1_OD_LAB.value = checked;
  };
  const handleCR2_OD_LABChange = (event: any) => {
    const { checked } = event;
    if (checked === true) {
      A2_CR_OD.value = "";
      A2_GRUPO_OD.value = "";
      validation_Cristal2_od("32");
    }

    CR2_OD_LAB.value = checked;
  };
  const handleCR2_OI_LABChange = (event: any) => {
    const { checked } = event;
    if (checked === true) {
      A2_CR_OI.value = "";
      A2_GRUPO_OI.value = "";
      validation_Cristal2_oi("32");
    }

    CR2_OI_LAB.value = checked;
  };

  const handleCR1_OI_LABChange = (event: any) => {
    const { checked } = event;
    if (checked === true) {
      A1_CR_OI.value = "";
      A1_GRUPO_OI.value = "";
      validation_Cristal1_oi("32");
    }
    CR1_OI_LAB.value = checked;
  };

  React.useEffect(() => {
    console.log("render");
    if (CR1_OD_LAB.value === true && CR1_OI_LAB.value === true) {
      // validatePestañaCristales()
      validation_Cristal1_od_marca("32");
      validation_Cristal1_oi_marca("32");
      validation_Cristal1_od_diseño("32");
      validation_Cristal1_oi_diseño("32");
      validation_Cristal1_od_indice("32");
      validation_Cristal1_oi_indice("32");
      validation_Cristal1_od_material("32");
      validation_Cristal1_oi_material("32");
      validation_Cristal1_od_tratamiento("32");
      validation_Cristal1_oi_tratamiento("32");
      validation_Cristal1_od_color("32");
      validation_Cristal1_oi_color("32");
      validation_Cristal1_od_diametro("32");
      validation_Cristal1_oi_diametro("32");
      validation_Cristal1_od("32");
      validation_Cristal1_oi("32");
    }

    if (CR2_OD_LAB.value === true && CR2_OI_LAB.value === true) {
      if (tipo_de_anteojo.value === "3") {
        validation_cristal2_od_marca("32");
        validation_cristal2_oi_marca("32");
        validation_Cristal2_od_diseño("32");
        validation_Cristal2_oi_diseño("32");
        validation_Cristal2_od_indice("32");
        validation_Cristal2_oi_indice("32");
        validation_Cristal2_od_material("32");
        validation_Cristal2_oi_material("32");
        validation_Cristal2_od_tratamiento("32");
        validation_Cristal2_oi_tratamiento("32");
        validation_Cristal2_od_color("32");
        validation_Cristal2_oi_color("32");
        validation_Cristal2_od_diametro("32");
        validation_Cristal2_oi_diametro("32");
        validation_Cristal2_od("32");
        validation_Cristal2_oi("32");
      }
    }

    onDataChange({ [""]: "" });
  }, [CR1_OD_LAB.value, CR1_OI_LAB.value, CR2_OD_LAB.value, CR2_OI_LAB.value]);

  const checkDisabled = !(
    (!isEditting &&
      (EmpresaAdjudicadaOT_ID.value === 3 ||
        EmpresaAdjudicadaOT_ID.value === 2)) ||
    (isEditting &&
      permiso_usuario_cristales &&
      permiso_areas_cristales &&
      (EmpresaAdjudicadaOT_ID.value === 3 ||
        EmpresaAdjudicadaOT_ID.value === 2))
  );

  const handleResetSelect = useCallback((anteojo: string) => {
    console.log("render");
    if (anteojo === "CR1") {
      // setValue("cristal1_marca_od_id", "1");
      // setValue("cristal1_marca_oi_id", "1");
      // setValue("cristal1_indice_od_id", "1");
      // setValue("cristal1_indice_oi_id", "1");
      setValue("cristal1_material_od_id", "1");
      setValue("cristal1_material_oi_id", "1");
      // setValue("cristal1_color_od_id", "1");
      // setValue("cristal1_color_oi_id", "1");
      // setValue("cristal1_tratamiento_od_id", "1");
      // setValue("cristal1_tratamiento_oi_id", "1");
      // setValue("cristal1_diseno_od_id", "1");
      // setValue("cristal1_diseno_oi_id", "1");
      // setValue("cristal1_od_diametro", "65");
      // setValue("cristal1_oi_diametro", "65");
    } else {
      // setValue("cristal2_marca_od_id", "1");
      // setValue("cristal2_marca_oi_id", "1");
      // setValue("cristal2_indice_od_id", "1");
      // setValue("cristal2_indice_oi_id", "1");
      setValue("cristal2_material_od_id", "1");
      setValue("cristal2_material_oi_id", "1");
      // setValue("cristal2_color_od_id", "1");
      // setValue("cristal2_color_oi_id", "1");
      // setValue("cristal2_tratamiento_od_id", "1");
      // setValue("cristal2_tratamiento_oi_id", "1");
      // setValue("cristal2_diseno_od_id", "1");
      // setValue("cristal2_diseno_oi_id", "1");
      // setValue("cristal2_od_diametro", "65");
      // setValue("cristal2_oi_diametro", "65");
    }
  }, []);

  console.log(
    !isEditting ||
      (permisoAreaUsuario
        ? permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria
        : false)
  );

  console.log(permisoAreaUsuario);
  console.log(permiso_areas_grupo_dioptria);
  console.log(permiso_usuario_grupo_dioptria);

  return (
    <form onKeyDown={handleKeyDown}>
      <div className="flex frameOTForm h-[85vh] ">
        <div
          className={`${
            tipo_de_anteojo.value !== "3" ? "translate-x-[20vw]" : ""
          }    w-[48vw] relative !mt-[2.5rem] !h-[80vh] `}
        >
          <div
            className={` ${
              tipo_de_anteojo.value === 3 ? "w-[52vw]" : "w-[48vw]"
            } flex items-center radioComponent   h-[75vh]  !ml-[1rem] overflow-hidden`}
          >
            <div className="mx-auto !mt-6 w-[45vw] !h-full ">
              <h1
                className={`absolute z-10 top-[-6%] text-3xl font-bold ${
                  tipo_de_anteojo.value !== "3"
                    ? "w-[30vw] translate-x-[-8vw]"
                    : "w-[20vw] translate-x-[2vw]"
                }   text-center !text-[#f8b179] left-[34%] `}
              >
                ANTEOJO {tipo_anteojo_title.value.toUpperCase()}
              </h1>
              <div className="w-full">
                <div className="w-full flex !-mt-4   rowForm justify-center ">
                  {
                    <div className="rowForm">
                      <div className="  z-20 flex items-center justify-between   w-[43vw]  text-[1.5vw] ">
                        <div className=" items-center flex inputStyles">
                          <Checkbox
                            label="Laboratorio"
                            color="orange"
                            onChange={(e) => handleCR1_OD_LABChange(e.target)}
                            checked={CR1_OD_LAB.value}
                            disabled={checkDisabled}
                          />
                        </div>

                        <div className=" items-center flex inputStyles !mr-10">
                          {/* <Checkbox label='LAB' color="orange" onChange={(e)=>handleCR1_OD_LABChange(e.target)} checked={ CR1_OD_LAB.value} /> */}
                          <Checkbox
                            label="Laboratorio"
                            color="orange"
                            onChange={(e) => handleCR1_OI_LABChange(e.target)}
                            checked={CR1_OI_LAB.value}
                            disabled={checkDisabled}
                          />
                          {/* <label className='labelInput'>LAB</label> */}
                        </div>
                      </div>
                    </div>
                  }
                </div>

                <div className="w-full flex mt-6 rowForm justify-center ">
                  <div className="w-[50%] flex mx-4">
                    <div className=" w-full  my-2 labelInput   ">
                      <SelectInputComponent
                        label="Marca"
                        name="cristal1_marca_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_marca_od_id"]
                            ? formValues["cristal1_marca_od_id"]
                            : data && data[EnumGrid.cristal1_od_marca_id]
                        }
                        control={control}
                        entidad={["/api/marcas/", "02", "2"]}
                        // error={errors.establecimiento}

                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        inputRef={inputsRef.firstInputRef}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                      />
                    </div>
                    <div className=" w-full my-2 ">
                      <SelectInputTiposComponent
                        label="Diseño"
                        name="cristal1_diseno_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_diseno_od_id"]
                            ? formValues["cristal1_diseno_od_id"]
                            : data && data[EnumGrid.cristal1_od_diseno_id]
                        }
                        entidad={"CristalesDisenos"}
                        control={control}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || disabledCristalDiseño.value
                        }
                        customWidth={"labelInput inputStyles"}
                      />
                    </div>
                  </div>

                  <div className="w-[50%] flex">
                    <div className=" w-full my-2 labelInput    ">
                      <SelectInputComponent
                        label="Marca"
                        name="cristal1_marca_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_marca_oi_id"]
                            ? formValues["cristal1_marca_oi_id"]
                            : data && data[EnumGrid.cristal1_oi_marca_id]
                        }
                        control={control}
                        entidad={["/api/marcas/", "02", "2"]}
                        // error={errors.establecimiento}

                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        inputRef={inputsRef.firstInputRef}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                      />
                    </div>

                    <div className=" w-full  my-2  ">
                      <SelectInputTiposComponent
                        label="Diseño"
                        name="cristal1_diseno_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_diseno_oi_id"]
                            ? formValues["cristal1_diseno_oi_id"]
                            : data && data[EnumGrid.cristal1_oi_diseno_id]
                        }
                        entidad={"CristalesDisenos"}
                        control={control}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || disabledCristalDiseño.value
                        }
                        customWidth={"labelInput inputStyles"}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center rowForm  ">
                  <div className="w-[50%] flex mx-4">
                    <div className=" w-full my-2  labelInput">
                      <SelectInputTiposComponent
                        label="Índice"
                        name="cristal1_indice_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_indice_od_id"]
                            ? formValues["cristal1_indice_od_id"]
                            : data && data[EnumGrid.cristal1_od_indice_id]
                        }
                        control={control}
                        entidad={"CristalesIndices"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                      />
                    </div>
                    <div className="w-full my-2 ">
                      <SelectInputTiposComponent
                        label="Material"
                        name="cristal1_material_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          isEditting
                            ? data && data[EnumGrid.cristal1_od_material_id]
                            : formValues &&
                              formValues["cristal1_material_od_id"]
                        }
                        control={control}
                        entidad={"CristalesMateriales"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>
                  </div>

                  <div className="w-[50%] flex ">
                    <div className=" w-full my-2 labelInput">
                      <SelectInputTiposComponent
                        label="Índice"
                        name="cristal1_indice_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_indice_oi_id"]
                            ? formValues["cristal1_indice_oi_id"]
                            : data && data[EnumGrid.cristal1_oi_indice_id]
                        }
                        control={control}
                        entidad={"CristalesIndices"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                      />
                    </div>

                    <div className="w-full my-2 ">
                      <SelectInputTiposComponent
                        label="Material"
                        name="cristal1_material_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          isEditting
                            ? data && data[EnumGrid.cristal1_oi_material_id]
                            : formValues &&
                              formValues["cristal1_material_oi_id"]
                        }
                        control={control}
                        entidad={"CristalesMateriales"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex mt-6 rowForm justify-center">
                  <div className="w-[50%] flex mx-4">
                    <div className=" w-full my-2 ">
                      <SelectInputTiposComponent
                        label="Color"
                        name="cristal1_color_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_color_od_id"]
                            ? formValues["cristal1_color_od_id"]
                            : data && data[EnumGrid.cristal1_od_color_id]
                        }
                        control={control}
                        entidad={"CristalesColores"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>

                    <div className=" w-full my-2">
                      <SelectInputTiposComponent
                        label="Tratamiento"
                        name="cristal1_tratamiento_od_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_tratamiento_od_id"]
                            ? formValues["cristal1_tratamiento_od_id"]
                            : data && data[EnumGrid.cristal1_od_tratamiento_id]
                        }
                        control={control}
                        entidad={"CristalesTratamientos"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>
                  </div>

                  <div className="w-[50%] flex">
                    <div className=" w-full my-2 ">
                      <SelectInputTiposComponent
                        label="Color"
                        name="cristal1_color_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_color_oi_id"]
                            ? formValues["cristal1_color_oi_id"]
                            : data && data[EnumGrid.cristal1_oi_color_id]
                        }
                        control={control}
                        entidad={"CristalesColores"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>

                    <div className=" w-full my-2">
                      <SelectInputTiposComponent
                        label="Tratamiento"
                        name="cristal1_tratamiento_oi_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues && formValues["cristal1_tratamiento_oi_id"]
                            ? formValues["cristal1_tratamiento_oi_id"]
                            : data && data[EnumGrid.cristal1_oi_tratamiento_id]
                        }
                        control={control}
                        entidad={"CristalesTratamientos"}
                        customWidth={"labelInput inputStyles"}
                        labelProps={" bg-wite"}
                        readOnly={
                          !(
                            !isEditting ||
                            (permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full  flex mt-6 rowForm  justify-around  relative">
                  <div className="w-[20%] mr-2 ">
                    <TextInputComponent
                      control={control}
                      type="number"
                      label="Diámetro"
                      name="cristal1_od_diametro"
                      handleChange={handleInputChange}
                      isOT={true}
                      data={
                        isEditting
                          ? data && data[EnumGrid.cristal1_od_diametro]
                          : formValues["cristal1_od_diametro"]
                      }
                      onlyRead={
                        !(
                          !isEditting ||
                          (permisoAreaUsuario
                            ? permiso_areas_grupo_dioptria &&
                              permiso_usuario_grupo_dioptria
                            : false)
                        ) || inputOnlyReadBodegaProcesado.value
                      } // error={errors.fecha_nacimiento}
                      textAlign="text-center"
                      customWidth={"labelInput inputStyles"}
                    />
                  </div>
                  <div className="w-[20%] mr-2 ">
                    <TextInputComponent
                      control={control}
                      type="number"
                      label="Diámetro"
                      name="cristal1_oi_diametro"
                      handleChange={handleInputChange}
                      isOT={true}
                      data={
                        isEditting
                          ? data && data[EnumGrid.cristal1_oi_diametro]
                          : formValues["cristal1_oi_diametro"]
                      }
                      onlyRead={
                        !(
                          !isEditting ||
                          (permisoAreaUsuario
                            ? permiso_areas_grupo_dioptria &&
                              permiso_usuario_grupo_dioptria
                            : false)
                        ) || inputOnlyReadBodegaProcesado.value
                      } // error={errors.fecha_nacimiento}
                      textAlign="text-center"
                      customWidth={"labelInput inputStyles"}
                    />
                  </div>
                  {/* {permiso_area_verificar_cristal && (
                                        <div className="w-[40%] absolute right-0">
                                            <OTTextInputComponent
                                                type="text"
                                                label="Validar Codigo Cristal OI"
                                                name="validar_cristal1_oi"
                                                handleChange={handleInputChange}
                                                otData={ validar_cristal1_oi.value ? validar_cristal1_oi.value  : formValues && formValues["validar_cristal1_oi"]}
                                                control={control}
                                                // isOT={true}
                                                onlyRead={!(permiso_usuario_verificar_cristal)}
                                                // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                textAlign="text-center"
                                                className='!text-xl custom-input !w-[12rem]'
                                            />

                                        </div>

                                    )} */}
                </div>

                <div className="w-full flex mt-6 rowForm ">
                  {/* <div className="!w-[47%] !pr-[1rem] !translate-y-4">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OD"
                                            name="cristal1_od"
                                            handleChange={handleInputChange}
                                            data={A1_CR_OD.value || data && data[EnumGrid.cristal1_od]}
                                            control={control}
                                            isOT={true}
                                            // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            onlyRead={true}
                                            // onlyRead={!(!isEditting || (permiso_areas_cristales && permiso_usuario_cristales))  || inputOnlyReadBodegaProcesado.value}
                                            textAlign="text-center"
                                            className={`!text-xl custom-input !w-[16rem]  ${validacionIncompleta.value.a1_od === true ? "!bg-red-600 opacity-60" : ""} `}
                                            error={true}
                                            customWidth={"labelInputx2 inputStyles"}
                                        />
                                    </div> */}

                  {/* <div className="!w-[48%] !pr-[1rem] ml-1 !translate-y-4">
                                        <TextInputInteractive
                                            type="text"
                                            label="Código Cristal OI"
                                            name="cristal1_oi"
                                            isOT={true}
                                            handleChange={handleInputChange}
                                            data={A1_CR_OI.value || data && data[EnumGrid.cristal1_oi]}
                                            control={control}
                                            // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                            onlyRead={true}
                                            textAlign="text-center"
                                            className={` custom-input !w-[15rem]  ${validacionIncompleta.value.a1_oi === true ? "!bg-red-600 opacity-60" : ""} `}
                                            customWidth={"labelInputx2 inputStyles"}
                                        />
                                    </div> */}

                  {renderInputCristal("A1_CR_OD")}
                  {renderInputCristal("A1_CR_OI")}
                </div>

                <div className="w-full flex mt-6 rowForm translate-y-10 ">
                  <div className="!w-[50%] !pr-[1rem]">
                    {renderGrupo1("A1_GRUPO_OD")}
                  </div>
                  <div className="!w-[50%] !pr-[1rem] ml-4">
                    {renderGrupo1("A1_GRUPO_OI")}
                  </div>
                </div>

                <div className="w-full flex mt-6 rowForm   ">
                  <div className="w-full translate-y-20 translate-x-4">
                    <SelectInputComponent
                      label="Tratamiento adicional"
                      name="cristal1_tratamiento_adicional_id"
                      showRefresh={true}
                      isOT={true}
                      handleSelectChange={handleInputChange}
                      data={
                        formValues &&
                        formValues["cristal1_tratamiento_adicional_id"]
                          ? formValues["cristal1_tratamiento_adicional_id"]
                          : data &&
                            data[EnumGrid.cristal1_tratamiento_adicional_id]
                      }
                      control={control}
                      entidad={[
                        "/api/proyectotratamadic/",
                        "02",
                        codigoProyecto.value,
                      ]}
                      readOnly={
                        !(
                          !isEditting ||
                          (permisoAreaUsuario
                            ? permiso_areas_grupo_dioptria &&
                              permiso_usuario_grupo_dioptria
                            : false)
                        ) || inputOnlyReadBodegaProcesado.value
                      }
                      isOptional={true}
                      inputRef={
                        tipo_de_anteojo.value === "3"
                          ? null
                          : inputsRef.lastInputRef
                      }
                      customWidth={"labelInput inputStyles"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {tipo_de_anteojo.value === "3" && (
          <div className=" w-[48vw] relative !mt-[2.5rem] !h-[80vh] ml-8 ">
            <div className=" flex items-center ml-2  radioComponent  h-[75vh] !mr-[1rem]">
              <div className="mx-auto !mt-6 !h-full w-[50vw]">
                {/* <h1 className='absolute z-10 top-[-6%] left-[35%] text-3xl font-bold w-[30%] text-center !text-[#f8b179]'>ANTEOJO 2</h1> */}
                <h1
                  className={`absolute z-10 top-[-6%] text-3xl font-bold  w-[30vw] translate-x-[-8vw]  text-center !text-[#f8b179] left-[34%] `}
                >
                  ANTEOJO {tipo_anteojo_title_cristal2.value.toUpperCase()}
                </h1>
                <div className="w-[45vw] !-mt-4 !ml-[1rem]">
                  <div className="w-full flex !-mt-4   rowForm justify-center ">
                    {
                      <div className="rowForm">
                        <div className="  z-20 flex items-center justify-between   w-[43vw]  text-[1.5vw] ">
                          <div className=" items-center flex inputStyles mt-2">
                            <Checkbox
                              label="Laboratorio"
                              color="orange"
                              onChange={(e) => handleCR2_OD_LABChange(e.target)}
                              checked={CR2_OD_LAB.value}
                              disabled={checkDisabled}
                            />
                          </div>

                          <div className=" items-center flex inputStyles">
                            {/* <Checkbox label='LAB' color="orange" onChange={(e)=>handleCR1_OD_LABChange(e.target)} checked={ CR1_OD_LAB.value} /> */}
                            <Checkbox
                              label="Laboratorio"
                              color="orange"
                              onChange={(e) => handleCR2_OI_LABChange(e.target)}
                              checked={CR2_OI_LAB.value}
                              disabled={checkDisabled}
                            />
                            {/* <label className='labelInput'>LAB</label> */}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                  <div className=" flex -mt-1 rowForm  justify-center">
                    <div className="w-[50%] flex mx-4">
                      <div className=" w-full my-2 labelInput">
                        <SelectInputComponent
                          label="Marca"
                          name="cristal2_marca_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_marca_od_id"]
                              ? formValues["cristal2_marca_od_id"]
                              : data && data[EnumGrid.cristal2_od_marca_id]
                          }
                          control={control}
                          entidad={["/api/marcas/", "02", "2"]}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                          isFOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                        />
                      </div>
                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Diseño"
                          name="cristal2_diseno_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_diseno_od_id"]
                              ? formValues["cristal2_diseno_od_id"]
                              : data && data[EnumGrid.cristal2_od_diseno_id]
                          }
                          control={control}
                          entidad={"CristalesDisenos"}
                          FOTcristales={true}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || disabledCristalDiseño.value
                          }
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                        />
                      </div>
                    </div>
                    <div className="w-[50%] flex">
                      <div className=" w-full my-2 labelInput">
                        <SelectInputComponent
                          label="Marca"
                          name="cristal2_marca_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_marca_oi_id"]
                              ? formValues["cristal2_marca_oi_id"]
                              : data && data[EnumGrid.cristal2_oi_marca_id]
                          }
                          control={control}
                          entidad={["/api/marcas/", "02", "2"]}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                          isFOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                        />
                      </div>
                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Diseño"
                          name="cristal2_diseno_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_diseno_oi_id"]
                              ? formValues["cristal2_diseno_oi_id"]
                              : data && data[EnumGrid.cristal2_oi_diseno_id]
                          }
                          control={control}
                          entidad={"CristalesDisenos"}
                          FOTcristales={true}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || disabledCristalDiseño.value
                          }
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full justify-center flex mt-6 rowForm">
                    <div className="flex w-[50%] mx-4">
                      <div className=" w-full my-2">
                        <SelectInputTiposComponent
                          label="Índice"
                          name="cristal2_indice_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_indice_od_id"]
                              ? formValues["cristal2_indice_od_id"]
                              : data && data[EnumGrid.cristal2_od_indice_id]
                          }
                          control={control}
                          entidad={"CristalesIndices"}
                          FOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>

                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Material"
                          name="cristal2_material_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_material_od_id"]
                              ? formValues["cristal2_material_od_id"]
                              : data && data[EnumGrid.cristal2_od_material_id]
                          }
                          control={control}
                          FOTcristales={true}
                          entidad={"CristalesMateriales"}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>
                    </div>
                    <div className="flex w-[50%]">
                      <div className=" w-full my-2">
                        <SelectInputTiposComponent
                          label="Índice"
                          name="cristal2_indice_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_indice_oi_id"]
                              ? formValues["cristal2_indice_oi_id"]
                              : data && data[EnumGrid.cristal2_oi_indice_id]
                          }
                          control={control}
                          entidad={"CristalesIndices"}
                          FOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>

                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Material"
                          name="cristal2_material_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_material_oi_id"]
                              ? formValues["cristal2_material_oi_id"]
                              : data && data[EnumGrid.cristal2_oi_material_id]
                          }
                          control={control}
                          FOTcristales={true}
                          entidad={"CristalesMateriales"}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full justify-center flex mt-6 rowForm">
                    <div className="w-[50%] flex mx-4">
                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Color"
                          name="cristal2_color_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_color_od_id"]
                              ? formValues["cristal2_color_od_id"]
                              : data && data[EnumGrid.cristal2_od_color_id]
                          }
                          control={control}
                          FOTcristales={true}
                          entidad={"CristalesColores"}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>

                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Tratamiento"
                          name="cristal2_tratamiento_od_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues &&
                            formValues["cristal2_tratamiento_od_id"]
                              ? formValues["cristal2_tratamiento_od_id"]
                              : data &&
                                data[EnumGrid.cristal2_od_tratamiento_id]
                          }
                          control={control}
                          entidad={"CristalesTratamientos"}
                          FOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>
                    </div>
                    <div className="w-[50%] flex">
                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Color"
                          name="cristal2_color_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues && formValues["cristal2_color_oi_id"]
                              ? formValues["cristal2_color_oi_id"]
                              : data && data[EnumGrid.cristal2_oi_color_id]
                          }
                          control={control}
                          FOTcristales={true}
                          entidad={"CristalesColores"}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>

                      <div className="w-full my-2">
                        <SelectInputTiposComponent
                          label="Tratamiento"
                          name="cristal2_tratamiento_oi_id"
                          showRefresh={true}
                          isOT={true}
                          handleSelectChange={handleInputChange}
                          data={
                            formValues &&
                            formValues["cristal2_tratamiento_oi_id"]
                              ? formValues["cristal2_tratamiento_oi_id"]
                              : data &&
                                data[EnumGrid.cristal2_oi_tratamiento_id]
                          }
                          control={control}
                          entidad={"CristalesTratamientos"}
                          FOTcristales={true}
                          customWidth={"labelInput inputStyles"}
                          labelProps={" bg-wite"}
                          readOnly={
                            !(
                              (!isEditting && tipo_de_anteojo.value === "3") ||
                              (isEditting && permisoAreaUsuario
                                ? permiso_areas_grupo_dioptria &&
                                  permiso_usuario_grupo_dioptria &&
                                  tipo_de_anteojo.value === "3"
                                : false)
                            ) || inputOnlyReadBodegaProcesado.value
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex mt-6 rowForm justify-around relative">
                    <div className="w-[20%] mr-2 ">
                      <TextInputComponent
                        type="number"
                        label="Diámetro"
                        name="cristal2_od_diametro"
                        handleChange={handleInputChange}
                        data={
                          formValues && formValues["cristal2_diametro"]
                            ? formValues["cristal2_diametro"]
                            : data && data[EnumGrid.cristal2_od_diametro]
                        }
                        control={control}
                        isOT={true}
                        onlyRead={
                          !(
                            (!isEditting && tipo_de_anteojo.value === "3") ||
                            (isEditting && permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria &&
                                tipo_de_anteojo.value === "3"
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        textAlign="text-center"
                        customWidth={"labelInput inputStyles"}
                      />
                    </div>
                    <div className="w-[20%] mr-2 ">
                      <TextInputComponent
                        type="number"
                        label="Diámetro"
                        name="cristal2_oi_diametro"
                        handleChange={handleInputChange}
                        data={
                          formValues && formValues["cristal2_diametro"]
                            ? formValues["cristal2_diametro"]
                            : data && data[EnumGrid.cristal2_oi_diametro]
                        }
                        control={control}
                        isOT={true}
                        onlyRead={
                          !(
                            (!isEditting && tipo_de_anteojo.value === "3") ||
                            (isEditting && permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria &&
                                tipo_de_anteojo.value === "3"
                              : false)
                          ) || inputOnlyReadBodegaProcesado.value
                        }
                        textAlign="text-center"
                        customWidth={"labelInput inputStyles"}
                      />
                    </div>

                    {/* {permiso_area_verificar_cristal && (tipo_de_anteojo.value === '3' as any) && (
                                             <div className="w-[40%] absolute right-0">
                                                 <OTTextInputComponent
                                                     type="text"
                                                     label="Validar Codigo Cristal OI"
                                                     name="validar_cristal2_oi"
                                                     handleChange={handleInputChange}
                                                     otData={ validar_cristal2_oi.value ? validar_cristal2_oi.value : formValues && formValues["validar_cristal2_oi"]}
                                                     control={control}
                                                     // isOT={true}
                                                     onlyRead={!(permiso_usuario_verificar_cristal)}
                                                     // onlyRead={!(isEditting && (permiso_areas_cristales && permiso_usuario_cristales))}
                                                     textAlign="text-center"
                                                     className='!text-xl custom-input !w-[12rem]'
                                                 />
     
                                             </div>
     
                                         )} */}
                  </div>

                  <div className="w-full flex mt-6 rowForm ">
                    {/* <div className="!w-[50%] !pr-[1rem] !translate-y-4">
                      <TextInputInteractive
                        type="text"
                        label="Código Cristal OD"
                        name="cristal2_od"
                        handleChange={handleInputChange}
                        data={
                          A2_CR_OD.value || (data && data[EnumGrid.cristal2_od])
                        }
                        control={control}
                        isOT={true}
                        // onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                        onlyRead={true}
                        textAlign="text-center"
                        className={`!text-xl custom-input !w-[17rem]  ${
                          validacionIncompleta.value.a2_od === true
                            ? "!bg-red-600 opacity-60"
                            : ""
                        } `}
                        customWidth={"labelInputx2 inputStyles"}
                      />
                    </div> */}

                    {/* <div className="!w-[49%] !pr-[1rem] !ml-[-1rem] !translate-y-4">
                      <TextInputInteractive
                        type="text"
                        label="Código Cristal OI"
                        name="cristal2_oi"
                        handleChange={handleInputChange}
                        data={
                            A2_CR_OI.value || (data && data[EnumGrid.cristal2_oi])
                        }
                        control={control}
                        isOT={true}
                        // onlyRead={!((isEditting && tipo_de_anteojo.value === '3') && (isEditting && permiso_areas_cristales && permiso_usuario_cristales && tipo_de_anteojo.value === '3'))}
                        onlyRead={true}
                        textAlign="text-center"
                        className={`!text-xl custom-input !w-[17rem]  ${
                          validacionIncompleta.value.a2_oi === true
                            ? "!bg-red-600 opacity-60"
                            : ""
                        } `}
                        customWidth={"labelInputx2 inputStyles"}
                      />
                    </div> */}
                    {renderInputCristal("A2_CR_OD")}
                    {renderInputCristal("A2_CR_OI")}
                  </div>

                  <div className="w-full flex mt-6 rowForm  !translate-y-10">
                    <div className="!w-[50%] !pr-[1rem]">
                      {renderGrupo1("A2_GRUPO_OD")}
                    </div>
                    <div className="!w-[50%] !pr-[1rem] ml-4">
                      {renderGrupo1("A2_GRUPO_OI")}
                    </div>
                  </div>

                  <div className="w-full flex mt-6 rowForm ">
                    <div className="w-full  translate-y-20 translate-x-4">
                      <SelectInputComponent
                        label="Tratamiento adicional"
                        name="cristal2_tratamiento_adicional_id"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={
                          formValues &&
                          formValues["cristal2_tratamiento_adicional_id"]
                            ? formValues["cristal2_tratamiento_adicional_id"]
                            : data &&
                              data[EnumGrid.cristal2_tratamiento_adicional_id]
                        }
                        control={control}
                        entidad={[
                          "/api/proyectotratamadic/",
                          "02",
                          codigoProyecto.value,
                        ]}
                        readOnly={
                          !(
                            (!isEditting && tipo_de_anteojo.value === "3") ||
                            (isEditting && permisoAreaUsuario
                              ? permiso_areas_grupo_dioptria &&
                                permiso_usuario_grupo_dioptria &&
                                tipo_de_anteojo.value === "3"
                              : false)
                          )
                        }
                        // FOTcristales={true}
                        isOptional={true}
                        inputRef={
                          tipo_de_anteojo.value === "3"
                            ? inputsRef.lastInputRef
                            : null
                        }
                        customWidth={"labelInput inputStyles"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
{
  /* <SelectInputTiposComponent
                                        label='Opción Venta'
                                        name='cristal1_opcion_vta_id'
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal1_opcion_vta_id"] : data && data[EnumGrid.cristal1_opcion_vta_id]}
                                        control={control}
                                        entidad='OTOpcionVentaCristales'
                                        // readOnly={ isEditting  || !(permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria)}
                                        readOnly={!(!isEditting || (permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria))}
                                    /> */
}

{
  /* <SelectInputTiposComponent
                                        label="Opcion de Venta"
                                        name="cristal2_od_opcion_venta_id"
                                        showRefresh={true}
                                        isOT={true}
                                        handleSelectChange={handleInputChange}
                                        data={formValues ? formValues["cristal2_od_opcion_venta_id"] : data && data[EnumGrid.cristal2_od_opcion_venta_id]}
                                        control={control}
                                        entidad='OTOpcionVentaCristales'
                                        readOnly={!((!isEditting && tipo_de_anteojo.value === '3') || (isEditting && permiso_areas_grupo_dioptria && permiso_usuario_grupo_dioptria && tipo_de_anteojo.value === '3'))}
                                        FOTcristales={true}
                                      /> */
}
{
  /* <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                        </div>  
                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                        </div>   */
}
{
  /* <h1 className='labelForm absolute z-10 top-[-6%] text-2xl w-[30%] !text-[#f8b179] text-center left-[4%]'>ANTEOJO 2</h1> */
}
{
  /* <div className="w-[35%] absolute top-[-5%] labelForm right-[5%]">
                            {renderGrupo1("A2_GRUPO_OI")}
                        </div>

                        <div className="w-[35%] absolute top-[-5%] labelForm right-[20%]">
                            {renderGrupo1("A2_GRUPO_OD")}
                        </div> */
}

export default FOTCristales;
