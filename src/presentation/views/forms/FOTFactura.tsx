import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchOT } from "../../../redux/slices/OTSlice";
import { TextInputComponent } from "../../components";
import { MODAL, TITLES } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOTFacturaSchema } from "../../utils/validationFormSchemas";
import { useModal } from "../../hooks/useModal";
import { paramsOT } from "../mantenedores/MOT";
import { Button } from "@material-tailwind/react";
import { URLBackend } from "../../utils/config";

interface IDerivacion {
  data?: any;
  onClose?: any;
  formValues?: any;
  closeModal?: any;
  pktoDelete?: any;
  setSelectedRows?: any;
  otArchivo?: boolean;
}

// const strUrlOT = `${URLBackend}/api/othistorica/listado`;

const FOTFactura: React.FC<IDerivacion> = ({
  closeModal,
  pktoDelete,
  otArchivo,
}) => {
  const strUrl = `${URLBackend}/api/proyectodocum/listado`;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({ resolver: yupResolver(validationOTFacturaSchema()) });
  const { showModal, CustomModal } = useModal();
  // const { control, handleSubmit  } = useForm<any>()
  // const [fechaHoraActual, _setFechaHoraActual]  = useState(new Date());

  const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
  const OTAreas: any = useAppSelector(
    (store: AppStore) => store.OTAreas.areaActual
  );

  const dispatch = useAppDispatch();

  // console.log(pktoDelete)
  // console.log(errors)

  const onSubmit: SubmitHandler<any> = async (jsonData) => {
    if (pktoDelete.length < 1) {
      return toast.error("No Hay OT Seleccionada");
    }

    console.log(parseInt(jsonData["numero_doc"]));

    if (!(parseInt(jsonData["numero_doc"]) >= 0)) {
      return toast.error("Número de documento debe ser mayor a 0");
    }

    if (
      pktoDelete.every(
        (ot: any) => ot.estado !== "Facturada" && ot.estado !== "Cerrada"
      )
    ) {
      toast.error(`OT debe estar Cerrada o Facturada `);
      return;
    }

    if (parseInt(pktoDelete[0]["numero_factura"]) !== 0) {
      const result = await showModal(
        `OT: ${pktoDelete[0]["folio"]} Tiene Factura asignada, ¿Desea agregar una nueva? `,
        "!text-base",
        MODAL.keepYes,
        MODAL.kepNo
      );

      if (!result) {
        return;
      }
    }

    if (jsonData["numero_doc"] > 0) {
      if (jsonData["valor_neto"] <= 0) {
        return toast.error("Valor neto debe ser mayor a 0");
      }

      const validateOrdenCompra = pktoDelete.some((OT: any) => {
        if (OT["orden_compra"] === "0") {
          toast.error(`Folio: ${OT["folio"]} sin Orden de Compra`);
          return false;
        }

        // if(OT["numero_guia"] === 0){
        //     toast.error(`Folio: ${OT["folio"]} sin Número de Guia`);
        //     return false
        // }
        return true;
      });

      if (!validateOrdenCompra) {
        return;
      }
    }

    const toastLoading = toast.loading("Cargando...");
    let tipo_documento = 5;
    try {
      const query07 = {
        _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${tipo_documento}, "${
          jsonData["numero_doc"]
        }", "${jsonData["fecha_doc"]}", ${
          jsonData["valor_neto"]
        }, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
        _p2: jsonData["numero_doc"],
        _p3: pktoDelete[0]["proyecto_codigo"],
        _id: 5,
        _pkToDelete: JSON.stringify(
          pktoDelete.map((folioOT: any) => ({
            folio: folioOT["folio"],
            usuario: UsuarioID,
            origen: OTAreas,
            estado: jsonData["numero_doc"] === 0 ? 60 : 70,
            obs: `Asigna N° Factura: ${jsonData["numero_doc"]}`,
          }))
        ),
      };
      let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`;
      const resultQuery07 = await axios(`${strUrl}/${queryURL07}`);
      if (resultQuery07?.status === 200) {
        toast.success("Número factura asignado.");
        toast.dismiss(toastLoading);
        otArchivo
          ? dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
          : dispatch(
              fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value })
            );
        closeModal();
        toast.dismiss(toastLoading);
        // const query06 = {
        //     _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: (jsonData["numero_doc"] === '0' ? 60 : 70), usuario: UsuarioID, observaciones: jsonData["observaciones"], boton: 4 })))
        // }
        // let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`

        // await axios(`${strUrlOT}/${queryURL06}`).then(() => {
        //     toast.dismiss(toastLoading)
        //     toast.success('Factura Generada')
        //     dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
        // })
      } else {
        toast.dismiss(toastLoading);
        toast.error("error: Factura");
      }
      closeModal();
      toast.dismiss(toastLoading);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  console.log(errors);

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

  return (
    <div className="useFormContainer centered-div w-[35rem]">
      <div className="userFormBtnCloseContainer">
        <h1 className="userFormLabel mx-auto">Asignación de Factura</h1>
        <button onClick={closeModal} className="userFormBtnClose mr-4">
          X
        </button>
      </div>

      <form className="userFormulario" onSubmit={handleSubmit(onSubmit)}>
        <div className="userFormularioContainer">
          <div className="input-container items-center rowForm">
            <div className="labelInputDiv">
              <TextInputComponent
                type="text"
                label="Proyecto"
                name="proyecto"
                control={control}
                data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
                onlyRead={true}
                customWidth={"labelInput inputStyles"}
              />
            </div>
          </div>

          <div className="w-full flex items-center">
            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="number"
                  label="N° Documento"
                  name="numero_doc"
                  control={control}
                  error={errors.numero_doc}
                  customWidth={"labelInput inputStyles text-right"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="date"
                  label="Fecha Doc"
                  name="fecha_doc"
                  control={control}
                  textAlign="text-center"
                  error={errors.fecha_doc}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="number"
                  label="Valor Neto $"
                  name="valor_neto"
                  control={control}
                  error={errors.valor_neto}
                  customWidth={"labelInput inputStyles text-right"}
                />
              </div>
            </div>
          </div>

          <div className="input-container items-center rowForm">
            <div className="labelInputDiv">
              <TextInputComponent
                type="text"
                label="Observaciones"
                name="observaciones"
                control={control}
                isOptional={true}
                customWidth={"labelInput inputStyles"}
              />
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
            <div className="w-[50%] mx-auto">
              <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                {`${TITLES.aceptar}`}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <CustomModal />
    </div>
  );
};

export default FOTFactura;
