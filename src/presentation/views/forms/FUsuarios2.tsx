/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUsusariosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MUsuarios";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud, usePermission } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const strBaseUrl = "/api/usuarios/";
const strEntidad = "Usuario ";

export interface InputData {
  nombre: string | undefined;
  cargo: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  estado: string | undefined;

  permiso_resolucion: string | undefined;
  permiso_compras: string | undefined;
  permiso_calculo: string | undefined;
  permiso_laboratorio: string | undefined;
  permiso_ingreso: string | undefined;
  permiso_control_produccion: string | undefined;
  permiso_bodega_insumos: string | undefined;
  permiso_biselado_1: string | undefined;
  permiso_biselado_2: string | undefined;
  permiso_montaje: string | undefined;
  permiso_qa: string | undefined;
  permiso_bodega_prod_term: string | undefined;
  permiso_empaque: string | undefined;

  permiso_editar_armazon: string | undefined;
  permiso_editar_cristal_opcion_vta: string | undefined;
  permiso_editar_estado_impresion: string | undefined;
  permiso_editar_validar_parametrizacion: string | undefined;
  permiso_editar_opcion_montaje: string | undefined;
  permiso_editar_grupo_dioptria: string | undefined;
  permiso_editar_receta: string | undefined;
  permiso_editar_validar_cristales: string | undefined;
  permiso_editar_validar_armazones: string | undefined;
  permiso_editar_worktracking: string | undefined;

  permiso_nguia: string | undefined;
  permiso_nenvio: string | undefined;
  permiso_nfirma: string | undefined;
  permiso_nreporte_entrega: string | undefined;
  permiso_noc: string | undefined;
  permiso_confirmar_entrega: string | undefined;
  permiso_pre_facturar: string | undefined;
  permiso_vb: string | undefined;
  permiso_facturar: string | undefined;
  permiso_confirmar_pago: string | undefined;
}

// function insertarElementoEnPosicion(arreglo: any, nuevoElemento: any, posicion: any) {
//   const nuevoArreglo = arreglo.slice(0, posicion) + nuevoElemento + arreglo.slice(posicion)
//   console.log(nuevoArreglo)
//   console.log(arreglo)
//   console.log(nuevoArreglo.substring(0, 4) + '0' + nuevoArreglo.substring(5))

//   return nuevoArreglo.substring(0, 4) + '0' + nuevoArreglo.substring(5);
// }

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}
const permiso_area = [
  "permiso_resolucion",
  "permiso_compras",
  "permiso_calculo",
  "permiso_laboratorio",
  "permiso_ingreso",
  "permiso_control_produccion",
  "permiso_bodega_insumos",
  "permiso_biselado_1",
  "permiso_biselado_2",
  "permiso_montaje",
  "permiso_qa",
  "permiso_bodega_prod_term",
  "permiso_empaque",
];

const permiso_campo = [
  "permiso_editar_armazon",
  "permiso_editar_cristal_opcion_vta",
  "permiso_editar_estado_impresion",
  "permiso_editar_validar_parametrizacion",
  "permiso_editar_opcion_montaje",
  "permiso_editar_grupo_dioptria",
  "permiso_editar_receta",
  "permiso_editar_validar_cristales",
  "permiso_editar_validar_armazones",
  "permiso_editar_worktracking",
];

// const permisos_botones = [
//   "permiso_nuevo",
//   "permiso_check",
//   "permiso_imprimir",
//   "permiso_exportar",
//   "permiso_importar",
//   "permiso_whatsapp",
//   "permiso_procesar",
//   "permiso_pausar",
//   "permiso_derivar",
//   "permiso_anular",
//   "permiso_ingresar",
//   "permiso_postVenta",
//   "permiso_nguia", // index 12
//   "permiso_nenvio", // index 13
//   "permiso_marco_excel",
//   "permiso_nfirma", // index 15
//   "permiso_validar_armazones",
//   "permiso_validar_cristales",
//   "permiso_ubicacion",
//   "permiso_opcion_bodega_insumos",
//   "permiso_nreporte_entrega", // index 20
//   "permiso_noc", // index 21
//   "permiso_confirmar_entrega", // index 22
//   "permiso_pre_facturar", // index 23
//   "permiso_vb", // index 24
//   "permiso_facturar", // index 25
//   "permiso_confirmar_pago", // index 26
// ];

