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
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { ArmazonesEnum } from "../../Enums";


const strBaseUrl = "/api/armazones/";
const strEntidad = "Armazón ";

export interface InputData {
  codigo: string | undefined;
  tipo: string | undefined;
  material: string | undefined;
  marca: string | undefined;
  modelo: string | undefined;
  color: string | undefined;
  aro: string | undefined;
  puente: string | undefined;
  diagonal: string | undefined;
  brazo: string | undefined;
  uso: string | undefined;
  stock_minimo: string | undefined;
  codigo_fab: string | undefined;
  dp_minima: string | undefined;
  dp_maxima: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {
  let _p1 = `"${jsonData.codigo}", ${jsonData.tipo}, ${jsonData.marca}, "${jsonData.modelo}", "${jsonData.color}", ${jsonData.material || 0}, ${jsonData.aro || 0}, ${jsonData.puente || 0}, ${jsonData.diagonal || 0}, ${jsonData.brazo || 0}, ${jsonData.uso || 0}, ${jsonData.stock_minimo}, "${jsonData.codigo_fab}", ${jsonData.dp_minima || 0}, ${jsonData.dp_maxima || 0}`;
  _p1 = _p1.replace(/'/g, '!');


  const query: OutputData = {
    query: "03",
    _p1,
  };
  console.log("query", query);
  return query;
}
export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  
  
  const fields = [
    `tipo =  ${jsonData.tipo}`, `marca =  ${jsonData.marca}`, `modelo = "${jsonData.modelo}"`, `color = "${jsonData.color}"`, `material =  ${jsonData.material}`, `aro =  ${jsonData.aro}`, `puente =  ${jsonData.puente}`, `diagonal =  ${jsonData.diagonal}`, `brazo =  ${jsonData.brazo}`, `uso =  ${jsonData.uso}`, `stock_minimo = ${jsonData.stock_minimo}`, `codigo_fab = "${jsonData.codigo_fab}"`, `dp_minima = "${jsonData.dp_minima}"`, `dp_maxima = "${jsonData.dp_maxima}"`,
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
      secondInputRef,
      focusSecondInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);
    const intId = data && data[ArmazonesEnum.codigo];
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
      setValue("codigo_fab", "");

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
        if (response.code === "ERR_BAD_RESPONSE" || response.stack) {
          const errorMessage = isEditting
            ? strEntidad.concat(": " + response.message)
            : strEntidad.concat(": " + response.message)
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }
        if (response.mensaje.includes('Creado')) {
          toastSuccess(isEditting);
        }

        if (!blnKeep && !isEditting) {
          const result = await showModal(
            MODAL.keep,
            '',
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

          // toastSuccess(isEditting);
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
        const toastLoading = toast.loading('Cargando...');
        try {
          const transformedData = isEditting
            ? transformUpdateQuery(data, intId.toString())
            : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading)

        } catch (error: any) {
          toast.dismiss(toastLoading)

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
      <div className="useFormContainer centered-div use40rem">
        <div className="userFormBtnCloseContainer felex">
          <div className="w-[80%] mx-auto !text.center">
            <h1 className="userFormLabel">{label}</h1>
          </div>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario h-[]">
          <div className=" items center">

            <div className="w-full   flex items-center h-[5rem]">
              <div className="input-container w-[33%]  items-center rowForm  ">
                  <TextInputComponent
                    type="text"
                    label="Código"
                    name="codigo"
                    data={data && data[ArmazonesEnum.codigo]}
                    control={control}
                    error={errors.codigo}
                    inputRef={firstInputRef}
                    onlyRead={isEditting}
                    customWidth={""}
                  />
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                  <TextInputComponent
                    type="text"
                    label="Modelo"
                    name="modelo"
                    data={data && data[ArmazonesEnum.modelo]}
                    control={control}
                    error={errors.modelo}
                    customWidth={"!w-[]"}
                  />
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                  <TextInputComponent
                    type="text"
                    label="Color"
                    name="color"
                    data={data && data[ArmazonesEnum.color]}
                    control={control}
                    error={errors.color}
                    customWidth={"!w-[]"}
                  />
              </div>
            </div>

            <div className="w-full   flex items-center h-[5rem]">
              <div className="input-container items-center rowForm w-[33%]  ">
                  <SelectInputTiposComponent
                    label="Tipo"
                    name="tipo"
                    showRefresh={true}
                    data={data && data[ArmazonesEnum.armazon_tipo_id]}
                    control={control}
                    entidad={"ArmazonesTipos"}
                    error={errors.tipo}
                    inputRef={secondInputRef}
                    customWidth={"!w-[100%] ml-[1rem]"}
                  />
              </div>

              <div className="input-container items-center rowForm w-[33%]">
                  <SelectInputComponent
                    label="Marca"
                    name="marca"
                    showRefresh={true}
                    data={data && data[ArmazonesEnum.marca_id]}
                    control={control}
                    entidad={["/api/marcas/", "02", "1"]}
                    error={errors.marca}
                    customWidth={"!w-[100%] ml-[1rem]"}
                  />
              </div>

              <div className="input-container items-center rowForm w-[33%]  ">
                  <SelectInputTiposComponent
                    label="Material"
                    name="material"
                    showRefresh={true}
                    data={data && data[ArmazonesEnum.armazon_material_id]}
                    control={control}
                    entidad={"ArmazonesMaterial"}
                    error={errors.material}
                    customWidth={"!w-[100%] ml-[1rem]"}
                  />
              </div>
            </div>

            <div className="w-[100%]  flex items-center h-[5rem] translate-y-[-0.5rem]">
              <div className="input-container items-center rowForm w-[]">
                  <TextInputComponent
                    type="number"
                    label="Aro"
                    name="aro"
                    data={data && data[ArmazonesEnum.aro]}
                    control={control}
                    error={errors.aro}
                    customWidth={"!w-[100%]"}
                    textAlign="text-center"
                  />
              </div>

              <div className="input-container items-center rowForm w-[]">
                  <TextInputComponent
                    type="number"
                    label="Puente"
                    name="puente"
                    data={data && data[ArmazonesEnum.puente]}
                    control={control}
                    error={errors.puente}
                    customWidth={"!w-[100%]"}
                    textAlign="text-center"
                  />
              </div>

              <div className="input-container items-center rowForm w-[]">
                  <TextInputComponent
                    type="number"
                    label="Diagonal"
                    name="diagonal"
                    data={data && data[ArmazonesEnum.diagonal]}
                    control={control}
                    error={errors.diagonal}
                    customWidth={"!w-[100%]"}
                    textAlign="text-center"
                  />
              </div>

              <div className="input-container items-center rowForm w-[]">
                  <TextInputComponent
                    type="number"
                    label="Brazo"
                    name="brazo"
                    data={data && data[ArmazonesEnum.brazo]}
                    control={control}
                    error={errors.brazo}
                    customWidth={"!w-[100%]"}
                    textAlign="text-center"
                  />
              </div>
            </div>

            <div className="w-full  flex items-center  h-[5rem] translate-y-[-0.5rem] ">
              <div className="input-container items-center rowForm w-[100%]  ">
                  <SelectInputTiposComponent
                    label="Uso"
                    name="uso"
                    showRefresh={true}
                    data={data && data[ArmazonesEnum.armazon_uso_id]}
                    control={control}
                    entidad={"ArmazonesUsos"}
                    customWidth={"!w-[10.5rem] translate-x-[1rem]"}
                    error={errors.uso}
                  />
              </div>

              <div className="input-container items-center rowForm w-[100%]">
                  <TextInputComponent
                    type="number"
                    label="Stock Mínimo"
                    name="stock_minimo"
                    data={data && data[ArmazonesEnum.stock_minimo]}
                    control={control}
                    customWidth={"!w-[9.5rem] translate-x-[-1rem] translate-y-[-0.3rem]"}
                    error={errors.stock_minimo}
                    textAlign="text-right"
                  />
              </div>

              <div className="input-container items-center rowForm w-[100%]">
                  <TextInputComponent
                    type="number"
                    label="DP Minima"
                    name="dp_minima"
                    data={data && data[ArmazonesEnum.dp_minima]}
                    control={control}
                    customWidth={"!w-[9.5rem] translate-x-[-1.9rem] translate-y-[-0.3rem]"}
                    textAlign="text-center"
                    isOptional={true}
                  />
              </div>

              <div className="input-container items-center rowForm w-[100%]">
                  <TextInputComponent
                    type="number"
                    label="DP Máxima"
                    name="dp_maxima"
                    data={data && data[ArmazonesEnum.dp_maxima]}
                    control={control}
                    customWidth={"!w-[9.5rem] translate-x-[-2.9rem] translate-y-[-0.3rem]"}
                    textAlign="text-center"
                    isOptional={true}
                  />
              </div>

            </div>

            <div className="w-full flex items-center  h-[5rem] translate-y-[-0.7rem]">
              <div className="input-container items-center rowForm w-[100%]  ">
                  <TextInputComponent
                    type="number"
                    label="Cant. Exhibida"
                    name="cantidad_exhibida"
                    data={data && data[ArmazonesEnum.cantidad_exhibida]}
                    control={control}
                    onlyRead={true}
                    tabIndex={-1}
                    customWidth={"!w-[100%]"}
                    textAlign="text-right"
                  />
              </div>

              <div className="input-container items-center rowForm w-[100%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Cant. Reservada"
                    name="cantidad_reservada"
                    data={data && data[ArmazonesEnum.cantidad_reservada]}
                    control={control}
                    onlyRead={true}
                    tabIndex={-1}
                    customWidth={"!w-[100%]"}
                    textAlign="text-right"
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[100%]">
                <div className="w-full">
                  <TextInputComponent
                    type="number"
                    label="Stock Disponible"
                    name="stock_disponible"
                    onlyRead={true}
                    data={data && data[ArmazonesEnum.stock_disponible]}
                    control={control}
                    tabIndex={-1}
                    customWidth={"!w-[100%]"}
                    textAlign="text-right"
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[100%]  ">
                <div className="w-full">
                  <TextInputComponent
                    type="text"
                    label="Código FAB"
                    name="codigo_fab"
                    data={data && data[ArmazonesEnum.codigo_fab]}
                    control={control}
                    error={errors.codigo_fab}
                    onlyRead={isEditting}
                    customWidth={"!w-[100%]"}
                    isOptional={true}
                  />
                </div>
              </div>


            </div>
          </div>

          <div className="w-full ">
            <div className="w-[30%] mx-auto">
              {escritura_lectura && (
                <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                  {`${TITLES.guardar}`}
                </Button>
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
