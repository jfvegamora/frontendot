/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationCristalesSchema } from "../../utils/validationFormSchemas";
// import { Enu } from "../mantenedores/MCristales";
// impport CristalesEnum
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { CristalesEnum } from "../../Enums/CristalesEnum";

const strBaseUrl = "/api/cristales/";
const strEntidad = "Cristal ";

export interface InputData {
  codigo: string | undefined;
  marca: string | undefined;
  diseno: string | undefined;
  indice: string | undefined;
  material: string | undefined;
  color: string | undefined;
  tratamiento: string | undefined;
  diametro: string | undefined;
  esferico: string | undefined;
  cilindrico: string | undefined;
  stock_minimo: string | undefined;
  codigo_fab_1: string | undefined;
  codigo_fab_2: string | undefined;
  codigo_fab_3: string | undefined;
  codigo_fab_4: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _pkToDelete?: any
}

export function transformInsertQuery(jsonData: InputData): OutputData | null | void {
  const _p1 = ` 
  "${jsonData.codigo}",
    ${jsonData.marca}, 
    ${jsonData.diseno}, 
    ${jsonData.indice}, 
    ${jsonData.material}, 
    ${jsonData.color}, 
    ${jsonData.tratamiento}, 
    ${jsonData.diametro}, 
    ${jsonData.esferico}, 
    ${jsonData.cilindrico}, 
    ${jsonData.stock_minimo}`;

  console.log(jsonData)
  const pkToDelete = [
    { "codigo_fab": jsonData.codigo_fab_1 },
    { "codigo_fab": jsonData.codigo_fab_2 },
    { "codigo_fab": jsonData.codigo_fab_3 },
    { "codigo_fab": jsonData.codigo_fab_4 }
  ]
    .filter((registro) => registro.codigo_fab !== '')
    .map((registro) => {
      return {
        codigo: jsonData.codigo,
        codigo_fab: registro.codigo_fab
      }
    })

  console.log(pkToDelete)


  const query: OutputData = {
    query: "03",
    _p1: _p1,
    _pkToDelete: encodeURIComponent(JSON.stringify(pkToDelete))

  };

  return query;
}

