/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationKardexOUTSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MArmazonesKardex";
import {
  MODAL,
  SUCCESS_MESSAGES, TITLES
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { AppStore, useAppSelector } from "../../../redux/store";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from 'react-toastify'
import AjusteInventario, { ajuste_inventario_autorizacion } from "../../components/AjusteInventario";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/armazoneskardex/";
const strEntidad = "Kardex de Armazón ";

export interface InputData {
  insumo: string | undefined;
  fecha: string | undefined;
  motivo_egreso: string | undefined;
  cantidad: string | undefined;
  almacen: string | undefined;
  almacen_relacionado: string | undefined;
  observaciones: string | undefined;
  usuario: string | undefined;
  fecha_mov: string | undefined;
  ot: string | undefined;
  ubicacion: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _pkToDelete: string;
}

export function transformUpdateQuery(): OutputData | null {
  return null;
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

const FArmazonesKardexOUT: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationKardexOUTSchema();
    const { showModal, CustomModal } = useModal();
    const userState = useAppSelector((store: AppStore) => store.user);
    const { show } = useCustomToast();
    const [fechaHoraActual, setFechaHoraActual] = useState(new Date());
    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

    const [showAutorizacion, setShowAutorizacion] = useState(false);
    const [_isAutorizacionValida, setIsAutorizacionValida] = useState(false);

    const handleAutorizacionSubmit = async (_data: any) => {
      try {
        setIsAutorizacionValida(true);
      } catch (error) {
        setIsAutorizacionValida(false);
      }
    };

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues:{
        almacen_relacionado: '0'
      }
    });

    function transformInsertQuery(jsonData: InputData, userId?: number): OutputData | any {
      setFechaHoraActual(new Date())

      if (jsonData.almacen === jsonData.almacen_relacionado) {
        toast.error('Almacén de origen y destino deben ser diferentes')
        throw new Error('error')

      }

      if (jsonData.motivo_egreso === '5') {
        console.log('pedir autorizacion')
        setShowAutorizacion(true)
      }


      // const year = fechaHoraActual.getFullYear(); // Obtiene el año de 4 dígitos
      // const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (agrega 1 ya que los meses comienzan en 0) y lo formatea a 2 dígitos
      // const day = String(fechaHoraActual.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea a 2 dígitos

      // const fechaFormateada = `${year}/${month}/${day}`;
      // const dateHora = new Date().toLocaleTimeString();

      if (jsonData.fecha) {
        if (fechaHoraActual <= new Date(jsonData.fecha as string)) {
          toast.error('Fecha mayor a la actual')
          throw new Error('fecha mayor a la actual')

        }
      }

      let _p1 = `"${jsonData.insumo}", ${jsonData.almacen}, ${2}, ${jsonData.motivo_egreso}, ${jsonData.cantidad},${'0'}, ${'0'}, ${'0'}, ${jsonData.ot || '0'}, ${jsonData.almacen_relacionado}, "${jsonData.observaciones}", ${userId}`;

      _p1 = _p1.replace(/'/g, '!');

      const kardex = [{
        'fecha': jsonData.fecha,
        'insumo': jsonData.insumo,
        'almacen': jsonData.almacen,
        'es': "2",
        'motivo': jsonData.motivo_egreso,
        'cantidad': jsonData.cantidad,
        'almacen_relacionado': jsonData.almacen_relacionado || 0,
        'observaciones': jsonData.observaciones,
        'usuario': userState?.id,
        'ubicacion': jsonData.ubicacion,
      }]


      const query: OutputData = {
        query: "03",
        _p1,
        _pkToDelete: JSON.stringify(kardex),
      };
      console.log("query INSERT ", query);
      ajuste_inventario_autorizacion.value = false;
      return query;
    }

    const resetTextFields = React.useCallback(() => {
      setValue("insumo", "");
      setValue("cantidad", "");
      setValue("observaciones", "");
      setValue("ot", "");
      setValue("ubicacion", "");

      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="insumo"]'
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
        if (response.code === "ERR_BAD_RESPONSE" || response.stack || response.hasOwnProperty('Error:')) {

          if (response.hasOwnProperty('Error:')) {
            show({
              message: response["Error:"],
              type: 'error'
            })
            return;
          }

          const errorMessage = isEditting
            ? strEntidad.concat(": " + response.message)
            : strEntidad.concat(": " + response.message)
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }

        if (response.mensaje.includes('Creado')) {
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
          if (data.motivo_egreso === '5') {
            setShowAutorizacion(true);
            await new Promise<void>((resolve) => {
              const unsubscribe = ajuste_inventario_autorizacion.subscribe((valido) => {
                console.log(valido)
                if (valido) {
                  setShowAutorizacion(false);
                  setIsAutorizacionValida(valido);
                  unsubscribe();
                  resolve();
                }
              });
            });
          }
          const transformedData = isEditting
            ? transformUpdateQuery()
            : transformInsertQuery(data, userState?.id);

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
      [editEntity, createdEntity, handleApiResponse]
    );

    useEffect(() => {
      isEditting ? focusSecondInput("es") : focusFirstInput("insumo");
      if (!showAutorizacion) {
        ajuste_inventario_autorizacion.value = false
      }
    }, []);

    return (
      <div className="useFormContainer centered-div w-[30vw]">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            {showAutorizacion && (
              <div className="relative top-0">
                <AjusteInventario onSubmit={handleAutorizacionSubmit} />
              </div>
            )}

            <div className="w-full flex items-center h-[4rem]">
              <div className="flex input-container items-center rowForm w-[60%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Código"
                    name="insumo"
                    data={data && data[EnumGrid.insumo]}
                    control={control}
                    error={errors.insumo}
                    inputRef={firstInputRef}
                    onlyRead={isEditting}
                    customWidth={"!h-[3vw] !text-[1vw]"}
                  />
                </div>
              </div>

              <div className="flex input-container items-center rowForm w-[40%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type={isEditting ? "datetime" : "date"}
                    label="Fecha"
                    name="fecha"
                    data={fechaFormateada ? fechaFormateada : data && data[EnumGrid.fecha]}
                    control={control}
                    error={errors.fecha}
                    onlyRead={isEditting}
                    textAlign="text-center"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[100%]  ">
                <div className="w-full ml-4">
                  <SelectInputComponent
                    label="Motivo Egreso"
                    name="motivo_egreso"
                    showRefresh={true}
                    data={data && data[EnumGrid.motivo_id]}
                    control={control}
                    entidad={["/api/kardexmotivos/", "02"]}
                    error={errors.motivo_egreso}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[17vw]"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[50%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Cantidad"
                    name="cantidad"
                    data={data && data[EnumGrid.salidas]}
                    control={control}
                    error={errors.cantidad}
                    textAlign="text-right"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[50%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="N° OT"
                    name="ot"
                    data={data && data[EnumGrid.ot]}
                    control={control}
                    error={errors.ot}
                    isOptional={true}
                    textAlign="text-right"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>



            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[100%]  ">
                <div className="w-full ml-4">
                  <SelectInputComponent
                    label="Almacén"
                    name="almacen"
                    showRefresh={true}
                    data={data && data[EnumGrid.almacen_id]}
                    control={control}
                    entidad={["/api/almacenes/", "02", `1&_p2=${userState.id}`]}
                    error={errors.almacen}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[17vw]"}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[100%]  ">
                <div className="w-full ml-4">
                  <SelectInputComponent
                    label="Almacén Destino"
                    name="almacen_relacionado"
                    showRefresh={true}
                    data={data && data[EnumGrid.almacen_relacionado_id]}
                    control={control}
                    entidad={["/api/almacenes/", "02", "1"]}
                    error={errors.almacen_relacionado}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[20vw]"}
                    isOptional={true}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.observaciones]}
                    control={control}
                    error={errors.observaciones}
                    customWidth={"!h-[3vw] !text-[1vw]"}
                    isOptional={true}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-full  ">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Ubicación"
                    name="ubicacion"
                    control={control}
                    isOptional={true}
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-[40%] mx-auto">
              {escritura_lectura && (
                <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${TITLES.guardar}`}
                </Button>
              )}
            </div>
          </div>

        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FArmazonesKardexOUT;
