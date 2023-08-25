/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  RadioButtonComponent,
  SelectInputComponent,
  TextInputComponent,
} from "../../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationUserSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/UsuariosMantenedor";
import { ERROR_MESSAGES } from "../../utils";

export interface IUserInputData {
  nombre: string | undefined;
  password: string | undefined;
  password2?: string | undefined;
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
  if (jsonData.password !== jsonData.password2) {
    alert(ERROR_MESSAGES.passwordNotMatch);
  }

  const _p1 = `'${jsonData.nombre}', '', ${jsonData.cargo}, '${
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
    jsonData.nombre && `nombre='${jsonData.nombre}'`,
    jsonData.telefono && `telefono='${jsonData.telefono}'`,
    jsonData.correo && `correo='${jsonData.correo}'`,
    jsonData.estado && `estado=${jsonData.estado === "Activo" ? 1 : 2}`,
    jsonData.cargo && `cargo=${jsonData.cargo}`,
    jsonData.password && `password='${jsonData.password}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }

  // const _p1 = `"${filteredFields.join(",")}"`;
  const _p1 = filteredFields.join(",");
  console.log("_p1", _p1);
  console.log("_p2", primaryKey);

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
  isEditting?: boolean;
}

const UserForm: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, handleChange, label, data, isEditting }) => {
    const schema = validationUserSchema(isEditting);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    // useEffect(() => {
    //   if (data) {
    //     setValue("nombre", data[EnumGrid.Nombre]);
    //     setValue("password", "");
    //     setValue("password2", ""); // Asegúrate de establecer password2 también
    //     // ... establecer los valores para los otros campos
    //   }
    // }, [data, setValue]);
    return (
      <div className="useFormContainer">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form onSubmit={handleSubmit(handleChange)} className="userFormulario">
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
                control={control}
                entidad={["/api/cargos/", "02"]}
                error={!isEditting && errors.cargo}
              />
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
            <TextInputComponent
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
            />
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
