import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  a1_armazon,
  a2_armazon,
  codigoProyecto,
  reiniciarValidationNivel3BodegaArmazones,
  tipo_de_anteojo,
  updateOT,
  validationBodegaArmazones,
  validationBodegaSchema,
} from "../../utils";

// import { toast } from 'react-toastify';
import {
  validateBodegaArmazon1,
  validateBodegaArmazon2,
} from "../../utils/validationOT";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { fetchOT } from "../../../redux/slices/OTSlice";
import { paramsOT } from "../../views/mantenedores/MOT";
import { toast } from "react-toastify";
import { OTAreasEnum, OTGrillaEnum } from "../../Enums";
import { signal } from "@preact/signals-react";

import { Howl } from "howler";
import soundError from "../../../assets/error-call-to-attention-129258.mp3";
import soundSuccess from "../../../assets/zapsplat_public_places_supermarket_checkout_beep_002_44357 (1).mp3";

import {
  dataOTSignal,
  resultValidarBodega,
  valueConfirmOT,
} from "../../components/OTPrimaryButtons";
import TextInputInteractive from "../../components/forms/TextInputInteractive";
import axios from "axios";
import { URLBackend } from "../../utils/config";
import { EnumGrid } from "../mantenedores/MOTHistorica";
// import { Button } from "@material-tailwind/react";

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

const validationA1_armazon = signal("");
const validationA2_armazon = signal("");

interface IFOTValidarBodega {
  handleClose?: any;
  pkToDelete?: any;
}

