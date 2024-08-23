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
import { PermisosBotones } from "../../Enums";

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

const permisos_botones = [
  "permiso_nguia", // index 12
  "permiso_nenvio", // index 13
  "permiso_nfirma", // index 15
  "permiso_nreporte_entrega", // index 20
  "permiso_noc", // index 21
  "permiso_confirmar_entrega", // index 22
  "permiso_pre_facturar", // index 23
  "permiso_vb", // index 24
  "permiso_facturar", // index 25
  "permiso_confirmar_pago", // index 26
];

const editablesIndices = [12, 13, 15, 20, 21, 22, 23, 24, 25, 26];

function generatePermisosBotonesString(jsonData: any): string {
  return Object.values(PermisosBotones)
    .filter((value) => typeof value === "number")
    .map((index: any) => {
      if (editablesIndices.includes(index)) {
        const permisoClave = permisos_botones[editablesIndices.indexOf(index)];
        return permisoClave && jsonData[permisoClave] === "Lectura" ? "0" : "1";
      }
      return "1"; // Predeterminado a "1" para los no editables
    })
    .join("");
}

export function transformInsertQuery(jsonData: any): any | null {
  const permisos_areas = permiso_area
    .map((permiso: any) => (jsonData[permiso] === "Lectura" ? "0" : "1"))
    .join("");

  const permisos_campos = permiso_campo
    .map((permiso: any) => (jsonData[permiso] === "Lectura" ? "0" : "1"))
    .join("");

  const permisos_botonesOT = generatePermisosBotonesString(jsonData);

  console.log(permisos_botonesOT);

  let _p1 = ` "${jsonData.nombre}", 
              ${jsonData.cargo}, 
              "${jsonData.telefono}", 
              "${jsonData.correo}", 
              ${jsonData.estado === "Activo" ? 1 : 2},
              "${permisos_campos}",
              "${permisos_areas}",
              "${permisos_botonesOT}"
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
  const permisos_botonesOT = generatePermisosBotonesString(jsonData);

  const fields = [
    `nombre               ="${jsonData.nombre}"`,
    `telefono             ="${jsonData.telefono}"`,
    `correo               ="${jsonData.correo}"`,
    `estado               = ${jsonData.estado === "Activo" ? 1 : 2}`,
    `cargo                = ${jsonData.cargo}`,
    `permisos_botones     = "${permisos_botonesOT}"`,
    `permisos_campos      = "${permiso_campo
      .map((permiso) =>
        jsonData[permiso] === "Lectura"
          ? // jsonData[permiso] === "Lectura" || jsonData[permiso] === "No"
            "0"
          : "1"
      )
      .join("")}"`,
    // `permisos_campos      = "${permiso_campo.map((permiso) => jsonData[permiso] === 'Lectura' ? "0" : "1").join(''), '0', 1}"`,
    `permisos_areas       = "${permiso_area
      .map((permiso) => (jsonData[permiso] === "Lectura" ? "0" : "1"))
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
    const [formValues, setFormValues] = useState<any>();

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
    } = useForm({
      resolver: yupResolver(schema),
    });

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
          setFormValues({});
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
      const { name, value } = e;

      setFormValues((prev: any) => ({
        ...prev,
        [name]: value,
      }));
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
                    data={data && data[EnumGrid.estado]}
                    options={["Activo", "Suspendido"]}
                    error={errors.estado}
                    horizontal={false}
                    labelProps={
                      "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                    }
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
                {/* <div className="w-[11rem] ml-[2%]">
                  <RadioButtonComponent
                    control={control}
                    label="Documentación"
                    name="permiso_facturacion"
                    data={
                      (formValues && formValues["Documentacion"]) ||
                      (data && data[EnumGrid.permiso_documentacion])
                    }
                    options={["Lectura", "Escritura"]}
                    error={errors.permiso_facturacion}
                    horizontal={false}
                    labelProps={
                      "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                    }
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
                <div className="w-[11rem] ml-[2%]">
                  <RadioButtonComponent
                    control={control}
                    label="Post Venta"
                    name="permiso_post_venta"
                    data={
                      (formValues && formValues["Post Venta"]) ||
                      (data && data[EnumGrid.permiso_post_venta])
                    }
                    options={["Lectura", "Escritura"]}
                    error={errors.permiso_post_venta}
                    horizontal={false}
                    labelProps={
                      "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                    }
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
                <div className="w-[11rem] ml-[2%]">
                  <RadioButtonComponent
                    control={control}
                    label="Anulación"
                    name="permiso_anulacion"
                    data={
                      (formValues && formValues["Anulación"]) ||
                      (data && data[EnumGrid.permiso_anular])
                    }
                    options={["Lectura", "Escritura"]}
                    error={errors.permiso_post_venta}
                    horizontal={false}
                    labelProps={
                      "!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"
                    }
                    customWidth={"labelInput inputStyles"}
                  />
                </div> */}
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
                              (formValues && formValues["Ingreso"]) ||
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
                                formValues["Control Producción"]) ||
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
                              (formValues && formValues["Bodega Insumos"]) ||
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
                              (formValues && formValues["Taller Biselado 1"]) ||
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
                              (formValues && formValues["Taller Biselado 2"]) ||
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
                              (formValues && formValues["Taller Montaje"]) ||
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
                              (formValues && formValues["Control Calidad"]) ||
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
                              (formValues && formValues["Bod Prod Term."]) ||
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
                              (formValues && formValues["Empaque"]) ||
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
                              (formValues && formValues["Compras"]) ||
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
                              (formValues && formValues["Cálculo"]) ||
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
                              (formValues && formValues["Laboratorio"]) ||
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
                              (formValues && formValues["Control"]) ||
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
                              (formValues && formValues["Editar Armazón"]) ||
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
                                formValues["Opcion Vta. Cristal"]) ||
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
                              (formValues && formValues["Estado Impresión"]) ||
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
                              (formValues && formValues["Validar Param."]) ||
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
                              (formValues && formValues["Opción Montaje"]) ||
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
                              (formValues && formValues["Grupo Dioptría"]) ||
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
                              (formValues && formValues["Editar Receta"]) ||
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
                              (formValues && formValues["Validar Cristales"]) ||
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
                              (formValues && formValues["Validar Armazones"]) ||
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
                                formValues["Editar WorkTracking"]) ||
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
                              (formValues && formValues["Guía Despacho"]) ||
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
                              (formValues && formValues["N° Envío"]) ||
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
                              (formValues && formValues["N° Rep. Firma"]) ||
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

                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="N° Rep. Entrega"
                            name="permiso_nreporte_entrega"
                            data={
                              (formValues && formValues["N° Rep. Entrega"]) ||
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
                              (formValues && formValues["N° Orden Compra"]) ||
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
                    </div>
                  </div>

                  <div className="w-full items-center  !mb-4  !h-[8rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm w-[14%]">
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
                      </div>

                      <div className="input-container items-center rowForm w-[14%]">
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
                      </div>

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
                      </div>
                      <div className="input-container items-center rowForm w-[14%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Facturar"
                            name="permiso_facturar"
                            data={
                              (formValues && formValues["Facturar"]) ||
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
                      <div className="input-container items-center rowForm w-[14%]">
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
                      </div>
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
                <div className="!w-[8rem] !flex mx-auto">
                  <Button
                    type="button"
                    tabIndex={1}
                    onClick={handlePermisos}
                    className="absolute !w-[20%] left-50 userFormBtnSubmit userFormBtnCopiarPermisos"
                  >
                    {" "}
                    COPIAR PERMISOS
                  </Button>
                </div>
              )}

              <div className="mx-auto w-[20%]">
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
