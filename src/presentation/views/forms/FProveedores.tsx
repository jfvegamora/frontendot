/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { TextInputComponent } from "../../components/index.ts";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationProveedoresSchema } from "../../utils/validationFormSchemas.ts";
import { EnumGrid } from "../mantenedores/MProveedores.tsx";
import { toast } from "react-toastify";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../utils/index.ts";
import { useCrud } from "../../hooks/index.ts";
import { TITLES } from "../../utils/text_utils.ts";

const strBaseUrl = "/api/proveedores/";
const strEntidad = "Proveedor ";

export interface InputData {
  rut: string | undefined;
  nombre: string | undefined;
  direccion: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  sitio_web: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = `'${jsonData.rut}', '${jsonData.nombre}', '${jsonData.direccion}', 
              '${jsonData.telefono}', '${jsonData.correo}', '${jsonData.sitio_web}'`;

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
    `rut='${jsonData.rut}'`,
    `nombre='${jsonData.nombre}'`,
    `direccion='${jsonData.direccion}'`,
    `telefono='${jsonData.telefono}'`,
    `correo='${jsonData.correo}'`,
    `sitio_web='${jsonData.sitio_web}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");

  return {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
}

interface IFormPrps {
  closeModal: () => void;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedRows?: any;
  setEntities?: any;
  params?: any;
}

const FProveedores: React.FC<IFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    selectedRows,
    label,
    data,
    isEditting,
  }) => {
    const schema = validationProveedoresSchema(isEditting);
    const { editEntity, createdEntity, ListEntity } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = () => {
      setValue("rut", "");
      setValue("nombre", "");
      setValue("direccion", "");
      setValue("telefono", "");
      setValue("correo", "");
      setValue("sitio_web", "");
    };

    const updateNewEntity = React.useCallback(async () => {
      const newEntityData = await ListEntity(params, "01");
      setEntities(newEntityData);
    }, [params, setEntities, ListEntity]);

    const handleApiResponse = React.useCallback(
      (response: any, isEditting: boolean) => {
        const errorResponse = response?.response?.data.error;
        if (errorResponse) {
          const errorMessage =
            errorResponse === "IntegrityError"
              ? isEditting
                ? strEntidad.concat(ERROR_MESSAGES.edit)
                : strEntidad.concat(ERROR_MESSAGES.create)
              : errorResponse;
          toast.error(errorMessage);
        } else {
          toast.success(
            isEditting
              ? strEntidad.concat(SUCCESS_MESSAGES.edit)
              : strEntidad.concat(SUCCESS_MESSAGES.create)
          );
        }
        if (!blnKeep && !isEditting) {
          const result = window.confirm("¿Quieres continuar ingresando?");
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
        }

        resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, updateNewEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, selectedRows.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          console.log("error form:", error);
          toast.error(error);
        }
      },
      [selectedRows, editEntity, createdEntity, handleApiResponse]
    );

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
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <TextInputComponent
              type="text"
              label="RUT"
              name="rut"
              data={data && data[EnumGrid.Rut]}
              control={control}
              error={!isEditting && errors.rut}
            />
            <TextInputComponent
              type="text"
              label="Nombre"
              name="nombre"
              data={data && data[EnumGrid.Nombre]}
              control={control}
              error={!isEditting && errors.nombre}
            />
            <TextInputComponent
              type="text"
              label="Dirección"
              name="direccion"
              data={data && data[EnumGrid.Direccion]}
              control={control}
            />
            <TextInputComponent
              type="text"
              label="Teléfono"
              name="telefono"
              data={data && data[EnumGrid.Telefono]}
              control={control}
            />
            <TextInputComponent
              type="email"
              label="Correo"
              name="correo"
              data={data && data[EnumGrid.Correo]}
              control={control}
            />
            <TextInputComponent
              type="text"
              label="Sitio Web"
              name="sitio_web"
              data={data && data[EnumGrid.Sitio_Web]}
              control={control}
            />
            {/*  */}
          </div>

          <button type="submit" className="userFormBtnSubmit">
            {TITLES.guardar}
          </button>
        </form>
      </div>
    );
  }
);

export default FProveedores;
