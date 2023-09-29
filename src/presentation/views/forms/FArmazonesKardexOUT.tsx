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
import { fechaActual, validationKardexOUTSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MArmazonesKardex";
import {
  ERROR_MESSAGES,
  MODAL,
  SUCCESS_MESSAGES,
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import { AppStore, useAppSelector } from "../../../redux/store";
import useCustomToast from "../../hooks/useCustomToast";
import {toast} from 'react-toastify'

const strBaseUrl = "/api/armazoneskardex/";
const strEntidad = "Kardex de Armazón ";

export interface InputData {
  insumo             : string | undefined;
  // descripcion         : string | undefined;
  fecha               : string | undefined;
  // es                  : string | undefined;
  motivo              : string | undefined;
  cantidad            : string | undefined;
  almacen             : string | undefined;
  // numero_factura      : string | undefined;
  // proveedor           : string | undefined;
  // valor_neto          : string | undefined;
  // ot                  : string | undefined;
  almacen_relacionado : string | null | undefined;
  observaciones       : string | undefined;
  usuario             : string | undefined;
  fecha_mov           : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: number;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData, userId?:number): OutputData | null {
  const year = fechaActual.getFullYear(); // Obtiene el año de 4 dígitos
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (agrega 1 ya que los meses comienzan en 0) y lo formatea a 2 dígitos
  const day = String(fechaActual.getDate()).padStart(2, '0'); // Obtiene el día y lo formatea a 2 dígitos

  const fechaFormateada = `${year}/${month}/${day}`;
  const dateHora = new Date().toLocaleTimeString();
  
  if(jsonData.fecha){
    if(fechaActual <= new Date(jsonData.fecha as string)){
      toast.error('Fecha mayor a la actual')
      throw new Error('fecha mayor a la actual')
      
    }
  }

  /*INSERT INTO CristalesKardex 
  (fecha, cristal, almacen, es, motivo, cantidad, valor_neto, proveedor, 
    numero_factura, OT, almacen_relacionado, observaciones, usuario, fecha_mov)*/
  const _p1 = `'${jsonData.fecha + " " + fechaActual.toLocaleTimeString()}', 
    ${jsonData.insumo}, 
    ${jsonData.almacen}, 
    ${2}, 
    ${jsonData.motivo},
    ${jsonData.cantidad}, 
    ${'0'}, 
    ${'0'}, 
    ${'0'}, 
    ${'0'}, 
    ${jsonData.almacen_relacionado}, 
   '${jsonData.observaciones}',
    ${userId}, 
   '${fechaFormateada + " " + dateHora}'`;

    // ${(jsonData.almacen_relacionado && jsonData.almacen_relacionado?.toString())?.length === 0 ? "0" : jsonData.almacen_relacionado}, 
    // 

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  console.log("query INSERT ", query);
  return query;
}

export function transformUpdateQuery(
  // jsonData: InputData
  // ,primaryKey: string
): OutputData | null {
  // const fields = [
  //   `almacen            = ${jsonData.almacen}`,
  //   `es                 = ${
  //     jsonData.es === MOTIVO_KARDEX.entrada
  //       ? 1
  //       : jsonData.es === MOTIVO_KARDEX.salida
  //       ? 2
  //       : 0
  //   }`,
  //   `motivo             = ${jsonData.motivo}`,
  //   `cantidad           = ${jsonData.cantidad}`,
  //   `valor_neto         = ${jsonData.valor_neto}`,
  //   `proveedor          = ${jsonData.proveedor}`,
  //   `numero_factura     = ${jsonData.numero_factura}`,
  //   `ot                 = ${jsonData.ot}`,
  //   `almacen_relacionado= ${jsonData.almacen_relacionado}`,
  //   `observaciones      ='${jsonData.observaciones}'`,
  //   `usuario            = ${jsonData.usuario}`,
  //   `fecha_mov          ='${jsonData.fecha_mov}'`,
  // ];

  // const filteredFields = fields.filter(
  //   (field) => field !== null && field !== ""
  // );

  // if (filteredFields.length === 0) {
  //   return null;
  // }
  // const _p1 = filteredFields.join(",");

  // return {
  //   query: "04",
  //   _p1,
  //   _p2: jsonData.cristal,
  //   _p3: jsonData.fecha,
  // };
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
}

const FArmazonesKardexOUT: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationKardexOUTSchema();
    const { showModal, CustomModal } = useModal();
    const userState = useAppSelector((store: AppStore) => store.user);
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    // const intId = data && data[EnumGrid.cristal];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("insumo", "");
      setValue("fecha", "undefined");
      // setValue("descripcion", "");
      setValue("cantidad", "");
      setValue("observaciones", "");
      // setValue("almacen_relacionado", "0");

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
        try {
          const transformedData = isEditting
            ? transformUpdateQuery()
            : transformInsertQuery(data, userState?.id);

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

    // useEffect(() => {
    //   focusFirstInput("codigo");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("es") : focusFirstInput("insumo");
    }, []);

    return (
      <div className="useFormContainer useFormContainer30rem">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container">
            <div className="w-full">
              <TextInputComponent
                type="number"
                label="Código Armazón"
                name="insumo"
                data={data && data[EnumGrid.insumo]}
                control={control}
                error={errors.insumo}
                inputRef={firstInputRef}
                onlyRead={isEditting}
              />
            </div>
            <div className="w-full">
              <TextInputComponent
                type={isEditting ? "datetime" : "date"}
                label="Fecha"
                name="fecha"
                data={data && data[EnumGrid.fecha]}
                control={control}
                error={errors.fecha}
                onlyRead={isEditting}
              />
            </div>
            </div>
            <div className="input-container">
              <div className="w-full">
              <SelectInputComponent
                    label="Motivo"
                    name="motivo"
                    showRefresh={true}
                    data={data && data[EnumGrid.motivo_id]}
                    control={control}
                    entidad={["/api/kardexmotivos/", "02"]}
                    error={errors.motivo}
                    // customWidth={"345px"}
                  />
              </div>
              <div className="w-full">
              <TextInputComponent
                type="number"
                label="Cantidad"
                name="cantidad"
                data={data && data[EnumGrid.salidas]}
                control={control}
                error={errors.cantidad}
              />
              </div>
            </div>
            <div className="input-container">
            <div className="w-full">
              <SelectInputComponent
                label="Almacén"
                name="almacen"
                showRefresh={true}
                data={data && data[EnumGrid.almacen_id]}
                control={control}
                entidad={["/api/almacenes/", "02"]}
                error={errors.almacen}
              />
              </div>
            </div>
            <div className="input-container">
            <div className="w-full">
            <SelectInputComponent
                label="Almacén Traspaso"
                name="almacen_relacionado"
                showRefresh={true}
                data={data && data[EnumGrid.almacen_relacionado_id]}
                control={control}
                entidad={["/api/almacenes/", "02"]}
                // error={errors.almacen_relacionado}
              />
            </div>
            </div>
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

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FArmazonesKardexOUT;
