import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import {
  A1_CR_OD,
  A1_CR_OI,
  A2_CR_OD,
  A2_CR_OI,
  codigoProyecto,
  reiniciarValidationNivel3BodegaCristales,
  tipo_de_anteojo,
  updateOT,
  validationBodegaCristales,
  validationBodegaSchema,
} from "../../utils";
// import { toast } from 'react-toastify';
import {
  validateBodegaCristal1_od,
  validateBodegaCristal1_oi,
  validateBodegaCristal2_od,
  validateBodegaCristal2_oi,
} from "../../utils/validationOT";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchOT } from "../../../redux/slices/OTSlice";
import { paramsOT } from "../../views/mantenedores/MOT";
import { toast } from "react-toastify";
import { OTAreasEnum, OTGrillaEnum } from "../../Enums";
import { signal } from "@preact/signals-react";
import { Button, Checkbox } from "@material-tailwind/react";
import {
  CR1_OD_LAB,
  CR1_OI_LAB,
  CR2_OD_LAB,
  CR2_OI_LAB,
} from "../../utils/FOTCristales_utils";

import { Howl } from "howler";
import soundError from "../../../assets/error-call-to-attention-129258.mp3";
import {
  dataOTSignal,
  resultValidarBodega,
  structureCristalesBodega,
  valueConfirmOT,
} from "../../components/OTPrimaryButtons";
import TextInputInteractive from "../../components/forms/TextInputInteractive";
import TableValidationCristales from "../../components/OTForms/TableValidationCristales";

export const focusFirstInput = (
  strInputName: string,
  ref: React.RefObject<any>
) => {
  if (ref.current) {
    const firstInput = ref.current.querySelector(`input[name=${strInputName}]`);
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }
};

const validation_cristal1_od = signal("");
const validation_cristal1_oi = signal("");
const validation_cristal2_od = signal("");
const validation_cristal2_oi = signal("");

interface IFOTValidarBodega {
  handleClose?: any;
  pkToDelete?: any;
}