export function transformUpdateQuery(
  jsonData: InputData,
  primaryKey: string
): OutputData | null {
  const fields = [
    `marca        = ${jsonData.marca}`,
    `diseno       = ${jsonData.diseno}`,
    `indice       = ${jsonData.indice}`,
    `material     = ${jsonData.material}`,
    `color        = ${jsonData.color}`,
    `tratamiento  = ${jsonData.tratamiento}`,
    `diametro     = ${jsonData.diametro}`,
    `esferico     = ${jsonData.esferico}`,
    `cilindrico   = ${jsonData.cilindrico}`,
    `stock_minimo = ${jsonData.stock_minimo}`,
  ];

  const filteredFields = fields.filter(
    (field) => field !== null && field !== ""
  );

  if (filteredFields.length === 0) {
    return null;
  }
  const _p1 = filteredFields.join(",");

  const pkToDelete = [
    { "codigo_fab": jsonData.codigo_fab_1 },
    { "codigo_fab": jsonData.codigo_fab_2 },
    { "codigo_fab": jsonData.codigo_fab_3 },
    { "codigo_fab": jsonData.codigo_fab_4 }
  ]
    .filter((registro) => registro.codigo_fab !== '')
    .map((registro) => {
      return {
        codigo: jsonData.codigo,
        codigo_fab: registro.codigo_fab
      }
    });


  console.log("primaryKey", primaryKey);
  const query = {
    query: "04",
    _p1,
    _p2: primaryKey,
    _pkToDelete: encodeURIComponent(JSON.stringify(pkToDelete))
  };

  console.log(query)
  return query

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

const FCristales: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationCristalesSchema();
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
    const intId = data && data[CristalesEnum.codigo];
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
      setValue("diametro", "");
      setValue("esferico", "");
      setValue("cilindrico", "");
      setValue("stock_minimo", "");
      setValue("codigo_fab_1", "");
      setValue("codigo_fab_2", "");
      setValue("codigo_fab_3", "");
      setValue("codigo_fab_4", "");

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

    // useEffect(() => {
    //   focusFirstInput("codigo");
    // }, []);
    useEffect(() => {
      isEditting ? focusSecondInput("marca") : focusFirstInput("codigo");
    }, []);

    console.log(data && typeof data[CristalesEnum.stock_reservado])
    return (
      <div className="useFormContainer centered-div w-[50vw] h-[42vw] ">
        <div className="userFormBtnCloseContainer flex">
          <div className="w-[50%] mx-auto !text.center">
            <h1 className="userFormLabel">{label}</h1>
          </div>
          <button onClick={closeModal} className="userFormBtnClose">
            X
          </button>
        </div>


        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario">
          <div className="userFormularioContainer">
            <div className="rowForm !mb-2 translate-y-[-1vw]">
              <div className="w-[40%] mx-auto">
                <TextInputComponent
                  type="text"
                  label="Código"
                  name="codigo"
                  data={data && data[CristalesEnum.codigo]}
                  control={control}
                  error={errors.codigo}
                  inputRef={firstInputRef}
                  onlyRead={isEditting}
                  maxLength={20}
                  customWidth={"labelInput inputStyles"}

                />
              </div>
            </div>

            <div className="flex rowForm items-center mt-2">
              <div className="w-[50%] ml-4">
                <SelectInputComponent
                  label="Marca"
                  name="marca"
                  showRefresh={true}
                  data={data && data[CristalesEnum.marca_id]}
                  control={control}
                  entidad={["/api/marcas/", "02", "2"]}
                  error={errors.marca}
                  customWidth={"labelInput inputStyles"}
                  tabIndex={1}
                />
              </div>
              <div className="w-[50%]">
                <SelectInputTiposComponent
                  label="Diseño"
                  name="diseno"
                  showRefresh={true}
                  data={data && data[CristalesEnum.diseno_id]}
                  control={control}
                  customWidth={"labelInput inputStyles"}
                  entidad={"CristalesDisenos"}
                  error={errors.diseno}
                />
              </div>
            </div>
            <div className="flex rowForm items-center mt-4">
              <div className="w-[50%] ml-4">
                <SelectInputTiposComponent
                  label="Índice"
                  name="indice"
                  showRefresh={true}
                  data={data && data[CristalesEnum.indice_id]}
                  control={control}
                  customWidth={"labelInput inputStyles"}
                  entidad={"CristalesIndices"}
                  error={errors.indice}
                />
              </div>
              <div className="w-[50%]">
                <SelectInputTiposComponent
                  label="Material"
                  name="material"
                  showRefresh={true}
                  data={data && data[CristalesEnum.material_id]}
                  control={control}
                  entidad="CristalesMateriales"
                  customWidth={"labelInput inputStyles"}
                  error={errors.material}

                />
              </div>
            </div>
            <div className="flex rowForm items-center mt-4">
              <div className="w-[50%] ml-4">
                <SelectInputTiposComponent
                  label="Color"
                  name="color"
                  showRefresh={true}
                  data={data && data[CristalesEnum.color_id]}
                  control={control}
                  entidad="CristalesColores"
                  customWidth={"labelInput inputStyles"}
                  error={errors.color}
                />
              </div>
              <div className="w-[50%]">
                <SelectInputTiposComponent
                  label="Tratamiento"
                  name="tratamiento"
                  showRefresh={true}
                  data={data && data[CristalesEnum.tratamiento_id]}
                  control={control}
                  entidad="CristalesTratamientos"
                  customWidth={"labelInput inputStyles"}
                  error={errors.tratamiento}
                />
              </div>
            </div>
            <div className="!mt-[0.4rem] translate-y-[0.5vw]">
              <div className="flex items-center rowForm">
                <div className="pl-2">
                  <TextInputComponent
                    type="number"
                    label="Diámetro"
                    name="diametro"
                    data={data && data[CristalesEnum.diametro]}
                    control={control}
                    error={errors.diametro}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>

                <div className="">
                  <TextInputComponent
                    type="number"
                    label="Esférico"
                    name="esferico"
                    data={data && data[CristalesEnum.esferico]}
                    control={control}
                    error={errors.esferico}
                    step={0.01}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>

                <div className="pr-6">
                  <TextInputComponent
                    type="number"
                    label="Cilíndrico"
                    name="cilindrico"
                    data={data && data[CristalesEnum.cilindrico]}
                    control={control}
                    error={errors.cilindrico}
                    step={0.01}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center rowForm translate-y-[1vw]">
              <div className="pl-2">
                <TextInputComponent
                  type="number"
                  label="Stock Minimo"
                  name="stock_minimo"
                  data={data && data[CristalesEnum.stock_minimo]}
                  control={control}
                  error={errors.stock_minimo}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                />
              </div>
              <div className="">
                <TextInputComponent
                  type="number"
                  label="Stock Reservado"
                  name="stock_reservado"
                  data={data && data[CristalesEnum.stock_reservado]}
                  // data={100000}
                  control={control}
                  onlyRead={true}
                  tabIndex={-1}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                />
              </div>
              <div className="pr-6">
                <TextInputComponent
                  type="number"
                  label="Stock Disponible"
                  name="stock_disponible"
                  data={data && data[CristalesEnum.stock_disponible]}
                  control={control}
                  onlyRead={true}
                  tabIndex={-1}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
            <div className="flex rowForm items-center translate-y-[2vw]">
              <div className="w-[50%] pl-2">
                <TextInputComponent
                  type="text"
                  label="Código FAB 1"
                  name="codigo_fab_1"
                  data={data && data[CristalesEnum.codigo_fab_1]}
                  control={control}
                  // error={errors.codigo}
                  maxLength={20}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
              <div className="w-[50%] pr-6">
                <TextInputComponent
                  type="text"
                  label="Código FAB 2"
                  name="codigo_fab_2"
                  data={data && data[CristalesEnum.codigo_fab_2]}
                  control={control}
                  // error={errors.codigo}
                  maxLength={20}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>
            <div className="flex rowForm items-center translate-y-[2vw] py-2">
              <div className="w-[50%] pl-2">
                <TextInputComponent
                  type="text"
                  label="Código FAB 3"
                  name="codigo_fab_3"
                  data={data && data[CristalesEnum.codigo_fab_3]}
                  control={control}
                  // error={errors.codigo}
                  maxLength={20}
                  isOptional={true}
                  customWidth={"labelInput inputStyles"}

                />
              </div>
              <div className="w-[50%] pr-6">
                <TextInputComponent
                  type="text"
                  label="Código FAB 4"
                  name="codigo_fab_4"
                  data={data && data[CristalesEnum.codigo_fab_4]}
                  control={control}
                  // error={errors.codigo}
                  maxLength={20}
                  customWidth={"labelInput inputStyles"}

                  isOptional={true}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="w-[50%] mx-auto !-mt-4 translate-y-[2vw]">
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

export default FCristales;
