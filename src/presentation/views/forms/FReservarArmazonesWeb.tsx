/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationReservaArmazonesSchema } from "../../utils/validationFormSchemas";
import { MODAL, SUCCESS_MESSAGES, TITLES } from "../../utils";
import { useCrud } from "../../hooks";
import { useModal } from "../../hooks/useModal";
import useCustomToast from "../../hooks/useCustomToast";
import { signal } from "@preact/signals-react";
// import { AppStore, useAppSelector } from "../../../redux/store";
// import SelectInputTiposComponent from "../../components/forms/SelectInputTiposComponent";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { ReservaArmazonesEnum } from "../../Enums";

const strBaseUrl = "/api/otreservaarmazones/";
const strEntidad = "Reserva de Armazones ";

export interface InputData {
  proyecto: string | undefined;
  punto_venta: string | undefined;
  rut_beneficiario: string | undefined;
  dp1: string | undefined;
  dp2: string | undefined;
  tipo_anteojo: string | undefined;
  Armazon1: string | undefined;
  Armazon3: string | undefined;
  Armazon2: string | undefined;
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

const FReservarArmazonesWeb: React.FC<IUserFormPrps> = React.memo(
  ({
    closeModal,
    setEntities,
    params,
    label,
    data,
    isEditting,
    escritura_lectura,
  }) => {
    const [IsRequeridoDP, _setIsRequeridoDP] = React.useState(false);
    const schema = validationReservaArmazonesSchema(IsRequeridoDP);
    const { showModal, CustomModal } = useModal();
    const { show } = useCustomToast();
    const [_strCodigoProyecto, setStrCodigoProyecto] = useState("");
    const strCodigoProyecto2 = signal("");
    // const [fechaHoraActual, setFechaHoraActual] = useState(fechaActual);
    // const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)

    const {
      editEntity,
      createdEntity,
      ListEntity,
      // firstInputRef,
      focusFirstInput,
    } = useCrud(strBaseUrl);
    const [blnKeep, setblnKeep] = useState(false);

    const {
      control,
      handleSubmit,
      formState: { errors },
      // setValue,
    } = useForm({
      resolver: yupResolver(schema),
    });

    // function transformInsertQuery(jsonData: InputData): OutputData | null {
    //   setFechaHoraActual(new Date())

    //   // const year = fechaHoraActual.getFullYear()
    //   // const month = String(fechaHoraActual.getMonth() + 1).padStart(2, '0')
    //   // const day = String(fechaHoraActual.getDate()).padStart(2, '0')

    //   // const fechaFormateada = `${year}/${month}/${day}`;
    //   // const dateHora = new Date().toLocaleTimeString();

    //   // (proyecto, fecha_hora, tipo_doc, numero_doc, fecha_doc, total_neto, tipo_doc_ref, numero_doc_ref, usuario)
    //   let _p1 = `"${jsonData.proyecto}", ${jsonData.tipo_doc},
    //                ${jsonData.numero_doc}, "${jsonData.fecha_doc}", ${jsonData.total_neto},
    //                ${jsonData.tipo_doc_ref}, ${jsonData.numero_doc_ref}, ${UsuarioID}, "${jsonData.observaciones}"`;

    //   _p1 = _p1.replace(/'/g, '!');

    //   const query: OutputData = {
    //     query: "03",
    //     _p1
    //   };
    //   // console.log("query: ", query);
    //   return query;
    // }

    function transformUpdateQuery(jsonData: InputData): OutputData | null {
      const fields = [
        `proyecto="${jsonData.proyecto}"`,
        `punto_venta=${jsonData.punto_venta}`,
        `tipo_anteojo=${jsonData.tipo_anteojo}`,
        ` dp1=${jsonData.dp1}`,
        ` dp2=${jsonData.dp2 || 0}`,
        ` armazon_1="${jsonData.Armazon1}"`,
        ` armazon_2="${jsonData.Armazon2}"`,
        ` armazon_3="${jsonData.Armazon3}"`,
      ];

      const filteredFields = fields.filter(
        (field) => field !== null && field !== ""
      );

      if (filteredFields.length === 0) {
        return null;
      }
      let _p1 = filteredFields.join(",");
      _p1 = _p1.replace(/'/g, "!");

      // console.log(jsonData)
      console.log(data);

      const query = {
        query: "04",
        _p1,
        _p2: jsonData.rut_beneficiario,
      };
      // console.log(query)
      return query;
    }

    // const resetTextFields = React.useCallback(() => {
    //   setValue("numero_doc", "");
    //   if (firstInputRef.current) {
    //     const firstInput = firstInputRef.current.querySelector(
    //       'input[name="proyecto"]'
    //     );
    //     if (firstInput) {
    //       firstInput.focus();
    //     }
    //   }
    // }, [setValue, firstInputRef]);

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
            : strEntidad.concat(": " + response.message);
          show({
            message: errorMessage ? errorMessage : response.code,
            type: "error",
          });

          return;
        }

        if (response.mensaje.includes("Creado")) {
          toastSuccess(isEditting);
        }
        if (!blnKeep && !isEditting) {
          const result = await showModal(
            MODAL.keep,
            "",
            MODAL.keepYes,
            MODAL.kepNo
          );
          if (result) {
            setblnKeep(true);
            // resetTextFields();
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

        // resetTextFields();
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
        const toastLoading = toast.loading("Cargando...");
        try {
          const transformedData = transformUpdateQuery(data);
          // const transformedData = isEditting
          //   ? transformUpdateQuery(data)
          //   : transformInsertQuery(data);

          const response = isEditting
            ? await editEntity(transformedData)
            : await createdEntity(transformedData);
          handleApiResponse(response, isEditting);
          toast.dismiss(toastLoading);
        } catch (error: any) {
          toast.dismiss(toastLoading);
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
      console.log(value);
      console.log(name);
      if (name === "proyecto") {
        strCodigoProyecto2.value = value as string;
        setStrCodigoProyecto(value);
        console.log(strCodigoProyecto2.value);
      }
      console.log(strCodigoProyecto2.value);
    };
    // const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

    return (
      <div className="useFormContainer centered-div w-[30rem]">
        <div className="userFormBtnCloseContainer">
          <h1 className="userFormLabel mx-auto">{label}</h1>
          <button onClick={closeModal} className="userFormBtnClose mr-4">
            X
          </button>
        </div>

        <form
          onSubmit={handleSubmit((data) => handleSaveChange(data, isEditting))}
          className="userFormulario"
        >
          <div className="userFormularioContainer">
            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Proyecto"
                  name="proyecto"
                  showRefresh={true}
                  data={data && data[ReservaArmazonesEnum.proyecto]}
                  handleSelectChange={handleInputChange}
                  control={control}
                  entidad={["/api/proyectos/", "02"]}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Punto Venta"
                  name="punto_venta"
                  showRefresh={true}
                  data={data && data[ReservaArmazonesEnum.punto_venta_id]}
                  control={control}
                  entidad={["/api/puntosventa/", "02"]}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="selectInputDiv">
                <SelectInputComponent
                  label="Tipo Anteojo"
                  name="tipo_anteojo"
                  showRefresh={true}
                  data={data && data[ReservaArmazonesEnum.tipo_anteojo_id]}
                  control={control}
                  entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                  error={errors.tipo_anteojo}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="input-container items-center rowForm w-[70%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="text"
                    label="RUT"
                    name="rut_beneficiario"
                    data={data && data[ReservaArmazonesEnum.cliente_rut]}
                    control={control}
                    onlyRead={isEditting}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="DP1"
                    name="dp1"
                    data={data && data[ReservaArmazonesEnum.dp1]}
                    control={control}
                    error={errors.dp1}
                    textAlign="text-right"
                    customWidth={"labelInput inputStyles"}
                  />
                </div>
              </div>
              <div className="input-container items-center rowForm w-[30%]">
                <div className="labelInputDiv">
                  <TextInputComponent
                    type="number"
                    label="DP2"
                    name="dp2"
                    data={data && data[ReservaArmazonesEnum.dp2]}
                    control={control}
                    error={errors.dp2}
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
                  label="Armazón 1"
                  name="Armazon1"
                  data={data && data[ReservaArmazonesEnum.cod_armazon1]}
                  control={control}
                  error={errors.Armazon1}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Armazón 2"
                  name="Armazon2"
                  data={data && data[ReservaArmazonesEnum.cod_armazon2]}
                  control={control}
                  error={errors.Armazon2}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                  isOptional={true}
                />
              </div>
            </div>

            <div className="input-container items-center rowForm">
              <div className="labelInputDiv">
                <TextInputComponent
                  type="text"
                  label="Armazón 3"
                  name="Armazon3"
                  data={data && data[ReservaArmazonesEnum.cod_armazon3]}
                  control={control}
                  error={errors.Armazon3}
                  textAlign="text-right"
                  customWidth={"labelInput inputStyles"}
                  isOptional={true}
                />
              </div>
            </div>
          </div>

          <div className="w-full !mt-5 !mb-5">
            <div className="w-[50%] mx-auto">
              {escritura_lectura && (
                <Button
                  type="submit"
                  tabIndex={1}
                  className="userFormBtnSubmit"
                >
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

export default FReservarArmazonesWeb;
