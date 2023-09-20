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
import { validationUsusariosSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MUsuarios";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";

const strBaseUrl = "/api/usuarios/";
const strEntidad = "Usuario ";

export interface InputData {
  nombre: string | undefined;
  cargo: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  estado: string | undefined;
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

  const _p1 = ` '${jsonData.nombre}', 
     ${jsonData.cargo}, 
    '${jsonData.telefono}', 
    '${jsonData.correo}', 
     ${jsonData.estado === "Activo" ? 1 : 2}`;

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
    // jsonData.nombre && `nombre='${jsonData.nombre}'`,
    `nombre   ='${jsonData.nombre}'`,
    `telefono ='${jsonData.telefono}'`,
    `correo   ='${jsonData.correo}'`,
    `estado   = ${jsonData.estado === "Activo" ? 1 : 2}`,
    `cargo    = ${jsonData.cargo}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  const query = {
    query: "04",
    _p1: encodeURIComponent(_p1).replace(/%20/g, "+"),
    _p2: primaryKey,
    _p3: "",
  };
  console.log("query", query);
  return query;
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

const FUsuarios: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationUsusariosSchema(isEditting);
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
      setValue("nombre", "");
      setValue("telefono", "");
      setValue("correo", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="nombre"]'
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

    // const handleSaveChange = React.useCallback(
    //   async (data: InputData, isEditting: boolean) => {
    //     try {
    //       let transformedData = null;

    //       if (isEditting) {
    //         transformedData = transformUpdateQuery(data, intId.toString());
    //       } else {
    //         transformedData = transformInsertQuery(data);
    //       }

    //       const isDataValid =
    //         transformedData &&
    //         (!isEditting || intId) && // Requiere intId si está editando
    //         data.nombre && // Agregar otras condiciones para los campos requeridos
    //         data.cargo; // Agregar otras condiciones para los campos requeridos

    //       if (isDataValid) {
    //         const response = isEditting
    //           ? await editEntity(transformedData)
    //           : await createdEntity(transformedData);
    //         handleApiResponse(response, isEditting);
    //       } else {
    //         toast.error("Por favor, complete todos los campos requeridos.");
    //       }
    //     } catch (error: any) {
    //       toast.error(error);
    //     }
    //   },
    //   [editEntity, createdEntity, handleApiResponse, intId]
    // );

    const handleSaveChange = React.useCallback(
      async (data: InputData, isEditting: boolean) => {
        console.log(data);
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

    const handlePermisos = React.useCallback(async () => {
      try {
        // console.log("click");
        const intUserId = data && data[EnumGrid.id];
        const primaryKey = `_id=${intUserId}`;
        const query = "99";

        const response = await ListEntity(primaryKey, query);

        response[0][0] === "OK"
          ? show({ message: TITLES.permisos, type: "success" })
          : show({ message: TITLES.permisosError, type: "error" });
      } catch (error: any) {
        console.log(error);
        show({ message: error, type: "error" });
      }
    }, []);
    // useEffect(() => {
    //   focusFirstInput("nombre");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("nombre") : focusFirstInput("cargo");
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
              label="Nombre"
              name="nombre"
              data={data && data[EnumGrid.nombre]}
              control={control}
              error={!isEditting && errors.nombre}
              inputRef={firstInputRef}
            />
            <div className="w-full ">
              <SelectInputComponent
                label="Cargo"
                name="cargo"
                showRefresh={true}
                data={data && data[EnumGrid.cargo_id]}
                control={control}
                entidad={["/api/cargos/", "02"]}
                error={!isEditting && errors.cargo}
                customWidth={"345px"}
                inputRef={secondInputRef}
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
              data={data && data[EnumGrid.telefono]}
              control={control}
            />
            <TextInputComponent
              type="email"
              label="Correo"
              name="correo"
              data={data && data[EnumGrid.correo]}
              control={control}
              error={!isEditting && errors.correo}
              onlyRead={isEditting}
            />

            <RadioButtonComponent
              control={control}
              label="Estado"
              name="estado"
              data={data && data[EnumGrid.estado]}
              options={["Activo", "Suspendido"]}
              error={!isEditting && errors.estado}
              // horizontal={true}
            />
          </div>
          {isEditting && (
            <div className="w-1/2">
              <button
                type="button"
                onClick={handlePermisos}
                className="userFormBtnSubmit"
              >
                Copiar Permisos
              </button>
            </div>
          )}

          <button type="submit" className="userFormBtnSubmit">
            Guardar
          </button>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FUsuarios;
