/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  validationReporteAtencionSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MProyectosAtenciones";
import {  MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import {toast} from 'react-toastify'
import FrameComponent from "../../components/FrameComponent";

const strBaseUrl = "/api/proyectoreporteatencion/";
const strEntidad = "Reporte de Atención ";

export interface InputData {
  proyecto              : string | undefined;
  titulo                : string | undefined;
  licitacion            : string | undefined;
  folio_reporte         : string | undefined;
  fecha_desde           : string | undefined;
  fecha_hasta           : string | undefined;
  cantidad_lentes       : string | undefined; 
  total_atenciones      : string | undefined;
  orden_compra_mandante : string | undefined;
  fecha_vb              : string | undefined;
  factura               : string | undefined;
  fecha_factura         : string | undefined;
  total_factura         : string | undefined;
  nota_credito          : string | undefined;
  fecha_ncredito        : string | undefined;
  total_ncredito        : string | undefined;
  nota_debito           : string | undefined;
  fecha_ndebito         : string | undefined;
  total_ndebito         : string | undefined;
  guia_despacho         : string | undefined;
  fecha_guia_despacho   : string | undefined;
  observaciones         : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // (proyecto, folio_reporte, fecha_desde, fecha_hasta, orden_compra_mandante, 
  //   fecha_vb, factura, fecha_factura, total_factura, nota_credito, fecha_ncredito, total_ncredito, 
  //   nota_debito, fecha_ndebito, total_ndebito, guia_despacho, fecha_guia_despacho, observaciones)

  if(jsonData.fecha_desde && jsonData.fecha_hasta){  
    if(new Date(jsonData.fecha_desde) > new Date(jsonData.fecha_hasta)){
      toast.error('Fecha desde mayor a la fecha hasta')
      throw new Error('')
    }
  }

    // if(new Date(jsonData.fecha_hasta as string) >= fechaActual){
    //   toast.error('fecha actual mayor a fecha hasta')
    //   throw new Error('')
    // }

    // if(new Date(jsonData.fecha_vb as string) >= fechaActual){
    //   toast.error('fecha actual mayor a fecha vB')
    //   throw new Error('')
    // }

    // if(new Date(jsonData.fecha_factura as string) >= fechaActual){
    //   toast.error('fecha factura mayor a fecha actual')
    //   throw new Error('')
    // }

    // if( new Date(jsonData.fecha_ncredito as string) >= fechaActual){
    //   toast.error('fecha nota de credito mayor a fecha actual')
    //   throw new Error('')
    // }

    // if(new Date(jsonData.fecha_ndebito as string) >= fechaActual){
    //   toast.error('fecha nota de debito mayor a fecha actual')
    //   throw new Error('')
    // }

    // if(new Date(jsonData.fecha_guia_despacho as string) >= fechaActual){
    //   toast.error('fecha guia de despacho mayor a fecha actual')
    //   throw new Error('')
    // }

  



  let _p1 = `
 "${jsonData.proyecto}", 
  ${jsonData.folio_reporte}, 
 "${jsonData.fecha_desde}", 
 "${jsonData.fecha_hasta}", 
 "${jsonData.orden_compra_mandante}", 
 "${jsonData.fecha_vb}", 
  ${(jsonData.factura && jsonData.factura?.toString())?.length === 0 ? "0" : jsonData.factura}, 
 "${jsonData.fecha_factura}", 
  ${(jsonData.total_factura && jsonData.total_factura?.toString())?.length === 0 ? "0" : jsonData.total_factura}, 
  ${(jsonData.nota_credito && jsonData.nota_credito?.toString())?.length === 0 ? "0" : jsonData.nota_credito}, 
 "${jsonData.fecha_ncredito}", 
  ${(jsonData.total_ncredito && jsonData.total_ncredito?.toString())?.length === 0 ? "0" : jsonData.total_ncredito}, 
  ${(jsonData.nota_debito && jsonData.nota_debito?.toString())?.length === 0 ? "0" : jsonData.nota_debito}, 
 "${jsonData.fecha_ndebito}", 
  ${(jsonData.total_ndebito && jsonData.total_ndebito?.toString())?.length === 0 ? "0" : jsonData.total_ndebito}, 
  ${(jsonData.guia_despacho && jsonData.guia_despacho?.toString())?.length === 0 ? "0" : jsonData.guia_despacho}, 
 "${jsonData.fecha_guia_despacho}", 
 "${jsonData.observaciones}"`;


  const pktodelete = [{
    proyecto: jsonData.proyecto,
    fecha_desde: jsonData.fecha_desde,
    fecha_hasta: jsonData.fecha_hasta
  }]

  _p1 = _p1.replace(/'/g, '!');


  const query = {
    query: "03",
    _p1,
    _pkToDelete: JSON.stringify(pktodelete)
  };

console.log("query: ", query);
  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    `orden_compra_mandante= "${jsonData.orden_compra_mandante}"`, 
    `fecha_vb             = "${jsonData.fecha_vb}"`, 
    `factura              =  ${(jsonData.factura && jsonData.factura?.toString())?.length === 0 ? "0" : jsonData.factura}`, 
    `fecha_factura        = "${jsonData.fecha_factura}"`, 
    `total_factura        =  ${(jsonData.total_factura && jsonData.total_factura?.toString())?.length === 0 ? "0" : jsonData.total_factura}`, 
    `nota_credito         =  ${(jsonData.nota_credito && jsonData.nota_credito?.toString())?.length === 0 ? "0" : jsonData.nota_credito}`, 
    `fecha_ncredito       = "${jsonData.fecha_ncredito}"`, 
    `total_ncredito       =  ${(jsonData.total_ncredito && jsonData.total_ncredito?.toString())?.length === 0 ? "0" : jsonData.total_ncredito}`, 
    `nota_debito          =  ${(jsonData.nota_debito && jsonData.nota_debito?.toString())?.length === 0 ? "0" : jsonData.nota_debito}`, 
    `fecha_ndebito        = "${jsonData.fecha_ndebito}"`, 
    `total_ndebito        =  ${(jsonData.total_ndebito && jsonData.total_ndebito?.toString())?.length === 0 ? "0" : jsonData.total_ndebito}`, 
    `guia_despacho        =  ${(jsonData.guia_despacho && jsonData.guia_despacho?.toString())?.length === 0 ? "0" : jsonData.guia_despacho}`, 
    `fecha_guia_despacho  = "${jsonData.fecha_guia_despacho}"`, 
    `observaciones        = "${jsonData.observaciones}"`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');

  
  const query: OutputData = {
    query: "04",
    _p1,
    _p2: jsonData.proyecto,
    _p3: jsonData.folio_reporte?.toString(),
  };
  console.log("query04", query);
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

const FProyectosAtenciones: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationReporteAtencionSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
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
      setValue("folio_reporte", "");
      setValue("cantidad_lentes", "");
      setValue("total_atenciones", "");
      setValue("orden_compra_mandante", "");
      setValue("factura", "");
      setValue("total_factura", "");
      setValue("nota_credito", "");
      setValue("total_ncredito", "");
      setValue("nota_debito", "");
      setValue("total_ndebito", "");
      setValue("guia_despacho", "");
      setValue("observaciones", "");
          if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="proyecto"]'
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
        // if (response.code === "ERR_BAD_RESPONSE" || response.stack || response.datos.length >= 1) {
        //   const errorMessage = isEditting
        //   ? strEntidad.concat(": " + response.datos && response.datos[0] ? response.datos[0][0] : response.message )
        //   : strEntidad.concat(": " + response.datos && response.datos[0] ? response.datos[0][0] : response.message )
        //   show({
        //     message: errorMessage ? errorMessage : response.code,
        //     type: "error",
        //   });
          
        //   return;
        // }
        if (response.code === "ERR_BAD_RESPONSE" || response.stack || (response.datos && response.datos.length >= 1)) {
          let errorMessage = strEntidad + ": ";
          if (response.datos && response.datos.length >= 1 && response.datos[0][0]) {
            errorMessage += response.datos[0][0];
          } else {
            errorMessage += response.message;
          }
        
          show({
            message: errorMessage,
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
      focusFirstInput("proyecto");
    }, []);

    return (
      <div className="useFormContainer centered-div use70rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>
 
        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center h-[4rem] ">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full ">
                    <SelectInputComponent
                      label="Proyecto"
                      name="proyecto"
                      showRefresh={true}
                      data={data && data[EnumGrid.proyecto]}
                      control={control}
                      entidad={["/api/proyectos/", "02"]}
                      error={errors.proyecto}
                      inputRef={firstInputRef}
                      readOnly={isEditting}
                      customWidth={"!ml-[1rem] !w-[38rem] "}
                      />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Folio"
                    name="folio_reporte"
                    data={data && data[EnumGrid.folio_reporte]}
                    control={control}
                    error={errors.folio_reporte}
                    onlyRead={isEditting}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[15%]">
                <div className="w-full">
                  <TextInputComponent
                    type="date"
                    label="Fecha Desde"
                    name="fecha_desde"
                    data={data && data[EnumGrid.fecha_desde]}
                    control={control}
                    error={errors.fecha_desde}
                    onlyRead={isEditting}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[15%]">
                <div className="w-full">
                  <TextInputComponent
                    type="date"
                    label="Fecha Hasta"
                    name="fecha_hasta"
                    data={data && data[EnumGrid.fecha_hasta]}
                    control={control}
                    error={errors.fecha_hasta}
                    onlyRead={isEditting}
                  />
                </div>
              </div>
          </div>

          <div className="w-full items-center flex h-[80px] ">
            <div className="input-container items-center rowForm w-[19.5%]">
              <div className="w-full">
                <TextInputComponent
                    type="number"
                    label="Nro Lentes"
                    name="cantidad_lentes"
                    data={data && data[EnumGrid.cantidad_lentes]}
                    control={control}
                    error={errors.cantidad_lentes}
                    onlyRead={true}
                    />
              </div>
            </div>
            <div className="input-container items-center rowForm w-[20%]">
              <div className="w-full">
                <TextInputComponent
                  type="number"
                  label="Total Atenciones"
                  name="total_atenciones"
                  data={data && data[EnumGrid.total_atenciones]}
                  control={control}
                  error={errors.total_atenciones}
                  onlyRead={true}
                  />
              </div>
            </div>
            <div className="input-container items-center rowForm w-[45.5%]">
              <div className="w-full">
                <TextInputComponent
                  type="text"
                  label="Orden Compra Mandante"
                  name="orden_compra_mandante"
                  data={data && data[EnumGrid.orden_compra_mandante]}
                  control={control}
                  error={errors.orden_compra_mandante}
                />
              </div>
            </div>
            <div className="input-container items-center rowForm w-[15%]">
              <div className="w-full">
                <TextInputComponent
                  type="date"
                  label="Fecha VB"
                  name="fecha_vb"
                  data={data && data[EnumGrid.fecha_vb]}
                  control={control}
                  error={errors.fecha_vb}
                />
              </div>
            </div>
          </div>

          <div className="w-full items-center flex h-[90px] mt-[25px] !mb-[40px]">
            <div className="!w-[50%] flex">
                <FrameComponent label="Factura">
                <div className="flex">
                  <TextInputComponent
                    type="number"
                    label="Factura"
                    name="factura"
                    data={data && data[EnumGrid.factura]}
                    control={control}
                    error={errors.factura}
                    customWidth={"!w-[10rem]"}
                    />
            </div>
            <div className="flex">
                  <TextInputComponent
                    type="date"
                    label="Fecha"
                    name="fecha_factura"
                    data={data && data[EnumGrid.fecha_factura]}
                    control={control}
                    error={errors.fecha_factura}
                    customWidth={"!w-[10rem]"}
                  />
              
              </div>
            <div className="flex">
                  <TextInputComponent
                    type="number"
                    label="Total"
                    name="total_factura"
                    data={data && data[EnumGrid.total_factura]}
                    control={control}
                    error={errors.total_factura}
                    customWidth={"!w-[10rem]"}
                  />
          </div>
              </FrameComponent>
          </div>

            <div className="flex !w-[50%]">
            <FrameComponent label="Nota de Crédito">
                    <TextInputComponent
                      type="number"
                      label="Nota Crédito"
                      name="nota_credito"
                      data={data && data[EnumGrid.nota_credito]}
                      control={control}
                      error={errors.nota_credito}
                    />
                  
                    <TextInputComponent
                      type="date"
                      label="Fecha"
                      name="fecha_ncredito"
                      data={data && data[EnumGrid.fecha_ncredito]}
                      control={control}
                      error={errors.fecha_ncredito}
                    />
                  
                    <TextInputComponent
                      type="number"
                      label="Total"
                      name="total_ncredito"
                      data={data && data[EnumGrid.total_ncredito]}
                      control={control}
                      error={errors.total_ncredito}
                    />
              </FrameComponent>
              </div>
          </div>

          {/* <div className="w-full items-center flex h-[80px] !my-4">
            <div className="input-container items-center rowForm w-[50%]">
              <FrameComponent label="Factura">
                <div className="flex">
                  <div className="w-[40%]">
                    <TextInputComponent
                        type="number"
                        label="Factura"
                        name="factura"
                        data={data && data[EnumGrid.factura]}
                        control={control}
                        error={errors.factura}
                      />
                  </div>

                  <div className="w-[30%]">
                    <TextInputComponent
                      type="date"
                      label="Fecha"
                      name="fecha_factura"
                      data={data && data[EnumGrid.fecha_factura]}
                      control={control}
                      error={errors.fecha_factura}
                    />
                  </div>
                
                  <div className="w-[35%]">
                    <TextInputComponent
                      type="number"
                      label="Total"
                      name="total_factura"
                      data={data && data[EnumGrid.total_factura]}
                      control={control}
                      error={errors.total_factura}
                    />
                  </div>
                </div >
              </FrameComponent>

            </div>
            <div className="input-container items-center rowForm w-[50%]">
                <FrameComponent
                 label="Nota de Crédito" 
                >
                  <div className="flex">
                    
                    <div className="w-[40%]">
                      <TextInputComponent
                        type="number"
                        label="Nota Crédito"
                        name="nota_credito"
                        data={data && data[EnumGrid.nota_credito]}
                        control={control}
                        error={errors.nota_credito}
                      />
                    </div>
                    
                    <div className="w-[30%]">
                      <TextInputComponent
                        type="date"
                        label="Fecha"
                        name="fecha_ncredito"
                        data={data && data[EnumGrid.fecha_ncredito]}
                        control={control}
                        error={errors.fecha_ncredito}
                      />
                    </div>
                    
                    <div className="w-[35%]">
                      <TextInputComponent
                        type="number"
                        label="Total"
                        name="total_ncredito"
                        data={data && data[EnumGrid.total_ncredito]}
                        control={control}
                        error={errors.total_ncredito}
                      />
                    </div>

                  </div>
                </FrameComponent>
            </div>
          </div> */}

          {/* <div className="w-full items-center flex h-[80px] !mt-6 !mb-2">

            <div className="input-container items-center rowForm w-[50%]">
                <FrameComponent
                  label="Nota de Débito"
                >
                  <div className="flex">
                  <div className="w-[40%]">
                    <TextInputComponent
                        type="number"
                        label="Nota Débito"
                        name="nota_debito"
                        data={data && data[EnumGrid.nota_debito]}
                        control={control}
                        error={errors.nota_debito}
                      />
                  </div>

                  <div className="w-[30%]">
                    <TextInputComponent
                      type="date"
                      label="Fecha"
                      name="fecha_ndebito"
                      data={data && data[EnumGrid.fecha_ndebito]}
                      control={control}
                      error={errors.fecha_ndebito}
                    />
                  </div>
                  <div className="w-[35%]">
                    <TextInputComponent
                      type="number"
                      label="Total"
                      name="total_ndebito"
                      data={data && data[EnumGrid.total_ndebito]}
                      control={control}
                      error={errors.total_ndebito}
                    />
                  </div>
                  </div>
                </FrameComponent>

            </div>

            <div className="input-container items-center rowForm w-[50%]">
              <FrameComponent
               label="Guia despacho"
              >
                <div className="flex">
                  <div className="w-[37%]">
                    <TextInputComponent
                      type="number"
                      label="Guia Despacho"
                      name="guia_despacho"
                      data={data && data[EnumGrid.guia_despacho]}
                      control={control}
                      error={errors.guia_despacho}
                    />
                  </div>
                  <div className="w-[30%]">
                    <TextInputComponent
                      type="date"
                      label="Fecha"
                      name="fecha_guia_despacho"
                      data={data && data[EnumGrid.fecha_guia_despacho]}
                      control={control}
                      error={errors.fecha_guia_despacho}
                    />
                  </div>
                </div>
              </FrameComponent>
            </div>
          </div> */}

          <div className="w-full items-center flex h-[50px]">
            <div className="input-container items-center rowForm w-full">
              <div className="w-full">
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

export default FProyectosAtenciones;