const FOTValidateCristales: React.FC<IFOTValidarBodega> = ({ handleClose }) => {
  // console.log(optionBodega.value.aproximar)

  // query 18

  // const [optionBodega, setOptionBodega] = useState<any>({
  //   aproximar: {
  //     cr1_od: false,
  //     cr1_oi: false,
  //     cr2_od: false,
  //     cr2_oi: false,
  //   },
  //   adquisiciones: {
  //     cr1_od: false,
  //     cr1_oi: false,
  //     cr2_od: false,
  //     cr2_oi: false,
  //   },
  //   laboratorio: {
  //     cr1_od: false,
  //     cr1_oi: false,
  //     cr2_od: false,
  //     cr2_oi: false,
  //   },
  // });

  const [formValues, setFormValues] = React.useState();
  const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
  const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
  const [OT, setOT] = React.useState<any>(dataOTSignal.value);

  const resetFields = () => {
    CR1_OD_LAB.value = false;
    CR1_OI_LAB.value = false;
    CR2_OD_LAB.value = false;
    CR2_OI_LAB.value = false;
    validation_cristal1_od.value = "";
    validation_cristal1_oi.value = "";
    validation_cristal2_od.value = "";
    validation_cristal2_oi.value = "";
    resetField("a1_od");
    resetField("a1_oi");
    resetField("a1_armazon");
    resetField("a2_od");
    resetField("a2_oi");
    resetField("a2_armazon");
  };

  const schema = validationBodegaSchema();
  const alreadyValidate = true;
  const dispatch = useAppDispatch();

  let errorSound = new Howl({
    src: [soundError],
    volume: 1,
  });

  const inputsRef = {
    a1_od: React.useRef<any>(null),
    a1_oi: React.useRef<any>(null),
    a2_od: React.useRef<any>(null),
    a2_oi: React.useRef<any>(null),
  };

  const inputCristalProps: any = {
    a1_od: () => {
      return {
        label: "OD",
        labelCristal: OT[OTGrillaEnum.cr1_od],
        name: "a1_od",
        data: validation_cristal1_od.value,
        inputsRefCristal: inputsRef.a1_od,
        checkedVariable: CR1_OD_LAB.value,
        // aproximar_nombre: "cr1_od_aproximar",
        // aproximar_value: optionBodega.value.aproximar.cr1_od,
        // aproximar_checked: optionBodega.value.aproximar.cr1_od,
      };
    },
    a1_oi: () => {
      return {
        label: "OI",
        labelCristal: OT[OTGrillaEnum.cr1_oi],
        name: "a1_oi",
        data: validation_cristal1_oi.value,
        inputsRefCristal: inputsRef.a1_oi,
        checkedVariable: CR1_OI_LAB.value,
        // aproximar_nombre: "cr1_oi_aproximar",
        // aproximar_value: optionBodega.value.aproximar.cr1_oi,
        // aproximar_checked: optionBodega.value.aproximar.cr1_oi,
      };
    },
    a2_od: () => {
      return {
        label: "OD",
        labelCristal: OT[OTGrillaEnum.cr2_od],
        name: "a2_od",
        data: validation_cristal2_od.value,
        inputsRefCristal: inputsRef.a2_od,
        checkedVariable: CR2_OD_LAB.value,
      };
    },
    a2_oi: () => {
      return {
        label: "OI",
        labelCristal: OT[OTGrillaEnum.cr2_oi],
        name: "a2_oi",
        data: validation_cristal2_oi.value,
        inputsRefCristal: inputsRef.a2_oi,
        checkedVariable: CR2_OI_LAB.value,
      };
    },
  };
  const renderInputCristal = (cristal: string) => {
    const { label, name, data, checkedVariable, inputsRefCristal } =
      inputCristalProps[cristal]();
    const isAlReadyValidate =
      structureCristalesBodega.value[name].estado === "1" ? true : false;
    console.log(structureCristalesBodega.value);
    return (
      <div className="rowForm !h-[7vw] relative mb-4">
        {/* <label className="labelInput  ml-4">
          {labelCristal}|{codigosAlternativos}
        </label> */}
        <TextInputInteractive
          type="text"
          label={label}
          name={name}
          handleChange={handleInputChange}
          isOT={true}
          data={data}
          control={control}
          textAlign="text-left"
          customWidth={"labelInput inputStyles w-[23vw]"}
          inputRef={inputsRefCristal}
          validarBodega={true}
          onlyRead={isAlReadyValidate}
        />
        <div
          className={`absolute top-2 items-center flex inputStyles ${
            OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
              ? "right-[2vw]"
              : "right-[1vw]"
          } `}
        >
          <Checkbox
            label="LAB"
            color="orange"
            // onChange={(e) => onChangeCheckLab(e)}
            checked={checkedVariable}
          />
        </div>

        {/* {cristal === "a1_od" && isAproximarCR1OD && (
          <div className="w-full h-full absolute left-[28vw] top-4">
            <TableValidationCristales />
          </div>
        )}

        {cristal === "a1_oi" && isAproximarCR1OI && (
          <div className="w-full h-full absolute left-[28vw] top-4">
            <TableValidationCristales />
          </div>
        )}
        {cristal === "a2_od" && isAproximarCR2OD && (
          <div className="w-full h-full absolute left-[28vw] top-4">
            <TableValidationCristales />
          </div>
        )}
        {cristal === "a2_oi" && isAproximarCR2OI && (
          <div className="w-full h-full absolute left-[28vw] top-4">
            <TableValidationCristales />
          </div>
        )} */}
      </div>
    );
  };

  // console.log(OT[EnumGrid.tipo_anteojo_id])

  const casoEjecutar = Object.keys(resultValidarBodega.value).find(
    (key: any) => resultValidarBodega.value[key] === true
  );

  const armazones = (
    [
      { codigo: OT && OT[OTGrillaEnum.a1_armazon_id] },
      {
        codigo:
          OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
            ? OT && OT[OTGrillaEnum.a2_armazon_id]
            : "",
      },
    ] as any
  ).filter((codigo: any) => codigo.codigo !== "");

  const cristales = [
    {
      codigo: OT && OT[OTGrillaEnum.cr1_od],
      opcion_vta: CR1_OD_LAB.value === true ? "2" : "1",
    },
    {
      codigo: OT && OT[OTGrillaEnum.cr1_oi],
      opcion_vta: CR1_OI_LAB.value === true ? "2" : "1",
    },
    {
      codigo:
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? OT && OT[OTGrillaEnum.cr2_od]
          : "",
      opcion_vta:
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? CR2_OD_LAB.value === true
            ? "2"
            : "1"
          : "",
    },
    {
      codigo:
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? OT && OT[OTGrillaEnum.cr2_oi]
          : "",
      opcion_vta:
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? CR2_OI_LAB.value === true
            ? "2"
            : "1"
          : "",
    },
  ].filter((codigo: any) => codigo.codigo !== "");

  const { control, resetField } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (e: any) => {
    let { name, value } = e;
    let formatValue: any;
    console.log(name);
    console.log(value);

    if (value === "") {
      return;
    }

    // if (value && value.length >= 12) {
    //   const regex = /^0+/;
    //   formatValue = value.replace(regex, "");
    // }

    formatValue = value;

    if (name === "a1_od") {
      if (formatValue === "") {
        validateBodegaCristal1_od("");
      }
      if (
        structureCristalesBodega.value[name].codigos.some(
          (a1od: any) => a1od.codigo === formatValue
        )
      ) {
        console.log("render");
        validation_cristal1_od.value = value;
        validateBodegaCristal1_od(formatValue, alreadyValidate);
        focusFirstInput("a1_oi", inputsRef["a1_oi"]);
      } else {
        // if (value.length <= 11) {
        //   return;
        // } else {
        // }
        console.log("render");
        validation_cristal1_od.value = "";
        errorSound.play();
        validateBodegaCristal1_od("");
        toast.error("Código Cristal OD no corresponde.", {
          autoClose: 500,
        });
        resetField("a1_od");
        setFormValues({ [name]: "" } as any);
      }
    }

    if (name === "a1_oi") {
      if (value.trim() === "") {
        validateBodegaCristal1_oi("");
      }
      if (
        structureCristalesBodega.value[name].codigos.some(
          (a1oi: any) => a1oi.codigo === formatValue
        )
      ) {
        validateBodegaCristal1_oi(value, alreadyValidate);
        validation_cristal1_oi.value = value;
        // focusFirstInput("a2_armazon", inputsRef["a2_armazon"]);
      } else {
        // if (value.length <= 11) {
        //   return;
        // } else {
        // }
        validation_cristal1_oi.value = "";
        errorSound.play();
        validateBodegaCristal1_oi("");
        toast.error("Código Cristal OI no correspsonde.", {
          autoClose: 500,
        });
        resetField("a1_oi");
        setFormValues({ [name]: "" } as any);
        // toast.error('Anteojo 1, Código cristal OI no son iguales')
      }
    }

    if (name === "a2_od") {
      if (value.trim() === "") {
        validateBodegaCristal2_od("");
      }
      console.log(OT && OT[OTGrillaEnum.cr2_od]);
      if (
        structureCristalesBodega.value[name].codigos.some(
          (a2od: any) => a2od.codigo === formatValue
        ) &&
        value.length >= 11
      ) {
        validation_cristal2_od.value = value;
        validateBodegaCristal2_od(value, alreadyValidate);
        focusFirstInput("a2_oi", inputsRef["a2_oi"]);
      } else {
        if (value.length <= 11) {
          return;
        } else {
          validation_cristal2_od.value = "";
          errorSound.play();
          validateBodegaCristal2_od("");
          toast.error("Codigo Cristal 2 OD no corresponde.", {
            autoClose: 500,
          });
          resetField("a2_od");
          setFormValues({ [name]: "" } as any);
        }
      }
    }

    if (name === "a2_oi") {
      if (value.trim() === "") {
        validateBodegaCristal2_oi("");
      }
      if (
        structureCristalesBodega.value[name].codigos.some(
          (a2oi: any) => a2oi.codigo === formatValue
        ) &&
        value.length >= 11
      ) {
        validation_cristal2_oi.value = value;
        validateBodegaCristal2_oi(value, alreadyValidate);
        // focusFirstInput('a2_armazon', inputsRef["a2_armazon"])
      } else {
        if (value.length <= 11) {
          return;
        } else {
          validation_cristal2_oi.value = "";
          errorSound.play();
          validateBodegaCristal2_oi("");
          toast.error("Código de Cristal 2 OI no corresponde.", {
            autoClose: 500,
          });
          resetField("a2_oi");
          setFormValues({ [name]: "" } as any);
        }
        // toast.error('Anteojo 2, Código cristal OI no son iguales')
      }
    }

    setFormValues((prevFormValues: any) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  if (dataOTSignal.value === (0 as any)) {
    return <></>;
  }

  React.useEffect(() => {
    if (OT) {
      console.log(OT);
      console.log(OT && OT[0][OTGrillaEnum.tipo_anteojo_id]);
      if (OT && OT[0][OTGrillaEnum.tipo_anteojo_id] === 3) {
        console.log("lejos/cerca");
        console.log(structureCristalesBodega.value);
        if (
          structureCristalesBodega.value["a1_od"].estado === "1" &&
          structureCristalesBodega.value["a1_oi"].estado === "1" &&
          structureCristalesBodega.value["a2_od"].estado === "1" &&
          structureCristalesBodega.value["a2_oi"].estado === "1"
        ) {
          console.log(structureCristalesBodega.value["a2_oi"].estado === "1");
          console.log(structureCristalesBodega.value["a2_od"].estado === "1");
          console.log(structureCristalesBodega.value["a1_od"].estado === "1");
          console.log(structureCristalesBodega.value["a1_oi"].estado === "1");
          toast.success("Cristales Validados Correctamente.");
          handleClose();
        } else {
          if (structureCristalesBodega.value["a1_od"].estado === "1") {
            validateBodegaCristal1_od("32", true);
          }

          if (structureCristalesBodega.value["a1_oi"].estado === "1") {
            validateBodegaCristal1_oi("32", true);
          }
          if (structureCristalesBodega.value["a2_od"].estado === "1") {
            validateBodegaCristal2_od("32", true);
          }

          if (structureCristalesBodega.value["a2_oi"].estado === "1") {
            validateBodegaCristal2_oi("32", true);
          }
        }
      } else {
        if (
          structureCristalesBodega.value["a1_od"].estado === "1" &&
          structureCristalesBodega.value["a1_oi"].estado === "1" &&
          OT &&
          OT[OTGrillaEnum.tipo_anteojo_id] !== 3
        ) {
          console.log("render");
          toast.success("Cristales Validados Correctamente.");
          handleClose();
        } else {
          if (structureCristalesBodega.value["a1_od"].estado === "1") {
            validateBodegaCristal1_od("32", true);
          }

          if (structureCristalesBodega.value["a1_oi"].estado === "1") {
            validateBodegaCristal1_oi("32", true);
          }
        }
      }

      A1_CR_OD.value = OT[OTGrillaEnum.cr1_od];
      A1_CR_OI.value = OT[OTGrillaEnum.cr1_oi];
      A2_CR_OD.value = OT[OTGrillaEnum.cr2_od];
      A2_CR_OI.value = OT[OTGrillaEnum.cr2_oi];

      // a1_armazon.value = OT[OTGrillaEnum.a1_armazon_id];
      // a2_armazon.value = OT[OTGrillaEnum.a2_armazon_id];

      tipo_de_anteojo.value = OT[OTGrillaEnum.tipo_anteojo_id];

      codigoProyecto.value = OT[OTGrillaEnum.proyecto];

      if (OT[OTGrillaEnum.cr1_od] === "") {
        CR1_OD_LAB.value = true;
        validateBodegaCristal1_od("32", true);
      }

      if (OT[OTGrillaEnum.cr1_oi] === "") {
        CR1_OI_LAB.value = true;
        validateBodegaCristal1_oi("32", true);
      }
    }
    if (OT && OT[OTGrillaEnum.tipo_anteojo_id] !== 3) {
      console.log("render");
      validateBodegaCristal2_od("32", true);
      validateBodegaCristal2_oi("32", true);
      if (casoEjecutar === "sinCristales") {
        validateBodegaCristal1_od("32", true);
        validateBodegaCristal1_oi("32", true);
      }
    }

    if (
      OT &&
      OT[OTGrillaEnum.tipo_anteojo_id] === 3 &&
      casoEjecutar === "sinCristales"
    ) {
      validateBodegaCristal1_od("32", true);
      validateBodegaCristal1_oi("32", true);
      validateBodegaCristal2_od("32", true);
      validateBodegaCristal2_oi("32", true);
    }
    // focusFirstInput("a1_armazon", inputsRef["a1_armazon"]);
  }, [OT]);

  const sumatoriaNivelCristalesBodega = validationBodegaCristales.value.reduce(
    (index, objecto) => index + objecto.valor,
    0
  );

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        resetFields();

        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (dataOTSignal.value.length === 0) {
      const data: any = [
        0,
        49617,
        "c-10",
        "Venta",
        20,
        "En proceso",
        "1",
        35,
        "1801-2023",
        "PROGRAMA JUNAEB BIO-BIO",
        "COLEGIO MARINA DE CHILE",
        "22782064-0",
        "CRISTIAN EDUARDO RODRÍGUEZ PINTO",
        "2024-06-21",
        1,
        "Lejos",
        "4020000040208",
        "4020000040024",
        " ",
        "100010011240",
        "100010009970",
        "100010011240",
        "100010011240",
        "2",
        "0",
        0,
        9288,
        "S",
        "1801-6-SE24",
        0,
        0,
        1,
        0,
        98,
        0,
      ];
      setOT(data);
    } else {
      setOT(dataOTSignal.value[0]);
    }
  }, [dataOTSignal.value]);

  React.useEffect(() => {
    console.log(validationBodegaCristales.value);
    console.log(sumatoriaNivelCristalesBodega);
    console.log(validationBodegaCristales.value.length);
    if (
      sumatoriaNivelCristalesBodega === validationBodegaCristales.value.length
    ) {
      //VALIDA QUE HAYA DATA EN TODOS LOS CAMPOS SINO RETORNA

      let validation =
        formValues &&
        Object.values(formValues as any).some((value) => value == "");

      console.log(formValues);
      console.log(validation);

      if (formValues === undefined) {
        console.log("render");
        return;
      }

      if (validation) {
        console.log("render");
        return;
      }

      let jsondata: any = [];
      let origen = OTAreas["areaActual"];
      let cristalOri = cristales;
      let armazonOri = armazones;
      let user = UsuarioID;
      let validarBodega = false;
      let isMasivo = true;
      let cristalStock = "1";
      let estadoValidacionCristal = "1";

      let _p2 = "1";

      let destino;
      let estado: any;

      let observaciones;
      let situacion;
      let data = {
        folio: OT[OTGrillaEnum.folio],
        tipo_anteojo: parseInt(OT[OTGrillaEnum.tipo_anteojo_id]),
        proyecto_codigo: OT[OTGrillaEnum.proyecto_titulo],
        punto_venta: OT[OTGrillaEnum.punto_venta],
        cristales: [
          {
            codigo: OT[OTGrillaEnum.cr1_od],
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo: OT[OTGrillaEnum.cr1_oi],
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo: OT[OTGrillaEnum.cr2_od],
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo: OT[OTGrillaEnum.cr2_oi],
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
        ],
        armazones: [],
      };

      // const dataP1 = `cristales1_od_opcion_vta="${CR1_OD_LAB.value === true ? 2 : 1}",cristales1_oi_opcion_vta="${CR1_OI_LAB.value === true ? 2 : 1}",cristales2_od_opcion_vta="${CR2_OD_LAB.value === true ? 2 : 1}",cristales2_oi_opcion_vta="${CR2_OI_LAB.value === true ? 2 : 1}",cristales1_od="${CR1_OD_LAB.value === true ? '' : OT[OTGrillaEnum.cr1_od].trim()}",cristales1_oi="${CR1_OI_LAB.value === true ? '' : OT[OTGrillaEnum.cr1_oi].trim()}",cristales2_od="${CR2_OD_LAB.value === true ? '' : OT[OTGrillaEnum.cr2_od].trim()}", cristales2_oi="${CR2_OI_LAB.value === true ? '' : OT[OTGrillaEnum.cr2_oi].trim()}" ${CR2_OI_LAB.value === true ? ', a1_grupo_od=""' : ''}`
      // const dataP1 = `"${CR1_OD_LAB.value === true ? ',cristales1_od_opcion_vta="2"' : ""}" "${CR1_OI_LAB.value === true ? ',cristales1_oi_opcion_vta="2"' : ""}" "${CR2_OD_LAB.value === true ? ',cristales2_od_opcion_vta="2"': ""} "${CR2_OI_LAB.value === true ? ',cristales2_oi_opcion_vta="2"' : ""}" "${CR1_OD_LAB.value === true ? ',cristales1_od=""' : ""}" "${CR1_OI_LAB.value === true ? ',cristales1_oi=""' : ""}" "${CR2_OD_LAB.value === true ? ',cristales2_od=""' : ""}" ${CR2_OI_LAB.value === true ? ',cristales2_oi=""' : ""}" ${CR2_OI_LAB.value === true ? ',a1_grupo_od=""' : ''}`
      const dataP1 = `${
        CR1_OD_LAB.value === true
          ? 'cristales1_od_opcion_vta="2", a1_grupo_od="",cristales1_od="",'
          : 'cristales1_od_opcion_vta = "1",'
      } ${
        CR1_OI_LAB.value === true
          ? 'cristales1_oi_opcion_vta="2",a1_grupo_oi="",cristales1_oi="",'
          : 'cristales1_oi_opcion_vta = "1",'
      } ${
        CR2_OD_LAB.value === true
          ? 'cristales2_od_opcion_vta="2",a2_grupo_od="",cristales2_od="",'
          : 'cristales2_od_opcion_vta = "1",'
      } ${
        CR2_OI_LAB.value === true
          ? 'cristales2_oi_opcion_vta="2", a2_grupo_oi="",cristales2_oi=""'
          : 'cristales2_oi_opcion_vta = "1"'
      } `;

      console.log(dataP1);
      const toastLoading = toast.loading("Cargando...");
      console.log(casoEjecutar);

      switch (casoEjecutar) {
        case "ProcesarTB_1":
          destino =
            CR1_OD_LAB.value === true ||
            CR1_OI_LAB.value === true ||
            CR2_OD_LAB.value === true ||
            CR2_OI_LAB.value === true
              ? "30"
              : OTAreas["areaSiguiente"];
          estado = "15";
          situacion = "0";
          console.log("render");
          updateOT(
            jsondata,
            origen,
            destino,
            estado,
            [],
            data,
            cristalOri,
            armazonOri,
            user,
            observaciones,
            isMasivo,
            situacion,
            validarBodega,
            "",
            false,
            dataP1,
            _p2
          )
            .then(() => {
              handleClose();
              toast.dismiss(toastLoading);
              toast.success("OT Procesada Correctamente.");
              dispatch(
                fetchOT({
                  OTAreas: OTAreas["areaActual"],
                  searchParams: paramsOT.value,
                })
              );
              valueConfirmOT.value = "";
              resetFields();
            })
            .catch((e) => {
              console.log(e);
              resetFields();
              console.log("error");
              toast.dismiss(toastLoading);
            });

          break;
        case "ProcesarTB_2":
          destino =
            CR1_OD_LAB.value === true ||
            CR1_OI_LAB.value === true ||
            CR2_OD_LAB.value === true ||
            CR2_OI_LAB.value === true
              ? "30"
              : OTAreasEnum["Taller Biselado 2"];
          estado = "15";
          situacion = "0";
          console.log("render");
          updateOT(
            jsondata,
            origen,
            destino,
            estado,
            [],
            data,
            cristalOri,
            armazonOri,
            user,
            observaciones,
            isMasivo,
            situacion,
            validarBodega,
            "",
            false,
            dataP1,
            _p2
          )
            .then(() => {
              handleClose();
              toast.dismiss(toastLoading);
              toast.success("OT Procesada Correctamente.");
              dispatch(
                fetchOT({
                  OTAreas: OTAreas["areaActual"],
                  searchParams: paramsOT.value,
                })
              );
              valueConfirmOT.value = "";
              resetFields();
            })
            .catch((e) => {
              console.log(e);
              resetFields();
              console.log("error");
              toast.dismiss(toastLoading);
            });

          break;
        case "conCristales":
          destino = OTAreas["areas"]
            .map((area: any) => area)
            .filter((areaAuxiliar: any) => areaAuxiliar[1] === 60)[0][7];
          estado = "15";
          situacion = "4";
          observaciones = "Montaje externo con cristales.";

          updateOT(
            jsondata,
            origen,
            destino,
            estado,
            [],
            data,
            cristalOri,
            armazonOri,
            user,
            observaciones,
            isMasivo,
            situacion,
            validarBodega,
            "",
            false,
            dataP1
          )
            .then(() => {
              handleClose();
              toast.dismiss(toastLoading);
              toast.success("OT Procesada Correctamente.");
              dispatch(
                fetchOT({
                  OTAreas: OTAreas["areaActual"],
                  searchParams: paramsOT.value,
                })
              );
              valueConfirmOT.value = "";
              resetFields();
            })
            .catch((e) => {
              console.log(e);
              console.log("error");
              resetFields();
              toast.dismiss(toastLoading);
            });

          break;
        case "sinCristales":
          destino = OTAreas["areas"]
            .map((area: any) => area)
            .filter((areaAuxiliar: any) => areaAuxiliar[1] === 60)[0][7];
          estado = "15";
          situacion = "5";
          observaciones = "Montaje externo sin cristales.";

          updateOT(
            jsondata,
            origen,
            destino,
            estado,
            [],
            data,
            cristalOri,
            armazonOri,
            user,
            observaciones,
            isMasivo,
            situacion,
            validarBodega,
            "",
            false,
            dataP1
          )
            .then(() => {
              handleClose();
              toast.dismiss(toastLoading);
              toast.success("OT Procesada Correctamente.");
              dispatch(
                fetchOT({
                  OTAreas: OTAreas["areaActual"],
                  searchParams: paramsOT.value,
                })
              );
              valueConfirmOT.value = "";
              resetFields();
            })
            .catch((e) => {
              console.log(e);
              console.log("error");
              resetFields();
              toast.dismiss(toastLoading);
            });
          break;
        default:
          break;
      }
    }
  }, [sumatoriaNivelCristalesBodega]);

  React.useEffect(() => {
    reiniciarValidationNivel3BodegaCristales();
  }, []);

  const handleDerivacionValidarCristales = async () => {
    const toastLoading = toast.loading("Cargando...");

    try {
      let jsondata: any = [];
      let origen = OTAreas["areaActual"];
      let cristalOri = cristales;
      let armazonOri = armazones;
      let user = UsuarioID;
      let validarBodega = false;
      let isMasivo = true;
      let cristalStock = "1";
      let estadoValidacionCristal = "1";

      let _p2 = "1";

      let destino = "10";
      let estado = "40";

      let observaciones;
      let situacion;
      let data = {
        folio: OT[OTGrillaEnum.folio],
        tipo_anteojo: parseInt(OT[OTGrillaEnum.tipo_anteojo_id]),
        proyecto_codigo: OT[OTGrillaEnum.proyecto_titulo],
        punto_venta: OT[OTGrillaEnum.punto_venta],
        cristales: [
          {
            codigo:
              validation_cristal1_od.value !== ""
                ? validation_cristal1_od.value
                : "",
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo:
              validation_cristal1_oi.value !== ""
                ? validation_cristal1_oi.value
                : "",
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo:
              validation_cristal2_od.value !== ""
                ? validation_cristal2_od.value
                : "",
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
          {
            codigo:
              validation_cristal2_oi.value !== ""
                ? validation_cristal2_oi.value
                : "",
            opcion_vta: cristalStock,
            estado: estadoValidacionCristal,
          },
        ],
        armazones: [],
      };

      updateOT(
        jsondata,
        origen,
        destino,
        estado,
        [],
        data,
        cristalOri,
        armazonOri,
        user,
        observaciones,
        isMasivo,
        situacion,
        validarBodega,
        "",
        false,
        "",
        _p2
      )
        .then(() => {
          handleClose();
          toast.dismiss(toastLoading);
          toast.success("OT Procesada Correctamente.");
          dispatch(
            fetchOT({
              OTAreas: OTAreas["areaActual"],
              searchParams: paramsOT.value,
            })
          );
          valueConfirmOT.value = "";
          resetFields();
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
          resetFields();
          toast.dismiss(toastLoading);
        });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div
      className={`bg-[#676f9d]  mx-auto h-[40vw]   absolute  ${
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? "top-[.8vw] !left-[18vw] w-[65vw] h-[50vw]"
          : "top-[2vw] !left-[30vw] w-[35vw]"
      } right-auto rounded-xl shadow-md overflow-hidden lg:left-[18rem]  z-40`}
    >
      <div className="absolute right-0 userFormBtnCloseContainer">
        <h1
          className={`text-center text-4xl text-white  mb-5 ${
            OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
              ? "translate-x-[-23vw]"
              : "translate-x-[-10vw]"
          } `}
        >
          Folio:{" "}
          <span className="text-orange-300">
            {OT && OT[OTGrillaEnum.folio]}
          </span>
        </h1>
        <button
          onClick={() => {
            resetFields();
            // handleClose();
          }}
          className="userFormBtnClose mr-4"
        >
          X
        </button>
      </div>
      <h1 className="h-8"></h1>
      <form className="p-8 space-y-6 flex items-center">
        {OT && (
          <div className="!w-[34vw]">
            <h1 className="text-center text-white text-4xl">
              Anteojo{" "}
              <span className="text-orange-300">
                {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
                  ? "Lejos"
                  : OT && OT[OTGrillaEnum.tipo_anteojo]}
              </span>
            </h1>

            {casoEjecutar !== "sinCristales" &&
              OT[OTGrillaEnum.cr1_od] !== "" &&
              renderInputCristal("a1_od")}
            <div className="w-[75%] ml-4 bg-white -translate-y-[4vw] h-[30%] ">
              <TableValidationCristales
                data={structureCristalesBodega.value["a1_od"].codigos}
              />
            </div>

            {casoEjecutar !== "sinCristales" &&
              OT[OTGrillaEnum.cr1_oi] !== "" &&
              renderInputCristal("a1_oi")}
            <div className="w-[75%] ml-4 bg-white -translate-y-[4vw]">
              <TableValidationCristales
                data={structureCristalesBodega.value["a1_oi"].codigos}
              />
            </div>
          </div>
        )}

        {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
          <h1 className="text-center text-4xl text-white sbolut right-[10rem] top-8 absolute ">
            Anteojo <span className="text-orange-300">Cerca</span>
          </h1>
        )}

        {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
          <div className="!w-[34vw] translate-y-[-1.2vw]">
            {casoEjecutar !== "sinCristales" &&
              OT[OTGrillaEnum.cr2_od] !== "" &&
              renderInputCristal("a2_od")}
            <div className="w-[75%] ml-4 bg-white -translate-y-[4vw] h-[30%] ">
              <TableValidationCristales
                data={structureCristalesBodega.value["a2_od"].codigos}
              />
            </div>

            {casoEjecutar !== "sinCristales" &&
              OT[OTGrillaEnum.cr2_oi] !== "" &&
              renderInputCristal("a2_oi")}
            <div className="w-[75%] ml-4 bg-white -translate-y-[4vw] h-[30%] ">
              <TableValidationCristales
                data={structureCristalesBodega.value["a2_oi"].codigos}
              />
            </div>
          </div>
        )}
      </form>

      <div className="mx-auto  w-[20%] translate-y-[-5vw]">
        <Button
          className="w-[12rem] text-[1.3rem] mx-auto otActionButtonForm bg-red-700 hover:bg-red-400"
          onClick={() => handleDerivacionValidarCristales()}
        >
          Derivar
        </Button>
      </div>
    </div>
  );
};

export default FOTValidateCristales;
