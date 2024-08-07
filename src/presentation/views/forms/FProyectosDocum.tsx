/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { fechaActual, validationProyectosDocumSchema } from "../../utils/validationFormSchemas";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { signal } from "@preact/signals-react";
import { AppStore, useAppSelector } from "../../../redux/store";
import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ProyectosDocumEnum } from "../../Enums";

const strBaseUrl = "/api/proyectodocum/";
const strEntidad = "Documentación del Proyecto ";

export interface InputData {
  proyecto: string | undefined;
  tipo_doc: string | undefined;
  numero_doc: string | undefined;
  fecha_doc: string | undefined;
  total_neto: string | undefined;
  tipo_doc_ref: string | undefined;
  numero_doc_ref: string | undefined;
  observaciones: string | undefined;
}

interface OutputData {
  query: string;
  _p1: string;
  _p2?: string;
  _p3?: string;
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

const FProyectosDocum: React.FC<IUserFormPrps> = React.memo(
  ({ closeModal, setEntities, params, label, data, isEditting, escritura_lectura }) => {
    const schema = validationProyectosDocumSchema();
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const [_strCodigoProyecto, setStrCodigoProyecto] = useState("");
    const strCodigoProyecto2 = signal("")
    const [fechaHoraActual, setFechaHoraActual] = useState(fechaActual);
    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)



    const {
      editEntity,
      createdEntity,
      ListEntity,
      firstInputRef,
      focusFirstInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    function transformInsertQuery(jsonData: InputData): OutputData | null {
      setFechaHoraActual(new Date())

      // const year = fechaHoraActual.getFullYear()
      // const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0')
      // const day = String(fechaHoraActual.getDate()).padStart(2, '0')

      // const fechaFormateada = `${year}/${month}/${day}`;
      // const dateHora = new Date().toLocaleTimeString();


      // (proyecto, fecha_hora, tipo_doc, numero_doc, fecha_doc, total_neto, tipo_doc_ref, numero_doc_ref, usuario)
      let _p1 = `"${jsonData.proyecto}", ${jsonData.tipo_doc}, 
                   ${jsonData.numero_doc}, "${jsonData.fecha_doc}", ${jsonData.total_neto},
                   ${jsonData.tipo_doc_ref}, ${jsonData.numero_doc_ref}, ${UsuarioID}, "${jsonData.observaciones}"`;

      _p1 = _p1.replace(/'/g, '!');

      const query: OutputData = {
        query: "03",
        _p1
      };
      // console.log("query: ", query);
      return query;
    }

    function transformUpdateQuery(jsonData: InputData): OutputData | null {
      const fields = [
        `tipo_doc=${jsonData.tipo_doc}`, ` numero_doc=${jsonData.numero_doc}`, ` fecha_doc="${jsonData.fecha_doc}"`, ` total_neto=${jsonData.total_neto}`, ` tipo_doc_ref=${jsonData.tipo_doc_ref}`, ` numero_doc_ref=${jsonData.numero_doc_ref}`, ` usuario=${UsuarioID}`, ` observaciones="${jsonData.observaciones}"`,
      ];

      const filteredFields = fields.filter(
        (field) => field !== null && field !== ""
      );

      if (filteredFields.length === 0) {
        return null;
      }
      let _p1 = filteredFields.join(",");
      _p1 = _p1.replace(/'/g, '!');

      // console.log(jsonData)
      console.log(data)

      const query = {
        query: "04",
        _p1,
        _p2: jsonData.proyecto,
        _p3: `${data && data[3]}`,
      }
      // console.log(query)
      return query;
    }

    const resetTextFields = React.useCallback(() => {
      setValue("numero_doc", "");
      setValue("total_neto", "");
      setValue("numero_doc_ref", "");
      setValue("observaciones", "");
      if (firstInputRef.current) {
        const firstInput = firstInputRef.current.querySelector(
          'input[name="proyecto"]'
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
            ? transformUpdateQuery(data)
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
      [editEntity, createdEntity, handleApiResponse]
    );

    useEffect(() => {
      focusFirstInput("proyecto");
    }, []);

    const handleInputChange = (e: any) => {
      const { name, value } = e;
      console.log(value)
      console.log(name)
      if (name === 'proyecto') {
        strCodigoProyecto2.value = (value as string)
        setStrCodigoProyecto(value)
        console.log(strCodigoProyecto2.value)
      }
      console.log(strCodigoProyecto2.value)

    }
    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

    return (
      <div className="useFormContainer centered-div w-[40rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))} className="userFormulario">
          <div className="userFormularioContainer">
            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Proyecto"
                  name="proyecto"
                  showRefresh={true}
                  data={data && data[ProyectosDocumEnum.proyecto]}
                  handleSelectChange={handleInputChange}
                  control={control}
                  entidad={["/api/proyectos/", "02"]}
                  error={errors.proyecto}
                  readOnly={isEditting}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="selectInputDiv">
                  <SelectInputTiposComponent
                    label="Tipo Doc"
                    name="tipo_doc"
                    showRefresh={true}
                    data={data && data[ProyectosDocumEnum.tipo_doc_id]}
                    control={control}
                    entidad={["TipoDocForm", "6,7"]}
                    error={errors.tipo_doc}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Número"
                    name="numero_doc"
                    data={data && data[ProyectosDocumEnum.numero_doc]}
                    control={control}
                    error={errors.numero_doc}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type={"date"}
                    label="Fecha Doc"
                    name="fecha_doc"
                    data={fechaFormateada ? fechaFormateada : data && data[ProyectosDocumEnum.fecha_doc]}
                    control={control}
                    error={errors.fecha_doc}
                    textAlign="text-center"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Neto $"
                    name="total_neto"
                    data={data && data[ProyectosDocumEnum.total_neto]}
                    control={control}
                    error={errors.total_neto}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="input-container items-center rowForm w-[50%]">
                <div className="selectInputDiv">
                  <SelectInputTiposComponent
                    label="Tipo Doc. Ref."
                    name="tipo_doc_ref"
                    showRefresh={true}
                    data={data && data[ProyectosDocumEnum.tipo_doc_ref_id]}
                    control={control}
                    entidad={["TipoDocRef", "5,6,7"]}
                    customWidth={"labelInput inputStyles"}
                    error={errors.tipo_doc}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[50%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="Número Referenciado"
                    name="numero_doc_ref"
                    data={data && data[ProyectosDocumEnum.numero_doc_ref]}
                    control={control}
                    error={errors.numero_doc}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
            </div>

              <div className="input-container items-center rowForm">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="Observaciones"
                    name="observaciones"
                    data={data && data[ProyectosDocumEnum.observaciones]}
                    control={control}
                    error={errors.observaciones}
                    isOptional={true}
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
            <div className="w-[50%] mx-auto">
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

export default FProyectosDocum;
