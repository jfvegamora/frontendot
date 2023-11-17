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
import { fechaActual, validationProyectosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectos";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import {toast} from 'react-toastify'
import ContactComponent from "../../components/ContactComponent";
import FrameComponent from "../../components/FrameComponent";


const strBaseUrl = "/api/proyectos/";
const strEntidad = "Proyecto ";

interface InputData {
    codigo_proyecto       : string | undefined;
    codigo_licitacion     : string | undefined;
    titulo_proyecto       : string | undefined;
    estado                : string | undefined;
    empresa_adjudicada    : string | undefined;
    mandante              : string | undefined;
    unidad_compra         : string | undefined;
    fecha_adjudicacion    : string | undefined;
    fecha_inicio          : string | undefined;
    fecha_termino         : string | undefined;
    cantidad_requerida    : string | undefined;
    presupuesto           : string | undefined;
    dias_entrega          : string | undefined;
    ejecutivo_proyecto    : string | undefined;
    administrador_nombre  : string | undefined;
    administrador_correo  : string | undefined;
    administrador_telefono: string | undefined;
    referente_nombre      : string | undefined;
    referente_correo      : string | undefined;
    referente_telefono    : string | undefined;
    contabilidad_nombre   : string | undefined;
    contabilidad_correo   : string | undefined;
    contabilidad_telefono : string | undefined;
    finanzas_nombre       : string | undefined;
    finanzas_correo       : string | undefined;
    finanzas_telefono     : string | undefined;
    oftalmologo           : string | 0;
    observaciones         : string | undefined;
  }
  
  
interface OutputData {
  query: string;
  _p1?: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // (codigo, codigo_licitacion, titulo, estado, empresa, mandante, unidad_compra, 
  //   fecha_adjudicacion, fecha_inicio, fecha_termino, cantidad_requerida, presupuesto, dias_de_entrega, 
  //   ejecutivo, contacto_adm_nombre, contacto_adm_correo, contacto_adm_telefono, 
  //   referente_tec_nombre, referente_tec_correo, referente_tec_telefono, 
  //   contacto_conta_nombre, contacto_conta_correo, contacto_conta_telefono, 
  //   contacto_fin_nombre, contacto_fin_correo, contacto_fin_telefono, punto_venta, oftalmologo, observaciones )

      //  ${jsonData.cantidad_requerida !== null ? jsonData.cantidad_requerida : 0}, 

      if(jsonData.fecha_adjudicacion && jsonData.fecha_inicio && jsonData.fecha_termino){        
        if(fechaActual <= new Date(jsonData.fecha_adjudicacion as string)){
          toast.error('Fecha de adjudicacion mayor a Fecha actual')
          throw new Error()
        }
        
        if(jsonData.fecha_adjudicacion > jsonData.fecha_inicio){
          toast.error('Fecha de inicio mayor a fecha de adjudicacion')
          throw new Error()
        }

        if(jsonData.fecha_inicio > jsonData.fecha_termino){
          toast.error('Fecha de inicio mayor a fecha de termino ')
          throw new Error()
        }
      }


      let _p2 = ` 
      "${jsonData.codigo_proyecto}", 
      "${jsonData.codigo_licitacion}", 
      "${jsonData.titulo_proyecto}", 
       ${jsonData.estado === "Abierto" ? 1 : 2},
       ${jsonData.empresa_adjudicada}, 
       ${jsonData.mandante}, 
      "${jsonData.unidad_compra}", 
      "${jsonData.fecha_adjudicacion}", 
      "${jsonData.fecha_inicio}", 
      "${jsonData.fecha_termino}", 
       ${jsonData.cantidad_requerida || 0}, 
       ${jsonData.presupuesto || 0}, 
       ${jsonData.dias_entrega || 0}, 
       ${jsonData.ejecutivo_proyecto || ""}, 
      "${jsonData.administrador_nombre || ""}", 
      "${jsonData.administrador_correo}", 
      "${jsonData.administrador_telefono}", 
      "${jsonData.referente_nombre}", 
      "${jsonData.referente_correo}", 
      "${jsonData.referente_telefono}", 
      "${jsonData.contabilidad_nombre}", 
      "${jsonData.contabilidad_correo}", 
      "${jsonData.contabilidad_telefono}", 
      "${jsonData.finanzas_nombre}", 
      "${jsonData.finanzas_nombre}", 
      "${jsonData.finanzas_telefono}", 
       ${jsonData.oftalmologo},
      "${jsonData.observaciones}"`;
  
    _p2 = _p2.replace(/'/g, '!');

    const query: OutputData = {
      query: "03",
      _p2,
    };
  
    console.log('query', query)
    return query;
  }
export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  console.log(jsonData)
  const fields = [
    `codigo_licitacion          ="${jsonData.codigo_licitacion}"`,
    `titulo                     ="${jsonData.titulo_proyecto}"`,
    `estado                     = ${jsonData.estado === "Abierto" ? 1 : 2}`,
    `empresa                    = ${jsonData.empresa_adjudicada}`,
    `mandante                   = ${jsonData.mandante}`,
    `unidad_compra              ="${jsonData.unidad_compra}"`,
    `fecha_adjudicacion         ="${jsonData.fecha_adjudicacion}"`,
    `fecha_inicio               ="${jsonData.fecha_inicio}"`,
    `fecha_termino              ="${jsonData.fecha_termino}"`,
    `cantidad_requerida         = ${jsonData.cantidad_requerida}`,
    `presupuesto                = ${jsonData.presupuesto}`,
    `dias_de_entrega            = ${jsonData.dias_entrega}`,
    `ejecutivo                  = ${jsonData.ejecutivo_proyecto}`,
    `contacto_adm_nombre        ="${jsonData.administrador_nombre}"`,
    `contacto_adm_correo        ="${jsonData.administrador_correo}"`,
    `contacto_adm_telefono      ="${jsonData.administrador_telefono}"`,
    `referente_tec_nombre       ="${jsonData.referente_nombre}"`,
    `referente_tec_correo       ="${jsonData.referente_correo}"`,
    `referente_tec_telefono     ="${jsonData.referente_telefono}"`,
    `contacto_conta_nombre      ="${jsonData.contabilidad_nombre}"`,
    `contacto_conta_correo      ="${jsonData.contabilidad_correo}"`,
    `contacto_conta_telefono    ="${jsonData.contabilidad_telefono}"`,
    `contacto_fin_nombre        ="${jsonData.finanzas_nombre}"`,
    `contacto_fin_correo        ="${jsonData.finanzas_correo}"`,
    `contacto_fin_telefono      ="${jsonData.finanzas_telefono}"`,
    `oftalmologo                = ${jsonData.oftalmologo}`,
    `observaciones              ="${jsonData.observaciones}"`,
  ];
  

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
   let _p2 = filteredFields.join(",");
  // console.log("primaryKey", primaryKey);
  _p2 = _p2.replace(/'/g, '!');

  console.log(_p2)
  const query = {
    query: "04",
    _p2,
    _p3: primaryKey,
  };
  console.log("query", query);
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

const FProyectos: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectosSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      secondInputRef,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.CODIGO];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
      shouldUnregister:false
    });
    

    const resetTextFields = React.useCallback(() => {
      setValue("codigo_proyecto", "");
      setValue("codigo_licitacion", "");
      setValue("titulo_proyecto", "");
      setValue("unidad_compra", "");
      setValue("fecha_adjudicacion", "");
      setValue("fecha_inicio", "");
      setValue("fecha_termino", "");
      setValue("dias_entrega", "");
      setValue("cantidad_requerida", "");
      setValue("cantidad_atendida", "");
      setValue("total_facturado", "");
      setValue("cantidad_disponible", "");
      setValue("saldo_disponible", "");
      setValue("avance", "");
      setValue("administrador_nombre", "");
      setValue("administrador_correo", "");
      setValue("administrador_telefono", "");
      setValue("contabilidad_nombre", "");
      setValue("contabilidad_correo", "");
      setValue("contabilidad_telefono", "");
      setValue("referente_nombre", "");
      setValue("referente_correo", "");
      setValue("referente_telefono", "");
      setValue("finanzas_nombre", "");
      setValue("finanzas_correo", "");
      setValue("finanzas_telefono", "");
      setValue("observaciones", "");
      
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo_proyecto"]'
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
        console.log(data);
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
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



    useEffect(() => {
      isEditting ? focusSecondInput("codigo_licitacion") : focusFirstInput("codigo_proyecto");
    }, []);

    return (
      <div className="useFormContainer top-2  h-[95vh] useFormContainer70rem ">
        <div className="userFormBtnCloseContainer absolute right-4">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>
        
        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
        >
          <div className="userFormularioContainer">

            <div className="w-full items-center flex h-[80px] mt-[20px] mb-[10px]">
                
                <div className="input-container items-center rowForm w-[25%]">
                  <div className="w-full">
                      <SelectInputComponent
                          label="Empresa Adjudicada"
                          name="empresa_adjudicada"
                          showRefresh={true}
                          data={data && data[EnumGrid.EMPRESA_ID]}
                          control={control}
                          entidad={["/api/empresas/", "02"]}
                          error={errors.empresa_adjudicada}
                          customWidth={"345px"}
                          inputRef={secondInputRef}
                      />
                  </div>
                </div>

                <div className="input-container items-center rowForm w-[25%]">
                  <div className="w-full">
                      <SelectInputComponent
                          label="Mandante"
                          name="mandante"
                          showRefresh={true}
                          data={data && data[EnumGrid.MANDANTE_ID]}
                          control={control}
                          entidad={["/api/mandantes/", "02"]}
                          error={errors.mandante}
                          customWidth={"345px"}
                      />
                  </div>
                </div>
                <div className="input-container items-center rowForm w-[25%]">
                  <div className="w-full">
                      <SelectInputComponent
                          label="Ejecutivo de proyecto"
                          name="ejecutivo_proyecto"
                          showRefresh={true}
                          data={data && data[EnumGrid.EJECUTIVO_ID]}
                          control={control}
                          entidad={["/api/usuarios/", "02"]}
                          error={errors.ejecutivo_proyecto}
                          customWidth={"345px"}
                          inputRef={secondInputRef}
                      />
                  </div>
                </div>
                <div className="input-container items-center rowForm w-[25%]">
                  <div className="w-full">
                      <SelectInputComponent
                          label="Oftalmólogos"
                          name="oftalmologo"
                          showRefresh={true}
                          data={data && data[EnumGrid.OFTALMOLOGO_ID]}
                          control={control}
                          entidad={["/api/oftalmologos/", "02"]}
                          error={errors.oftalmologo}
                          customWidth={"345px"}
                          inputRef={secondInputRef}
                      />
                  </div>
                </div>

            </div>
            <div className="w-full items-center flex h-[80px] mt-[10px] mb-[10px]">

              <div className="input-container items-center rowForm w-[15%]">
                <div className="w-full mr-2">
                    <TextInputComponent
                        type="text"
                        label="Código Proyecto"
                        name="codigo_proyecto"
                        data={data && data[EnumGrid.CODIGO]}
                        control={control}
                        error={errors.codigo_proyecto}
                        onlyRead={isEditting}
                    />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[15%]">
                  <div className="w-full mr-2">
                      <TextInputComponent
                          type="text"
                          label="Código Licitacion"
                          name="codigo_licitacion"
                          data={data && data[EnumGrid.CODIGO_LICITACION]}
                          control={control}
                          error={errors.codigo_licitacion}
                      />
                  </div>
              </div>

              <div className="input-container items-center rowForm w-[50%]">
                <div className="w-full mr-2">
                    <TextInputComponent
                        type="text"
                        label="Título"
                        name="titulo_proyecto"
                        data={data && data[EnumGrid.TITULO]}
                        control={control}
                        error={errors.titulo_proyecto}
                    />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[25%]">
                  <div className="w-full">
                    <RadioButtonComponent
                        control={control}
                        label="Estado"
                        name="estado"
                        data={data && data[EnumGrid.ESTADO]}
                        options={["Abierto", "Cerrado"]}
                        error={errors.estado}
                        horizontal={true}
                    />
                  </div>
              </div>
            </div>
                      
           <div className="w-full items-center flex h-[80px] mt-[30px] mb-[10px]">

            <div className="input-container items-center rowForm w-full">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="text"
                          label="Unidad Compra"
                          name="unidad_compra"
                          data={data && data[EnumGrid.UNIDAD_COMPRA]}
                          control={control}
                          error={errors.unidad_compra}
                  />
              </div>          
            </div>

            <div className="input-container items-center rowForm w-[15%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="date"
                          label="Fecha adjudicacion"
                          name="fecha_adjudicacion"
                          data={data && data[EnumGrid.FECHA_ADJUDICACION]}
                          control={control}
                          error={errors.fecha_adjudicacion}
                  />
              </div>          
            </div>

            <div className="input-container items-center rowForm w-[12%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="date"
                          label="Fecha Inicio"
                          name="fecha_inicio"
                          data={data && data[EnumGrid.FECHA_INICIO]}
                          control={control}
                          error={errors.fecha_inicio}
                  />
              </div>          
            </div>
            
            <div className="input-container items-center rowForm w-[13%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="date"
                          label="Fecha Término"
                          name="fecha_termino"
                          data={data && data[EnumGrid.FECHA_TERMINO]}
                          control={control}
                          error={errors.fecha_termino}
                  />
              </div>          
            </div>

            <div className="input-container items-center rowForm w-[25%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Dias de entrega"
                          name="dias_entrega"
                          data={data && data[EnumGrid.DIAS_DE_ENTREGA]}
                          control={control}
                          error={errors.dias_entrega}
                  />
            </div>



            
            </div>
            <div className="input-container items-center rowForm w-[22%]">
                <div className="w-full mr-2">
                  <TextInputComponent
                        type="number"
                        label="% Avance"
                        name="avance"
                        // data={data && data[EnumGrid.DIAS_DE_ENTREGA]}
                        control={control}
                        onlyRead={true}
                   />
                </div> 
            </div>

           </div>  



           <div className="w-full items-center flex h-[80px] mt-[25px] mb-[10px]">

            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Cantidad Requerida"
                          name="cantidad_requerida"
                          data={data && data[EnumGrid.CANTIDAD_REQUERIDA]}
                          control={control}
                          error={errors.cantidad_requerida}
                  />
              </div>          
            </div>
            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Presupuesto"
                          name="presupuesto"
                          data={data && data[EnumGrid.PRESUPUESTO]}
                          control={control}
                          error={errors.presupuesto}
                  />
              </div>          
            </div>
            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Cantidad Atendida"
                          name="cantidad_atendida"
                          // data={data && data[EnumGrid.]}
                          control={control}
                          onlyRead={true}
                          />
              </div>          

            </div>
            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Total Facturado"
                          name="total_facturado"
                          // data={data && data[EnumGrid]}
                          control={control}
                          onlyRead={true}
                          />
              </div>          
            </div>
            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Cantidad Disponible"
                          name="cantidad_disponible"
                          // data={data && data[EnumGrid.DIAS_DE_ENTREGA]}
                          control={control}
                          onlyRead={true}
                          />
              </div> 
            </div>
            <div className="input-container items-center rowForm w-[16%]">
              <div className="w-full mr-2">
                  <TextInputComponent
                          type="number"
                          label="Saldo Disponible"
                          name="saldo_disponible"
                          // data={data && data[EnumGrid.DIAS_DE_ENTREGA]}
                          control={control}
                          onlyRead={true}
                          />
              </div> 
            </div>
           </div>      


            <div className="w-full items-center flex h-[90px] mt-[15px] mb-[20px]">
                  <FrameComponent>
                      <ContactComponent
                        label="Contacto Administrativo"
                        control={control}
                        errors={errors}
                        nombre="administrador_nombre"
                        telefono="administrador_telefono"
                        correo="administrador_correo"
                        dataNombre={data && data[EnumGrid.CONTACTO_ADMINISTRADOR_NOMBRE]}
                        dataCorreo={data && data[EnumGrid.CONTACTO_ADMINISTRADOR_TELEFONO]}
                        dataTelefono={data && data[EnumGrid.CONTACTO_ADMINISTRADOR_CORREO]}
                      />
                  </FrameComponent>
          

               
                  <FrameComponent>
                    <ContactComponent
                    label="Contacto Contabilidad"
                    control={control}
                    errors={errors}
                    nombre="contabilidad_nombre"
                    telefono="contabilidad_telefono"
                    correo="contabilidad_correo"
                    dataNombre={data && data[EnumGrid.CONTACTO_CONTABILIDAD_NOMBRE]}
                    dataTelefono={data && data[EnumGrid.CONTACTO_CONTABILIDAD_TELEFON]}
                    dataCorreo={data && data[EnumGrid.CONTACTO_CONTABILIDAD_CORREO]}
                    />
                  </FrameComponent>
            </div>

            <div className="w-full items-center flex h-[50px] !mt-[30px] mb-[10px]">
                   <FrameComponent>
                      <ContactComponent
                        label="Referente Técnino"
                        control={control}
                        errors={errors}
                        nombre="referente_nombre"
                        telefono="referente_telefono"
                        correo="referente_correo"
                        dataNombre={data && data[EnumGrid.REFERENTE_TECNICO_NOMBRE]}
                        dataCorreo={data && data[EnumGrid.REFERENTE_TECNICO_CORREO]}
                        dataTelefono={data && data[EnumGrid.REFERENTE_TECNICO_TELEFONO]}
                      />
                  </FrameComponent>
                  <FrameComponent>
                      <ContactComponent
                        label="Contacto Finanzas"
                        control={control}
                        errors={errors}
                        nombre="finanzas_nombre"
                        telefono="finanzas_telefono"
                        correo="finanzas_correo"
                        dataNombre={data && data[EnumGrid.CONTACTO_FINANZAS_NOMBRE]}
                        dataCorreo={data && data[EnumGrid.CONTACTO_FINANZAS_CORREO]}
                        dataTelefono={data && data[EnumGrid.CONTACTO_FINANZAS_TELEFONO]}
                      />
                  </FrameComponent>

               
            </div>
            
            <div className="w-[98%] items-center flex h-[50px] mt-[30px] mb-[25px]">
              <div className="input-container imput-center rowForm w-[50%]">
                  <div className="w-full items-center">
                      <TextInputComponent
                          type="text"
                          label="Observaciones"
                          name="observaciones"
                          data={data && data[EnumGrid.OBSERVACIONES]}
                          control={control}
                          error={errors.observaciones}
                      />
                  </div>
              </div>

              <div className="w-1/2 flex justify-end items-center">
                  <div className="w-1/2 items-center">
                    {escritura_lectura && (
                      <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                        {`${TITLES.guardar}`}
                      </button>
                    )}
                  </div>
              </div>

            </div>


          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FProyectos;
