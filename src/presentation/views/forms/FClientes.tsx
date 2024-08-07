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
import { fechaActual, validationClientesSchema } from "../../utils/validationFormSchemas";
import { EnumGrid } from "../mantenedores/MClientes";
import {
  MODAL,
  SUCCESS_MESSAGES,
  SEXO,
  TIPO_CLIENTE, TITLES
} from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { toast } from "react-toastify";
import RegProCom from "../../components/RegProCom";
import { Button } from "@material-tailwind/react";

const strBaseUrl = "/api/clientes/";
const strEntidad = "Cliente ";

export interface InputData {
  rut: string | undefined;
  nombre: string | undefined;
  tipo: string | undefined;
  sexo: string | undefined;
  fecha_nacimiento: string | undefined;
  direccion: string | undefined;
  region: string | undefined;
  provincia: string | undefined;
  comuna: string | undefined;
  telefono: string | undefined;
  correo: string | undefined;
  establecimiento: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: number;
}

export function transformInsertQuery(jsonData: InputData): OutputData | null {

  if (jsonData.fecha_nacimiento) {
    if (fechaActual < new Date(jsonData.fecha_nacimiento as string)) {
      toast.error('Fecha mayor a la actual')
      throw new Error('fecha mayor a la actual')
    }
  }

  let _p1 = `"${jsonData.rut}","${jsonData.nombre}",${jsonData.tipo === TIPO_CLIENTE.beneficiario ? "1" : jsonData.tipo === TIPO_CLIENTE.particular ? "2" : jsonData.tipo === TIPO_CLIENTE.optica ? "3" : "0"},${jsonData.sexo === SEXO.masculino ? "1" : jsonData.sexo === SEXO.femenino ? "2" : jsonData.sexo === SEXO.no_aplica ? "3" : "0"},"${jsonData.fecha_nacimiento}","${jsonData.direccion}",${jsonData.comuna},"${jsonData.telefono}","${jsonData.correo}",${jsonData.establecimiento}`;
  _p1 = _p1.replace(/'/g, '!');

  const query: OutputData = {
    query: "03",
    _p1,
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
  escritura_lectura?: boolean;
}

const FClientes: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationClientesSchema(isEditting);
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
    const intId = data && data[EnumGrid.rut];
    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
      register,

    } = useForm({
      resolver: yupResolver(schema),
    });

    function transformUpdateQuery(
      jsonData: InputData,
      primaryKey: string
    ): OutputData | null {
      // const fields = [
      //   `nombre           ="${jsonData.nombre}"`,
      //   `tipo             = ${
      //       jsonData.tipo === TIPO_CLIENTE.beneficiario ? 1
      //     : jsonData.tipo === TIPO_CLIENTE.particular   ? 2
      //     : jsonData.tipo === TIPO_CLIENTE.optica       ? 3: 0}`,
      //   `sexo             = ${
      //       jsonData.sexo === SEXO.masculino ? 1
      //     : jsonData.sexo === SEXO.femenino  ? 2
      //     : jsonData.sexo === SEXO.no_aplica ? 3: 0}`,
      //   `fecha_nacimiento ="${jsonData.fecha_nacimiento}"`,
      //   `direccion        ="${jsonData.direccion}"`,
      //   `comuna           = ${jsonData.comuna || data && data[EnumGrid.comuna_id]}`,
      //   `telefono         ="${jsonData.telefono}"`,
      //   `correo           ="${jsonData.correo}"`,
      //   `establecimiento  = ${jsonData.establecimiento}`,
      // ];
      const fields = [`nombre="${jsonData.nombre}"`, `tipo= ${jsonData.tipo === TIPO_CLIENTE.beneficiario ? 1 : jsonData.tipo === TIPO_CLIENTE.particular ? 2 : jsonData.tipo === TIPO_CLIENTE.optica ? 3 : 0}`, `sexo=${jsonData.sexo === SEXO.masculino ? 1 : jsonData.sexo === SEXO.femenino ? 2 : jsonData.sexo === SEXO.no_aplica ? 3 : 0}`, `fecha_nacimiento="${jsonData.fecha_nacimiento}"`, `direccion="${jsonData.direccion}"`, `comuna= ${jsonData.comuna || data && data[EnumGrid.comuna_id]}`, `telefono="${jsonData.telefono}"`, `correo="${jsonData.correo}"`, `establecimiento=${jsonData.establecimiento}`];

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
        _p2: `'${primaryKey}'`,
      };
      console.log("query", query);
      return query;
    }
    const resetTextFields = React.useCallback(() => {
      setValue("rut", "");
      setValue("nombre", "");
      setValue("direccion", "");
      setValue("fecha_nacimiento", undefined);
      setValue("telefono", "");
      setValue("correo", "");

      if (firstInputRef.current) {
        const firstInput =
          firstInputRef.current.querySelector('input[name="rut"]');
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
      isEditting ? focusSecondInput("nombre") : focusFirstInput("rut");

    }, []);

    // console.log(data && data)

    // console.log(errors.comuna)
    // console.log(getValues())


    return (
      <div className="useFormContainer centered-div w-[70rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario ">
          <div className="userFormularioContainer">
            <div className="w-full flex items-center">
              <div className="input-container items-center rowForm w-[25%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="RUT"
                    name="rut"
                    data={data && data[EnumGrid.rut]}
                    control={control}
                    error={errors.rut}
                    inputRef={firstInputRef}
                    onlyRead={isEditting}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[45%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Nombre"
                    name="nombre"
                    data={data && data[EnumGrid.nombre]}
                    control={control}
                    error={errors.nombre}
                    inputRef={secondInputRef}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>

              <div className="input-container items-center rowForm w-[40%]">
                <div className="selectInputDiv">
                  <SelectInputComponent
                    label="Establecimiento"
                    name="establecimiento"
                    showRefresh={true}
                    data={data && data[EnumGrid.establecimiento_id]}
                    control={control}
                    entidad={["/api/establecimientos/", "02"]}
                    error={errors.establecimiento}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="input-container items-center !mt-[1rem] rowForm ">
              <div className="flex" style={{ display: 'inline' }}>
                <div className="flex">
                  <div className="w-[50%] !mt-2 pl-4 pr-4 flex !h-[12rem]">
                    <RadioButtonComponent
                      control={control}
                      label="Sexo"
                      name="sexo"
                      horizontal={false}
                      data={data && data[EnumGrid.sexo]}
                      options={[SEXO.masculino, SEXO.femenino, SEXO.no_aplica]}
                      error={errors.sexo}
                    />

                    <RadioButtonComponent
                      control={control}
                      label="Tipo"
                      name="tipo"
                      horizontal={false}
                      data={data && data[EnumGrid.tipo]}
                      options={[
                        TIPO_CLIENTE.beneficiario,
                        TIPO_CLIENTE.particular,
                        TIPO_CLIENTE.optica,
                      ]}
                      error={errors.tipo}
                    />

                    <div className="flex absolute top-[63%] w-[44%] mr-10">
                      <div className="flex-col">
                        <div className="flex labelInput !mt-[1rem] !mb-[1rem]">
                          <div className="w-[50%]">
                            <TextInputComponent
                              type="date"
                              label="Fecha Nacimiento"
                              name="fecha_nacimiento"
                              data={data && data[EnumGrid.fecha_nacimiento]}
                              control={control}
                              error={errors.fecha_nacimiento}
                              customWidth={"labelInput inputStyles"}
                            />
                          </div>
                          <div className="w-[50%] ml-4 pr-4">
                            <TextInputComponent
                              type="text"
                              label="Teléfono"
                              name="telefono"
                              data={data && data[EnumGrid.telefono]}
                              control={control}
                              error={errors.telefono}
                              customWidth={"labelInput inputStyles"}
                            />
                          </div>
                        </div>
                        <div className="labelInput !mt-[2rem] pr-4">
                          <TextInputComponent
                            type="text"
                            label="Correo"
                            name="correo"
                            data={data && data[EnumGrid.correo]}
                            control={control}
                            error={errors.correo}
                            isOptional={true}
                            customWidth={"labelInput inputStyles"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-[50%] !mt-[.8rem] !ml-8 mr-4 dirCliente ">
                    <label className="!top-[-1.5rem] !left-[1rem] z-10 relative">Dirección</label>
                    <RegProCom
                      name="comuna"
                      control={control}
                      register={register}
                      setValue={setValue}
                      defaultRegion={data && data[EnumGrid.region_id]}
                      defaultComuna={data && data[EnumGrid.comuna_id]}
                      defaultProvincia={data && data[EnumGrid.provincia_id]}
                      errors={errors.comuna}
                    />
                    <div className="labelInput !mt-[-1rem] !mb-[1rem] pl-0 pr-2">
                      <TextInputComponent
                        type="text"
                        label="Dirección"
                        name="direccion"
                        data={data && data[EnumGrid.direccion]}
                        control={control}
                        error={errors.direccion}
                        isOptional={true}
                        customWidth={"labelInput inputStyles "}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="w-full !mt-20 !mb-5">
            <div className="w-[25%] mx-auto">
                {escritura_lectura && (
                  <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                    {`${TITLES.guardar}`}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>

        <CustomModal />
      </div>
    );
  }
);

export default FClientes;
