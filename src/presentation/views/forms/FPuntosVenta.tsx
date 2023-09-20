/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPuntosVentaSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MPuntosVenta";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/puntosventa/";
const strEntidad = "Punto de Venta ";

export interface InputData {
  descripcion: string | undefined;
  tipo: string | undefined;
  direccion: string | undefined;
  almacen: string | undefined;
  encargado: string | undefined;
  telefono: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` ${jsonData.tipo}, 
              '${jsonData.descripcion}', 
              '${jsonData.direccion}', 
              '${jsonData.telefono}', 
               ${jsonData.encargado}, 
               ${jsonData.almacen}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `tipo       = ${jsonData.tipo}`,
    `descripcion='${jsonData.descripcion}'`,
    `direccion  ='${jsonData.direccion}'`,
    `telefono   ='${jsonData.telefono}'`,
    `encargado  = ${jsonData.encargado}`,
    `almacen    = ${jsonData.almacen}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("_p1", _p1);
  console.log("primaryKey", primaryKey);
  return {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
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

const FPuntosVenta: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationPuntosVentaSchema(isEditting);
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
    const intId = data && data[EnumGrid.id];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("descripcion", "");
      setValue("direccion", "");
      setValue("telefono", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="descripcion"]'
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
      focusFirstInput("descripcion");
    }, []);

    return (
      <div className="useFormContainer">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   if (!isModalOpen) {
          //     handleSubmit((data) => handleSaveChange(data, isEditting))(e);
          //   }
          // }}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <TextInputComponent
              type="text"
              label="Descripción"
              name="descripcion"
              data={data && data[EnumGrid.descripcion]}
              control={control}
              error={!isEditting && errors.descripcion}
              inputRef={firstInputRef}
            />
            <div className="w-full ">
              <SelectInputComponent
                label="Tipo"
                name="tipo"
                showRefresh={true}
                data={data && data[EnumGrid.tipo_id]}
                control={control}
                entidad={["/api/tipos/", "02", "PuntosVentaTipos"]}
                error={!isEditting && errors.tipo}
                customWidth={"345px"}
              />
            </div>

            <TextInputComponent
              type="text"
              label="Dirección"
              name="direccion"
              data={data && data[EnumGrid.direccion]}
              control={control}
            />

            <div className="w-full ">
              <SelectInputComponent
                label="Almacén"
                name="almacen"
                showRefresh={true}
                data={data && data[EnumGrid.almacen_id]}
                control={control}
                entidad={["/api/almacenes/", "02"]}
                error={!isEditting && errors.almacen}
                customWidth={"345px"}
              />
            </div>

            <div className="w-full ">
              <SelectInputComponent
                label="Encargado"
                name="encargado"
                showRefresh={true}
                data={data && data[EnumGrid.encargado_id]}
                control={control}
                entidad={["/api/usuarios/", "02"]}
                error={!isEditting && errors.encargado}
                customWidth={"345px"}
              />
            </div>

            <TextInputComponent
              type="text"
              label="Teléfono"
              name="telefono"
              data={data && data[EnumGrid.telefono]}
              control={control}
              error={!isEditting && errors.telefono}
            />
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

export default FPuntosVenta;
