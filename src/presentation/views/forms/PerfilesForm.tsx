/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { RadioButtonComponent, SelectInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationPerfilesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/PerfilesMantenedor";
// import { ERROR_MESSAGES } from "../../utils";
import { toast } from "react-toastify";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";

const strBaseUrl = "/api/perfiles/";
const strEntidad = "Perfil ";

export interface InputData {
  cargo: string | undefined;
  funcionalidad: string | undefined;
  permiso: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  // if (jsonData.password !== jsonData.password2) {
  //   alert(ERROR_MESSAGES.passwordNotMatch);
  // }

  const _p1 = `${jsonData.cargo}, ${jsonData.funcionalidad}, ${
    jsonData.permiso === "Lectura" ? 1 : 2
  }`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(jsonData: InputData): OutputData | null {
  const fields = [
    // jsonData.nombre && `nombre='${jsonData.nombre}'`,
    `permiso=${jsonData.permiso === "Lectura" ? 1 : 2}`,
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
    _p2: jsonData.cargo,
    _p3: jsonData.funcionalidad,
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

const PerfilesForm: React.FC<IFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    selectedRows,
    label,
    data,
    isEditting,
  }) => {
    const schema = validationPerfilesSchema(isEditting);
    const {
      editEntity,
      createdEntity,
      ListEntity,
      focusFirstInput,
      firstInputRef,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });

    // const resetTextFields = () => {
    //   reset({
    //     nombre: "",
    //     telefono: 0,
    //     correo: "",
    //   });
    // };

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
            // resetTextFields();
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

        // resetTextFields();
        updateNewEntity();
      },
      [closeModal, blnKeep, updateNewEntity]
    );

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data)
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

    useEffect(() => {
      focusFirstInput("cargo");
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
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <div className="w-full">
              <SelectInputComponent
                label="Cargo"
                name="cargo"
                showRefresh={true}
                data={data && data[EnumGrid.cargo_id]}
                control={control}
                entidad={["/api/cargos/", "02"]}
                error={!isEditting && errors.cargo}
              />
              <SelectInputComponent
                label="Funcionalidad"
                name="funcionalidad"
                showRefresh={true}
                data={data && data[EnumGrid.funcionalidad_id]}
                control={control}
                entidad={["/api/funcionalidades/", "02"]}
                error={!isEditting && errors.funcionalidad}
                inputRef={firstInputRef}
              />
            </div>

            <RadioButtonComponent
              control={control}
              label="Permiso"
              name="permiso"
              data={data && data[EnumGrid.permiso]}
              options={["Lectura", "Lectura/Escritura"]}
              error={!isEditting && errors.permiso}
            />
            {/* <TextInputComponent/> */}
          </div>

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>
      </div>
    );
  }
);

export default PerfilesForm;