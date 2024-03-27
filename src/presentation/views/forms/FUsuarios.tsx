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
  nombre  : string | undefined;
  cargo   : string | undefined;
  telefono: string | undefined;
  correo  : string | undefined;
  estado  : string | undefined;


  permiso_venta: string | undefined;
  permiso_bodega: string | undefined;
  permiso_biselado: string | undefined;
  permiso_montaje: string | undefined;
  permiso_bodega_prod_term: string | undefined;
  permiso_empaque: string | undefined;
  permiso_adquisiciones: string | undefined;
  permiso_calculo: string | undefined;
  permiso_control: string | undefined;
  permiso_laboratorio: string | undefined;

  permiso_facturacion: string | undefined;
  permiso_post_venta:  string | undefined;


  permiso_editar_armazon: string | undefined;
  permiso_editar_estado_impresion: string | undefined;
  permiso_editar_validar_parametrizacion: string | undefined;
  permiso_editar_resolucion_garantia: string | undefined;
  permiso_editar_grupo_dioptria: string | undefined;
  permiso_editar_receta: string | undefined;
  permiso_editar_validar_cristales: string | undefined;
  permiso_editar_validar_armazones: string | undefined;

}
function insertarElementoEnPosicion(arreglo:any, nuevoElemento:any, posicion:any) {
  return arreglo.slice(0, posicion) + nuevoElemento + arreglo.slice(posicion);
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}
const permiso_area= [
  "permiso_adquisiciones",
  "permiso_calculo",
  'permiso_laboratorio',
  "permiso_control",
  "permiso_venta",
  "permiso_bodega",
  "permiso_biselado",
  "permiso_montaje",
  "permiso_bodega_prod_term",
  "permiso_empaque",
];

const permiso_campo = [
  "permiso_editar_armazon",
  "permiso_editar_estado_impresion",
  "permiso_editar_validar_parametrizacion",
  "permiso_editar_resolucion_garantia",
  "permiso_editar_grupo_dioptria",
  "permiso_editar_receta",
  "permiso_editar_validar_cristales",
  "permiso_editar_validar_armazones",
]

const permiso_archivoOT = [
  "permiso_facturacion",
  "permiso_post_venta"
]