const permisos_botones = [
  {
    key: "permiso_nuevo",
    default: "1",
  },
  {
    key: "permiso_check",
    default: "1",
  },
  {
    key: "permiso_imprimir",
    default: "1",
  },
  {
    key: "permiso_exportar",
    default: "1",
  },
  {
    key: "permiso_importar",
    default: "1",
  },
  {
    key: "permiso_whatsapp",
    default: "1",
  },
  {
    key: "permiso_procesar",
    default: "1",
  },
  {
    key: "permiso_pausar",
    default: "1",
  },
  {
    key: "permiso_derivar",
    default: "1",
  },
  {
    key: "permiso_anular",
    default: "1",
  },
  {
    key: "permiso_ingresar",
    default: "1",
  },
  {
    key: "permiso_postVenta",
    default: "1",
  },
  {
    key: "permiso_nguia",
    default: "0",
  },
  {
    key: "permiso_nenvio",
    default: "0",
  },
  {
    key: "permiso_marco_excel",
    default: "1",
  },
  {
    key: "permiso_nfirma",
    default: "0",
  },
  {
    key: "permiso_validar_armazones",
    default: "1",
  },
  {
    key: "permiso_validar_cristales",
    default: "1",
  },
  {
    key: "permiso_ubicacion",
    default: "1",
  },
  {
    key: "permiso_opcion_bodega_insumos",
    default: "1",
  },
  {
    key: "permiso_nreporte_entrega",
    default: "0",
  },
  {
    key: "permiso_noc",
    default: "0",
  },
  {
    key: "permiso_confirmar_entrega",
    default: "0",
  },
  {
    key: "permiso_pre_facturar",
    default: "0",
  },
  {
    key: "permiso_vb",
    default: "0",
  },
  {
    key: "permiso_facturar",
    default: "0",
  },
  {
    key: "permiso_confirmar_pago",
    default: "0",
  },
];

const insertarElementoEnPosicion = (jsonData: any) => {
  let result = "";
  permisos_botones.map((permiso) => {
    if (Object.keys(jsonData).includes(permiso.key)) {
      result = result.concat(jsonData[permiso.key] === "Escritura" ? "1" : "0");
    } else {
      result = result.concat(permiso.default);
    }
  });
  return result;
};