const FOTValidateArmazones: React.FC<IFOTValidarBodega> = ({ handleClose }) => {
  const [formValues, setFormValues] = React.useState();
  const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
  const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
  const [OT, setOT] = React.useState<any>(dataOTSignal.value);

  const [isValidateArmazon1, setIsValidateArmazon1] = useState(false);
  // const [isValidateArmazon2, setIsValidateArmazon2] = useState(false);

  const resetFields = () => {
    validationA1_armazon.value = "";
    validationA2_armazon.value = "";
    resetField("a1_armazon");
    resetField("a2_armazon");
  };

  const schema = validationBodegaSchema();
  const alreadyValidate = true;
  const dispatch = useAppDispatch();

  let errorSound = new Howl({
    src: [soundError],
    volume: 1,
  });

  let successSound = new Howl({
    src: [soundSuccess],
    volume: 1,
  });

  const inputsRef = {
    a1_armazon: React.useRef<any>(null),
    a2_armazon: React.useRef<any>(null),
  };

  const inputArmazonProps: any = {
    a1_armazon: () => {
      return {
        label: "Armazon 1",
        labelArmazon: OT[OTGrillaEnum.a1_armazon_id],
        name: "a1_armazon",
        data: validationA1_armazon.value,
        inputsRefArmazon: inputsRef.a1_armazon,
      };
    },
    a2_armazon: () => {
      return {
        label: "Armazon 2",
        labelArmazon: OT[OTGrillaEnum.a2_armazon_id],
        name: "a2_armazon",
        data: validationA2_armazon.value,
        inputsRefArmazon: inputsRef.a2_armazon,
      };
    },
  };

  const resnderInputArmazon = (armazon: string) => {
    const { label, name, data, labelArmazon, inputsRefArmazon } =
      inputArmazonProps[armazon]();
    return (
      <div className="rowForm !h-[5rem] relative mb-4">
        {/* <label className="labelInput cursor-not-allowed ml-4 select-none"> */}
        <label className="labelInput ml-4 ">{labelArmazon}</label>
        <TextInputInteractive
          type="text"
          label={label}
          name={name}
          handleChange={handleInputChange}
          isOT={true}
          data={data}
          control={control}
          textAlign="text-left"
          customWidth={"labelInput inputStyles w-[26vw]"}
          inputRef={inputsRefArmazon}
          validarBodega={true}
          onlyRead={isValidateArmazon1}
          // onKeyDown={(event: any) => {
          //   if ((event.ctrlKey || event.metaKey) && event.key === "v") {
          //     event.preventDefault();
          //   }
          // }}
          // onPaste={(event: any) => {
          //   event.preventDefault();
          // }}
        />
      </div>
    );
  };

  // console.log(OT[EnumGrid.tipo_anteojo_id])

  const casoEjecutar = Object.keys(resultValidarBodega.value).find(
    (key: any) => resultValidarBodega.value[key] === true
  );

  const armazones = (
    [
      {
        codigo:
          validationA1_armazon.value !== "" ? validationA1_armazon.value : "",
      },
      {
        codigo:
          validationA2_armazon.value !== "" ? validationA2_armazon.value : "",
      },
    ] as any
  ).filter((codigo: any) => codigo.codigo !== "");

  const cristales: any = [];

  const { control, resetField } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (e: any) => {
    let { name, value } = e;
    let formatValue: any;

    if (value === "") {
      return;
    }

    if (value && value.length >= 11) {
      const regex = /^0+/;
      formatValue = value.replace(regex, "");

      if (name === "a1_armazon") {
        if (value.trim() === "") {
          validateBodegaArmazon1("");
        }
        if (OT && OT[OTGrillaEnum.a1_armazon_id] === formatValue) {
          validateBodegaArmazon1(value, alreadyValidate);
          validationA1_armazon.value = value;
          successSound.play();
          focusFirstInput("a2_armazon", inputsRef["a2_armazon"]);
        } else {
          console.log(value);
          if (value.lenght <= 11) {
            console.log(value);
            return;
          } else {
            errorSound.play();
            validationA1_armazon.value = "";
            validateBodegaArmazon1("");
            // toast.error("Código Armazon 1 no corresponde.", {
            //   autoClose: 500,
            // });
            resetField("a1_armazon");
            setFormValues({ [name]: "" } as any);
          }
        }
      }

      if (name === "a2_armazon") {
        if (value.trim() === "") {
          validateBodegaArmazon2("");
        }
        if (OT && OT[OTGrillaEnum.a2_armazon_id] === formatValue) {
          validateBodegaArmazon2(value, alreadyValidate);
          successSound.play();
          validationA2_armazon.value = value;
        } else {
          console.log(value);
          console.log(value.length);
          if (value.lenght <= 11) {
            return;
          } else {
          }
          errorSound.play();
          validationA2_armazon.value = "";
          // errorSound.play();
          validateBodegaArmazon2("");
          // toast.error("Código Armazon 2 no corresponde.", {
          //   autoClose: 500,
          // });
          resetField("a2_armazon");
          setFormValues({ [name]: "" } as any);
        }
      }

      setFormValues((prevFormValues: any) => ({
        ...prevFormValues,
        [name]: value,
      }));
    }
  };

  if (dataOTSignal.value === (0 as any)) {
    return <></>;
  }

  React.useEffect(() => {
    if (OT) {
      focusFirstInput("a1_oi", inputsRef["a1_armazon"]);
      a1_armazon.value = OT[OTGrillaEnum.a1_armazon_id];
      a2_armazon.value = OT[OTGrillaEnum.a2_armazon_id];

      tipo_de_anteojo.value = OT[OTGrillaEnum.tipo_anteojo_id];

      codigoProyecto.value = OT[OTGrillaEnum.proyecto];
    }
    if (OT && OT[OTGrillaEnum.tipo_anteojo_id] !== 3) {
      validateBodegaArmazon2("32", true);
    }
    focusFirstInput("a1_armazon", inputsRef["a1_armazon"]);
  }, [OT]);

  const sumatoriaNivel3 = validationBodegaArmazones.value.reduce(
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

  const fetchIsValidateArmazon = async () => {
    try {
      console.log(dataOTSignal.value[0][OTGrillaEnum.folio]);
      const folioOT = dataOTSignal.value[0][OTGrillaEnum.folio];
      // https://gestiondev.mtoopticos.cl/api/ot/listado/?query=01&_p1=2163

      const { data } = await axios(
        `${URLBackend}/api/ot/listado/?query=01&_p1=${folioOT}`
      );

      console.log(data && data[0][EnumGrid.estado_validacion_armazon1]);
      if (data[0][EnumGrid.estado_validacion_armazon1] === 1) {
        setIsValidateArmazon1(true);
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  React.useEffect(() => {
    fetchIsValidateArmazon();
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
        " ",
        " ",
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
      // fetchIsValidateArmazon();
      setOT(dataOTSignal.value[0]);
    }
  }, [dataOTSignal.value]);

  React.useEffect(() => {
    console.log(isValidateArmazon1);
    if (isValidateArmazon1) {
      handleClose();
      toast.success("Armazones validados correctamente.");
    }
  }, [isValidateArmazon1]);

  React.useEffect(() => {
    // console.log(validationBodegaArmazones);
    // console.log(sumatoriaNivel3);

    if (sumatoriaNivel3 === validationBodegaArmazones.value.length) {
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
      let estadoValidaArmazon = "1";

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
        cristales: [],
        armazones: [
          {
            codigo:
              validationA1_armazon.value !== ""
                ? validationA1_armazon.value
                : "",
            estado: estadoValidaArmazon,
          },
          {
            codigo:
              validationA2_armazon.value !== ""
                ? validationA2_armazon.value
                : "",
            estado: estadoValidaArmazon,
          },
        ],
      };

      const toastLoading = toast.loading("Cargando...");

      switch (casoEjecutar) {
        case "ProcesarTB_1":
          destino = OTAreas["areaSiguiente"];
          estado = "15";
          situacion = "2";

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
              resetFields();
              console.log("error");
              toast.dismiss(toastLoading);
            });

          break;
        case "ProcesarTB_2":
          destino = OTAreasEnum["Taller Biselado 2"];
          estado = "15";
          situacion = "2";

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
          break;
        default:
          break;
      }
    }
  }, [sumatoriaNivel3]);

  React.useEffect(() => {
    reiniciarValidationNivel3BodegaArmazones();
  }, []);

  React.useEffect(() => {
    if (inputsRef.a1_armazon?.current) {
      focusFirstInput("a1_armazon", inputsRef["a1_armazon"]);
    }
  }, [inputsRef.a1_armazon, inputsRef.a2_armazon]);

  return (
    <div
      className={` bg-[#676f9d] w-[35vw] mx-auto  xl:left-[35rem]  absolute  ${
        OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
          ? "top-[2vw] !left-[30vw]"
          : "top-[2vw] !left-[30vw]"
      } right-auto rounded-xl shadow-md overflow-hidden lg:left-[18rem]  z-40`}
    >
      <div className="absolute right-0 userFormBtnCloseContainer">
        <h1 className="text-center text-4xl text-white  mb-5 translate-x-[-10vw]">
          Folio:{" "}
          <span className="text-orange-300">
            {OT && OT[OTGrillaEnum.folio]}
          </span>
        </h1>
        <button
          onClick={() => {
            resetFields();
            handleClose();
          }}
          className="userFormBtnClose mr-4"
        >
          X
        </button>
      </div>
      <h1 className="h-8"></h1>
      <form className="p-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
        {OT && (
          <div className="!w-[34vw]">
            <h1 className="text-center text-white text-2xl">
              Anteojo{" "}
              {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3
                ? "Lejos"
                : OT && OT[OTGrillaEnum.tipo_anteojo]}
            </h1>
            {resnderInputArmazon("a1_armazon")}
          </div>
        )}

        {OT && OT[OTGrillaEnum.tipo_anteojo_id] === 3 && (
          <div className="!w-[34vw]">
            <h1 className="text-center text-2xl text-white ">Anteojo Cerca</h1>
            {resnderInputArmazon("a2_armazon")}
          </div>
        )}
      </form>
      {/* <div className="mx-auto  w-[20%]">
        <Button
          className="w-[12rem] text-[1.3rem] mx-auto otActionButtonForm bg-red-700 hover:bg-red-400"
          onClick={() => handleDerivacionValidarArmazon()}
        >
          Derivar
        </Button>
      </div> */}
    </div>
  );
};

export default FOTValidateArmazones;
