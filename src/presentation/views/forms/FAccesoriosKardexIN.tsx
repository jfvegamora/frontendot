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
import { fechaActual, validationKardexINSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MAccesoriosKardex";
import {
  MODAL,
  SUCCESS_MESSAGES, TITLES,
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { AppStore, useAppSelector } from "../../../redux/store";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from 'react-toastify'
import { ajuste_inventario_autorizacion } from "../../components/AjusteInventario";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/accesorioskardex/";
const strEntidad = "Kardex de Accesorio ";

export interface InputData {
  insumo: string | undefined;
  descripcion: string | undefined;
  fecha: string | undefined;
  motivo_ingreso: string | undefined;
  cantidad: string | undefined;
  almacen: string | undefined;
  numero_factura: string | undefined;
  proveedor: string | null | undefined;
  valor_neto: string | undefined;
  observaciones: string | undefined;
  usuario: string | undefined;
  fecha_mov: string | undefined;
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

const FAccesoriosKardexIN: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationKardexINSchema();
    const { showModal, CustomModal } = useModal();
    const userState = useAppSelector((store: AppStore) => store.user);
    const { show } = useCustomToast();
    const [fechaHoraActual, setFechaHoraActual] = useState(fechaActual);

    const [_showAutorizacion, setShowAutorizacion] = useState(false);
    const [_isAutorizacionValida, setIsAutorizacionValida] = useState(false);

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
        proveedor: '0'
      }
    });

    function transformInsertQuery(jsonData: InputData, userId?: number): OutputData | null | any {
      setFechaHoraActual(new Date())
      if (jsonData.motivo_ingreso === '5') {
        console.log('pedir autorizacion')
        setShowAutorizacion(true)

      }
      // const year = fechaHoraActual.getFullYear(); // Obtiene el año de 4 dígitos
      // const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (agrega 1 ya que los meses comienzan en 0) y lo formatea a 2 dígitos
      // const day = String(fechaHoraActual.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea a 2 dígitos

      // const fechaFormateada = `${year}/${month}/${day}`;
      // const dateHora = new Date().toLocaleTimeString();

      if (jsonData.fecha) {
        if (fechaHoraActual < new Date(jsonData.fecha as string)) {
          toast.error('Fecha mayor a la actual')
          throw new Error('fecha mayor a la actual')

        }
      }

      let _p1 = ` 
       "${jsonData.insumo}", 
        ${jsonData.almacen}, 
        ${1}, 
        ${jsonData.motivo_ingreso},
        ${jsonData.cantidad}, 
        ${(jsonData.valor_neto && jsonData.valor_neto?.toString())?.length === 0 ? "0" : jsonData.valor_neto}, 
        ${jsonData.proveedor}, 
        ${(jsonData.numero_factura && jsonData.numero_factura?.toString())?.length === 0 ? "0" : jsonData.numero_factura}, 
        ${'0'}, 
        ${'0'}, 
       "${jsonData.observaciones}",
        ${userId}`;

      _p1 = _p1.replace(/'/g, '!');

      const kardex = [{
        'insumo': jsonData.insumo,
        'fecha': jsonData.fecha,
        'almacen': jsonData.almacen,
        'es': "1",
        'motivo': jsonData.motivo_ingreso,
        'cantidad': jsonData.cantidad,
        'almacen_relacionado': 0,
        'observaciones': jsonData.observaciones,
        'usuario': userState?.id,
        'ubicacion': jsonData.ubicacion,
      }]

      const query = {
        query: "03",
        _p1,
        _pkToDelete: JSON.stringify(kardex),
      };

      ajuste_inventario_autorizacion.value = false

      return query;
    }

    const resetTextFields = React.useCallback(() => {
      setValue("insumo", "");
      // setValue("fecha", "");
      // setValue("descripcion", "");
      setValue("cantidad", "");
      setValue("numero_factura", "");
      setValue("valor_neto", "");
      setValue("observaciones", "");
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
          if (data.motivo_ingreso === '5') {
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

    // useEffect(() => {
    //   focusFirstInput("codigo");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("es") : focusFirstInput("insumo");
    }, []);

    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

    return (
      <div className="useFormContainer centered-div w-[30vw]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel translate-x-[-1rem]">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">

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
                    customWidth={"!h-[3vw] !text-[1vw]"}
                    textAlign="text-center"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[70%]  ">
                <div className="w-full !mt-4 ml-4">
                  <SelectInputComponent
                    label="Motivo Ingreso"
                    name="motivo_ingreso"
                    showRefresh={true}
                    data={data && data[EnumGrid.motivo_id]}
                    control={control}
                    entidad={["/api/kardexmotivos/", "01"]}
                    error={errors.motivo_ingreso}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[18vw]"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[30%]  ">
                <div className="w-[11.2rem] translate-x-[-2.8rem]">
                  <TextInputComponent
                    type="number"
                    label="Cantidad"
                    name="cantidad"
                    data={data && data[EnumGrid.entradas]}
                    control={control}
                    error={errors.cantidad}
                    textAlign="text-right"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[70%]  ">
                <div className="w-full !mt-4 ml-4">
                  <SelectInputComponent
                    label="Almacén"
                    name="almacen"
                    showRefresh={true}
                    data={data && data[EnumGrid.almacen_id]}
                    control={control}
                    entidad={["/api/almacenes/", "02", `3&_p2=${userState.id}`]}
                    error={errors.almacen}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[18vw]"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]  ">
                <div className="w-[11.2rem] translate-x-[-2.8rem]">
                  <TextInputComponent
                    type="number"
                    label="N° Factura"
                    name="numero_factura"
                    data={data && data[EnumGrid.numero_factura]}
                    control={control}
                    error={errors.numero_factura}
                    isOptional={true}
                    textAlign="text-right"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-[70%]  ">
                <div className="w-full !mt-4 ml-4">
                  <SelectInputComponent
                    label="Provedor"
                    name="proveedor"
                    showRefresh={true}
                    data={data && data[EnumGrid.proveedor_id]}
                    control={control}
                    entidad={["/api/proveedores/", "02"]}
                    error={errors.proveedor}
                    customWidth={"!h-[2.5vw] text-[1vw] !w-[18vw]"}
                    isOptional={true}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]  ">
                <div className="w-[11.2rem] translate-x-[-2.8rem]">
                  <TextInputComponent
                    type="number"
                    label="$ Neto Unitario"
                    name="valor_neto"
                    data={data && data[EnumGrid.valor_neto]}
                    control={control}
                    error={errors.valor_neto}
                    isOptional={true}
                    textAlign="text-right"
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>
            </div>

            <div className="w-full flex items-center h-[4rem]">
              <div className="input-container items-center rowForm w-full  ">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[EnumGrid.observaciones]}
                    control={control}
                    error={errors.observaciones}
                    isOptional={true}
                    customWidth={"!h-[3vw] !text-[1vw]"}

                  />
                </div>
              </div>

            <div className="input-container items-center rowForm w-full  ">
                <div className=" w-[11.2rem] translate-x-[3.5vw]">
                  <TextInputComponent
                    type="text"
                    label="Ubicación"
                    name="ubicacion"
                    // data={data && data[EnumGrid.ubicacion]}
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

export default FAccesoriosKardexIN;
