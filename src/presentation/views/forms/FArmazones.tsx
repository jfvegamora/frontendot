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
import { validationArmazonesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MArmazones";
import { toast } from "react-toastify";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";

const strBaseUrl = "/api/armazones/";
const strEntidad = "Armazón ";

export interface InputData {
  codigo        : number | undefined,
  tipo          : string | undefined,
  material      : string | undefined,
  marca         : string | undefined,
  modelo        : string | undefined,
  color         : string | undefined,
  aro           : number | undefined,
  puente        : number | undefined,
  diagonal      : number | undefined,
  brazo         : number | undefined,
  uso           : string | undefined,
  stock_minimo  : number | undefined,
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = ` ${jsonData.codigo}, 
                ${jsonData.tipo}, 
                ${jsonData.marca}, 
               '${jsonData.modelo}', 
               '${jsonData.color}', 
                ${jsonData.material}, 
                ${jsonData.aro}, 
                ${jsonData.puente}, 
                ${jsonData.diagonal}, 
                ${jsonData.brazo}, 
                ${jsonData.uso}, 
                ${jsonData.stock_minimo}`;

  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: number
): OutputData | null {
  const fields = [
    `tipo         =  ${jsonData.tipo}`, 
    `marca        =  ${jsonData.marca}`, 
    `modelo       = '${jsonData.modelo}'`, 
    `color        = '${jsonData.color}'`, 
    `material     =  ${jsonData.material}`, 
    `aro          =  ${jsonData.aro}`, 
    `puente       =  ${jsonData.puente}`, 
    `diagonal     =  ${jsonData.diagonal}`, 
    `brazo        =  ${jsonData.brazo}`, 
    `uso          =  ${jsonData.uso}`, 
    `stock_minimo =  ${jsonData.stock_minimo}`,
];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  return {
    query: "04",
    _p1,
    _p3: primaryKey,
  };
}

interface IUserFormPrps {
  closeModal: () => void;
  data?         : any[];
  label         : string;
  isEditting?   : any;
  selectedRows? : any;
  setEntities?  : any;
  params?       : any;
}

const FArmazones: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationArmazonesSchema(isEditting);
    const { showModal, CustomModal } = useModal();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      secondInputRef,
      focusSecondInput
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[EnumGrid.codigo];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const resetTextFields = React.useCallback(() => {
      setValue("codigo"      , 0);
      setValue("modelo"      , "");
      setValue("color"       , "");
      setValue("aro"         , 0);
      setValue("puente"      , 0);
      setValue("diagonal"    , 0);
      setValue("brazo"       , 0);
      setValue("stock_minimo", 0);
  
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="codigo"]'
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
      toast.success(
        isEditting
          ? strEntidad.concat(SUCCESS_MESSAGES.edit)
          : strEntidad.concat(SUCCESS_MESSAGES.create)
      );
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
          toast.error(errorMessage ? errorMessage : response.code);
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
          toast.error(error);
        }
      },
      [editEntity, createdEntity, handleApiResponse, intId]
    );

    useEffect(() => {
      isEditting
         ? focusSecondInput("tipo")
         : focusFirstInput("codigo")
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
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   if (!isModalOpen) {
          //     handleSubmit((data) => handleSaveChange(data, isEditting))(e);
          //   }
          // }}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <div className="userFormularioRow">
              <TextInputComponent
                type      = "number"
                label     = "Código"
                name      = "codigo"
                data      = {data && data[EnumGrid.codigo]}
                control   = {control}
                error     = {!isEditting && errors.codigo}
                inputRef  = {firstInputRef}
                onlyRead  = {isEditting}
              />
            <SelectInputComponent
                label       = "Tipo"
                name        = "tipo"
                showRefresh = {true}
                data        = {data && data[EnumGrid.armazon_tipo_id]}
                control     = {control}
                entidad     = {["/api/tipos/", "02", "ArmazonesTipos"]}
                error       = {!isEditting && errors.tipo}
                customWidth = {"345px"}
                inputRef    = {secondInputRef}    
                />
            <SelectInputComponent
                label       = "Material"
                name        = "material"
                showRefresh = {true}
                data        = {data && data[EnumGrid.armazon_material_id]}
                control     = {control}
                entidad     = {["/api/tipos/", "02", "ArmazonesMaterial"]}
                error       = {!isEditting && errors.material}
                customWidth = {"345px"}
              />
            </div>
            <div className="userFormularioRow">
              <SelectInputComponent
                label       = "Marca"
                name        = "marca"
                showRefresh = {true}
                data        = {data && data[EnumGrid.marca_id]}
                control     = {control}
                entidad     = {["/api/marcas/", "02"]}
                error       = {!isEditting && errors.marca}
                customWidth = {"345px"}
              />
              <TextInputComponent
                type    = "text"
                label   = "Modelo"
                name    = "modelo"
                data    = {data && data[EnumGrid.modelo]}
                control = {control}
                error   = {!isEditting && errors.modelo}
              />
              <TextInputComponent
                type    = "text"
                label   = "Color"
                name    = "color"
                data    = {data && data[EnumGrid.color]}
                control = {control}
                error   = {!isEditting && errors.color}
              />
            </div>
            <div className="userFormularioRow">
              <TextInputComponent
                type    = "number"
                label   = "Aro"
                name    = "aro"
                data    = {data && data[EnumGrid.aro]}
                control = {control}
                error   = {!isEditting && errors.aro}
              />
              <TextInputComponent
                type    = "number"
                label   = "Puente"
                name    = "puente"
                data    = {data && data[EnumGrid.puente]}
                control = {control}
                error   = {!isEditting && errors.puente}
              />
              <TextInputComponent
                type    = "number"
                label   = "Brazo"
                name    = "brazo"
                data    = {data && data[EnumGrid.brazo]}
                control = {control}
                error   = {!isEditting && errors.brazo}
              />
            </div>
            <div className="userFormularioRow">
              <TextInputComponent
                type    = "number"
                label   = "Diagonal"
                name    = "diagonal"
                data    = {data && data[EnumGrid.diagonal]}
                control = {control}
                error   = {!isEditting && errors.diagonal}
              />
            <SelectInputComponent
                label       = "Uso"
                name        = "uso"
                showRefresh = {true}
                data        = {data && data[EnumGrid.armazon_uso_id]}
                control     = {control}
                entidad     = {["/api/tipos/", "02", "ArmazonesUsos"]}
                error       = {!isEditting && errors.uso}
                customWidth = {"345px"}
              />
              <TextInputComponent
                type="number"
                label="Stock Mínimo"
                name="stock_minimo"
                data={data && data[EnumGrid.stock_minimo]}
                control={control}
                error={!isEditting && errors.stock_minimo}
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

export default FArmazones;
