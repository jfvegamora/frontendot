/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationArmazonesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MArmazones";
import { ERROR_MESSAGES, MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";

const strBaseUrl = "/api/armazones/";
const strEntidad = "Armazón ";

export interface InputData {
  codigo      : string | undefined;
  tipo        : string | undefined;
  material    : string | undefined;
  marca       : string | undefined;
  modelo      : string | undefined;
  color       : string | undefined;
  aro         : string | undefined;
  puente      : string | undefined;
  diagonal    : string | undefined;
  brazo       : string | undefined;
  uso         : string | undefined;
  stock_minimo: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `"${jsonData.codigo}", 
                ${jsonData.tipo}, 
                ${jsonData.marca}, 
               "${jsonData.modelo}", 
               "${jsonData.color}", 
                ${jsonData.material}, 
                ${jsonData.aro}, 
                ${jsonData.puente}, 
                ${jsonData.diagonal}, 
                ${jsonData.brazo}, 
                ${jsonData.uso}, 
                ${jsonData.stock_minimo}`;
  _p1 = _p1.replace(/'/g, '!');


  const query: OutputData = {
    query: "03",
    _p1,
  };
  // console.log("query", query);
  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `tipo         =  ${jsonData.tipo}`,
    `marca        =  ${jsonData.marca}`,
    `modelo       = "${jsonData.modelo}"`,
    `color        = "${jsonData.color}"`,
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
  let _p1 = filteredFields.join(",");
  _p1 = _p1.replace(/'/g, '!');


  const query: OutputData = {
    query: "04",
    _p1,
    _p2: primaryKey,
  };
  // console.log("query", query);
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
  escritura_lectura?: boolean;
}

const FArmazones: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationArmazonesSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();

    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
      focusSecondInput,
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
      setValue("modelo", "");
      setValue("color", "");
      setValue("aro", "");
      setValue("puente", "");
      setValue("diagonal", "");
      setValue("brazo", "");
      setValue("stock_minimo", "");

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
      isEditting ? focusSecondInput("tipo") : focusFirstInput("codigo");
    }, []);

    return (
      <div className="useFormContainer centered-div use60rem">
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
          className="userFormulario h-[47vh]">
          <div className=" items center">

            <div className="w-full  flex items-center h-[5rem]">
              <div className="input-container items-center rowForm w-[22%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Código"
                    name="codigo"
                    data={data && data[EnumGrid.codigo]}
                    control={control}
                    error={errors.codigo}
                    inputRef={firstInputRef}
                    onlyRead={isEditting}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[19%]  ">
                <div className="w-full !mt-4">
                  <SelectInputTiposComponent
                  label="Tipo"
                  name="tipo"
                  showRefresh={true}
                  data={data && data[EnumGrid.armazon_tipo_id]}
                  control={control}
                  entidad={"ArmazonesTipos"}
                  error={errors.tipo}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]  ">
                <div className="w-full !mt-4">
                  <SelectInputTiposComponent
                  label="Material"
                  name="material"
                  showRefresh={true}
                  data={data && data[EnumGrid.armazon_material_id]}
                  control={control}
                  entidad={"ArmazonesMaterial"}
                  error={errors.material}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[29%]  ">
                <div className="w-full !mt-4">
                    <SelectInputComponent
                      label="Marca"
                      name="marcae"
                      showRefresh={true}
                      data={data && data[EnumGrid.marca_id]}
                      control={control}
                      entidad={["/api/marcas/", "02"]}
                      error={errors.marca}
                    />
                </div>
              </div>
            </div>
            
            <div className="w-full  flex items-center h-[5rem]">
                <div className="input-container items-center rowForm w-[22%]">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="Modelo"
                      name="modelo"
                      data={data && data[EnumGrid.modelo]}
                      control={control}
                      error={errors.modelo}
                    />
                  </div>
                </div>

                <div className="input-container items-center rowForm w-[20%]">
                  <div className="w-full">
                    <TextInputComponent
                      type="text"
                      label="Color"
                      name="color"
                      data={data && data[EnumGrid.color]}
                      control={control}
                      error={errors.color}
                    />
                  </div>
                </div>

                <div className="input-container items-center rowForm w-[15%]">
                  <div className="w-full">
                    <TextInputComponent
                      type="number"
                      label="Aro"
                      name="aro"
                      data={data && data[EnumGrid.aro]}
                      control={control}
                      error={errors.aro}
                    />
                  </div>
                </div>

                <div className="input-container items-center rowForm w-[15%]">
                    <div className="w-full">
                      <TextInputComponent
                        type="number"
                        label="Puente"
                        name="puente"
                        data={data && data[EnumGrid.puente]}
                        control={control}
                        error={errors.puente}
                      />
                    </div>
                </div>

                <div className="input-container items-center rowForm w-[15%]">
                  <div className="w-full">
                    <TextInputComponent
                      type="number"
                      label="Diagonal"
                      name="diagonal"
                      data={data && data[EnumGrid.diagonal]}
                      control={control}
                      error={errors.diagonal}
                    />
                  </div>
                </div>

                <div className="input-container items-center rowForm w-[15%]">
                  <div className="w-full">
                    <TextInputComponent
                      type="number"
                      label="Brazo"
                      name="brazo"
                      data={data && data[EnumGrid.brazo]}
                      control={control}
                      error={errors.brazo}
                    />
                  </div>
                </div>              
            </div>





            <div className="w-full flex items-center  h-[5rem] ">

                <div className="input-container items-center rowForm w-[41.5%]  ">
                    <div className="w-full !mt-4">
                      <SelectInputTiposComponent
                      label="Uso"
                      name="uso"
                      showRefresh={true}
                      data={data && data[EnumGrid.armazon_uso_id]}
                      control={control}
                      entidad={"ArmazonesUsos"}
                      error={errors.uso}
                      />
                    </div>
                  </div>

                  <div className="input-container items-center rowForm w-[20%]">
                    <div className="w-full">
                        <TextInputComponent
                          type="number"
                          label="Stock Mínimo"
                          name="stock_minimo"
                          data={data && data[EnumGrid.stock_minimo]}
                          control={control}
                          error={errors.stock_minimo}
                        />
                    </div>
                  </div>

                  <div className="input-container items-center rowForm w-[20%]  ">
                    <div className="w-full">
                        <TextInputComponent
                          type="number"
                          label="Stock Reservado"
                          name="stock_resrvado"
                          data={data && data[EnumGrid.stock_resrvado]}
                          control={control}
                          error={errors.stock_minimo}
                          onlyRead={true}
                        />
                    </div>
                  </div>

                  <div className="input-container items-center rowForm w-[20%]">
                    <div className="w-full">
                        <TextInputComponent
                          type="number"
                          label="Stock Disponible"
                          name="stock_disponible"
                          onlyRead={true}
                          data={data && data[EnumGrid.stock_disponible]}
                          control={control}
                          error={errors.stock_minimo}
                        />
                    </div>
                  </div>

            </div>
          </div>

          <div className="w-full ">
            <div className="w-[50%] mx-auto">
              {escritura_lectura && (
                <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                {`${TITLES.guardar}`}
                </button>
              )}
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FArmazones;
