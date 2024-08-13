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

  permiso_adquisiciones: string | undefined;
  permiso_calculo: string | undefined;
  permiso_control: string | undefined;
  permiso_laboratorio: string | undefined;
  permiso_digitacion: string | undefined;
  permiso_ingreso: string | undefined;
  permiso_bodega_insumos: string | undefined;
  permiso_biselado_1: string | undefined;
  permiso_biselado_2: string | undefined;
  permiso_montaje: string | undefined;
  permiso_qa: string | undefined;
  permiso_bodega_prod_term: string | undefined;
  permiso_empaque: string | undefined;

  permiso_facturacion: string | undefined;
  permiso_post_venta: string | undefined;
  permiso_anulacion: string | undefined;

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
  "permiso_control",
  "permiso_adquisiciones",
  "permiso_calculo",
  "permiso_laboratorio",
  "permiso_digitacion",
  "permiso_ingreso",
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

const permiso_archivoOT = [
  "permiso_facturacion",
  "permiso_post_venta",
  "permiso_anulacion",
];

export function transformInsertQuery(jsonData: any): any | null {
  // const permisos_areas      = permiso_area.map((permiso:any)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('');
  const permisos_areas = permiso_area
    .map((permiso: any) =>
      jsonData[permiso] === "Lectura"
        ? "0"
        : "1"
    )
    .join("");

  const permisos_campos = permiso_campo
    .map((permiso: any) =>
      jsonData[permiso] === "Lectura" ? "0" : "1"
    // jsonData[permiso] === "Lectura" || jsonData[permiso] === "No" ? "0" : "1"
    )
    .join("");
  const permisos_archivoOT = permiso_archivoOT
  .map((permiso: any) => (jsonData[permiso] === "Lectura" ? "0" : "1"))
    .join("");

  // console.log(permisos_areas)

  let _p1 = ` "${jsonData.nombre}", 
              ${jsonData.cargo}, 
              "${jsonData.telefono}", 
              "${jsonData.correo}", 
              ${jsonData.estado === "Activo" ? 1 : 2},
              "${permisos_archivoOT}",
              "${permisos_campos}",
              "${permisos_areas}"
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
    `permisos_archivo_ot  = "${permiso_archivoOT
      .map((permiso) => (jsonData[permiso] === "Lectura" ? "0" : "1"))
      .join("")}"`,
    `permisos_campos      = "${permiso_campo
      .map((permiso) =>
        jsonData[permiso] === "Lectura"
      // jsonData[permiso] === "Lectura" || jsonData[permiso] === "No"
          ? "0"
          : "1"
      )
      .join("")}"`,
    // `permisos_campos      = "${permiso_campo.map((permiso) => jsonData[permiso] === 'Lectura' ? "0" : "1").join(''), '0', 1}"`,
    `permisos_areas       = "${permiso_area
      .map((permiso) =>
        jsonData[permiso] === "Lectura"
          ? "0"
          : "1"
      )
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

  console.log("USER: ", query);
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

const FUsuarios: React.FC<IUserFormPrps> = React.memo(
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
        setValue("permiso_editar_armazon", data[EnumGrid.permiso_editar_armazon]);
        setValue("permiso_editar_cristal_opcion_vta", data[EnumGrid.permiso_editar_cristal_opcion_vta]);
        setValue("permiso_editar_estado_impresion", data[EnumGrid.permiso_editar_estado_impresion]);
        setValue("permiso_editar_validar_parametrizacion", data[EnumGrid.permiso_editar_validar_parametrizacion]);
        setValue("permiso_editar_opcion_montaje", data[EnumGrid.permiso_editar_opcion_montaje]);
        setValue("permiso_editar_grupo_dioptria", data[EnumGrid.permiso_editar_grupo_dioptria]);
        setValue("permiso_editar_receta", data[EnumGrid.permiso_editar_receta]);
        setValue("permiso_editar_validar_cristales", data[EnumGrid.permiso_editar_validar_cristales]);
        setValue("permiso_editar_validar_armazones", data[EnumGrid.permiso_editar_validar_armazones]);
        setValue("permiso_editar_worktracking", data[EnumGrid.permiso_editar_worktracking]);
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
                <div className="w-[11rem] ml-[2%]">
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
                </div>
              </div>
            </div>

            <Tabs>
              <TabList className="flex ml-4">
                <Tab className="custom-tab !h-14 !w-[13rem]">
                  Permisos de Áreas
                </Tab>
                <Tab className="custom-tab !h-14 !w-[13rem]">
                  Permisos de Edición
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
                            label="Digitación"
                            name="permiso_digitacion"
                            data={
                              (formValues && formValues["Digitación"]) ||
                              (data && data[EnumGrid.permiso_digitacion])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_digitacion}
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
                            label="Ingreso"
                            name="permiso_ingreso"
                            data={
                              (formValues && formValues["Ingreso"]) ||
                              (data && data[EnumGrid.permiso_ingreso])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_digitacion}
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
                            label="Adquisiciones"
                            name="permiso_adquisiciones"
                            data={
                              (formValues && formValues["Adquisiciones"]) ||
                              (data && data[EnumGrid.permiso_adquisiciones])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_adquisiciones}
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
                            label="Control"
                            name="permiso_control"
                            data={
                              (formValues && formValues["Control"]) ||
                              (data && data[EnumGrid.permiso_control])
                            }
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_control}
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
                      <div className="input-container items-center rowForm  w-[15%]">
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

                      <div className="input-container items-center rowForm  w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Opcion Vta. Cristal"
                            name="permiso_editar_cristal_opcion_vta"
                            data={
                              (formValues && formValues["Opcion Vta. Cristal"]) ||
                              (data && data[EnumGrid.permiso_editar_cristal_opcion_vta])
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
                                data[EnumGrid.permiso_editar_validar_parametrizacion])
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
                              (data && data[EnumGrid.permiso_editar_opcion_montaje])
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

                  <div className="w-full items-center  !mb-4  !h-[8rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                      <div className="input-container items-center rowForm  w-[15%]">
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

                      <div className="input-container items-center rowForm  w-[15%]">
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
                            labelProps={"!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"}
                            customWidth={"!h-[2.5vw] text-[1vw]"}
                          />
                        </div>
                      </div>

                      <div className="input-container items-center rowForm  w-[15%]">
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
                            labelProps={"!translate-y-[-1.4vw] translate-x-[-1vw] !text-[1.2vw]"}
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
                      <div className="input-container items-center rowForm w-[15%]"></div>
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

export default FUsuarios;