export function transformInsertQuery(jsonData: any): any | null {
  const permisos_areas = permiso_area
    .map((permiso: any) => (jsonData[permiso] === "Escritura" ? "1" : "0"))
    .join("");

  const permisos_campos = permiso_campo
    .map((permiso: any) => (jsonData[permiso] === "Escritura" ? "1" : "0"))
    .join("");

  // const permisos_botonesOT = permisos_botones
  //   .map((permiso: any) => (jsonData[permiso] === "Escritura" ? "1" : "0"))
  //   .join("");
  // const permisos_botonesOT = generatePermisosBotonesString(jsonData);

  console.log(insertarElementoEnPosicion(jsonData));

  let _p1 = ` "${jsonData.nombre}", 
              ${jsonData.cargo}, 
              "${jsonData.telefono}", 
              "${jsonData.correo}", 
              ${jsonData.estado === "Activo" ? 1 : 2},
              "${permisos_campos}",
              "${permisos_areas}",
              "${insertarElementoEnPosicion(jsonData)}"
`;
  _p1 = _p1.replace(/'/g, "!");
  const query: OutputData = {
    query: "03",
    _p1,
  };

  // console.log(query)

  return query;
}

export function transformUpdateQuery(
  jsonData: any,
  primaryKey: string
): OutputData | null {
  const fields = [
    `nombre               ="${jsonData.nombre}"`,
    `telefono             ="${jsonData.telefono}"`,
    `correo               ="${jsonData.correo}"`,
    `estado               = ${jsonData.estado === "Activo" ? 1 : 2}`,
    `cargo                = ${jsonData.cargo}`,
    `permisos_botones     = "${insertarElementoEnPosicion(jsonData)}"`,
    `permisos_campos      = "${permiso_campo
      .map((permiso) =>
        jsonData[permiso] === "Escritura"
          ? // jsonData[permiso] === "Lectura" || jsonData[permiso] === "No"
            "1"
          : "0"
      )
      .join("")}"`,
    // `permisos_campos      = "${permiso_campo.map((permiso) => jsonData[permiso] === 'Lectura' ? "0" : "1").join(''), '0', 1}"`,
    `permisos_areas       = "${permiso_area
      .map((permiso) => (jsonData[permiso] === "Escritura" ? "1" : "0"))
      .join("")}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");

  _p1 = _p1.replace(/'/g, "!");

  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
    _p3: "",
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
}

const FUsuarios2: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationUsusariosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const { escritura_lectura } = usePermission(24 || 0);
    // const [formValues, setFormValues] = useState<any>();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      // secondInputRef,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.id];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        estado: "Activo",
        permiso_confirmar_entrega: "Lectura",
        permiso_pre_facturar: "Lectura",
        permiso_vb: "Lectura",
        permiso_confirmar_pago: "Lectura",
        permiso_ingreso: "Lectura",
        permiso_control_produccion: "Lectura",
        permiso_bodega_insumos: "Lectura",
        permiso_biselado_1: "Lectura",
        permiso_biselado_2: "Lectura",
        permiso_montaje: "Lectura",
        permiso_qa: "Lectura",
        permiso_bodega_prod_term: "Lectura",
        permiso_empaque: "Lectura",
        permiso_compras: "Lectura",
        permiso_calculo: "Lectura",
        permiso_laboratorio: "Lectura",
        permiso_resolucion: "Lectura",
        permiso_editar_armazon: "Lectura",
        permiso_editar_cristal_opcion_vta: "Lectura",
        permiso_editar_estado_impresion: "Lectura",
        permiso_editar_validar_parametrizacion: "Lectura",
        permiso_editar_opcion_montaje: "Lectura",
        permiso_editar_grupo_dioptria: "Lectura",
        permiso_editar_receta: "Lectura",
        permiso_editar_validar_cristales: "Lectura",
        permiso_editar_validar_armazones: "Lectura",
        permiso_editar_worktracking: "Lectura",
        permiso_nguia: "Lectura",
        permiso_nenvio: "Lectura",
        permiso_nfirma: "Lectura",
        permiso_nreporte_entrega: "Lectura",
        permiso_noc: "Lectura",
        permiso_facturar: "Lectura",
      },
    });

    const formValues = getValues();

    const resetTextFields = React.useCallback(() => {
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("correo", "");
      // setValue('permiso_post_venta', '');
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="nombre"]'
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
          closeModal();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [closeModal]);

    // React.useEffect(() => {
    //   setValue("permiso_editar_resolucion_garantia", "Lectura");
    // }, []);

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        const toastLoading = toast.loading("Cargando...");
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);

          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading);
        } catch (error: any) {
          toast.dismiss(toastLoading);
          show({
            message: error,
            type: "error",
          });
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );

    const handlePermisos = React.useCallback(async () => {
      try {
        // console.log("click");
        const intUserId = data && data[EnumGrid.id];
        const primaryKey = `_id=${intUserId}`;
        const query = "99";

        const response = await ListEntity(primaryKey, query);

        response[0][0] === "OK"
          ? show({ message: TITLES.permisos, type: "success" })
          : show({ message: TITLES.permisosError, type: "error" });
      } catch (error: any) {
        console.log(error);
        show({ message: error, type: "error" });
      }
    }, []);

    useEffect(() => {
      isEditting ? focusSecondInput("nombre") : focusFirstInput("nombre");
    }, []);

    const handleChange = (e: any) => {
      console.log(e);
      // const { name, value } = e;

      // setFormValues((prev: any) => ({
      //   ...prev,
      //   [name]: value,
      // }));
    };

    useEffect(() => {
      if (data) {
        setValue(
          "permiso_editar_armazon",
          data[EnumGrid.permiso_editar_armazon]
        );
        setValue(
          "permiso_editar_cristal_opcion_vta",
          data[EnumGrid.permiso_editar_cristal_opcion_vta]
        );
        setValue(
          "permiso_editar_estado_impresion",
          data[EnumGrid.permiso_editar_estado_impresion]
        );
        setValue(
          "permiso_editar_validar_parametrizacion",
          data[EnumGrid.permiso_editar_validar_parametrizacion]
        );
        setValue(
          "permiso_editar_opcion_montaje",
          data[EnumGrid.permiso_editar_opcion_montaje]
        );
        setValue(
          "permiso_editar_grupo_dioptria",
          data[EnumGrid.permiso_editar_grupo_dioptria]
        );
        setValue("permiso_editar_receta", data[EnumGrid.permiso_editar_receta]);
        setValue(
          "permiso_editar_validar_cristales",
          data[EnumGrid.permiso_editar_validar_cristales]
        );
        setValue(
          "permiso_editar_validar_armazones",
          data[EnumGrid.permiso_editar_validar_armazones]
        );
        setValue(
          "permiso_editar_worktracking",
          data[EnumGrid.permiso_editar_worktracking]
        );

        setValue("permiso_nguia", data[EnumGrid.permiso_nguia]);
        setValue("permiso_nenvio", data[EnumGrid.permiso_nenvio]);
        setValue("permiso_nfirma", data[EnumGrid.permiso_nfirma]);
        setValue(
          "permiso_nreporte_entrega",
          data[EnumGrid.permiso_nreporte_entrega]
        );
        setValue("permiso_noc", data[EnumGrid.permiso_noc]);
        setValue(
          "permiso_confirmar_entrega",
          data[EnumGrid.permiso_confirmar_entrega]
        );
        setValue("permiso_pre_facturar", data[EnumGrid.permiso_pre_facturar]);
        setValue("permiso_vb", data[EnumGrid.permiso_vb]);
        setValue("permiso_facturar", data[EnumGrid.permiso_facturar]);
        setValue(
          "permiso_confirmar_pago",
          data[EnumGrid.permiso_confirmar_pago]
        );
      }
    }, [data]);

    return (
      <div className="useFormContainer centered-div w-[90%]">
        <div className="userFormBtnCloseContainer flex justify-between ">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
        >
          <div className="userFormularioContainer !w-full">
            <div className="w-full items-center flex !mb-4">
              <div className="input-container items-center  rowForm w-full">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Nombre"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                    inputRef={firstInputRef}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-full">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Cargo"
                    name="cargo"
                    showRefresh={true}
                    data={data && data[EnumGrid.cargo_id]}
                    control={control}
                    entidad={["/api/cargos/", "02"]}
                    error={errors.cargo}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-full">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    data={data && data[EnumGrid.telefono]}
                    control={control}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className=" items-center flex">
              <div className="input-container items-center rowForm">
                <div className="labelInputDiv w-[26rem]">
                  <TextInputComponent
                    type="email"
                    label="Correo"
                    name="correo"
                    data={data && data[EnumGrid.correo]}
                    control={control}
                    error={errors.correo}
                    onlyRead={isEditting}
                    customWidth={"labelInput inputStyles w-[20vw]"}
                  />
                </div>
              </div>

              <div className="input-container flex justify-around items-center rowForm ">
                <div className="w-[11rem] ml-[1%]">
                  <RadioButtonComponent
                    control={control}
                    label="Estado"
                    name="estado"
                    data={
                      (formValues && formValues["estado"]) ||
                      (data && data[EnumGrid.estado])
                    }
                    options={["Activo", "Suspendido"]}
                    error={errors.estado}
                    horizontal={false}
                    labelProps={
                      "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                    }
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <Tabs>
              <TabList className="flex ml-4">
                <Tab className="custom-tab !h-14 !w-[13rem]">
                  Permisos de Áreas
                </Tab>
                <Tab className="custom-tab !h-14 !w-[13rem]">
                  Permisos Edición OT
                </Tab>
                <Tab className="custom-tab !h-14 !w-[13rem]">
                  Permisos de Botones
                </Tab>
              </TabList>

              <TabPanel>
                <div className="frameOTForm">
                  <div className="w-full items-center !mt-7 !mb-4  !h-[10rem] ">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Ingreso"
                            name="permiso_ingreso"
                            data={
                              (formValues && formValues["permiso_ingreso"]) ||
                              (data && data[EnumGrid.permiso_ingreso])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_ingreso}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Control Producción"
                            name="permiso_control_produccion"
                            data={
                              (formValues &&
                                formValues["permiso_control_produccion"]) ||
                              (data &&
                                data[EnumGrid.permiso_control_produccion])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_control_produccion}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Bodega Insumos"
                            name="permiso_bodega_insumos"
                            data={
                              (formValues &&
                                formValues["permiso_bodega_insumos"]) ||
                              (data && data[EnumGrid.permiso_bodega_insumos])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_bodega_insumos}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Taller Biselado 1"
                            name="permiso_biselado_1"
                            data={
                              (formValues &&
                                formValues["permiso_biselado_1"]) ||
                              (data && data[EnumGrid.permiso_biselado_1])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_biselado_1}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Taller Biselado 2"
                            name="permiso_biselado_2"
                            data={
                              (formValues &&
                                formValues["permiso_biselado_2"]) ||
                              (data && data[EnumGrid.permiso_biselado_2])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_biselado_2}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Taller Montaje"
                            name="permiso_montaje"
                            data={
                              (formValues && formValues["permiso_montaje"]) ||
                              (data && data[EnumGrid.permiso_taller_montaje])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_montaje}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Control Calidad"
                            name="permiso_qa"
                            data={
                              (formValues && formValues["permiso_qa"]) ||
                              (data && data[EnumGrid.permiso_qa])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_qa}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full items-center  !mb-4  !h-[8rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Bod Prod Term."
                            name="permiso_bodega_prod_term"
                            data={
                              (formValues &&
                                formValues["permiso_bodega_prod_term"]) ||
                              (data &&
                                data[EnumGrid.permiso_bodega_p_terminados])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_bodega_prod_term}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Empaque"
                            name="permiso_empaque"
                            data={
                              (formValues && formValues["permiso_empaque"]) ||
                              (data && data[EnumGrid.permiso_empaque])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_empaque}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Compras"
                            name="permiso_compras"
                            data={
                              (formValues && formValues["permiso_compras"]) ||
                              (data && data[EnumGrid.permiso_compras])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_compras}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Cálculo"
                            name="permiso_calculo"
                            data={
                              (formValues && formValues["permiso_calculo"]) ||
                              (data && data[EnumGrid.permiso_calculo])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_calculo}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Laboratorio"
                            name="permiso_laboratorio"
                            data={
                              (formValues &&
                                formValues["permiso_laboratorio"]) ||
                              (data && data[EnumGrid.permiso_laboratorio])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_laboratorio}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Resolución"
                            name="permiso_resolucion"
                            data={
                              (formValues &&
                                formValues["permiso_resolucion"]) ||
                              (data && data[EnumGrid.permiso_resolucion])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_resolucion}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="frameOTForm">
                  <div className="w-full items-center !mt-7  !mb-4  !h-[10rem] ">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Editar Armazón"
                            name="permiso_editar_armazon"
                            data={
                              (formValues &&
                                formValues["permiso_editar_armazon"]) ||
                              (data && data[EnumGrid.permiso_editar_armazon])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_armazon}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Opcion Vta. Cristal"
                            name="permiso_editar_cristal_opcion_vta"
                            data={
                              (formValues &&
                                formValues[
                                  "permiso_editar_cristal_opcion_vta"
                                ]) ||
                              (data &&
                                data[
                                  EnumGrid.permiso_editar_cristal_opcion_vta
                                ])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_cristal_opcion_vta}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Estado Impresión"
                            name="permiso_editar_estado_impresion"
                            data={
                              (formValues &&
                                formValues[
                                  "permiso_editar_estado_impresion"
                                ]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_estado_impresion])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_estado_impresion}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Validar Param."
                            name="permiso_editar_validar_parametrizacion"
                            data={
                              (formValues &&
                                formValues[
                                  "permiso_editar_validar_parametrizacion"
                                ]) ||
                              (data &&
                                data[
                                  EnumGrid
                                    .permiso_editar_validar_parametrizacion
                                ])
                            }
                            options={["Lectura", "Escritura"]}
                            error={
                              errors.permiso_editar_validar_parametrizacion
                            }
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Opción Montaje"
                            name="permiso_editar_opcion_montaje"
                            data={
                              (formValues &&
                                formValues["permiso_editar_opcion_montaje"]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_opcion_montaje])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_opcion_montaje}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full items-center  !mb-4  !h-[10rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Grupo Dioptría"
                            name="permiso_editar_grupo_dioptria"
                            data={
                              (formValues &&
                                formValues["permiso_editar_grupo_dioptria"]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_grupo_dioptria])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_grupo_dioptria}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Editar Receta"
                            name="permiso_editar_receta"
                            data={
                              (formValues &&
                                formValues["permiso_editar_receta"]) ||
                              (data && data[EnumGrid.permiso_editar_receta])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_receta}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Validar Cristales"
                            name="permiso_editar_validar_cristales"
                            data={
                              (formValues &&
                                formValues[
                                  "permiso_editar_validar_cristales"
                                ]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_validar_cristales])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_validar_cristales}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Validar Armazones"
                            name="permiso_editar_validar_armazones"
                            data={
                              (formValues &&
                                formValues[
                                  "permiso_editar_validar_armazones"
                                ]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_validar_armazones])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_validar_armazones}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Editar WorkTracking"
                            name="permiso_editar_worktracking"
                            data={
                              (formValues &&
                                formValues["permiso_editar_worktracking"]) ||
                              (data &&
                                data[EnumGrid.permiso_editar_worktracking])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_worktracking}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.1vw]"
                            }
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
                <div className="frameOTForm">
                  <div className="w-full items-center !mt-7 !mb-4  !h-[10rem] ">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Guía Despacho"
                            name="permiso_nguia"
                            data={
                              (formValues && formValues["permiso_nguia"]) ||
                              (data && data[EnumGrid.permiso_nguia])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_nguia}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="N° Envío"
                            name="permiso_nenvio"
                            data={
                              (formValues && formValues["permiso_nenvio"]) ||
                              (data && data[EnumGrid.permiso_nenvio])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_nenvio}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="N° Rep. Firma"
                            name="permiso_nfirma"
                            data={
                              (formValues && formValues["permiso_nfirma"]) ||
                              (data && data[EnumGrid.permiso_nfirma])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_nfirma}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full items-center  !mb-4  !h-[8rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="N° Rep. Entrega"
                            name="permiso_nreporte_entrega"
                            data={
                              (formValues &&
                                formValues["permiso_nreporte_entrega"]) ||
                              (data && data[EnumGrid.permiso_nreporte_entrega])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_nreporte_entrega}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="N° Orden Compra"
                            name="permiso_noc"
                            data={
                              (formValues && formValues["permiso_noc"]) ||
                              (data && data[EnumGrid.permiso_noc])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_noc}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      {/* <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Confirmar Entrega"
                            name="permiso_confirmar_entrega"
                            data={
                              (formValues && formValues["Confirmar Entrega"]) ||
                              (data && data[EnumGrid.permiso_confirmar_entrega])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_confirmar_entrega}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div> */}

                      {/* <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Pre Facturar"
                            name="permiso_pre_facturar"
                            data={
                              (formValues && formValues["Pre Facturar"]) ||
                              (data && data[EnumGrid.permiso_pre_facturar])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_pre_facturar}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div> */}
                      {/* 
                      <div className="input-container items-center rowForm  w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="V°B°"
                            name="permiso_vb"
                            data={
                              (formValues && formValues["V°B°"]) ||
                              (data && data[EnumGrid.permiso_vb])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_vb}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div> */}
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Facturar"
                            name="permiso_facturar"
                            data={
                              (formValues && formValues["permiso_facturar"]) ||
                              (data && data[EnumGrid.permiso_facturar])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_facturar}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                      {/* <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Confirmar Pago"
                            name="permiso_confirmar_pago"
                            data={
                              (formValues && formValues["Confirmar Pago"]) ||
                              (data && data[EnumGrid.permiso_confirmar_pago])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_confirmar_pago}
                            horizontal={false}
                            onChange={(e: any) => handleChange(e)}
                            labelProps={
                              "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                            }
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>

          <div
            className="flex items-center mt-10 mb-10"
            style={{ display: "inline" }}
          >
            <div className="w-full flex !-mt-6">
              {isEditting && (
                <div className="!w-[70vw] !flex mx-auto ml-[2vw]">
                  <Button
                    type="button"
                    tabIndex={1}
                    onClick={handlePermisos}
                    className="absolute !w-[30%] left-50 userFormBtnSubmit userFormBtnCopiarPermisos"
                  >
                    {" "}
                    COPIAR PERMISOS
                  </Button>
                </div>
              )}

              <div className="mx-auto w-[20%] mr-20">
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

export default FUsuarios2;
