/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUserSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/UsuariosMantenedor";
// import { ERROR_MESSAGES } from "../../utils";
import { toast } from "react-toastify";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";

const strBaseUrl = "/api/usuarios/";
const strEntidad = "Usuario ";

export interface IUserInputData {
  nombre: string | undefined;
  cargo: string | undefined;
  telefono: number | undefined;
  correo: string | undefined;
  estado: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(
  jsonData: IUserInputData
): OutputData | null {
  // if (jsonData.password !== jsonData.password2) {
  //   alert(ERROR_MESSAGES.passwordNotMatch);
  // }

  const _p1 = `'${jsonData.nombre}', ${jsonData.cargo}, '${
    jsonData.telefono
  }', '${jsonData.correo}', ${jsonData.estado === "Activo" ? 1 : 2}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: IUserInputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    // jsonData.nombre && `nombre='${jsonData.nombre}'`,
    `nombre='${jsonData.nombre}'`,
    `telefono='${jsonData.telefono}'`,
    `correo='${jsonData.correo}'`,
    `estado=${jsonData.estado === "Activo" ? 1 : 2}`,
    `cargo=${jsonData.cargo}`,
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

interface IUserFormPrps {
  closeModal: () => void;
  handleChange: SubmitHandler<IUserInputData>;
  data?: any[];
  label: string;
  isEditting?: any;
  selectedIds?: any;
  setEntities?: any;
  params?: any;
}

const UserForm: React.FC<IUserFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    selectedIds,
    label,
    data,
    isEditting,
  }) => {
    const schema = validationUserSchema(isEditting);
    const { editEntity, createdEntity, ListEntity } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });

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
            reset();
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

        reset();
        updateNewEntity();
      },
      [closeModal, blnKeep, reset, updateNewEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: IUserInputData, isEditting: boolean) => {
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, selectedIds.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
        } catch (error: any) {
          console.log("error cargos form:", error);
          toast.error(error);
        }
      },
      [selectedIds, editEntity, createdEntity, handleApiResponse]
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
              label="Nombre"
              name="nombre"
              data={data && data[EnumGrid.Nombre]}
              control={control}
              error={!isEditting && errors.nombre}
            />
            <div className="w-full">
              <SelectInputComponent
                label="Cargo"
                name="cargo"
                showRefresh={true}
                data={data && data[EnumGrid.Cargo_id]}
                control={control}
                entidad={["/api/cargos/", "02"]}
                error={!isEditting && errors.cargo}
              />
              {/* <SelectInputComponent
                label="TipoInsumos"
                name="tipos"
                showRefresh={true}
                control={control}
                entidad={["/api/tipos/", "02", "TipoInsumos"]}
                error={!isEditting && errors.cargo}
              /> */}
            </div>

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

            <RadioButtonComponent
              control={control}
              label="Estado"
              name="estado"
              data={data && data[EnumGrid.Estado]}
              options={["Activo", "Suspendido"]}
              error={!isEditting && errors.estado}
            />
            {/* <TextInputComponent
              type="password"
              label="Password"
              name="password"
              control={control}
              error={!isEditting && errors.password}
            />
            <TextInputComponent
              type="password"
              label="Confirmar Password"
              name="password2"
              control={control}
              error={!isEditting && errors.password}
            /> */}
          </div>

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>
      </div>
    );
  }
);

export default UserForm;
