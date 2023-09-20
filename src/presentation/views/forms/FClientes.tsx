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
import { validationClientesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MClientes";
import {
  ERROR_MESSAGES,
  MODAL,
  SUCCESS_MESSAGES,
  SEXO,
  TIPO_CLIENTE,
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import RegProComponent from "../../components/forms/RegProComponent";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/clientes/";
const strEntidad = "Cliente ";

export interface InputData {
  rut: string | undefined;
  nombre: string | undefined;
  tipo: string | undefined;
  sexo: string | undefined;
  fecha_nacimiento: string | undefined;
  direccion: string | undefined;
  region: string | undefined;
  provincia: string | undefined;
  comuna: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  establecimiento: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = `'${jsonData.rut}', 
               '${jsonData.nombre}', 
                ${
                  jsonData.tipo === TIPO_CLIENTE.beneficiario
                    ? "1"
                    : jsonData.tipo === TIPO_CLIENTE.particular
                    ? "2"
                    : jsonData.tipo === TIPO_CLIENTE.optica
                    ? "3"
                    : "0"
                },
                ${
                  jsonData.sexo === SEXO.masculino
                    ? "1"
                    : jsonData.sexo === SEXO.femenino
                    ? "2"
                    : jsonData.sexo === SEXO.no_aplica
                    ? "3"
                    : "0"
                }, 
               '${jsonData.fecha_nacimiento}', 
               '${jsonData.direccion}', 
                ${jsonData.comuna}, 
               '${jsonData.telefono}', 
               '${jsonData.correo}', 
                ${jsonData.establecimiento}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  console.log("query", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `nombre           ='${jsonData.nombre}'`,
    `tipo             = ${
      jsonData.tipo === TIPO_CLIENTE.beneficiario
        ? 1
        : jsonData.tipo === TIPO_CLIENTE.particular
        ? 2
        : jsonData.tipo === TIPO_CLIENTE.optica
        ? 3
        : 0
    }`,
    `sexo             = ${
      jsonData.sexo === SEXO.masculino
        ? 1
        : jsonData.sexo === SEXO.femenino
        ? 2
        : jsonData.sexo === SEXO.no_aplica
        ? 3
        : 0
    }`,
    `fecha_nacimiento ='${jsonData.fecha_nacimiento}'`,
    `direccion        ='${jsonData.direccion}'`,
    `comuna           = ${jsonData.comuna}`,
    `telefono         ='${jsonData.telefono}'`,
    `correo           ='${jsonData.correo}'`,
    `establecimiento  = ${jsonData.establecimiento}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey= ", primaryKey);
  console.log("_p1= ", _p1);
  return {
    query: "04",
    _p1,
    _p2: `'${primaryKey}'`,
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

const FClientes: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationClientesSchema(isEditting);
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
    const intId = data && data[EnumGrid.rut];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("rut", "");
      setValue("nombre", "");
      setValue("direccion", "");
      setValue("fecha_nacimiento", undefined);
      setValue("telefono", "");
      setValue("correo", "");

      if (firstInputRef.current) {
        const firstInput =
          firstInputRef.current.querySelector('input[name="rut"]');
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
      isEditting ? focusSecondInput("nombre") : focusFirstInput("rut");
    }, []);

    return (
      <div className="useFormContainer useFormContainer3">
        <div className="userFormBtnCloseContainer">
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
            <div className="userFormularioRow">
              <TextInputComponent
                type="text"
                label="RUT"
                name="rut"
                data={data && data[EnumGrid.rut]}
                control={control}
                error={!isEditting && errors.rut}
                inputRef={firstInputRef}
                onlyRead={isEditting}
              />
              <TextInputComponent
                type="text"
                label="Nombre"
                name="nombre"
                data={data && data[EnumGrid.nombre]}
                control={control}
                error={!isEditting && errors.nombre}
                inputRef={secondInputRef}
              />
              <RadioButtonComponent
                control={control}
                label="Sexo"
                name="sexo"
                data={data && data[EnumGrid.sexo]}
                options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                error={!isEditting && errors.sexo}
                // horizontal={true}
              />
              <RadioButtonComponent
                control={control}
                label="Tipo"
                name="tipo"
                data={data && data[EnumGrid.tipo]}
                options={[
                  TIPO_CLIENTE.beneficiario,
                  TIPO_CLIENTE.particular,
                  TIPO_CLIENTE.optica,
                ]}
                error={!isEditting && errors.tipo}
                // horizontal={true}
              />
            </div>
            <div className="userFormularioRow">
              <RegProComponent
                control={control}
                EnumGrid={EnumGrid}
                isEditting={isEditting}
                errors={errors}
                data={data && data}
              />
            </div>
            <div className="userFormularioRow">
              <TextInputComponent
                type="text"
                label="Direccion"
                name="direccion"
                data={data && data[EnumGrid.direccion]}
                control={control}
                error={!isEditting && errors.direccion}
              />
              <TextInputComponent
                type="date"
                label="Fecha Nacimiento"
                name="fecha_nacimiento"
                data={data && data[EnumGrid.fecha_nacimiento]}
                control={control}
                error={!isEditting && errors.fecha_nacimiento}
              />
              <TextInputComponent
                type="text"
                label="Teléfono"
                name="telefono"
                data={data && data[EnumGrid.telefono]}
                control={control}
                error={!isEditting && errors.telefono}
              />
            </div>
            <div className="userFormularioRow">
              <TextInputComponent
                type="text"
                label="Correo"
                name="correo"
                data={data && data[EnumGrid.correo]}
                control={control}
                error={!isEditting && errors.correo}
              />
              <div className="w-full">
                <SelectInputComponent
                  label="Establecimiento"
                  name="establecimiento"
                  showRefresh={true}
                  data={data && data[EnumGrid.establecimiento_id]}
                  control={control}
                  entidad={["/api/establecimientos/", "02"]}
                  error={!isEditting && errors.establecimiento}
                  customWidth={"345px"}
                />
              </div>
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

export default FClientes;
