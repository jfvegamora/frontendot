import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchOT } from "../../../redux/slices/OTSlice";
import { TextInputComponent } from "../../components";
import { MODAL, TITLES, clearAllCheck } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOTGuiaSchema } from "../../utils/validationFormSchemas";
import { useModal } from "../../hooks/useModal";
import { paramsOT } from "../mantenedores/MOT";
import { Button } from "@material-tailwind/react";
import { URLBackend } from "../../utils/config";

interface Interface {
  data?: any;
  onClose?: any;
  formValues?: any;
  closeModal?: any;
  pkToDelete?: any;
  setSelectedRows?: any;
}

const FOTReporteFirma: React.FC<Interface> = ({
  closeModal,
  pkToDelete,
  setSelectedRows,
}) => {
  const strUrl = `${URLBackend}/api/proyectodocum/listado`;
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>({ resolver: yupResolver(validationOTGuiaSchema()) });
  // const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());

  const [numeroReporteFirma, setNumeroReporteFirma] = useState(null);

  const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
  const OTAreas: any = useAppSelector(
    (store: AppStore) => store.OTAreas.areaActual
  );

  const dispatch = useAppDispatch();
  const { CustomModal, showModal } = useModal();

  const fetchNumeroReporteFirma = async () => {
    try {
      const query = {
        _proyecto: pkToDelete[0]["proyecto_codigo"],
        _pkToDelete: pkToDelete[0]["folio"],
        _id: 2,
        _usuario: UsuarioID,
      };

      const strUrl = `${URLBackend}/api/proyectodocum/listado`;
      const queryURL = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`;
      const result = await axios(`${strUrl}/${queryURL}`);

      console.log(result.data[0]);
      if (result.status === 200) {
        setNumeroReporteFirma(result.data[0][0]);
        setValue("numero_doc", result.data[0][0]);
      }
    } catch (error) {
      // toast.dismiss(toastLoading)
      console.log(error);
      throw error;
    }
  };

  React.useEffect(() => {
    const toastLoading = toast.loading("Cargando...");
    console.log(pkToDelete);
    fetchNumeroReporteFirma().then(() => {
      toast.dismiss(toastLoading);
    });
  }, []);

  const onSubmit: SubmitHandler<any> = async (jsonData) => {
    if (pkToDelete.length < 1) {
      return toast.error("No Hay OT Seleccionada");
    }

    if (!(parseInt(jsonData["numero_doc"]) >= 0)) {
      return toast.error("Numero de documento debe ser mayor a 0");
    }

    const proyectoPrimero = pkToDelete[0].proyecto;
    if (pkToDelete.some((ot: any) => ot.proyecto !== proyectoPrimero)) {
      toast.error("OT deben pertenecer al mismo proyecto");
      return;
    }

    const toastLoading = toast.loading("Cargando...");

    // console.log(pkToDelete)

    // if(parseInt(pkToDelete[0]["numero_envio"]) !== 0 && pkToDelete[0]["numero_envio"] !== null){
    //     toast.dismiss(toastLoading)
    //     return toast.error(`OT ${pkToDelete[0]["folio"]} ya tiene un número de envío asignado `)
    //   }

    if (parseInt(pkToDelete[0]["numero_reporte_firma"]) !== 0) {
      const result = await showModal(
        `OT: ${pkToDelete[0]["folio"]} Tiene Reporte de Firmas asignado, ¿Desea agregar uno nuevo? `,
        "",
        MODAL.keepYes,
        MODAL.kepNo
      );

      if (!result) {
        setSelectedRows([]);
        return;
      }
    }

    try {
      let tipo_documento = 2;

      const query07 = {
        _p1: `"${pkToDelete[0]["proyecto_codigo"]}", ${tipo_documento}, "${
          jsonData["numero_doc"]
        }", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${
          jsonData["observaciones"]
        }"`,
        _p2: jsonData["numero_doc"],
        _p3: pkToDelete[0]["proyecto_codigo"],
        _id: 2,
        _pkToDelete: JSON.stringify(
          pkToDelete.map((folioOT: any) => ({
            folio: folioOT["folio"],
            usuario: UsuarioID,
            origen: OTAreas,
            estado: `${folioOT.estado_id}`,
            obs: `Asigna Reporte Firma: ${jsonData["numero_doc"]}`,
          }))
        ),
      };

      let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`;
      const resultQuery07 = await axios(`${strUrl}/${queryURL07}`);

      if (resultQuery07?.status === 200) {
        toast.success("Reporte de firmas generado");
        toast.dismiss(toastLoading);
        clearAllCheck.value = false;
        dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }));
      } else {
        toast.dismiss(toastLoading);
        toast.error("error: Reporte de firmas");
      }
      setSelectedRows([]);
      closeModal();
      toast.dismiss(toastLoading);
    } catch (error) {
      toast.dismiss(toastLoading);
      console.log(error);
      throw error;
    }
  };

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

  // const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

  return (
    <div className="useFormContainer centered-div w-[35rem]">
      {numeroReporteFirma !== null && (
        <div className="">
          <div className="userFormBtnCloseContainer">
            <h1 className="userFormLabel mx-auto">
              Asignación Reporte de Firma
            </h1>
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
                    data={pkToDelete[0] && pkToDelete[0]["proyecto"]}
                    onlyRead={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="w-full flex items-center">
                <div className="input-container items-center rowForm w-[50%]">
                  <div className="labelInputDiv">
                    <TextInputComponent
                      type="number"
                      label="N° Documento"
                      data={numeroReporteFirma}
                      name="numero_doc"
                      control={control}
                      error={errors.numero_doc}
                      customWidth={"labelInput inputStyles text-right"}
                    />
                  </div>
                </div>
                <div className="input-container items-center rowForm w-[50%]">
                  <div className="labelInputDiv">
                    <TextInputComponent
                      type="date"
                      label="Fecha Doc"
                      name="fecha_doc"
                      control={control}
                      // data={fechaFormateada}
                      textAlign="text-center"
                      error={errors.fecha_doc}
                      customWidth={"labelInput inputStyles"}
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
                  <Button
                    type="submit"
                    tabIndex={1}
                    className="userFormBtnSubmit"
                  >
                    {`${TITLES.aceptar}`}
                  </Button>
                </div>
              </div>
            </div>
          </form>
          <CustomModal />
        </div>
      )}
    </div>
  );
};

export default FOTReporteFirma;
