import { IconButton, Tooltip, Button, Input } from "@material-tailwind/react";
import React, { Suspense, useCallback, useRef, useState } from "react";

import { SiAddthis } from "react-icons/si";
import { PiPrinterFill } from "react-icons/pi";
import { LuBox } from "react-icons/lu";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import {
  BUTTON_MESSAGES,
  clearAllCheck,
  clearIndividualCheck,
  disabledIndividualCheck,
  reiniciarValidationNivel3,
  updateOT,
} from "../utils";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import {
  clearImpression,
  fetchOT,
  fetchOTImpresionByID,
} from "../../redux/slices/OTSlice";

import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { checkCount, OTPkToDelete, paramsOT } from "../views/mantenedores/MOT";
import { signal } from "@preact/signals-react";
import { setEstadoImpresion } from "./OTGrillaButtons";
import { SocialIcon } from "react-social-icons";
import { handleActionOTButtons } from "../utils/FOTPendiente_utils";
import { URLBackend } from "../utils/config";
import FOTValidateCristales from "../views/forms/FOTValidateCristales";
import { PermisosBotones } from "../Enums";
import FOTReporteEntrega from "../views/forms/FOTRepeorteEntrega";
import FOTOrdenCompra from "../views/forms/FOTOrdenCompra";
import FOTFactura from "../views/forms/FOTFactura";
import { usePermissionBotonesUser } from "../hooks/usePermissionBotonesUser";
// import { OTAreasEnum } from '../Enums/OTAreasEnum';
// import { OTGrillaEnum } from '../Enums';
// import { CR1_OD_LAB, CR1_OI_LAB, CR2_OD_LAB, CR2_OI_LAB } from '../utils/FOTCristales_utils';
// import WhastappForm from '../components/WhastappForm'

type AreaButtonsProps = {
  areaName: string;
  areaPermissions: string;
  params: any;
  areaActual: string;
  handleAddPerson?: () => void;
  setSelectedRows?: any;
  idMenu?: any;
  pktoDelete?: any;
  isMOTArchivo?: any;
};

export const dataOTSignal = signal([]);
export const isFinishImpression = signal(false);
export const barCodeSignal = signal("");

export const resultValidarBodega = signal<any>({
  ProcesarTB_1: true,
  ProcesarTB_2: false,
  conCristales: false,
  sinCristales: false,
});

export const valueSearchOT = signal<any>("");
export const valueConfirmOT = signal<any>("");
const strEntidad = "Ordenen de Trabajo";
const strBaseUrl = "/api/ot/";

const ErrorOTModal = React.lazy(() => import("./ErrorOTModal"));
const FOTTicketImpresion = React.lazy(
  () => import("../views/forms/FOTTicketImpresion")
);
const ImportToCsv = React.lazy(() => import("./ImportToCsv"));
const ExportCSV = React.lazy(() => import("./ExportToCsv"));
const FOTValidarBodega = React.lazy(
  () => import("../components/OTForms/FOTValidarBodega")
);
// const FOTWhastApp       = React.lazy(()=>import('../components/WhastappForm'))
const FOTImpresa = React.lazy(() => import("../views/forms/FOTImpresa"));
const FOTEmpaque = React.lazy(() => import("../views/forms/FOTEmpaque"));
const FOTGuiaDespacho = React.lazy(
  () => import("../views/forms/FOTGuiaDespacho")
);
const FOTReporteFirma = React.lazy(
  () => import("../views/forms/FOTReporteFirma")
);
const FOTWhastApp = React.lazy(() => import("../components/WhastappForm"));

const FOTPendiente = React.lazy(() => import("./OTForms/FOTPendiente"));
const FOTDerivacion = React.lazy(() => import("./OTForms/FOTDerivacion"));
const FOTValidarEmpaque = React.lazy(
  () => import("./OTForms/FOTValidarEmpaque")
);
const FOTUbicacion = React.lazy(() => import("../views/forms/FOTUbicacion"));

export const EnumAreas: any = {
  10: 0,
  20: 1,
  30: 2,
  40: 3,
  50: 4,
  60: 5,
  70: 6,
  80: 7,
  85: 8,
  90: 9,
  100: 10,
};

export const validationStateOT = (
  positionCampo: number,
  nameCampo: string,
  folios: any,
  data: any
) => {
  const resultadoFiltrado =
    data && data.filter((elemento: any) => folios.includes(elemento[1]));

  return resultadoFiltrado.map((OT: any) => {
    const estado = OT[positionCampo];
    console.log(estado);
    console.log(nameCampo);
    if (estado !== nameCampo) {
      return [OT[1], OT[4]];
    }
    return true;
  });
};

const focusFirstInput = (strInputName: string, ref: React.RefObject<any>) => {
  if (ref.current) {
    const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }
};

