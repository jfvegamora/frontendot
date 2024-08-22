import React, { useEffect, useState } from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "..";
import { EnumGrid } from "../../views/mantenedores/MOTHistorica";
// import { Switch , switchButton} from "@material-tailwind/react";
import Switch from "react-switch";
import axios from "axios";
import {
  validation_A1_armazon,
  validation_A2_armazon,
  validationFechaAtencion,
  validationOTlevel1,
  validationOTlevel2,
  validationPuntoVenta,
} from "../../utils/validationOT";
import {
  codigoProyecto,
  EmpresaAdjudicadaOT_ID,
  fecha_atencion_signal,
  fecha_despacho,
  fecha_entrega_cliente,
  fecha_entrega_taller,
  fetchFechas,
  isToggleImpression,
  isToggleValidation,
  punto_venta,
  validar_parametrizacion,
} from "../../utils";
import SelectInputTiposComponent from "../forms/SelectInputTiposComponent";
import { AppStore, useAppSelector } from "../../../redux/store";
import { toast } from "react-toastify";
import TextInputInteractive from "../forms/TextInputInteractive";
import { EnumAreas } from "../OTPrimaryButtons";
import { inputOnlyReadReserva } from "../../utils/FReservaArmazones_utils";
import {
  isToggleMontajeValidation,
  resetOptiLabSwitchs,
} from "../../utils/FOTCristales_utils";
import { URLBackend } from "../../utils/config";

interface IOptica {
  control: any;
  onDataChange: any;
  formValues: any;
  data: any;
  setToggle?: any;
  isEditting?: boolean;
  setIsMotivo?: any;
  onlyRead?: boolean;
  permiso_usuario_estado_impresion: boolean;
  permiso_usuario_estado_validacion: boolean;
  permiso_usuario_resolucion_garantia: boolean;
  permiso_areas_estado_validacion: boolean;
  permisos_areas_estado_immpresion: boolean;
  permiso_areas_resolucion_garantia: boolean;
  permiso_area_worktraking: boolean;
  permiso_usuario_workTracking: boolean;
}

