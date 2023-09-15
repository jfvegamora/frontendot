/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  TextInputComponent,
} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationMandantesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MMandantes";
import { toast } from "react-toastify";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import RegProComponent from "../../components/forms/RegProComponent";

const strBaseUrl = "/api/mandantes/";
const strEntidad = "Mandante ";

export interface InputData {
  codigo   : string | undefined;
  rut      : string | undefined;
  nombre   : string | undefined;
  region   : string | undefined;
  provincia: string | undefined;
  comuna   : string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  const _p1 = `'${jsonData.codigo}','${jsonData.rut}','${jsonData.nombre}','${jsonData.comuna}'`;

  console.log('p1', _p1)
  const query: OutputData = {
    query: "03",
    _p1: _p1,
  };
  
  console.log('queryy', query)
  return query;
}

export function transformUpdateQuery(
  jsonData  : InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `rut    ='${jsonData.rut}'`,
    `nombre ='${jsonData.nombre}'`,
    `comuna ='${jsonData.comuna}'`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");
  console.log("primaryKey", primaryKey);
  console.log("_p1: ", _p1);
  return {
    query: "04",
    _p1,
    _p2:` '${primaryKey}'`,
  };
}

interface IUserFormPrps {
  closeModal: () => void;
  data?        : any[];
  label        : string;
  isEditting?  : any;
  selectedRows?: any;
  setEntities? : any;
  params?      : any;
}

const FMandantes: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting }) => {
    const schema = validationMandantesSchema(isEditting);
    const { showModal, CustomModal } = useModal();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
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
      setValue("codigo", "");
      setValue("rut"   , "");
      setValue("nombre", "");
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
      focusFirstInput("codigo");
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
              type    ="text"
              label   ="Código"
              name    ="codigo"
              data    ={data && data[EnumGrid.codigo]}
              control ={control}
              error   ={!isEditting && errors.codigo}
              inputRef={firstInputRef}
              onlyRead={isEditting}
            />
            <TextInputComponent
              type    ="text"
              label   ="RUT"
              name    ="rut"
              data    ={data && data[EnumGrid.rut]}
              control ={control}
              error   ={!isEditting && errors.rut}
            />
            <TextInputComponent
              type    ="text"
              label   ="Nombre"
              name    ="nombre"
              data    ={data && data[EnumGrid.nombre]}
              control ={control}
              error   ={!isEditting && errors.nombre}
            />
            <div className="w-full ">
            {/* <SelectInputComponent
                label       ="Región"
                name        ="region"
                showRefresh ={true}
                data        ={data && data[EnumGrid.region]}
                control     ={control}
                entidad     ={["/api/regiones/", "02"]}
                error       ={!isEditting && errors.region}
                customWidth ={"345px"}
              />
              <SelectInputComponent
                label       ="Provincia"
                name        ="provincia"
                showRefresh ={true}
                data        ={data && data[EnumGrid.provincia]}
                control     ={control}
                entidad     ={["/api/provincias/", "02"]}
                error       ={!isEditting && errors.provincia}
                customWidth ={"345px"}
              />
              <SelectInputComponent
                label       ="Comuna"
                name        ="comuna"
                showRefresh ={true}
                data        ={data && data[EnumGrid.comuna]}
                control     ={control}
                entidad     ={["/api/comunas/", "02"]}
                error       ={!isEditting && errors.comuna}
                customWidth ={"345px"}
              /> */}

            <RegProComponent
             control={control}
             EnumGrid={EnumGrid}
             isEditting={isEditting}
             errors={errors}            
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

export default FMandantes;