const OTPrimaryButtons: React.FC<AreaButtonsProps> = React.memo(
  ({
    areaPermissions,
    handleAddPerson,
    params,
    setSelectedRows,
    idMenu,
    isMOTArchivo,
    pktoDelete,
  }) => {
    const dispatch = useAppDispatch();
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
    const OTData: any = useAppSelector((store: AppStore) => store.OTS.data);

    const User: any = useAppSelector((store: AppStore) => store.user);
    const componentRef = useRef<any>(null);
    const SecondcomponentRef = useRef<any>(null);
    const [isShowErrorOTModal, setIsShowErrorOTModal] = useState(false);
    const [isFOTEmpaque, setIsFOTEmpaque] = useState(false);
    const [isFOTGuia, setIsFOTGuia] = useState(false);
    // const [isBarCodeProcess, setIsBarCodeProcess]     = useState(false);
    const [isFOTImpresa, setIsFOTImpresa] = useState(false);
    const [isFotTicketRetiro, _setisFotTicketRetiro] = useState(false);
    const [isWhastApp, setIsWhastApp] = useState(false);
    const [isFOTValidarBodega, setIsFOTValidarBodega] = useState(false);
    const [isFOTReporteFirma, setIsFOTReporeFirma] = useState(false);
    const [isFOTPendiente, setisFOTPendiente] = useState(false);
    const [isFOTDerivacion, setisFOTDerivacion] = useState(false);
    const [isFOTValidarEmpaque, setIsFOTValidarEmpaque] = useState(false);
    const [isFOTUbicacion, setIsFOTUbicacion] = useState(false);
    const [isFOTValidateBodegaCristales, setisFOTValidateBodegaCristales] =
      useState(false);

    const [isFOTReporteEntrega, setIsFOTReporteEntrega] = useState(false);
    const [isFOTOrdenCompra, setIsFOTOrdenCompra] = useState(false);
    const [isFOTGuiaDespacho, setIsFOTGuiaDespeacho] = useState(false);
    const [isFOTFactura, setIsFOTFactura] = useState(false);

    const [isFOTPreFactura, setIsFOTPreFactura] = useState(false);
    const [isFOTVistoBueno, setIsFOTVistoBueno] = useState(false);
    const [isFOTNumeroFactura, setIsFOTNumeroFactura] = useState(false);
    const [isFOTConfirmaPago, setIsFOTConfirmaPago] = useState(false);

    const {
      permiso_usuario_btn_nuevo,
      // permiso_usuario_btn_editar,
      permiso_usaurio_btn_impresion,
      permiso_usuario_btn_exportar,
      permiso_usuario_btn_importar,
      permiso_usuario_btn_whatsapp,
      permiso_usuario_btn_procesar,
      permiso_usuario_btn_pausar,
      permiso_usuario_btn_derivar,
      // permiso_usuario_btn_anular,
      permiso_usuario_btn_ingresar,
      // permiso_usuario_btn_postVenta,
      permiso_usuario_btn_guiaDespacho,
      permiso_usuario_btn_numerEnvio,
      permiso_usuario_btn_macroExcel,
      permiso_usuario_btn_validarArmazones,
      permiso_usuario_btn_validarCristales,
      permiso_usuario_btn_ubicacion,
      permiso_usuario_btn_opcionBodegaInsumos,
      permiso_usuario_btn_reporteEntrega,
      permiso_usuario_btn_numeroOC,
      permiso_usuario_btn_confirmarEntrega,
      permiso_usuario_btn_preFacturar,
      permiso_usuario_btn_vistoBueno,
      permiso_usuario_btn_numeroFactura,
      permiso_usuario_btn_confirmaPago,
    } = usePermissionBotonesUser();

    // const [];

    // const [barCode, setBarCode]                       = useState('')
    const [dataOT, setDataOT] = useState();
    // const [valueSearchOT, setValueSearchOT]           = useState<any>();
    // const [valueConfirmOT, setValueConfirmOT]         = useState<any>()
    const searchOTRef = useRef<any>();

    const refFocusInput = React.useRef<any>(null);

    const permisos_usuario_areas =
      User.permisos_areas[EnumAreas[OTAreas["areaActual"]]];

    const folios =
      OTPkToDelete && OTPkToDelete?.value.map(({ folio }: any) => folio);

    const foliosStandBy = OTPkToDelete.value
      .filter((ot: any) => ot.estado_id === 15)
      .map((ot: any) => ot.folio);
    const isEstadoStandBy = OTPkToDelete?.value.some(
      (ot: any) => ot.estado_id === 15
    );

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      suppressErrors: true,
      removeAfterPrint: true,
      onAfterPrint() {
        dispatch(clearImpression());
        isFinishImpression.value = true;
      },
    });

    // const handleComprobantePrint = useReactToPrint({
    //   content: () => SecondcomponentRef.current,
    //   suppressErrors: true,
    //   removeAfterPrint: true,
    //   onAfterPrint(){
    //       setIsFOTImpresa(false)
    //       setisFotTicketRetiro(false)
    //       dispatch(clearImpression())
    //   }
    // })

    const handleIngresoMasivo = async () => {
      const toastLoading = toast.loading("Cargando....");
      try {
        const filterFoliosValidateState = await OTPkToDelete.value
          .filter((OT: any) => OT.estado_id === 20)
          .map((OT: any) => OT.folio);
        const filterFoliosJSON = await OTPkToDelete.value
          .map((OT: any) => OT.folio)
          .join(",");
        const validateState = await OTPkToDelete.value.some(
          (OT: any) => OT.estado_id === 20
        );

        if (validateState) {
          return toast.error(
            `Folio: ${filterFoliosValidateState} Ya se encuentra en Proceso. `
          );
        }

        let estado = "20";
        // let masivo          = true;
        // let validarBodega   = false;
        let situacion = "0";
        let observaciones = "";

        const response: any = await handleActionOTButtons(
          filterFoliosJSON,
          estado,
          situacion,
          OTAreas["areaActual"],
          OTAreas["areaActual"],
          observaciones,
          User.id,
          "Ingresar"
        );
        console.log(response);
        if (response?.status === 200) {
          dispatch(
            fetchOT({
              OTAreas: OTAreas["areaActual"],
              searchParams: paramsOT.value,
            })
          );
          setSelectedRows([]);
          checkCount.value = 0;
          clearAllCheck.value = false;
          toast.dismiss(toastLoading);
        }

        //   await OTPkToDelete.value.map(async(OT:any)=>{
        //     await updateOT(
        //       [],
        //       OTAreas["areaActual"],
        //       OTAreas["areaActual"],
        //       estado,
        //       [],
        //       OT,
        //       [],
        //       [],
        //       User.id,
        //       "",
        //       masivo,
        //       '',
        //       validarBodega,
        //       'Ingresar'
        //     ).then(() => {
        //       dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
        //       clearAllCheck.value = false;
        //       // disabledIndividualCheck.value = true;
        //       clearIndividualCheck.value = true;

        //   })
        // })
        // toast.success('Estado cambiado correctamente.',{
        //   autoClose: 500
        // })
        toast.dismiss(toastLoading);
      } catch (error: any) {
        toast.dismiss(toastLoading);
        toast.error(error);
        console.log(error);
      }
    };

    const handleImpresionMasivo = async () => {
      if (OTPkToDelete.value.length === 0) {
        return toast.error("No hay OTs Seleccionadas.");
      }
      disabledIndividualCheck.value = true;
      const toastLoading = toast.loading("Imprimiendo OTs.");
      const primerProyectoCodigo = OTPkToDelete.value[0].proyecto_codigo;
      const todosIguales = OTPkToDelete.value
        .slice(1)
        .every((ot: any) => ot.proyecto_codigo === primerProyectoCodigo);
      // const impresaAnteriormente  = OTPkToDelete.value.every((ot:any) => ot.estado_impresion === '0');
      const validateUsuario = OTPkToDelete.value.every(
        (ot: any) => ot["usuario_id"] === User.id
      );
      const listaFolios = folios.map((num: number) => `${num}`).join(",");
      // console.log(listaFolios)

      if (!validateUsuario) {
        toast.dismiss(toastLoading);
        console.log("render");
        disabledIndividualCheck.value = false;
        clearAllCheck.value = false;
        setSelectedRows([]);
        toast.error(`OT ${folios} no pertenece al Usuario ${User.nombre}`);
        return;
      }
      // console.log(OTPkToDelete.value)
      // console.log(impresaAnteriormente)

      // if(!impresaAnteriormente){
      //   toast.dismiss(toastLoading);
      //   disabledIndividualCheck.value = false;
      //   clearAllCheck.value = false;
      //   setSelectedRows([])
      //   return toast.error(`La OT con folio: ${OTPkToDelete.value.filter((ot:any)=> ot.estado_impresion === '1').map((ot:any)=>ot.folio)}, ya fueron impresas anteriormente.`)

      // }

      if (!todosIguales) {
        toast.dismiss(toastLoading);
        disabledIndividualCheck.value = false;
        clearAllCheck.value = false;
        setSelectedRows([]);
        toast.error("Las OTs no pertenecen al mismo proyecto");
        return;
      }

      setIsFOTImpresa(true);
      await dispatch(
        fetchOTImpresionByID({
          folio: listaFolios,
          OTAreas: OTAreas["areaActual"],
        })
      ).then(() => {
        // console.log('render')
        handlePrint();
      });

      try {
        setEstadoImpresion(
          OTPkToDelete.value,
          OTAreas["areaActual"],
          true,
          User
        ).then(() => {
          dispatch(
            fetchOT({
              OTAreas: OTAreas["areaActual"],
              searchParams: paramsOT.value,
            })
          ).then(() => {
            toast.dismiss(toastLoading);
            disabledIndividualCheck.value = false;
            clearAllCheck.value = false;
            setSelectedRows([]);
          });
        });
      } catch (error) {
        toast.dismiss(toastLoading);
        clearAllCheck.value = false;
        setSelectedRows([]);
        disabledIndividualCheck.value = false;
        return;
      }
    };

    React.useEffect(() => {
      if (!isFOTValidarBodega) {
        focusFirstInput("ProcesarOT", refFocusInput);
        reiniciarValidationNivel3();
        valueConfirmOT.value = "";
        // setValueConfirmOT('')
      }
    }, [isFOTValidarBodega, focusFirstInput]);

    React.useEffect(() => {
      if (isFinishImpression.value === true) {
        if (OTPkToDelete.value.length > 1) {
          let masivo = true;
          setEstadoImpresion(
            OTPkToDelete.value,
            OTAreas["areaActual"],
            masivo,
            User
          ).then(() => {
            clearIndividualCheck.value = true;

            dispatch(
              fetchOT({
                OTAreas: OTAreas["areaActual"],
                searchParams: paramsOT.value,
              })
            );

            clearAllCheck.value = false;
            isFinishImpression.value = false;
            // const loadingToast = toast.load ing('Cargando...')
            // OTPkToDelete.value.map((ot:any)=>{
            //   try {
            //         setEstadoImpresion(ot.folio,1,User,OTAreas["areaActual"],masivo).then(()=>{
            //         clearIndividualCheck.value = true;
            //         dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))

            //         clearAllCheck.value = false;
            //         isFinishImpression.value = false;
            //         // toast.success('Es')
            //         toast.dismiss

            //       })
            //     } catch (error) {
            //       console.log(error)

            //     }
            //  })}
          });
        }
      }
      // toast.success('Estado Impresión Cambiado.');
    }, [isFinishImpression.value]);

    const renderButton = useCallback(
      (icon: React.ReactNode, handle: () => void, tooltip: string) => (
        <Tooltip content={tooltip}>
          <IconButton
            variant="text"
            color="blue-gray"
            className="primaryBtnIconButton !mx-2"
            onClick={handle}
          >
            {icon}
          </IconButton>
        </Tooltip>
      ),
      []
    );

    // const imprimirComprobanteRetiro = async() => {
    //   const loadingToast = toast.loading('Imprimiendo Comprobante Retiro...');

    //   OTPkToDelete.value.map(async(OT:any)=>{
    //     try {
    //         const {data, status} = await axios.get(`${URLBackend}/api/ot/listado/?query=01&_origen=${OTAreas['areaActual']}&_folio=${OT.folio}`,{
    //           headers: {
    //              'Authorization': User.token,
    //            }
    //      });
    //         console.log(data[0] && data[0][EnumGrid.imprime_ticket])
    //         console.log(status)
    //         if(data[0] && data[0][EnumGrid.imprime_ticket]){
    //             console.log('imprmiendo')
    //             await dispatch(fetchOTImpresionByID({ folio: OT.folio, OTAreas: OTAreas['areaActual'] }));
    //             handleComprobantePrint()
    //         }
    //         toast.dismiss(loadingToast);
    //     } catch (error) {
    //         toast.dismiss(loadingToast);
    //         throw error
    //     }

    //   })

    // }

    const handleChecked = async (folio: any) => {
      console.log(folio);

      console.log(OTData);
      if (folio === "") {
        return;
      }
      const resultIndex = OTData.findIndex(
        (OT: any) => OT[1] === parseInt(folio)
      );

      if (resultIndex !== -1) {
        setSelectedRows((prev: any) => [...prev, resultIndex]);
        // setValueSearchOT("")
        valueSearchOT.value = "";
        console.log("render");
        if (searchOTRef.current !== null) {
          searchOTRef.current.focus();
        }
        return resultIndex;
      } else {
        const { data: dataOT } = await axios(
          `${URLBackend}/api/ot/listado/?query=02&_p1=${folio}`,
          {
            headers: {
              Authorization: User.token,
            },
          }
        );

        console.log(dataOT);
        if (dataOT) {
          setDataOT(dataOT);
          setIsShowErrorOTModal(true);
        }

        console.log("render");
        return dataOT;
      }
    };

    const handleDownloadMacro = async () => {
      try {
        const url = `${URLBackend}/api/downloadexcel/`;
        const formData = new FormData();
        //'MacroOT.xlsm'
        formData.append("ENTIDAD", "MacroOT.xlsm"); // Aquí agregas el valor del macro que deseas enviar

        const { data } = await axios({
          url,
          method: "POST", // Cambiamos de GET a POST
          data: formData, // Enviamos el FormData que contiene el string 'macro'
          responseType: "blob",
          headers: {
            Authorization: User.token,
            "Content-Type": "multipart/form-data", // Asegúrate de establecer el tipo de contenido correctamente
          },
        });

        const blobUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "MacroOT.xlsm");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        throw error;
      }
    };

    const handleWhatsappMasivo = () => {
      console.log("click");
      setIsWhastApp((prev) => !prev);
    };

    const handleProcesarMasivo = async () => {
      if (OTPkToDelete.value.length === 0) {
        return toast.error("No hay OT seleccionada");
      }

      let estado = OTAreas["areaActual"] === 50 ? "20" : "15";
      let observaciones = "";
      let situacion = "0";

      const validateEstado = OTPkToDelete.value.every(
        (ot: any) => ot["estado_validacion"] === "2"
      );
      // const validateEstadoStandBy    = OTPkToDelete.value.some((ot:any) => ot["estado_id"] === 15);
      // const validateUsuario          = OTPkToDelete.value.every((ot:any) => ot["usuario_id"] === User.id);
      const validateProyecto = OTPkToDelete.value.every(
        (ot: any) =>
          ot["proyecto_codigo"] === OTPkToDelete.value[0]["proyecto_codigo"]
      );
      const validateEstadoImpresion = OTPkToDelete.value.every(
        (ot: any) => ot["estado_impresion"] === "1"
      );

      const filterFoliosJSON = await OTPkToDelete.value
        .map((OT: any) => OT.folio)
        .join(",");

      if (isEstadoStandBy) {
        return toast.error(
          `FOLIO: ${foliosStandBy}  No se encuentra en Proceso`
        );
      }
      // const foliosMensaje = OTPkToDelete.value && OTPkToDelete.value.map(({folio}:any)=>folio)

      if (!validateEstado) {
        return toast.error(`Folio ${folios} no está validado correctamente`);
      }

      // if(!validateUsuario && OTAreas["areaActual"] === 50){
      //   toast.error(`Folio ${foliosMensaje} no pertenece al Usuario ${User.nombre}`);
      //   return;
      // }

      if (!validateProyecto) {
        return toast.error(
          `Folio ${folios} deben pertenecer al mismo proyecto`
        );
      }

      if (!validateEstadoImpresion) {
        return toast.error(
          `OT ${OTPkToDelete.value
            .filter((ot: any) => ot.estado_impresion === "0")
            .map((ot: any) => ot.folio)} no ha sido impresa.`
        );
      }

      //? !== 50-90-100

      if (
        OTAreas["areaActual"] !== 50 &&
        OTAreas["areaActual"] !== 60 &&
        OTAreas["areaActual"] !== 90 &&
        OTAreas["areaActual"] !== 100
      ) {
        return await handleActionOTButtons(
          filterFoliosJSON,
          estado,
          situacion,
          OTAreas["areaActual"],
          OTAreas["areaSiguiente"],
          observaciones,
          User.id,
          "Procesar"
        )
          .then(() => {
            dispatch(
              fetchOT({
                OTAreas: OTAreas["areaActual"],
                searchParams: paramsOT.value,
              })
            );
            setSelectedRows([]);
            checkCount.value = 0;
            clearAllCheck.value = false;
          })
          .catch(() => {
            toast.error("Error al Ejecutar el proceso.");
          });
      } else {
        try {
          if (OTAreas["areaActual"] === 90) {
            const filterPkToDeleteFirmaEnvio = OTPkToDelete.value.filter(
              (OT: any) =>
                (OT.numero_envio === "0" || OT.numero_envio === null) &&
                OT.numero_reporte_firma === 0
            );
            const filterPkToDeleteGuia = OTPkToDelete.value.filter(
              (OT: any) => OT.numero_guia === 0
            );

            if (filterPkToDeleteFirmaEnvio.length > 0) {
              const folios = filterPkToDeleteFirmaEnvio.map(
                (OT: any) => OT.folio
              );
              const resultFirmaEnvio = confirm(
                "Los siguientes folios no tienen Número de envío o Reporte de fírmas: " +
                  "\n" +
                  folios +
                  "\n¿Desea Continuar?"
              );
              if (!resultFirmaEnvio) {
                return;
              }
            }

            if (filterPkToDeleteGuia.length > 0) {
              const folios = filterPkToDeleteGuia.map((OT: any) => OT.folio);
              const resultFirmaEnvio = confirm(
                "Los siguientes folios no tienen Número de Guía: " +
                  "\n" +
                  folios +
                  "\n¿Desea Continuar?"
              );
              if (!resultFirmaEnvio) {
                return;
              }
            }
          }
          const toastLoading = toast.loading("Cargando...");

          const updatePromises = OTPkToDelete.value.map(async (ot: any) => {
            if (OTAreas["areaActual"] === 90 || OTAreas["areaActual"] === 100) {
              if (ot.numero_envio !== "0") {
                estado = "50";
              }
              if (ot.numero_reporte_firma !== 0) {
                estado = "15";
              }
            }

            let cristales: any = ot.cristales || [];
            let armazones = ot.armazones || [];

            await updateOT(
              [],
              OTAreas["areaActual"],
              OTAreas["areaSiguiente"],
              estado,
              [],
              ot,
              cristales.filter((ot: any) => ot.codigo !== " "),
              armazones.filter((ot: any) => ot.codigo !== " "),
              User["id"],
              "",
              true,
              0,
              false,
              "Procesada"
            ).then(() => {
              // dispatch(fetchOT({OTAreas:OTAreas["areaActual"],searchParams: paramsOT.value}))
              setSelectedRows([]);
              checkCount.value = 0;
              clearAllCheck.value = false;
            });
          });

          await Promise.all(updatePromises);

          dispatch(
            fetchOT({
              OTAreas: OTAreas["areaActual"],
              searchParams: paramsOT.value,
            })
          );
          setSelectedRows([]);
          checkCount.value = 0;
          clearAllCheck.value = false;
          toast.dismiss(toastLoading);
          toast.success("OTs Procesadas Correctamente", {
            autoClose: 900,
          });
        } catch (error: any) {
          return toast.error(error);
        }
      }
    };

    const handleValidarEmpaque = async () => {
      if (isEstadoStandBy) {
        return toast.error(
          `FOLIO: ${foliosStandBy}  No se encuentra en Proceso`
        );
      }

      if (OTPkToDelete.value.length === 0) {
        return toast.error("No hay OT seleccionada");
      }

      setIsFOTValidarEmpaque((prev: any) => !prev);
    };

    const handleUbicacion = async () => {
      if (OTPkToDelete.value.length === 0) {
        return toast.error("No hay OT seleccionada");
      }

      setIsFOTUbicacion((prev) => !prev);
    };

    const handleProcesarConfirm = async (folio: any, toastLoading?: any) => {
      try {
        const dataOT = OTData.map((ot: any) => ot).filter(
          (filterot: any) => filterot[1] === folio
        );

        console.log(dataOT);

        if (dataOT.length === 0) {
          // setValueConfirmOT('')
          valueConfirmOT.value = "";
          setIsFOTValidarBodega(false);
          toast.dismiss(toastLoading);
          return toast.error(`OT ${folio}: No se encuentra en esta área.`);
        }

        // if(result.status !== 200 || result?.data[0][EnumGrid.area_id] !== 60){
        //   // setValueConfirmOT('')
        //   valueConfirmOT.value = '';
        //   toast.dismiss(toastLoading)
        //   return toast.error(`OT ${folio}: No se encuentra en esta área`)
        // }

        toast.dismiss(toastLoading);
        dataOTSignal.value = dataOT;
        setIsFOTValidarBodega(true);
      } catch (error: any) {
        toast.dismiss(toastLoading);
        toast.error(error);
        setIsFOTValidarBodega(false);
      }
    };

    const handleProcesarBodegaCristales = async (
      folio: any,
      toastLoading?: any
    ) => {
      {
        try {
          const dataOT = OTData.map((ot: any) => ot).filter(
            (filterot: any) => filterot[1] === folio
          );
          if (dataOT.length === 0) {
            valueConfirmOT.value = "";
            setisFOTValidateBodegaCristales(false);
            toast.dismiss(toastLoading);
            return toast.error(`OT ${folio}: No se encuentra en esta área.`);
          }

          toast.dismiss(toastLoading);
          dataOTSignal.value = dataOT;
          setisFOTValidateBodegaCristales(true);
        } catch (error) {
          console.log(error);
          setisFOTValidateBodegaCristales(false);
          return toast.error(error as string);
        }
      }
    };

    return (
      <div className="flex items-center   ml-[4rem] !w-full">
        <Suspense>
          {areaPermissions &&
            areaPermissions[PermisosBotones.nuevo] === "1" &&
            permisos_usuario_areas !== "0" &&
            permiso_usuario_btn_nuevo &&
            renderButton(
              <SiAddthis className="primaryBtnIcon " />,
              handleAddPerson!,
              BUTTON_MESSAGES.add
            )}
        </Suspense>

        {areaPermissions &&
          areaPermissions[PermisosBotones.imprimir] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usaurio_btn_impresion &&
          renderButton(
            <PiPrinterFill className="primaryBtnIcon" />,
            handleImpresionMasivo!,
            BUTTON_MESSAGES.imprimir
          )}

        {/* { (areaPermissions && areaPermissions[0] === "1" ) && (permisos_usuario_areas !== '0') && (
          renderButton(
            <LuBox className="primaryBtnIcon " />,
            handleAddPerson!,
            BUTTON_MESSAGES.ubicacion
          )
        )
        } */}

        <Suspense>
          {areaPermissions &&
            areaPermissions[PermisosBotones.exportar] === "1" &&
            permiso_usuario_btn_exportar && (
              <div className="mr-2">
                <ExportCSV
                  strEntidad={strEntidad}
                  params={params}
                  strBaseUrl={strBaseUrl}
                  OTAreas={OTAreas["areaActual"]}
                  primaryButton={true}
                  idMenu={idMenu}
                />
              </div>
            )}
        </Suspense>

        <Suspense>
          {areaPermissions &&
            areaPermissions[PermisosBotones.importar] === "1" &&
            permisos_usuario_areas !== "0" &&
            permiso_usuario_btn_importar && (
              <Suspense>
                <ImportToCsv
                  strEntidad={strEntidad}
                  //  params={params}
                  //  strBaseUrl={strBaseUrl}
                />
              </Suspense>
            )}
        </Suspense>

        {areaPermissions &&
          areaPermissions[PermisosBotones.whatsapp] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_whatsapp &&
          renderButton(
            <SocialIcon
              onClick={(e) => e.preventDefault()}
              url="https://www.whatsapp.com/"
            />,
            handleWhatsappMasivo!,
            BUTTON_MESSAGES.Whatsapp
          )}

        {OTAreas["areaActual"] === 60 && User.cargo === 1 && (
          <Tooltip content={BUTTON_MESSAGES.procesar}>
            {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}

            <Button
              color="green"
              className="otActionButton mx-4"
              onClick={handleProcesarMasivo}
            >
              Procesar
            </Button>
          </Tooltip>
        )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.procesar] === "1" &&
          ((permisos_usuario_areas === "1" && OTAreas["areaActual"] !== 50) ||
            (permisos_usuario_areas === "2" &&
              permiso_usuario_btn_procesar &&
              OTAreas["areaActual"] === 50)) && (
            // (permisos_usuario_areas !== '0') && (
            <Tooltip content={BUTTON_MESSAGES.procesar}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}

              <Button
                color="green"
                className="otActionButton mx-4"
                onClick={
                  OTAreas["areaActual"] === 100
                    ? handleValidarEmpaque
                    : handleProcesarMasivo
                }
              >
                Procesar
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.pausar] === "1" &&
          permisos_usuario_areas !== "0" &&
          OTAreas["areaActual"] !== 60 &&
          permiso_usuario_btn_pausar && (
            <Tooltip content={BUTTON_MESSAGES.pausar}>
              <Button
                type="submit"
                className="otActionButton mx-4 bg-yellow-700"
                onClick={() => {
                  if (OTPkToDelete.value.length === 0) {
                    return toast.error("No hay OT seleccionada.");
                  }

                  if (
                    OTPkToDelete.value.some((OT: any) => OT.estado_id === 15)
                  ) {
                    return toast.error(
                      `Folio ${folios} se encuentra en Stand-By.`
                    );
                  }
                  setisFOTPendiente(true);
                }}
              >
                Pausar
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.derivar] === "1" &&
          permisos_usuario_areas !== "0" &&
          OTAreas["areaActual"] !== 60 &&
          permiso_usuario_btn_derivar && (
            <Tooltip content={BUTTON_MESSAGES.derivar}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button
                type="submit"
                className="otActionButton mx-4 bg-red-900"
                onClick={() => {
                  if (OTPkToDelete.value.length === 0) {
                    return toast.error("No hay OT seleccionada.");
                  }

                  if (
                    OTPkToDelete.value.some((OT: any) => OT.estado_id === 15)
                  ) {
                    return toast.error(
                      `Folio ${folios} se encuentra en Stand-By.`
                    );
                  }

                  setisFOTDerivacion(true);
                }}
              >
                Derivar
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.ingresar] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_ingresar && (
            <Tooltip content={BUTTON_MESSAGES.bln_ingreso}>
              {/* <button className='bg-green-400 mx-4 transition-transform transform hover:scale-110 active:scale-95 w-[10rem] h-[2.5rem]  text-white '  */}
              <Button
                type="submit"
                className="otActionButton mx-4 bg-blue-500"
                onClick={() => {
                  if (OTPkToDelete.value.length === 0) {
                    return toast.error("No hay OT seleccionada.");
                  }
                  handleIngresoMasivo();
                }}
              >
                Ingresar
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.numeroEnvio] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_numerEnvio && (
            <Tooltip content="Generar Número de Envío">
              <Button
                className="otActionButton ml-4"
                onClick={() => {
                  if (OTPkToDelete.value.length === 0) {
                    return toast.error("No hay OT seleccionada.");
                  }

                  if (isEstadoStandBy) {
                    return toast.error(
                      `FOLIO: ${foliosStandBy}  No se encuentra en Proceso`
                    );
                  }

                  setIsFOTEmpaque((prev) => !prev);
                }}
              >
                N° Envío
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.macroExcel] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_macroExcel && (
            <Tooltip content={"Descargar Plantilla Excel"}>
              <IconButton
                className="primaryBtnIconButton"
                variant="text"
                color="blue-gray"
              >
                <PiMicrosoftExcelLogoFill
                  className="primaryBtnIcon"
                  onClick={() => handleDownloadMacro()}
                />
              </IconButton>
              {/* <Button color="green" className='otActionButton mx-4' >Macro Excel</Button> */}
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.numeroFirma] === "1" &&
          permisos_usuario_areas !== "0" && (
            <Tooltip content={"Generar Reporte de Firmas"}>
              <Button
                className="otActionButton mt-3 mx-5 "
                onClick={() => {
                  if (OTPkToDelete.value.length === 0) {
                    return toast.error("No hay OT seleccionada.");
                  }
                  if (isEstadoStandBy) {
                    return toast.error(
                      `FOLIO: ${foliosStandBy}  No se encuentra en Proceso`
                    );
                  }
                  setIsFOTReporeFirma((prev) => !prev);
                }}
              >
                Rep. Firma
              </Button>
            </Tooltip>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.validarArmazones] === "1" &&
          permisos_usuario_areas !== "0" &&
          // !isMOTArchivo &&
          permiso_usuario_btn_validarArmazones && (
            <div className="ml-2 w-[10vw]">
              <Input
                ref={refFocusInput}
                type="number"
                label="Validar Armazones"
                name="ProcesarOT"
                className="text-xl"
                color="orange"
                // value={valueConfirmOT.value as any}
                value={valueConfirmOT.value as any}
                onChange={async (e: any) => {
                  if (e.target.value !== "") {
                    let validateValue = e.target.value;
                    clearIndividualCheck.value = true;
                    if (validateValue.length >= 10) {
                      console.log(validateValue);
                      const regex = /^0+/;
                      valueConfirmOT.value = validateValue.replace(regex, "");

                      const toastLoading: any = toast.loading("cargando...");
                      await handleProcesarConfirm(
                        parseInt(valueConfirmOT.value),
                        toastLoading
                      ).then(() => {
                        toast.dismiss(toastLoading);
                        //  valueConfirmOT.value = "";
                      });
                    }
                  }
                  valueConfirmOT.value =
                    e.target.value === ""
                      ? e.target.value
                      : parseInt(e.target.value);
                }}
              />
            </div>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.validarCristales] === "1" &&
          permisos_usuario_areas !== "0" &&
          // !isMOTArchivo &&
          permiso_usuario_btn_validarCristales && (
            <div className="ml-2 w-[10vw]">
              <Input
                ref={refFocusInput}
                type="number"
                label="Validar Cristales"
                name="ProcesarOT"
                className="text-xl"
                color="orange"
                // value={valueConfirmOT.value as any}
                value={valueConfirmOT.value as any}
                onChange={async (e: any) => {
                  if (e.target.value !== "") {
                    let validateValue = e.target.value;
                    clearIndividualCheck.value = true;
                    if (validateValue.length >= 10) {
                      console.log(validateValue);
                      const regex = /^0+/;
                      valueConfirmOT.value = validateValue.replace(regex, "");

                      const toastLoading: any = toast.loading("cargando...");
                      await handleProcesarBodegaCristales(
                        parseInt(valueConfirmOT.value),
                        toastLoading
                      ).then(() => {
                        toast.dismiss(toastLoading);
                        //  valueConfirmOT.value = "";
                      });
                    }
                  }
                  valueConfirmOT.value =
                    e.target.value === ""
                      ? e.target.value
                      : parseInt(e.target.value);
                }}
              />
            </div>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.ubicacion] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_ubicacion &&
          renderButton(
            <LuBox className="primaryBtnIcon " />,
            handleUbicacion!,
            BUTTON_MESSAGES.ubicacion
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.opcionBodegaInsumos] === "1" &&
          permisos_usuario_areas !== "0" &&
          // !isMOTArchivo &&
          permiso_usuario_btn_opcionBodegaInsumos && (
            <div className="mx-6 my-2  translate-y-[0.2rem] flex">
              <div className="flex">
                <input
                  type="radio"
                  id="procesar_tb1"
                  name="radioGroup"
                  className=" mx-2 h-[1.5rem] w-[1.5rem]"
                  value="procesar_tb1"
                  checked={resultValidarBodega.value.ProcesarTB_1}
                  onChange={(e) => {
                    resultValidarBodega.value = {
                      ProcesarTB_1: e.target.checked,
                      ProcesarTB_2: false,
                      conCristales: false,
                      sinCristales: false,
                    };
                  }}
                />
                <label htmlFor="procesar_tb" className="">
                  Procesar TB1
                </label>
              </div>

              <div className="flex">
                <input
                  type="radio"
                  id="procesar_tb2"
                  name="radioGroup"
                  className=" mx-2 h-[1.5rem] w-[1.5rem]"
                  value="procesar_tb"
                  checked={resultValidarBodega.value.ProcesarTB_2}
                  onChange={(e) => {
                    resultValidarBodega.value = {
                      ProcesarTB_1: false,
                      ProcesarTB_2: e.target.checked,
                      conCristales: false,
                      sinCristales: false,
                    };
                  }}
                />
                <label htmlFor="procesar_tb" className="">
                  Procesar TB2
                </label>
              </div>

              <div className="flex">
                <input
                  type="radio"
                  id="con_cristales"
                  name="radioGroup"
                  className="mx-2 h-[1.5rem] w-[1.5rem] "
                  value="con_cristales"
                  checked={resultValidarBodega.value.conCristales}
                  onChange={(e) => {
                    resultValidarBodega.value = {
                      ProcesarTB_1: false,
                      ProcesarTB_2: false,
                      conCristales: e.target.checked,
                      sinCristales: false,
                    };
                  }}
                />
                <label htmlFor="con_cristales">Con Cristales</label>
              </div>

              <div className="flex">
                <input
                  type="radio"
                  id="sin_cristales"
                  name="radioGroup"
                  className="mx-2 h-[1.5rem] w-[1.5rem]"
                  value="sin_cristales"
                  checked={resultValidarBodega.value.sinCristales}
                  onChange={(e) => {
                    resultValidarBodega.value = {
                      ProcesarTB_1: false,
                      ProcesarTB_2: false,
                      conCristales: false,
                      sinCristales: e.target.checked,
                    };
                  }}
                />
                <label htmlFor="sin_cristales">Sin Cristales</label>
              </div>
            </div>
          )}

        {/* {areaPermissions &&
          areaPermissions[PermisosBotones.guiaDespacho] === "1" &&
          permisos_usuario_areas !== "0" && (
            <Tooltip content="Generar Número de Guía">
              <Button
                className="otActionButton mr-4"
                onClick={() => {
                  if (isEstadoStandBy) {
                    return toast.error(
                      `FOLIO: ${foliosStandBy}  No se encuentra en Proceso`
                    );
                  }
                  if (OTPkToDelete.value.length === 0) {
                    toast.error("No hay OT seleccionada");
                  } else {
                    setIsFOTGuia((prev) => !prev);
                  }
                }}
              >
                N° Guía
              </Button>
            </Tooltip>
          )} */}

        {OTAreas["areaActual"] !== 200 && !isMOTArchivo && (
          <div className="ml-2 w-[10vw]">
            <Input
              type="number"
              label="Seleccionar OT"
              name="searchOT"
              className="text-xl"
              color="orange"
              ref={searchOTRef}
              value={valueSearchOT.value as any}
              onChange={async (e: any) => {
                if (e.target.value !== "") {
                  let searchValue = e.target.value;

                  if (searchValue.length >= 10) {
                    console.log(searchValue);
                    const regex = /^0+/;
                    valueSearchOT.value = searchValue.replace(regex, "");
                    const toastLoading: any = toast.loading("cargando...");
                    await handleChecked(valueSearchOT.value).then(() => {
                      toast.dismiss(toastLoading);
                    });
                  }
                }
                valueSearchOT.value = e.target.value;
              }}
            />
          </div>
        )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.reporteEntrega] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_reporteEntrega && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (OTPkToDelete.value.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                } else {
                  setIsFOTReporteEntrega((prev) => !prev);
                }
              }}
            >
              N° Rep. Entrega
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.numeroOC] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_numeroOC && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }

                if (OTPkToDelete.value.length === 0) {
                  toast.error("No hay OT seleccionada");
                } else {
                  setIsFOTOrdenCompra((prev) => !prev);
                }

                // setIsFOTOrdenCompra((prev) => !prev);
              }}
            >
              N° OC
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.guiaDespacho] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_guiaDespacho && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }
                // if (validateAreaArchivo) {
                //   return toast.error(`OT no se encuentra en OT Archivo`);
                // }

                if (OTPkToDelete.value.length === 0) {
                  toast.error("No hay OT seleccionada");
                } else {
                  setIsFOTGuiaDespeacho((prev) => !prev);
                }
                // setIsFOTGuiaDespeacho((prev) => !prev);
              }}
            >
              N° Guía
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.confirmarEntrega] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_confirmarEntrega && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (OTPkToDelete.value.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                } else {
                  // setIsFOTReporteEntrega((prev) => !prev);
                }
              }}
            >
              Confirmar Entrega
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.preFacturar] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_preFacturar && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (OTPkToDelete.value.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                } else {
                  // setIsFOTReporteEntrega((prev) => !prev);
                }
              }}
            >
              Pre Factura
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.vistoBueno] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_vistoBueno && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (OTPkToDelete.value.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                } else {
                  // setIsFOTReporteEntrega((prev) => !prev);
                }
              }}
            >
              V°B°
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.numeroFactura] === "1" &&
          permisos_usuario_areas !== "0" && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (pktoDelete.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                }
                if (OTPkToDelete.value.length === 0) {
                  toast.error("No hay OT seleccionada");
                } else {
                  setIsFOTFactura((prev) => !prev);
                }
                // setShowFactura((prev) => !prev);
              }}
            >
              N° Factura
            </Button>
          )}

        {areaPermissions &&
          areaPermissions[PermisosBotones.confirmaPago] === "1" &&
          permisos_usuario_areas !== "0" &&
          permiso_usuario_btn_confirmaPago && (
            <Button
              className="otActionButton mt-3 mx-5"
              onClick={() => {
                if (OTPkToDelete.value.length < 1) {
                  return toast.error("No hay OT Seleccionada");
                } else {
                  // setIsFOTReporteEntrega((prev) => !prev);
                }
              }}
            >
              Confirmar Pago
            </Button>
          )}

        <Suspense>
          {isFOTFactura && (
            <FOTFactura
              otArchivo={isMOTArchivo}
              pktoDelete={OTPkToDelete.value || pktoDelete}
              setSelectedRows={setSelectedRows}
              closeModal={() => setIsFOTFactura(false)}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTGuiaDespacho && (
            <FOTGuiaDespacho
              pktoDelete={OTPkToDelete.value || pktoDelete}
              setSelectedRows={setSelectedRows}
              closeModal={() => setIsFOTGuiaDespeacho(false)}
              otArchivo={isMOTArchivo}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTOrdenCompra && (
            <FOTOrdenCompra
              otArchivo={true}
              pktoDelete={OTPkToDelete.value || pktoDelete}
              setSelectedRows={setSelectedRows}
              closeModal={() => setIsFOTOrdenCompra(false)}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTReporteEntrega && (
            <FOTReporteEntrega
              otArchivo={true}
              pktoDelete={OTPkToDelete.value || pktoDelete}
              setSelectedRows={setSelectedRows}
              closeModal={() => setIsFOTReporteEntrega(false)}
            />
          )}
        </Suspense>

        <Suspense>
          {isWhastApp && <FOTWhastApp onClose={() => setIsWhastApp(false)} />}
        </Suspense>

        <Suspense>
          {isFotTicketRetiro && <FOTTicketImpresion ref={SecondcomponentRef} />}
        </Suspense>

        <Suspense>
          {isFOTImpresa && (
            <div className="hidden">
              <FOTImpresa ref={componentRef} masivo={true} />
            </div>
          )}
        </Suspense>

        <Suspense>
          {isFOTValidarBodega && (
            <FOTValidarBodega
              pkToDelete={OTPkToDelete.value}
              handleClose={() => setIsFOTValidarBodega(false)}
            />
          )}
        </Suspense>

        <Suspense>
          {isShowErrorOTModal && (
            <ErrorOTModal
              onClose={() => setIsShowErrorOTModal(false)}
              data={dataOT && dataOT}
              valueConfirmOT={valueSearchOT}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTEmpaque && (
            <FOTEmpaque
              closeModal={() => setIsFOTEmpaque(false)}
              setSelectedRows={setSelectedRows}
              pktoDelete={OTPkToDelete.value}
              params={params}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTGuia && (
            <FOTGuiaDespacho
              closeModal={() => setIsFOTGuia(false)}
              setSelectedRows={setSelectedRows}
              pktoDelete={OTPkToDelete.value}
              params={params}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTReporteFirma && (
            <FOTReporteFirma
              closeModal={() => setIsFOTReporeFirma(false)}
              setSelectedRows={setSelectedRows}
              pkToDelete={OTPkToDelete.value}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTPendiente && (
            <FOTPendiente
              data={OTPkToDelete.value}
              onClose={() => setisFOTPendiente(false)}
              isMasivo={true}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTDerivacion && (
            <FOTDerivacion
              data={OTPkToDelete.value}
              onClose={() => setisFOTDerivacion(false)}
              isMasivo={true}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTValidarEmpaque && (
            <FOTValidarEmpaque
              setSelectedRows={setSelectedRows}
              pkToDelete={OTPkToDelete.value}
              onClose={() => setIsFOTValidarEmpaque(false)}
            />
          )}
        </Suspense>

        <Suspense>
          {isFOTValidateBodegaCristales && <FOTValidateCristales />}
        </Suspense>

        <Suspense>
          {isFOTUbicacion && (
            <FOTUbicacion
              setSelectedRows={setSelectedRows}
              pkToDelete={OTPkToDelete.value}
              closeModal={() => setIsFOTUbicacion(false)}
            />
          )}
        </Suspense>
      </div>
    );
  }
);

export default OTPrimaryButtons;