const FOTOptica: React.FC<IOptica> = ({
  control,
  onDataChange,
  formValues,
  data,
  setToggle,
  isEditting,
  setIsMotivo,
  onlyRead,
  permiso_usuario_estado_impresion,
  permiso_usuario_estado_validacion,
  permiso_area_worktraking,
  // permiso_usuario_resolucion_garantia,
  permiso_usuario_workTracking,

  permiso_areas_estado_validacion,
  permisos_areas_estado_immpresion,
  // permiso_areas_resolucion_garantia
}) => {
  const strUrl = `${URLBackend}/api/ot/listado`;
  const [_motivo, setMotivo] = useState(false);
  const [strCodigoProyecto, setStrCodigoProyecto] = useState("");
  const userID: any = useAppSelector((store: AppStore) => store.user?.id);
  const User: any = useAppSelector((store: AppStore) => store.user);
  const _origen: any = useAppSelector(
    (store: AppStore) => store.OTAreas.areaActual
  );
  const proyectoRedux = useAppSelector((store: AppStore) => store.listBox);
  const _estado = data && data[EnumGrid.estado_id];
  const permisos_usuario_areas =
    User.permisos_areas[EnumAreas[_origen]] === "1" ? true : false;

  const [inputsRef] = useState({
    firstInputRef: React.useRef<HTMLInputElement>(null),
  });

  // console.log(_estado)

  const handleInputChange = (e: any) => {
    const { name, value } = e;

    console.log(name);
    console.log(value);

    if (name === "proyecto_codigo") {
      EmpresaAdjudicadaOT_ID.value = proyectoRedux["Nombre Proyecto"].find(
        (proyecto: any) => proyecto[0] === value
      )[2];
      // if(EmpresaAdjudicadaOT_ID.value !== 3){
      //     console.log('render')
      //     resetOptiLabSwitchs()
      // }else{
      //     console.log('render')
      //     validation_A1_armazon('32')
      //     validation_A2_armazon('32')
      // }

      if (EmpresaAdjudicadaOT_ID.value === 3) {
        validation_A1_armazon("32");
        validation_A2_armazon("32");
      } else {
        validation_A1_armazon("");
        validation_A2_armazon("");
      }

      resetOptiLabSwitchs();
      setStrCodigoProyecto(value);
    }

    if (name === "fecha_atencion") {
      fetchFechas(value, strCodigoProyecto);
      onDataChange({ [name]: value });
    }

    if (name === "Resolucion") {
      handleSwitchResolucion(value);
    }

    validationOTlevel1(name, value);
    validationOTlevel2(name, value);
    //metodo para validar pasando name value
    if (name === "resolucion_garantia") {
      setToggle(value);
    }

    if (name === "motivo") {
      setMotivo((prev) => !prev);
      setIsMotivo((prev: any) => !prev);
    }

    onDataChange({ [name]: value });
    // Envia los datos al componente padre
  };

  const handleSwitchResolucion = async (value: string) => {
    try {
      const query = `?query=08&_folio=${data[EnumGrid.folio]}&_p2=${
        value === "Rechazada" ? 0 : 1
      }&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`;
      const result = await axios(`${strUrl}/${query}`);
      if (result.status === 200) {
        toast.success("Resolucion cambiada");
      }
    } catch (error) {
      // console.log(error)
      throw error;
    }
  };

  const handleSwitchValidation = async (event: any) => {
    // console.log(event)
    try {
      const query = `?query=07&_folio=${data[EnumGrid.folio]}&_p2=${
        event === true ? 1 : 0
      }&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`;
      const result = await axios(`${strUrl}/${query}`);
      if (result.status === 200) {
        toast.success("Estado cambiado");
        validar_parametrizacion.value =
          validar_parametrizacion.value === "1" ? "0" : "1";
        validar_parametrizacion.value === "1"
          ? (isToggleValidation.value = true)
          : (isToggleValidation.value = false);
      }
    } catch (error) {
      // console.log(error)
      throw error;
    }
  };

  const handleSwitchImpresion = async (event: any) => {
    // setIsToggleImpresion((prev)=>!prev)
    const toastLoading = toast.loading("Cargando...");
    try {
      console.log();
      const dataJson = [
        {
          folio: data[EnumGrid.folio],
        },
      ];
      const estado_impresion = event === true ? 1 : 0;
      // ? const query = `?query=06&_dataJSON=${encodeURIComponent(JSON.stringify(data_JSON))}&_p2=${estado_impresion}&_usuario=${usuario.id}&_origen=${origen}`
      // const query = `?query=06&_folio=${data[EnumGrid.folio]}&_p2=${event === true ? 1 : 0}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
      const query = `?query=06&_dataJSON=${encodeURIComponent(
        JSON.stringify(dataJson)
      )}&_p2=${estado_impresion}&_usuario=${userID}&_origen=${_origen}`;
      const result = await axios(`${strUrl}/${query}`);
      if (result.status === 200) {
        // console.log(result)
        result.data[0][0] === 1
          ? (isToggleImpression.value = true)
          : (isToggleImpression.value = false);
        toast.dismiss(toastLoading);
        toast.success("Estado cambiado");
      }
      toast.dismiss(toastLoading);
    } catch (error) {
      toast.dismiss(toastLoading);
      throw error;
    }
  };

  useEffect(() => {
    fetchFechas(
      isEditting
        ? data?.[EnumGrid.fecha_atencion]
        : fecha_atencion_signal.value,
      codigoProyecto.value
    );
    onDataChange({ [" "]: " " });
    validationFechaAtencion(fecha_atencion_signal.value);
    validationPuntoVenta(punto_venta.value as any);
  }, [codigoProyecto.value, fecha_atencion_signal.value]);

  const handleKeyDown: any = React.useCallback(
    (e: KeyboardEvent) => {
      const focusedElement = document.activeElement;

      if (focusedElement instanceof HTMLInputElement) {
        const inputName = focusedElement.name;
        if (inputName === "numero_envio" && e.key === "Tab") {
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
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll Y:", window.scrollY);
    };

    // Agregar el event listener al scroll de la ventana
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); //

  return (
    <form action="" onKeyDown={handleKeyDown} className="  h-[85vh] ">
      <div className="frameOTForm !h-[85vh]">
        <div className="w-[95vw] flex items-center rowForm !h-[6vw]  justify-between">
          <div className="labelInput w-[50%] mt-6 mb-8 ml-[2rem]">
            <SelectInputComponent
              label="Nombre Proyecto"
              name="proyecto_codigo"
              showRefresh={true}
              isOT={true}
              handleSelectChange={handleInputChange}
              // data={codigoProyecto.value || formValues && formValues["proyecto_codigo"] ? formValues["proyecto_codigo"]  : data && data[EnumGrid.proyecto_codigo]}
              data={
                codigoProyecto.value || (data && data[EnumGrid.proyecto_codigo])
              }
              control={control}
              entidad={
                isEditting
                  ? ["/api/proyectos/", "02"]
                  : ["/api/proyectos/", "07", `${isEditting ? 0 : userID}`]
              }
              // error={errors.establecimiento}
              customWidth={"!h-[2.8vw]"}
              // labelProps={"text-[3vw]"}
              onlyFirstOption={isEditting}
              inputRef={inputsRef.firstInputRef}
              readOnly={isEditting || inputOnlyReadReserva.value}
            />
          </div>

          {isEditting && !onlyRead && (
            <>
              <div className="w-[20vw]  ml-4 px-[1vw] text-[1.3vw]  ">
                <div className=" items-center flex inputStyles">
                  <Switch
                    onChange={(e) => handleSwitchValidation(e)}
                    checked={isToggleValidation.value}
                    disabled={
                      !(
                        permiso_usuario_estado_validacion &&
                        permiso_areas_estado_validacion
                      )
                    }
                  />
                  <label className="ml-2">Validar Parametrización</label>
                </div>
              </div>

              <div className="w-[20vw] px-[1vw] text-[1.5vw] ">
                <div className=" items-center flex inputStyles">
                  <Switch
                    onChange={(e) => handleSwitchImpresion(e)}
                    checked={isToggleImpression.value}
                    disabled={
                      !(
                        permiso_usuario_estado_impresion &&
                        permisos_areas_estado_immpresion
                      )
                    }
                  />
                  <label className="ml-2">OT Impresa</label>
                </div>
              </div>
            </>
          )}

          {(EmpresaAdjudicadaOT_ID.value === 3 || isEditting) && (
            <div className="w-[20vw] px-[1vw] text-[1.5vw] ">
              <div className=" items-center flex inputStyles">
                <Switch
                  onChange={() => {
                    isToggleMontajeValidation.value =
                      !isToggleMontajeValidation.value;
                    if (isToggleMontajeValidation.value === true) {
                      validation_A1_armazon("32");

                      validation_A2_armazon("32");
                      onDataChange({
                        ["montaje_validacion"]: isToggleMontajeValidation.value,
                      });
                    } else {
                      validation_A1_armazon("");
                      validation_A2_armazon("");
                      console.log("render");
                      onDataChange({
                        ["montaje_validacion"]: isToggleMontajeValidation.value,
                      });
                    }
                  }}
                  disabled={isEditting}
                  checked={isToggleMontajeValidation.value}
                />

                <label className="ml-2">{"Con Montaje"}</label>
              </div>
            </div>
          )}
        </div>

        <div className="w-full flex items-center rowForm !h-[5vw]">
          <div className="labelInput w-[30%] ml-[2rem] -mt-[0.3rem]">
            <SelectInputComponent
              label="Punto de Venta"
              name="punto_venta_id"
              showRefresh={true}
              isOT={true}
              handleSelectChange={handleInputChange}
              data={
                punto_venta.value || (data && data[EnumGrid.punto_venta_id])
              }
              // data={data && data[EnumGrid.establecimiento_id]}
              control={control}
              entidad={
                isEditting
                  ? ["/api/puntosventa/", "02"]
                  : [
                      "/api/puntosventa/",
                      "06",
                      codigoProyecto.value,
                      `_p2=${userID}`,
                    ]
              }
              onlyFirstOption={!isEditting}
              customWidth={"!h-[2.8vw]"}
              isEditting={isEditting}
              formValues={formValues}
              readOnly={isEditting || inputOnlyReadReserva.value}
            />
          </div>

          <div className="labelInput w-[25%] ml-4">
            <RadioButtonComponent
              control={control}
              label="Motivo"
              name="motivo"
              data={
                formValues
                  ? formValues["motivo"]
                  : (data && data[EnumGrid.motivo]) || (!isEditting && "Venta")
              }
              options={["Venta", "Garantía"]}
              // error={errors.sexo}
              horizontal={true}
              readOnly={true}
              onChange={handleInputChange}
              isOT={true}
              labelProps={"!translate-y-[-1.4vw] translate-x-[-1vw] "}
              customWidth={"!h-[3vw] labelInput"}
            />
          </div>

          <div className="w-[20%] ml-4 labelInput">
            <TextInputComponent
              type="text"
              label="Ubicación"
              name="ubicacion"
              handleChange={handleInputChange}
              data={
                formValues
                  ? formValues["ubicacion"]
                  : data && data[EnumGrid.ot_ubicacion]
              }
              control={control}
              onlyRead={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>

          <div className="w-[20%] ml-4 labelInput">
            <TextInputComponent
              type="text"
              label="Área actual"
              name="area"
              handleChange={handleInputChange}
              data={
                formValues ? formValues["area"] : data && data[EnumGrid.area]
              }
              control={control}
              onlyRead={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>

          <div className="labelInput w-[20%] ml-4">
            <TextInputComponent
              type="text"
              label="Estado actual"
              name="estado"
              handleChange={handleInputChange}
              data={
                formValues
                  ? formValues["estado"]
                  : data && data[EnumGrid.estado]
              }
              control={control}
              onlyRead={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>
        </div>

        <div className="w-full flex items-center rowForm !h-[5vw] ml-2 ">
          <div className="labelInput w-[20vw] ml-4">
            <TextInputInteractive
              type="date"
              label="Fecha atención"
              name="fecha_atencion"
              handleChange={handleInputChange}
              data={
                (isEditting
                  ? data && data[EnumGrid.fecha_atencion]
                  : fecha_atencion_signal.value) ||
                (formValues && formValues["fecha_atencion"])
              }
              control={control}
              onlyRead={isEditting}
              isOT={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center labelInput"
              // inputRef={inputsRef.lastInputRef}
            />
          </div>
          <div className="w-[20vw] labelInput ">
            <TextInputInteractive
              type="date"
              label="Fecha taller"
              name="fecha_entrega_taller"
              handleChange={handleInputChange}
              data={
                fecha_entrega_taller.value ||
                (data && data[EnumGrid.fecha_entrega_taller]) ||
                (formValues && formValues["fecha_entrega_taller"])
              }
              control={control}
              onlyRead={isEditting}
              isOT={true}
              isOptional={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>
          <div className="w-[20vw] labelInput">
            <TextInputInteractive
              type="date"
              label="Fecha despacho"
              name="fecha_despacho"
              handleChange={handleInputChange}
              data={
                fecha_despacho.value ||
                (data && data[EnumGrid.fecha_despacho]) ||
                (formValues && formValues["fecha_entrega_taller"])
              }
              control={control}
              onlyRead={isEditting}
              isOT={true}
              isOptional={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>
          <div className="labelInput w-[20vw]">
            <TextInputInteractive
              type="date"
              label="Fecha entrega cliente"
              name="fecha_entrega_cliente"
              handleChange={handleInputChange}
              data={
                fecha_entrega_cliente.value ||
                (data && data[EnumGrid.fecha_entrega_cliente]) ||
                (formValues && formValues["fecha_entrega_taller"])
              }
              control={control}
              onlyRead={isEditting}
              isOT={true}
              isOptional={true}
              customWidth={"!h-[3vw] labelInput"}
              textAlign="text-center"
            />
          </div>
        </div>

        <div className="w-full flex items-center rowForm !h-[17rem]">
          <div className="w-[90%] h-[90%]  ml-8 mx-auto flex flex-col justify-around items-center  ">
            <div className="flex items-center w-[101%] h-[46%] mx-auto rounded-lg radioComponent relative">
              <label className="labelForm absolute left-4 text-center top-[-20%] w-[10%] ">
                Garantía
              </label>
              <div className="w-[35%] ml-[1rem] labelInput">
                <SelectInputTiposComponent
                  label="Motivo"
                  name="motivo_garantia_id"
                  showRefresh={false}
                  isOT={true}
                  handleSelectChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["motivo_garantia_id"]
                      : data && data[EnumGrid.motivo_garantia_id]
                  }
                  control={control}
                  entidad={"OTMotivoGarantia"}
                  readOnly={true}
                  customWidth={"!h-[2.8vw] labelInput"}
                  onlyFirstOption={data && data[EnumGrid.motivo] === "Garantía"}
                />
              </div>

              <div className="w-[30%] mb-4 labelInput">
                <TextInputComponent
                  type="number"
                  label="Folio Asociado"
                  name="folio_asociado"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["folio_asociado"]
                      : data && data[EnumGrid.folio_asociado]
                  }
                  control={control}
                  onlyRead={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>

              <div className="w-[35%] labelInput mr-[1rem]">
                <RadioButtonComponent
                  control={control}
                  label="Resolución"
                  name="resolucion_garantia_id"
                  // data={data ? data[EnumGrid.motivo] : formValues["motivo"]}
                  data={
                    formValues
                      ? formValues["resolucion_garantia_id"]
                      : data && data[EnumGrid.resolucion_garantia_id] === 1
                      ? "Aceptada"
                      : data && data[EnumGrid.resolucion_garantia_id] === 2
                      ? "Rechazada"
                      : ""
                  }
                  options={["Aceptada", "Rechazada"]}
                  // error={errors.sexo}
                  horizontal={true}
                  // readOnly={!(permiso_usuario_resolucion_garantia && permiso_areas_resolucion_garantia) ||  motivo_ot.value}
                  onChange={handleInputChange}
                  isOT={true}
                  readOnly={true}
                  labelProps={"!translate-y-[-1.4vw] translate-x-[-1vw]"}
                  customWidth={"!h-[3vw] labelInput"}
                />
              </div>
            </div>

            <div className="w-[75vw] translate-y-[2vw] flex ">
              <div className="labelInput">
                <TextInputComponent
                  type="number"
                  label="N° Reporte Firma"
                  name="numero_reporte_firma"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["numero_reporte_firma"]
                      : data && data[EnumGrid.numero_reporte_firma]
                  }
                  control={control}
                  onlyRead={true}
                  isOptional={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>
              <div className="labelInput">
                <TextInputComponent
                  type="number"
                  label="N° Reporte Atención"
                  name="numero_reporte_atencion"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["numero_reporte_atencion"]
                      : data && data[EnumGrid.numero_reporte_atencion]
                  }
                  control={control}
                  onlyRead={true}
                  isOptional={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>
              <div className="labelInput">
                <TextInputComponent
                  type="text"
                  label="N° Órden Compra"
                  name="numero_orden_compra"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["numero_orden_compra"]
                      : data && data[EnumGrid.numero_oc]
                  }
                  control={control}
                  onlyRead={true}
                  isOptional={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>
              <div className="labelInput">
                <TextInputComponent
                  type="number"
                  label="N° Guía"
                  name="numero_guia"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["numero_guia"]
                      : data && data[EnumGrid.numero_guia]
                  }
                  control={control}
                  onlyRead={true}
                  isOptional={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>
              <div className="labelInput">
                <TextInputComponent
                  type="number"
                  label="N° Factura"
                  name="numero_factura"
                  handleChange={handleInputChange}
                  data={
                    formValues
                      ? formValues["numero_factura"]
                      : data && data[EnumGrid.numero_factura]
                  }
                  control={control}
                  onlyRead={true}
                  isOptional={true}
                  customWidth={"!h-[3vw] labelInput"}
                  textAlign="text-center"
                />
              </div>
            </div>
          </div>

          <div className="!w-[35vw] labelInput  mx-auto items-center flex flex-col px-8 translate-y-[2.5vw]">
            <div className="w-full labelInput">
              <TextInputInteractive
                type="number"
                label="N° Worktracking"
                name="worktracking"
                handleChange={handleInputChange}
                data={
                  formValues
                    ? formValues["worktracking"]
                    : data && data[EnumGrid.worktracking]
                }
                control={control}
                onlyRead={
                  !(
                    isEditting &&
                    permiso_usuario_workTracking &&
                    permisos_usuario_areas &&
                    permiso_area_worktraking
                  )
                }
                isOptional={true}
                isOT={true}
                customWidth={"!h-[3vw] !mb-4 labelInput"}
                textAlign="text-center"
              />
            </div>
            <div className="w-full labelInput">
              <TextInputInteractive
                type="number"
                label="Nota Venta / Boleta "
                name="nota_venta"
                handleChange={handleInputChange}
                data={
                  formValues
                    ? formValues["nota_venta"]
                    : data && data[EnumGrid.nota_venta]
                }
                control={control}
                onlyRead={isEditting}
                isOptional={true}
                customWidth={"!h-[3vw]  !mb-4 labelInput"}
                textAlign="text-center"
              />
            </div>
            <div className="w-full labelInput">
              <TextInputInteractive
                type="text"
                label="Folio interno mandante"
                name="folio_interno_mandante"
                handleChange={handleInputChange}
                data={
                  formValues
                    ? formValues["folio_interno_mandante"]
                    : data && data[EnumGrid.folio_interno_mandante]
                }
                control={control}
                onlyRead={isEditting}
                isOptional={true}
                customWidth={"!h-[3vw] !mb-4 labelInput"}
                textAlign="text-center"
              />
            </div>
            <div className="w-full labelInput">
              <TextInputInteractive
                type="text"
                label="Reporte interno mandante"
                name="reporte_interno_mandante"
                handleChange={handleInputChange}
                data={
                  formValues
                    ? formValues["reporte_interno_mandante"]
                    : data && data[EnumGrid.reporte_interno_mandante]
                }
                control={control}
                onlyRead={isEditting}
                isOptional={true}
                customWidth={"!h-[3vw] !mb-4 labelInput"}
                textAlign="text-center"
              />
            </div>
            <div className="w-full labelInput">
              <TextInputInteractive
                type="text"
                label="Número Envío"
                name="numero_envio"
                handleChange={handleInputChange}
                data={
                  formValues
                    ? formValues["numero_envio"]
                    : data && data[EnumGrid.numero_envio]
                }
                control={control}
                onlyRead={isEditting}
                tabIndex={1}
                customWidth={"!h-[3vw] labelInput"}
                isOptional={true}
                textAlign="text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FOTOptica;