export function transformInsertQuery(jsonData: any): any | null {


  const permisos_areas      = permiso_area.map((permiso:any)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('');
  const permisos_campos     = permiso_campo.map((permiso:any) => jsonData[permiso] === 'Lectura' ? "0" : "1").join('');
  const permisos_archivoOT  = permiso_archivoOT.map((permiso:any)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('');

  console.log(permisos_areas)


  let _p1 = ` "${jsonData.nombre}", 
              ${jsonData.cargo}, 
              "${jsonData.telefono}", 
              "${jsonData.correo}", 
              ${jsonData.estado === "Activo" ? 1 : 2},
              "${permisos_archivoOT}",
              "${permisos_campos}",
              "${permisos_areas}"
`
  _p1 = _p1.replace(/'/g, '!');  
  const query: OutputData = {
    query: "03",
    _p1
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
    `permisos_archivo_ot  = "${permiso_archivoOT.map((permiso)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('')}"`,
    `permisos_campos      = "${insertarElementoEnPosicion(permiso_campo.map((permiso) => jsonData[permiso] === 'Lectura' ? "0" : "1").join(''),'0', 1)}"`,
    `permisos_areas       = "${permiso_area.map((permiso)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('')}"`,
  ];


  console.log( `permisos_areas    = "${permiso_area.map((permiso)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('')}"`)
 
  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");

  _p1 = _p1.replace(/'/g, '!');
  
  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
    _p3: ""
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

const FUsuarios: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationUsusariosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const { escritura_lectura} = usePermission(24 || 0 );
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
      setValue
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("correo", "");
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

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
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

  

    const handleChange = (e:any) => {
      console.log(e)
      const {name,value} = e;

      setFormValues((prev:any)=>({
        ...prev,
        [name]:value
      }))
    }

    useEffect(()=>{
      if(data){
        setValue('permiso_editar_estado_impresion', data[EnumGrid.permiso_editar_estado_impresion_id])
        setValue('permiso_editar_armazon', data[EnumGrid.permiso_editar_armazon_id])
        setValue('permiso_editar_validar_parametrizacion', data[EnumGrid.permiso_editar_armazon_id])
        setValue('permiso_editar_resolucion_garantia', data[EnumGrid.permiso_editar_resolucion_garantia_id])
        setValue('permiso_editar_grupo_dioptria', data[EnumGrid.permiso_editar_grupo_dioptria_id])
        setValue('permiso_editar_receta', data[EnumGrid.permiso_editar_receta_id])
        setValue('permiso_editar_validar_cristales', data[EnumGrid.permiso_editar_validar_cristales_id])
        setValue('permiso_editar_validar_armazones', data[EnumGrid.permiso_editar_validar_armazones_id])
      }
    },[data])

    return (
      <div className="useFormContainer centered-div  !w-[70rem] !h-[45rem]">
        <div className="userFormBtnCloseContainer flex justify-between ">
          <h1 className="userFormLabel absolute left-[40%]">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario">
          <div className="userFormularioContainer !w-full ">
            
            <div className="w-full items-center flex !mb-4 ">
              <div className="input-container   items-center  flex justify-between rowForm w-[50%]">
                <div className="w-full !mt-4">
                  <TextInputComponent
                    type="text"
                    label="Nombre"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                    inputRef={firstInputRef}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
              <div className="w-full">
                  <SelectInputComponent
                    label="Cargo"
                    name="cargo"
                    showRefresh={true}
                    data={data && data[EnumGrid.cargo_id]}
                    control={control}
                    entidad={["/api/cargos/", "02"]}
                    error={errors.cargo}
                    customWidth={"w-full ml-[1rem]"}
                  />
                </div>   
              </div>
            </div>
            <div className="w-full items-center flex !mb-4">
            </div>


            <div className=" items-center flex !mb-4 ">


              <div className="input-container flex items-center rowForm w-[50%]">
                <div className="w-[60%]">
                  <TextInputComponent
                    type="text"
                    label="Teléfono"
                    name="telefono"
                    data={data && data[EnumGrid.telefono]}
                    control={control}
                    isOptional={true}
                    />
                </div>

                <div className="w-[40rem] ">
                  <TextInputComponent
                    type="email"
                    label="Correo"
                    name="correo"
                    data={data && data[EnumGrid.correo]}
                    control={control}
                    error={errors.correo}
                    onlyRead={isEditting}
                  />
                </div>
              </div>
              {/* <div className="input-containe items-center rowForm w-[30%]">
                
              </div>
 */}


              <div className="input-container flex justify-between !ml-10 items-center rowForm w-[70%]">
                <div className="w-[30%]">
                  <RadioButtonComponent
                    control={control}
                    label="Estado"
                    name="estado"
                    data={data && data[EnumGrid.estado]}
                    options={["Activo", "Suspendido"]}
                    error={errors.estado}
                    horizontal={false}
                  />
                </div>
                <div className="w-[30%]">
                  <RadioButtonComponent
                    control={control}
                    label="Documentación"
                    name="permiso_facturacion"
                    data={formValues && formValues["Documentacion"] || data && data[EnumGrid.permiso_documentacion]}
                    options={["Lectura", "Escritura"]}
                    error={errors.permiso_facturacion}
                    horizontal={false}
                  />
                </div>
                <div className="w-[30%]">
                  <RadioButtonComponent
                    control={control}
                    label="Post Venta"
                    name="permiso_post_venta"
                    data={formValues && formValues["Post Venta"] || data && data[EnumGrid.permiso_post_venta]}
                    options={["Lectura", "Escritura"]}
                    error={errors.permiso_post_venta}
                    horizontal={false}
                  />
                </div>
              </div>
            </div>



            <Tabs >
              <TabList className="flex ml-4">
                <Tab className="custom-tab !h-14 !w-[13rem]">Permisos de Áreas</Tab>
                <Tab className="custom-tab !h-14 !w-[13rem]">Permisos de Edición</Tab>
              </TabList>

              <TabPanel>

              <div className="frameOTForm">
                  <div className="w-full items-center !mt-7 !mb-4  !h-[10rem] ">
                    <div className="w-full items-center flex justify-evenly  input-container">
                        <div className="input-container items-center rowForm  w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Venta/Post Venta"
                              name="permiso_venta"
                              data={formValues && formValues["Venta/Post Venta"] || data && data[EnumGrid.permiso_venta]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_venta}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Bodega Insumos"
                              name="permiso_bodega"
                              data={formValues && formValues["Bodega Insumos"] || data && data[EnumGrid.permiso_bodega_insumo]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_bodega}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Taller Biselado"
                              name="permiso_biselado"
                              data={formValues && formValues["Taller Biselado"] || data && data[EnumGrid.permiso_Taller_biselado]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_biselado}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Taller Montaje"
                              name="permiso_montaje"
                              data={formValues && formValues["Taller Montaje"] || data && data[EnumGrid.permiso_taller_montaje]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_montaje}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Bod Prod Terminados"
                              name="permiso_bodega_prod_term"
                              data={formValues && formValues["Bod Prod Terminados"] || data && data[EnumGrid.permiso_bodega_p_terminados]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_bodega_prod_term}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                    </div>
                    
                  </div>
                  <div className="w-full items-center  !mb-4  !h-[8rem]">
                    <div className="w-full items-center flex justify-evenly  input-container">
                        <div className="input-container items-center rowForm  w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Empaque"
                              name="permiso_empaque"
                              data={formValues && formValues["Empaque"] || data && data[EnumGrid.permiso_empaque]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_empaque}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Adquisiciones"
                              name="permiso_adquisiciones"
                              data={formValues && formValues["Adquisiciones"] || data && data[EnumGrid.permiso_adquisiciones]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_adquisiciones}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Calculo"
                              name="permiso_calculo"
                              data={formValues && formValues["Calculo"] || data && data[EnumGrid.permiso_calculo]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_calculo}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Laboratorio"
                              name="permiso_laboratorio"
                              data={formValues && formValues["Laboratorio"] || data && data[EnumGrid.permiso_laboratorio]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_laboratorio}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
                            />
                          </div>
                        </div>
                        <div className="input-container items-center rowForm w-[14%]">
                          <div className="w-full">
                            <RadioButtonComponent
                              control={control}
                              label="Control"
                              name="permiso_control"
                              data={formValues && formValues["Control"] || data && data[EnumGrid.permiso_control]}
                              options={["Lectura", "Escritura"]}
                              error={errors.permiso_control}
                              horizontal={false}
                              onChange={(e:any)=>handleChange(e)}
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
                                data={formValues && formValues["Editar Armazón"] || data && data[EnumGrid.permiso_editar_armazon]}
                                options={["Lectura", "Escritura"]}
                                error={errors.permiso_editar_armazon}
                                horizontal={false}
                                onChange={(e:any)=>handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="input-container items-center rowForm w-[15%]">
                            <div className="w-full">
                              <RadioButtonComponent
                                control={control}
                                label="Estado Impresion"
                                name="permiso_editar_estado_impresion"
                                data={formValues && formValues["Estado Impresion"] || data && data[EnumGrid.permiso_editar_estado_impresion]}
                                options={["Lectura", "Escritura"]}
                                error={errors.permiso_editar_estado_impresion}
                                horizontal={false}
                                onChange={(e:any)=>handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="input-container items-center rowForm w-[15%]">
                            <div className="w-full">
                              <RadioButtonComponent
                                control={control}
                                label="Validar Parametri"
                                name="permiso_editar_validar_parametrizacion"
                                data={formValues && formValues["Validar Parametri"] || data && data[EnumGrid.permiso_editar_validar_parametrizacion]}
                                options={["Lectura", "Escritura"]}
                                error={errors.permiso_editar_validar_parametrizacion}
                                horizontal={false}
                                onChange={(e:any)=>handleChange(e)}
                              />
                            </div>
                          </div>
                          <div className="input-container items-center rowForm w-[15%]">
                            <div className="w-full">
                              <RadioButtonComponent
                                control={control}
                                label="Resolución Garantía"
                                name="permiso_editar_resolucion_garantia"
                                data={formValues && formValues["Resolución Garantía"] || data && data[EnumGrid.permiso_editar_resolucion_garantia]}
                                options={["Lectura", "Escritura"]}
                                error={errors.permiso_editar_resolucion_garantia}
                                horizontal={false}
                                onChange={(e:any)=>handleChange(e)}
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
                            label="Grupo Dioptria"
                            name="permiso_editar_grupo_dioptria"
                            data={formValues && formValues["Grupo Dioptria"] || data && data[EnumGrid.permiso_editar_grupo_dioptria]}
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_grupo_dioptria}
                            horizontal={false}
                            onChange={(e:any)=>handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Editar Receta"
                            name="permiso_editar_receta"
                            data={formValues && formValues["Editar Reeta"] || data && data[EnumGrid.permiso_editar_receta]}
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_receta}
                            horizontal={false}
                            onChange={(e:any)=>handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Validar Cristales"
                            name="permiso_editar_validar_cristales"
                            data={formValues && formValues["Validar Cristales"] || data && data[EnumGrid.permiso_editar_validar_cristales]}
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_validar_cristales}
                            horizontal={false}
                            onChange={(e:any)=>handleChange(e)}
                          />
                        </div>
                      </div>
                      <div className="input-container items-center rowForm w-[15%]">
                        <div className="w-full">
                          <RadioButtonComponent
                            control={control}
                            label="Validar Armazones"
                            name="permiso_editar_validar_armazones"
                            data={formValues && formValues["Validar Armazones"] || data && data[EnumGrid.permiso_editar_validar_armazones]}
                            options={["Lectura", "Escritura"]}
                            error={errors.permiso_editar_validar_armazones}
                            horizontal={false}
                            onChange={(e:any)=>handleChange(e)}
                          />
                        </div>
                      </div>
                  </div>

                  </div>


                </div>
              </TabPanel>
            </Tabs>



          </div>

          <div className="flex items-center">
          {isEditting && (
            <div className="!w-[8rem] !flex mx-auto bg-red-400">
              <button
                type="button"
                onClick={handlePermisos}
                className="absolute !w-[30%] bottom-[.02rem] left-5 userFormBtnSubmit"
                tabIndex={1}
              >
                Copiar Permisos
              </button>
            </div>
          )}

          <div className="w-full flex !-mt-10">
            <div className="mx-auto w-[30%]">
                {escritura_lectura && (
                  <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
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





















/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import {
//   RadioButtonComponent,
//   SelectInputComponent,
//   TextInputComponent,
// } from "../../components";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { validationUsusariosSchema } from "../../utils/validationFormSchemas";
// import { EnumGrid } from "../mantenedores/MUsuarios";
// import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
// import { useCrud, usePermission } from "../../hooks";
// import { useModal } from "../../hooks/useModal";
// import useCustomToast from "../../hooks/useCustomToast";
// import { toast } from "react-toastify";
// import { Button } from "@material-tailwind/react";
// import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

// const strBaseUrl = "/api/usuarios/";
// const strEntidad = "Usuario ";

// export interface InputData {
//   nombre  : string | undefined;
//   cargo   : string | undefined;
//   telefono: string | undefined;
//   correo  : string | undefined;
//   estado  : string | undefined;


//   permiso_venta: string | undefined;
//   permiso_bodega: string | undefined;
//   permiso_biselado: string | undefined;
//   permiso_montaje: string | undefined;
//   permiso_bodega_prod_term: string | undefined;
//   permiso_empaque: string | undefined;
//   permiso_adquisiciones: string | undefined;
//   permiso_calculo: string | undefined;
//   permiso_control: string | undefined;
//   permiso_proyecto: string | undefined;


//   permiso_editar_armazon: string | undefined;
//   permiso_editar_estado_impresion: string | undefined;
//   permiso_editar_validar_parametrizacion: string | undefined;
//   permiso_editar_resolucion_garantia: string | undefined;
//   permiso_editar_grupo_dioptria: string | undefined;
//   permiso_editar_receta: string | undefined;
//   permiso_editar_validar_cristales: string | undefined;
//   permiso_editar_validar_armazones: string | undefined;

// }
// function insertarElementoEnPosicion(arreglo:any, nuevoElemento:any, posicion:any) {
//   return arreglo.slice(0, posicion) + nuevoElemento + arreglo.slice(posicion);
// }

// interface OutputData {
//   query: string;
//   _p1: string;
//   _p2?: string;
//   _p3?: string;
// }
// const permiso_area= [
//   "permiso_venta",
//   "permiso_bodega",
//   "permiso_biselado",
//   "permiso_montaje",
//   "permiso_bodega_prod_term",
//   "permiso_empaque",
//   "permiso_adquisiciones",
//   "permiso_calculo",
//   "permiso_control",
//   "permiso_proyecto"
// ];

// const permiso_campo = [
//   "permiso_editar_armazon",
//   "permiso_editar_estado_impresion",
//   "permiso_editar_validar_parametrizacion",
//   "permiso_editar_resolucion_garantia",
//   "permiso_editar_grupo_dioptria",
//   "permiso_editar_receta",
//   "permiso_editar_validar_cristales",
//   "permiso_editar_validar_armazones",
// ]

// export function transformInsertQuery(jsonData: any): any | null {


//   const permisos_areas  = permiso_area.map((permiso:any)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('');
//   const permisos_campos = permiso_campo.map((permiso:any) => jsonData[permiso] === 'Lectura' ? "0" : "1").join('');

//   let _p1 = ` "${jsonData.nombre}", 
//               ${jsonData.cargo}, 
//               "${jsonData.telefono}", 
//               "${jsonData.correo}", 
//               ${jsonData.estado === "Activo" ? 1 : 2},
              
//               ${permisos_campos},
//               ${permisos_areas}`;

//   _p1 = _p1.replace(/'/g, '!');  
//   const query: OutputData = {
//     query: "03",
//     _p1
//   };

//   // console.log(query)

//   return query;
// }
 
// export function transformUpdateQuery(
//   jsonData: any,
//   primaryKey: string
// ): OutputData | null {

//   const fields = [
//     `nombre            ="${jsonData.nombre}"`,
//     `telefono          ="${jsonData.telefono}"`,
//     `correo            ="${jsonData.correo}"`,
//     `estado            = ${jsonData.estado === "Activo" ? 1 : 2}`,
//     `cargo             = ${jsonData.cargo}`,
//     `permisos_campos   = "${insertarElementoEnPosicion(permiso_campo.map((permiso) => jsonData[permiso] === 'Lectura' ? "0" : "1").join(''),'0', 1)}"`,
//     `permisos_areas    = "${permiso_area.map((permiso)=>jsonData[permiso] === 'Lectura' ? "0" : "1").join('')}"`,
//   ];


//   // console.log
 
//   const filteredFields = fields.filter(
//     (field) => field !== null && field !== ""
//   );

//   if (filteredFields.length === 0) {
//     return null;
//   }
//   let _p1 = filteredFields.join(",");

//   _p1 = _p1.replace(/'/g, '!');
  
//   const query = {
//     query: "04",
//     _p1,
//     _p2: primaryKey,
//     _p3: ""
//   };
//   return query;
// }

// interface IUserFormPrps {
//   closeModal: () => void;
//   data?: any[];
//   label: string;
//   isEditting?: any;
//   selectedRows?: any;
//   setEntities?: any;
//   params?: any;
// }

// const FUsuarios: React.FC<IUserFormPrps> = React.memo(
//   ({ closeModal, setEntities, params, label, data, isEditting }) => {
//     const schema = validationUsusariosSchema();
//     const { showModal, CustomModal } = useModal();
//     const { show } = useCustomToast();
//     const { escritura_lectura} = usePermission(24 || 0 );
//     const [formValues, setFormValues] = useState<any>();
  

//     const {
//       editEntity,
//       createdEntity,
//       ListEntity,
//       firstInputRef,
//       focusFirstInput,
//       // secondInputRef,
//       focusSecondInput,
//     } = useCrud(strBaseUrl);
//     const [blnKeep, setblnKeep] = useState(false);
//     const intId = data && data[EnumGrid.id];
//     const {
//       control,
//       handleSubmit,
//       formState: { errors },
//       setValue,
//       getValues
//     } = useForm({
//       resolver: yupResolver(schema),
//     });

//     const resetTextFields = React.useCallback(() => {
//       setValue("nombre", "");
//       setValue("telefono", "");
//       setValue("correo", "");
//       if (firstInputRef.current) {
//         const firstInput = firstInputRef.current.querySelector(
//           'input[name="nombre"]'
//         );
//         if (firstInput) {
//           firstInput.focus();
//         }
//       }
//     }, [setValue, firstInputRef]);

//     const updateNewEntity = React.useCallback(async () => {
//       const newEntityData = await ListEntity(params, "01");
//       setEntities(newEntityData);
//     }, [params, setEntities, ListEntity]);

//     const toastSuccess = (isEditting: boolean) => {
//       show({
//         message: isEditting
//           ? strEntidad.concat(SUCCESS_MESSAGES.edit)
//           : strEntidad.concat(SUCCESS_MESSAGES.create),
//         type: "success",
//       });
//     };

//     const handleApiResponse = React.useCallback(
//       async (response: any, isEditting: boolean) => {
//         if (response.code === "ERR_BAD_RESPONSE" || response.stack) {
//           const errorMessage = isEditting
//                 ? strEntidad.concat(": " + response.message)
//                 : strEntidad.concat(": " + response.message)
//           show({
//             message: errorMessage ? errorMessage : response.code,
//             type: "error",
//           });
          
//           return;
//         }
        
//         if(response.mensaje.includes('Creado')){
//           toastSuccess(isEditting);
//         }
//         if (!blnKeep && !isEditting) {
//           const result = await showModal(
//             MODAL.keep,
//             '',
//             MODAL.keepYes,
//             MODAL.kepNo
//           );
//           if (result) {
//             setblnKeep(true);
//             resetTextFields();
//             updateNewEntity();
//           } else {
//             closeModal();
//             updateNewEntity();
//           }

//           // toastSuccess(isEditting);
//         }

//         if (isEditting) {
//           updateNewEntity();
//           closeModal();
//           toastSuccess(isEditting);
//         }

//         resetTextFields();
//         updateNewEntity();
//       },
//       [closeModal, blnKeep, updateNewEntity, showModal]
//     );

//     useEffect(() => {
//       const handleKeyDown = (event: KeyboardEvent) => {
//         if (event.key === "Escape") {
//           closeModal();
//         }
//       };

//       window.addEventListener("keydown", handleKeyDown);

//       return () => {
//         window.removeEventListener("keydown", handleKeyDown);
//       };
//     }, [closeModal]);

//     const handleSaveChange = React.useCallback(
//       async (data: InputData, isEditting: boolean) => {
//         const toastLoading = toast.loading('Cargando...');
//         try {
//           const transformedData = isEditting
//             ? transformUpdateQuery(data, intId.toString())
//             : transformInsertQuery(data);

//           const response = isEditting
//             ? await editEntity(transformedData)
//             : await createdEntity(transformedData);
            
//           handleApiResponse(response, isEditting);
//           toast.dismiss(toastLoading)
//         } catch (error: any) {
//           toast.dismiss(toastLoading)
//           show({
//             message: error,
//             type: "error",
//           });
          
//         }
//       },
//       [editEntity, createdEntity, handleApiResponse, intId]
//     );

//     const handlePermisos = React.useCallback(async () => {
//       try {
//         // console.log("click");
//         const intUserId = data && data[EnumGrid.id];
//         const primaryKey = `_id=${intUserId}`;
//         const query = "99";

//         const response = await ListEntity(primaryKey, query);

//         response[0][0] === "OK"
//           ? show({ message: TITLES.permisos, type: "success" })
//           : show({ message: TITLES.permisosError, type: "error" });
//       } catch (error: any) {
//         console.log(error);
//         show({ message: error, type: "error" });
//       }
//     }, []);

//     useEffect(() => {
//       isEditting ? focusSecondInput("nombre") : focusFirstInput("nombre");
//     }, []);

//     // console.log(escritura_lectura)

//     console.log(data && data[EnumGrid.permiso_editar_validar_armazones])
//     console.log(data && data[EnumGrid.permiso_editar_validar_armazones_id])
//     // console.log(data)
//     console.log(errors)

//     const handleChange = (e:any) => {
//       console.log(e)
//       const {name,value} = e;

//       setFormValues((prev:any)=>({
//         ...prev,
//         [name]:value
//       }))
//     }
//     console.log(formValues)
    
//     return (
//       <div className="useFormContainer centered-div  !w-[90rem] !h-[45rem]">
//         <div className="userFormBtnCloseContainer flex justify-between ">
//           <h1 className="userFormLabel absolute left-[40%]">{label}</h1>
//           <button onClick={closeModal} className="userFormBtnClose">
//             X
//           </button>
//         </div>

//         <form
//           onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
//           className="userFormulario">
//           <div className="userFormularioContainer !w-full ">
            
//             <div className="w-full items-center flex !mb-4 ">
//               <div className="input-container   items-center  flex justify-between rowForm w-[50%]">
//                 <div className="w-full !mt-4">
//                   <TextInputComponent
//                     type="text"
//                     label="Nombre"
//                     name="nombre"
//                     data={data && data[EnumGrid.nombre]}
//                     control={control}
//                     error={errors.nombre}
//                     inputRef={firstInputRef}
//                     // isOptional={}
//                     // onlyRead={}
                    
//                   />
//                 </div>
//               </div>
//               <div className="input-container items-center rowForm w-[50%]">
//               <div className="w-full">
//                   <SelectInputComponent
//                     label="Cargo"
//                     name="cargo"
//                     showRefresh={true}
//                     data={data && data[EnumGrid.cargo_id]}
//                     control={control}
//                     entidad={["/api/cargos/", "02"]}
//                     error={errors.cargo}
//                     customWidth={"w-full ml-[1rem]"}
//                   />
//                 </div>   
//               </div>
//             </div>
//             <div className="w-full items-center flex !mb-4">
//             </div>


//             <div className="w-full items-center flex !mb-4 ">
//               <div className="input-container items-center rowForm w-[30%]">
//                 <div className="w-full">
//                   <TextInputComponent
//                     type="text"
//                     label="Teléfono"
//                     name="telefono"
//                     data={data && data[EnumGrid.telefono]}
//                     control={control}
//                     isOptional={true}
//                     />
//                 </div>
//               </div>
//               <div className="input-container items-center rowForm w-[35%]">
//                 <div className="w-full">
//                   <TextInputComponent
//                     type="email"
//                     label="Correo"
//                     name="correo"
//                     data={data && data[EnumGrid.correo]}
//                     control={control}
//                     error={errors.correo}
//                     onlyRead={isEditting}
//                   />
//                 </div>
//               </div>

//               <div className="input-container items-center rowForm w-[40%]">
//                 <div className="w-full">
//                   <RadioButtonComponent
//                     control={control}
//                     label="Estado"
//                     name="estado"
//                     data={data && data[EnumGrid.estado]}
//                     options={["Activo", "Suspendido"]}
//                     error={errors.estado}
//                     horizontal={true}
//                   />
//                 </div>
//               </div>


//             </div>



//             <Tabs>
//               <TabList className="flex">
//                 <Tab className="custom-tab !h-14">Permisos Áreas</Tab>
//                 <Tab className="custom-tab !h-14">Permisos Campos</Tab>
//               </TabList>

//               <TabPanel>
//                 <div className="w-full items-center !mt-7 !mb-4  !h-[10rem]">







//                   <div className="w-full items-center flex justify-between  input-container">
//                       <div className="input-container items-center rowForm  w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="VTA"
//                             name="permiso_venta"
//                             data={formValues && formValues["VTA"] || data && data[EnumGrid.permiso_venta]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_venta}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="BI"
//                             name="permiso_bodega"
//                             data={formValues && formValues["BI"] || data && data[EnumGrid.permiso_bodega_insumo]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_bodega}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="TC"
//                             name="permiso_biselado"
//                             data={formValues && formValues["TC"] || data && data[EnumGrid.permiso_Taller_biselado]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_biselado}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="TM"
//                             name="permiso_montaje"
//                             data={formValues && formValues["TM"] || data && data[EnumGrid.permiso_taller_montaje]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_montaje}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="BPT"
//                             name="permiso_bodega_prod_term"
//                             data={formValues && formValues["BPT"] || data && data[EnumGrid.permiso_bodega_p_terminados]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_bodega_prod_term}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                   </div>
                  
//                 </div>
//                 <div className="w-full items-center  !mb-4  !h-[8rem]">
//                   <div className="w-full items-center flex justify-between  input-container">
//                       <div className="input-container items-center rowForm  w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="EMP"
//                             name="permiso_empaque"
//                             data={formValues && formValues["EMP"] || data && data[EnumGrid.permiso_empaque]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_empaque}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="ADQ"
//                             name="permiso_adquisiciones"
//                             data={formValues && formValues["ADQ"] || data && data[EnumGrid.permiso_adquisiciones]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_adquisiciones}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="CAL"
//                             name="permiso_calculo"
//                             data={formValues && formValues["CAL"] || data && data[EnumGrid.permiso_calculo]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_calculo}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="CON"
//                             name="permiso_control"
//                             data={formValues && formValues["CON"] || data && data[EnumGrid.permiso_control]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_control}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container items-center rowForm w-[15%]">
//                         <div className="w-full">
//                           <RadioButtonComponent
//                             control={control}
//                             label="PRO"
//                             name="permiso_proyecto"
//                             data={formValues && formValues["PRO"] || data && data[EnumGrid.permiso_proyecto]}
//                             options={["Lectura", "Lectura/Escritura"]}
//                             error={errors.permiso_proyecto}
//                             horizontal={false}
//                             onChange={(e:any)=>handleChange(e)}
//                           />
//                         </div>
//                       </div>
//                   </div>
                  
//                 </div>
//               </TabPanel>

//               <TabPanel>
//                 <div className="w-full items-center !mt-7  !mb-4  !h-[10rem]">



//                     <div className="w-full items-center flex justify-between  input-container">
//                         <div className="input-container items-center rowForm  w-[15%]">
//                           <div className="w-full">
//                             <RadioButtonComponent
//                               control={control}
//                               label="Editar Armazón"
//                               name="permiso_editar_armazon"
//                               data={formValues && formValues["Editar Armazón"] || data && data[EnumGrid.permiso_editar_armazon_id]}
//                               options={["Lectura", "Lectura/Escritura"]}
//                               error={errors.permiso_editar_armazon}
//                               horizontal={false}
//                               onChange={(e:any)=>handleChange(e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="input-container items-center rowForm w-[15%]">
//                           <div className="w-full">
//                             <RadioButtonComponent
//                               control={control}
//                               label="Estado Impresion"
//                               name="permiso_editar_estado_impresion"
//                               data={formValues && formValues["Estado Impresion"] || data && data[EnumGrid.permiso_editar_estado_impresion_id]}
//                               options={["Lectura", "Lectura/Escritura"]}
//                               error={errors.permiso_editar_estado_impresion}
//                               horizontal={false}
//                               onChange={(e:any)=>handleChange(e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="input-container items-center rowForm w-[15%]">
//                           <div className="w-full">
//                             <RadioButtonComponent
//                               control={control}
//                               label="Validar Parametri"
//                               name="permiso_editar_validar_parametrizacion"
//                               data={formValues && formValues["Validar Parametri"] || data && data[EnumGrid.permiso_editar_validar_parametrizacion_id]}
//                               options={["Lectura", "Lectura/Escritura"]}
//                               error={errors.permiso_editar_validar_parametrizacion}
//                               horizontal={false}
//                               onChange={(e:any)=>handleChange(e)}
//                             />
//                           </div>
//                         </div>
//                         <div className="input-container items-center rowForm w-[15%]">
//                           <div className="w-full">
//                             <RadioButtonComponent
//                               control={control}
//                               label="Resolución Garantía"
//                               name="permiso_editar_resolucion_garantia"
//                               data={formValues && formValues["Resolución Garantía"] || data && data[EnumGrid.permiso_editar_resolucion_garantia_id]}
//                               options={["Lectura", "Lectura/Escritura"]}
//                               error={errors.permiso_editar_resolucion_garantia}
//                               horizontal={false}
//                               onChange={(e:any)=>handleChange(e)}
//                             />
//                           </div>
//                         </div>
//                     </div>

//                 </div>
//                 <div className="w-full items-center  !mb-4  !h-[8rem]">
//                 <div className="w-full items-center flex justify-between  input-container">
//                     <div className="input-container items-center rowForm  w-[15%]">
//                       <div className="w-full">
//                         <RadioButtonComponent
//                           control={control}
//                           label="Grupo Dioptria"
//                           name="permiso_editar_grupo_dioptria"
//                           data={formValues && formValues["Grupo Dioptria"] || data && data[EnumGrid.permiso_editar_grupo_dioptria_id]}
//                           options={["Lectura", "Lectura/Escritura"]}
//                           error={errors.permiso_editar_grupo_dioptria}
//                           horizontal={false}
//                           onChange={(e:any)=>handleChange(e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="input-container items-center rowForm w-[15%]">
//                       <div className="w-full">
//                         <RadioButtonComponent
//                           control={control}
//                           label="Editar Receta"
//                           name="permiso_editar_receta"
//                           data={formValues && formValues["Editar Reeta"] || data && data[EnumGrid.permiso_editar_receta_id]}
//                           options={["Lectura", "Lectura/Escritura"]}
//                           error={errors.permiso_editar_receta}
//                           horizontal={false}
//                           onChange={(e:any)=>handleChange(e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="input-container items-center rowForm w-[15%]">
//                       <div className="w-full">
//                         <RadioButtonComponent
//                           control={control}
//                           label="Validar Cristales"
//                           name="permiso_editar_validar_cristales"
//                           data={formValues && formValues["Validar Cristales"] || data && data[EnumGrid.permiso_editar_validar_cristales_id]}
//                           options={["Lectura", "Lectura/Escritura"]}
//                           error={errors.permiso_editar_validar_cristales}
//                           horizontal={false}
//                           onChange={(e:any)=>handleChange(e)}
//                         />
//                       </div>
//                     </div>
//                     <div className="input-container items-center rowForm w-[15%]">
//                       <div className="w-full">
//                         <RadioButtonComponent
//                           control={control}
//                           label="Validar Armazones"
//                           name="permiso_editar_validar_armazones"
//                           data={formValues && formValues["Validar Armazones"] || data && data[EnumGrid.permiso_editar_validar_armazones_id]}
//                           options={["Lectura", "Lectura/Escritura"]}
//                           error={errors.permiso_editar_validar_armazones}
//                           horizontal={false}
//                           onChange={(e:any)=>handleChange(e)}
//                         />
//                       </div>
//                     </div>
//                 </div>

//                 </div>
//               </TabPanel>
//             </Tabs>



//           </div>


//           {isEditting && (
//             <div className="!w-[8rem] !flex mx-auto bg-red-400">
//               <button
//                 type="button"
//                 onClick={handlePermisos}
//                 className="absolute !w-[30%] bottom-[1rem] left-5 userFormBtnSubmit"
//                 tabIndex={1}
//               >
//                 Copiar Permisos
//               </button>
//             </div>
//           )}

//           <div className="w-full flex !-mt-10">
//             <div className="mx-auto w-[30%]">
//                 {escritura_lectura && (
//                   <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
//                     {`${TITLES.guardar}`}
//                   </Button>
//                 )}
//             </div>
//           </div>


//         </form>

//         <CustomModal />
//       </div>
//     );
//   }
// );

// export default FUsuarios;
