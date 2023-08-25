/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { validationCargosSchema } from "../../utils";
import { TextInputComponent } from "../../components";

export interface ICargosInputData {
  nombre: string | undefined;
}
export enum EnumCargosGrid {
  id = 1,
  nombre = 2,
}
interface ICargosFormProps {
  closeModal: () => void;
  handleChange: SubmitHandler<ICargosInputData>;
  data?: any[];
  label: string;
  isEditting?: boolean;
}

const CargosForm: React.FC<ICargosFormProps> = React.memo(
  ({ closeModal, handleChange, data, label, isEditting }) => {
    const schema = validationCargosSchema(isEditting);
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    return (
      <div className="useFormContainer">
        <div className="userFormBtnCloseContainer">
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>
        <h1 className="userFormLabel">{label}</h1>

        <form onSubmit={handleSubmit(handleChange)} className="userFormulario">
          <div className="userFormularioCont">
            <TextInputComponent
              type="text"
              label="Nombre"
              name="nombre"
              data={data && data[EnumCargosGrid.nombre]}
              control={control}
              error={!isEditting && errors.nombre}
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

export default CargosForm;
