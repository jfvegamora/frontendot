// import React from 'react'

// import { useState } from "react";
// import ZXing from '@rzxing/browser';// import { BrowserBarcodeReader } from '@zxing/library';

import React, { useState, useEffect } from "react";

//@ts-ignore
import Quagga from "quagga";
import { Button, Tooltip } from "@material-tailwind/react";
import { signal } from "@preact/signals-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  codigoProyecto,
  punto_venta,
  tipo_de_anteojo,
  validateRut,
  validationReservaArmazonesSchema,
} from "../../utils";
import { SelectInputComponent, TextInputComponent } from "../../components";
import { AppStore, useAppSelector } from "../../../redux/store";
import { toast } from "react-toastify";
import axios from "axios";
import {
  fetchReservaArmazones,
  getLocalArmazones,
  isDataLocal,
  isOnline,
  responseArmazones,
} from "../../utils/FReservaArmazones_utils";
import {
  clearBaseDatos,
  getArmazones,
  getBeneficiarios,
  isExistArmazon,
  isExistBeneficiario,
  openDatabase,
  setArmazones,
  setReservaBeneficiario,
  validateLocalArmazon,
} from "../../utils/indexedDB";
// import { useNavigate } from 'react-router-dom';
import { clearRutCliente } from "../../utils/FOTClientes_utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { URLBackend } from "../../utils/config";
import { EnumGrid } from "../mantenedores/MProyectos";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { PublicRoutes } from "../../../interfaces";

// import { useNavigate } from 'react-router-dom';
// import { focusFirstInput } from '../../components/OTForms/FOTValidarBodega';
// import axios from 'axios';

//!INSERT: PROYECTO-RUT-PUNTOVENTA-TIPOANTEOJO-DP-A1-2-3-USERID

export const codArmazon1 = signal("");
export const codArmazon2 = signal("");
export const codArmazon3 = signal("");
export const diametro_cristal = signal("");
export const isRequireDP = signal(false);

const focusInput = signal("");
const isLoadingArmazon = signal(false);

export const codProyecto = signal("");

export const armazonesLocalData = signal<any>([]);
export const codPuntoVenta = signal("");
const codDP1 = signal("");
const codDP2 = signal("");
const rutBeneficiarioSignal = signal("");
const emptyBeneficiariosData = signal(true);

const TextInputInteractive = React.lazy(
  () => import("../../components/forms/TextInputInteractive")
);

const obtenerValorDeRequiereDP = async (proyecto: any) => {
  try {
    const response = await axios.get(
      `${URLBackend}/api/proyectos/listado/?query=01&_p2=${proyecto}`
    );
    return response.data[0][EnumGrid.REQUIERE_DP];
  } catch (error) {
    console.error("Error al obtener el valor de REQUIERE_DP:", error);
    return null; // Manejar el error de forma adecuada, por ejemplo, mostrando un mensaje de error al usuario
  }
};

const Scanner: React.FC<any> = ({ setIsScanning }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.getElementById("scanner-container"),
        },
        decoder: {
          readers: ["ean_reader"],
          multiple: false,
          numOfWorkers: 15,
        },
      },
      (err: any) => {
        if (err) {
          console.error(err);
        } else {
          Quagga.onDetected(onDetected);
          Quagga.start();
        }
      }
    );
    return () => Quagga.stop();
  }, []);

  const onDetected = (result: any) => {
    if (result.codeResult) {
      const barcode = result.codeResult.code;

      switch (focusInput.value) {
        case "Armazon1":
          codArmazon1.value = barcode;
          // focusFirstInput('Armazon2',inputsRef.armazon_2)
          break;
        case "Armazon2":
          codArmazon2.value = barcode;
          // focusFirstInput('Armazon3',inputsRef.armazon_3)
          break;
        case "Armazon3":
          codArmazon3.value = barcode;
          break;
        default:
          break;
      }
      setIsScanning(false);
      Quagga.stop();
    }
  };

  const closeScanner = () => {
    console.log("Closing scanner");
    Quagga.stop();
    setIsScanning(false);
  };

  return (
    // <div id="scanner-container" className='absolute top-[8.6rem] !right-[5rem] !z-20' style={{ width: 250, height: 350 }} autoFocus>
    <div>
      <div
        className="text-4xl text-[#f8b179] absolute top-[8.6rem] !right-[6rem] !z-30"
        onClick={closeScanner}
      >
        X
      </div>

      <div
        id="scanner-container"
        className="absolute top-[8.6rem] !right-[5rem] !z-20"
        style={{ width: 250, height: 350 }}
        autoFocus
      ></div>
      {/* <h1 className='text-lg text-white'>Armazon 1</h1> */}
    </div>
  );
};

const FReservarArmazones = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [esRequeridoDP, setEsRequeridoDP] = useState(false);
  const [selectedOption, setSelectedOption] = useState("+");

  const handleRadioChange = (option: any) => {
    setSelectedOption(option);
    console.log(option);
    setValue("Armazon1", "");
    codArmazon1.value = "";
    setValue("Armazon2", "");
    codArmazon2.value = "";
    codArmazon3.value = "";
    setValue("Armazon3", "");
    const value = option === "+" ? "65" : "70";
    setValue("diametro", value);
  };
  // const navigate = useNavigate();
  const userID: any = useAppSelector((store: AppStore) => store.user);

  // if (userID?.id) {
  //   // navigate(`/${PublicRoutes.LOGIN}`);
  //   console.log("render");
  //   navigate(`/login`);
  // }

  const hiddenInputRef = React.useRef<any>(null);

  const userAgent = navigator.userAgent;
  const isMobile = /Mobi/.test(userAgent);
  const navigate = useNavigate();

  const inputsRef = {
    armazon_1: React.useRef<any>(null),
    armazon_2: React.useRef<any>(null),
    armazon_3: React.useRef<any>(null),
  };

  const schema = validationReservaArmazonesSchema(esRequeridoDP);
  const {
    control,
    // register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      tipo_de_anteojo: "1",
      diametro: "+",
      // dp2: "0",
    },
  });

  React.useEffect(() => {
    const isRequired = async () => {
      const required = await obtenerValorDeRequiereDP(getValues("proyecto"));
      if (required === "Si") {
        setEsRequeridoDP(true);
      } else {
        setEsRequeridoDP(false);
      }
    };

    isRequired();
  }, [getValues("proyecto")]);

  React.useEffect(() => {
    if (!isMobile) {
      navigate("/landing");
    }
  }, []);

  const formValues = getValues();

  const clearInputsArmazones = (armazon: string) => {
    switch (armazon) {
      case "Armazon1":
        codArmazon1.value = "";
        break;
      case "Armazon2":
        codArmazon2.value = "";
        break;
      case "Armazon3":
        codArmazon3.value = "";
        break;
      default:
        break;
    }
  };

  const fetchValidateArmazon = async (armazon: string, codArmazon: string) => {
    isLoadingArmazon.value = true;
    const urlbase = `${URLBackend}/api/armazones/listado/?query=02`;
    // const urlbase2 = `${URLBackend}/api/armazones/listado/?query=02`;

    let json_data = [{}];
    if (tipo_de_anteojo.value === "3" && tipo_de_anteojo.value === "4") {
      if (codDP2.value === "") {
        codDP2.value = "0";
      }
    } else {
      if (codDP1.value === "") {
        codDP1.value = "0";
      }
    }

    console.log(selectedOption);
    if (isOnline.value === true) {
      switch (armazon) {
        case "Armazon1":
          json_data = [
            {
              query: "02",
              armazon: (codArmazon || "").trim(),
              proyecto: codProyecto.value,
              punto_venta: codPuntoVenta.value,
              dp: codDP1.value,
              diametro: selectedOption === "+" ? "65" : "70",
              validar_parametrizacion: 1,
              solo_consulta: esRequeridoDP === true ? 2 : 3,
              tipo_anteojo: tipo_de_anteojo.value,
              numero_armazon: 1,
            },
          ];
          break;
        case "Armazon2":
          json_data = [
            {
              query: "02",
              armazon: (codArmazon || "").trim(),
              proyecto: codProyecto.value,
              punto_venta: codPuntoVenta.value,
              dp:
                tipo_de_anteojo.value === "3" && tipo_de_anteojo.value === "4"
                  ? codDP2.value
                  : codDP1.value,
              diametro: selectedOption === "+" ? "65" : "70",
              validar_parametrizacion: 1,
              solo_consulta:
                tipo_de_anteojo.value === "3"
                  ? esRequeridoDP === true
                    ? 2
                    : 3
                  : 0,
              tipo_anteojo: tipo_de_anteojo.value,
              numero_armazon: 2,
            },
          ];
          break;
        case "Armazon3":
          json_data = [
            {
              query: "02",
              armazon: (codArmazon || "").trim(),
              proyecto: codProyecto.value,
              punto_venta: codPuntoVenta.value,
              dp: codDP1.value,
              diametro: selectedOption === "+" ? "65" : "70",
              validar_parametrizacion: 1,
              solo_consulta:
                tipo_de_anteojo.value === "3" ? (esRequeridoDP ? 2 : 3) : 0,
              tipo_anteojo: tipo_de_anteojo.value,
              numero_armazon: 3,
            },
          ];

          break;
        default:
          break;
      }

      // const _id = 2//? 0 no validar nada, data armazon  / 1 valida armazon y cristal  / 2 solo valida amrazon
      // const _p6 = 1 //? 1 VALIDAR PARAMETRIZACION
      // const _p1 = codArmazon
      // const _p2 = codProyecto.value
      // const _p3 = codPuntoVenta.value
      // const _p4 = codDP.value
      // const _p5 = '65' //?'DIAMETRO'
      // const _pkToDelete = encodeURIComponent(JSON.stringify([emmtyJSON, emmtyJSON]))

      if (codArmazon !== "") {
        try {
          // const fetchURL = `${urlbase}&_p1=${_p1}&_p2=${_p2}&_p3=${_p3}&_p4=${_p4}&_p5=${_p5}&_pkToDelete=${_pkToDelete}&_id=${_id}&_p6=${_p6}`

          const fetchURL = `${urlbase}&_jsonData=${encodeURIComponent(
            JSON.stringify(json_data)
          )}`;

          const result = await axios(fetchURL);
          if (result.data && result.data[0] && result.data[0][19] !== "") {
            hiddenInputRef.current.focus();
            toast.error(result.data[0][19]);
            isLoadingArmazon.value = false;
            clearInputsArmazones(armazon);
          }

          // console.log(result);
          switch (armazon) {
            case "Armazon1":
              codArmazon1.value = result.data[0][0];
              break;
            case "Armazon2":
              codArmazon2.value = result.data[0][0];
              break;
            case "Armazon3":
              codArmazon3.value = result.data[0][0];
              break;
            default:
              break;
          }
          isLoadingArmazon.value = true;
        } catch (error) {
          isLoadingArmazon.value = false;
          clearInputsArmazones(armazon);
          hiddenInputRef.current.focus();
          toast.error("Error al validar Armazón.");
        }
      }
    } else {
      const dataValidateArmazon = {
        codArmazon,
        punto_venta: codPuntoVenta.value,
        proyecto: codProyecto.value,
        dp1: codDP1.value,
        dp2: codDP2.value,
      };
      console.log(codPuntoVenta.value);
      console.log(punto_venta.value);
      isLoadingArmazon.value = true;
      console.log(dataValidateArmazon);

      await openDatabase().then(async (db: IDBDatabase) => {
        try {
          const resultValidateArmazon: any = await validateLocalArmazon(
            db,
            dataValidateArmazon
          ).catch(() => console.log("render"));
          console.log(resultValidateArmazon);
          if (
            resultValidateArmazon["armazonEnMuestrario"] &&
            resultValidateArmazon["armazonEnMuestrario"] === false
          ) {
            hiddenInputRef.current.focus();
            toast.error("Armazon no se encuentra en el muestrario.");
            clearInputsArmazones(armazon);
          } else if (
            resultValidateArmazon["diametroEfectivo"] &&
            resultValidateArmazon["diametroEfectivo"] === false
          ) {
            hiddenInputRef.current.focus();
            toast.error("Armazon no esta correctamente validado.");
            clearInputsArmazones(armazon);
          } else {
            switch (armazon) {
              case "Armazon1":
                codArmazon1.value = resultValidateArmazon["cod_armazon"];
                break;
              case "Armazon2":
                codArmazon2.value = resultValidateArmazon["cod_armazon"];
                break;
              case "Armazon3":
                codArmazon3.value = resultValidateArmazon["cod_armazon"];
                break;
              default:
                break;
            }
          }

          // setisLoading(true)
          isLoadingArmazon.value = true;
        } catch (error) {
          console.log("render");
          console.log(error);
        }
        // setisLoading(true)
        isLoadingArmazon.value = true;
      });
    }
  };

  const clearTextInputs = () => {
    setValue("rut_beneficiario", "");
    setValue("dp1", "");
    setValue("dp2", "");
    setValue("Armazon1", "");
    setValue("Armazon2", "");
    setValue("Armazon3", "");
    rutBeneficiarioSignal.value = "";
    codArmazon1.value = "";
    codArmazon2.value = "";
    codArmazon3.value = "";
    clearRutCliente.value = !clearRutCliente.value;
  };

  const handleFocus = (ref: any) => {
    // console.log(ref)
    setIsScanning(true);

    if (ref) {
      focusInput.value = ref;
    }
  };

  const handleChange = (e: any) => {
    console.log(e);

    const result = validateRut(e);

    console.log(result);

    if (!result && e?.trim() !== "") {
      setValue("rut_beneficiario", "");
      rutBeneficiarioSignal.value = "";
      clearRutCliente.value = !clearRutCliente.value;
      hiddenInputRef.current.focus();
      toast.error("Rut no Válido.");
    } else {
      rutBeneficiarioSignal.value = e;
      setValue("rut_beneficiario", e);
    }
  };

  const handleSaveChange = async (jsonData: any) => {
    let reservaJSON;
    if (isOnline.value === true) {
      //?SI EL TIPO DE RESERVA ES ONLINE:
      reservaJSON = [
        {
          rut: jsonData["rut_beneficiario"] || "",
          proyecto: jsonData["proyecto"] || codProyecto.value || "",
          punto_venta: `${codPuntoVenta.value}` || "",
          tipo_anteojo: jsonData["tipo_anteojo"] || "",
          dp1: jsonData["dp1"] || "",
          dp2:
            jsonData["tipo_de_anteojo"] === 3 ||
            jsonData["tipo_de_anteojo"] === 4 ||
            jsonData["tipo_de_anteojo"] === 5 ||
            jsonData["tipo_de_anteojo"] === 6
              ? jsonData["dp2"] || "0"
              : "0",
          armazon_1: codArmazon1.value || "",
          armazon_2: codArmazon2.value || "",
          armazon_3: codArmazon3.value || "",
          usuario: `${userID.id}` || "",
          diametro: `${jsonData["diametro"]}` || "",
        },
      ];

      try {
        const reservaResponse = await axios(
          `${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(
            JSON.stringify(reservaJSON)
          )}`
        );
        if (reservaResponse["data"].length < 1) {
          clearTextInputs();
          setIsScanning(false);
          setValue("rut_beneficiaro", "");
          clearRutCliente.value = !clearRutCliente.value;
          return toast.success("Armazones reservados correctamente");
        } else {
          hiddenInputRef.current.focus();
          return toast.error(reservaResponse["data"][0][1]);
        }
      } catch (error) {
        return error;
      }
    } else {
      //?SI EL TIPO DE RESERVA ES OFFLINE:

      await openDatabase()
        .then(async (db: IDBDatabase) => {
          try {
            const resultExistBeneficiario = await isExistBeneficiario(
              db,
              jsonData["rut_beneficiario"]
            );
            console.log(resultExistBeneficiario);

            if (resultExistBeneficiario) {
              hiddenInputRef.current.focus();
              toast.error("Ya existe un registro para este Beneficiario");
              return;
            }

            const resultExist = await isExistArmazon(db, [
              jsonData.Armazon1,
              jsonData.Armazon2,
              jsonData.Armazon3,
            ]);

            if (!resultExist.value) {
              console.log(resultExist);
              hiddenInputRef.current.focus();

              toast.error(
                `Armazon no pertenece al proyecto: ${resultExist.missingData}`
              );
              return;
            }

            if (resultExist.value) {
              if (jsonData.Armazon1 !== "") {
                await setArmazones(
                  db,
                  { codArmazon: jsonData.Armazon1 || "" },
                  1,
                  false,
                  "1",
                  jsonData["tipo_anteojo"]
                );
              }

              if (jsonData.Armazon2 !== "") {
                await setArmazones(
                  db,
                  { codArmazon: jsonData.Armazon2 || "" },
                  1,
                  false,
                  "2",
                  jsonData["tipo_anteojo"]
                );
              }

              if (jsonData.Armazon3 !== "") {
                await setArmazones(
                  db,
                  { codArmazon: jsonData.Armazon2 || "" },
                  1,
                  false,
                  "3",
                  jsonData["tipo_anteojo"]
                );
              }

              jsonData["proyecto"] = codProyecto.value;
              jsonData["punto_venta_id"] =
                codPuntoVenta.value === ""
                  ? punto_venta.value
                  : codPuntoVenta.value;
              await setReservaBeneficiario(db, jsonData, userID.id);
              await getArmazones(db);
              toast.success("Reserva guardada correctamente");
              clearTextInputs();
            } else {
              hiddenInputRef.current.focus();

              toast.error("No se encontro codigo de armazon");
              throw new Error();
            }
          } catch (error) {
            console.log(error);
            hiddenInputRef.current.focus();

            toast.error(error as string);
          } finally {
            db.close();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    if (punto_venta.value !== "" && codProyecto.value !== "") {
      fetchReservaArmazones(
        codPuntoVenta.value,
        codProyecto.value,
        userID.id,
        true
      );
    }
  }, [codProyecto.value, punto_venta.value]);

  React.useEffect(() => {
    if (codArmazon1.value !== "") {
      if (
        codArmazon2.value === codArmazon1.value ||
        codArmazon3.value === codArmazon1.value
      ) {
        hiddenInputRef.current.focus();
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Para un desplazamiento suave
        });
        toast.error("Códigos de Armazones no deben ser iguales");
        setValue("Armazon1", "");
        codArmazon1.value = "";
      } else {
        setValue("Armazon1", codArmazon1.value);
        fetchValidateArmazon("Armazon1", codArmazon1.value);
      }
    }
  }, [codArmazon1.value]);

  React.useEffect(() => {
    if (codArmazon2.value !== "") {
      if (
        codArmazon2.value === codArmazon1.value ||
        codArmazon3.value === codArmazon2.value
      ) {
        hiddenInputRef.current.focus();
        toast.error("Códigos de Armazones no deben ser iguales");
        setValue("Armazon2", "");
        codArmazon2.value = "";
        // // armazon2 = ''
        // setValue('Armazon2', armazon2)
      } else {
        setValue("Armazon2", codArmazon2.value);
        fetchValidateArmazon("Armazon2", codArmazon2.value);
      }
    }
  }, [codArmazon2.value]);

  React.useEffect(() => {
    if (codArmazon3.value !== "") {
      if (
        codArmazon3.value === codArmazon1.value ||
        codArmazon3.value === codArmazon2.value
      ) {
        hiddenInputRef.current.focus();
        toast.error("Códigos de Armazones no deben ser iguales");
        setValue("Armazon3", "");
        codArmazon3.value = "";
      } else {
        setValue("Armazon3", codArmazon3.value);
        fetchValidateArmazon("Armazon3", codArmazon3.value);
      }
    }
  }, [codArmazon3.value]);

  // console.log(armazon1)
  // console.log(armazon2)
  // console.log(armazon3)

  const handleUploadata = async () => {
    const resultConfirm = confirm("Desea continuar con la carga de datos?");

    if (!resultConfirm) {
      return;
    }

    await openDatabase().then(async (db: IDBDatabase) => {
      const armazonesData = await getArmazones(db);
      const beneficiarioData = await getBeneficiarios(db);
      let jsonData03 = {};
      let jsonData07 = {};

      if (beneficiarioData.length === 0) {
        return toast.error("No hay Reservas para Subir", {
          autoClose: 500,
        });
      }

      console.log("click");

      jsonData07 = armazonesData.map((reserva: any) => {
        return {
          punto_venta: reserva["punto_venta"],
          usuario: `${userID.id}`,
          armazon: reserva["cod_armazon"],
          reservado: reserva["stock_reservado"],
          disponible: reserva["stock_disponible"],
        };
      });

      try {
        if (beneficiarioData.length > 0) {
          jsonData03 = beneficiarioData.map((reserva: any) => {
            return {
              rut: reserva["rut_beneficiario"],
              proyecto: reserva["proyecto"],
              punto_venta: `${codPuntoVenta.value}`,
              tipo_anteojo: reserva["tipo_anteojo"],
              dp1: reserva["dp1"],
              dp2: reserva["dp2"],
              armazon_1: reserva["armazon_1"],
              armazon_2: reserva["armazon_2"],
              armazon_3: reserva["armazon_3"],
              usuario: `${userID}`,
              diametro: reserva["diametro"],
            };
          });
          const response03 = await axios(
            `${URLBackend}/api/otreservaarmazones/listado/?query=03&_pkToDelete=${encodeURIComponent(
              JSON.stringify(jsonData03)
            )}`
          );

          if (
            Array.isArray(response03["data"]) &&
            response03["data"].length > 0
          ) {
            if (response03["data"] && response03["data"][0].includes("ERROR")) {
              console.log(response03["data"][0][1]);
              hiddenInputRef.current.focus();
              toast.error(response03["data"][0][1]);
              return;
            }
          }
        }
        await axios(
          `${URLBackend}/api/otreservaarmazones/listado/?query=06&_pkToDelete=${encodeURIComponent(
            JSON.stringify(jsonData07)
          )}`
        );
        isDataLocal.value = false;
        responseArmazones.value = [];
        await clearBaseDatos(db);
        toast.success("Reserva Cargada Correctamente");
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const fetchProyectosUsuario = async () => {
      // https://gestiondev.mtoopticos.cl/api/proyectos/listado/?query=07&_p1=98
      try {
        const response = await axios(
          `${URLBackend}/api/proyectos/listado/?query=07&_p1=${userID.id}`
        );
        console.log(response);
        if (response.data[0][0]) {
          codProyecto.value = response.data[0][0];
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProyectosUsuario();

    openDatabase().then(async (db: IDBDatabase) => {
      const armazonesData = await getArmazones(db);
      const beneficiarioData = await getBeneficiarios(db);

      if (beneficiarioData.length === 0) {
        emptyBeneficiariosData.value = true;
      } else {
        emptyBeneficiariosData.value = false;
      }

      if (armazonesData.length === 0) {
        isDataLocal.value = false;
      } else {
        armazonesLocalData.value = armazonesData;
        isDataLocal.value = true;
      }
    });

    // diametro_cristal.value = localStorage.getItem('diametroCristal') ? JSON.parse(localStorage.getItem("diametroCristal") as string)[0][3] : 70;
  }, []);

  const reservaJSON = {
    proyecto: codProyecto.value,
    punto_venta: codPuntoVenta.value,
    usuario: userID.id,
  };

  React.useEffect(() => {
    clearTextInputs();
    setValue("rut_beneficiario", "");
  }, [clearRutCliente]);

  console.log(errors);
  return (
    <form
      className=" w-screen mx-auto px-6 !overflow-x-hidden !overflow-y-scroll form-container-reserva "
      onSubmit={handleSubmit((data) => handleSaveChange(data))}
    >
      <div className="translate-y-[30vw] h-screen !mx-auto ">
        {isOnline.value === false && isDataLocal.value === true && (
          <Button
            className="absolute -top-14 left-1 text-base z-30 "
            onClick={() => handleUploadata()}
          >
            Subir Reservas
          </Button>
        )}

        {isOnline.value === false && isDataLocal.value === true && (
          <Tooltip content="Borrar Reservas">
            <FontAwesomeIcon
              icon={faTrash}
              className=" absolute -top-14 right-4   w-12 h-12 text-base z-30 hover:!text-[#f8b179]"
              onClick={async () => {
                console.log("click");
                toast.loading("Borrando...");
                await openDatabase().then(async (db: IDBDatabase) => {
                  await clearBaseDatos(db).then(() => {
                    isOnline.value = false;
                    isDataLocal.value = false;
                    responseArmazones.value = [[], []];
                  });
                });
                toast.dismiss();
                // handleFocusReservaArmazones(name)
              }}
            />
            {/* <Button className='absolute -top-14 right-1 text-base z-30 ' onClick={()=>handleUploadata()}></Button> */}
          </Tooltip>
        )}

        {isOnline.value === false &&
          isDataLocal.value === false &&
          responseArmazones.value.length > 0 && (
            // <Button className='relative bottom-4 right-0 text-base' color='green' onClick={()=>fetchReservaArmazones(punto_venta.value, codProyecto.value,userID,false).then(isDataLocal.value = false as any)}>Descargar Muestrario</Button>
            <Button
              className="absolute -top-14 left-1 text-base z-30"
              color="green"
              onClick={() => getLocalArmazones(reservaJSON)}
            >
              Descargar Muestrario
            </Button>
          )}
        <div className="w-full h-[160vh] overflow-scroll">
          <input
            ref={hiddenInputRef}
            style={{ position: "absolute", left: -1000 }}
          />
          <div className="w-full !mb-5 rowForm ">
            <SelectInputComponent
              label="Proyecto"
              name="proyecto"
              showRefresh={true}
              data={codigoProyecto.value}
              // handleSelectChange={}
              // onlyFirstOption={true}
              handleSelectChange={(e: any) => {
                codProyecto.value = e.value;
              }}
              // readOnly={true}
              isOT={true}
              control={control}
              entidad={["/api/proyectos/", "07", userID.id]}
              customWidth={"w-[93vw]"}
              onlyFirstOption={true}
            />
          </div>
          <div className="w-full !mb-5 rowForm">
            <SelectInputComponent
              label="Operativo"
              name="punto_venta_id"
              showRefresh={true}
              onlyFirstOption={true}
              handleSelectChange={(e: any) => {
                punto_venta.value = e.value;
                codPuntoVenta.value = e.value;
              }}
              isOT={true}
              control={control}
              entidad={[
                "/api/puntosventa/",
                "06",
                codProyecto.value,
                `_p2=${userID.id}`,
              ]}
              customWidth={"w-[93vw]"}
            />
          </div>
          <div className="w-full flex !mb-5 rowForm">
            <div className=" w-[70%] !h-full rowForm">
              <SelectInputComponent
                label="Tipo"
                name="tipo_anteojo"
                showRefresh={true}
                data={1}
                handleSelectChange={(e: any) => {
                  tipo_de_anteojo.value = e.value;
                }}
                isOT={true}
                control={control}
                entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                customWidth={"labelInput inputStyles"}
                error={errors.tipo_anteojo}
              />
            </div>
            <div className="w-[30%] flex">
              {["+", "-"].map((option: any, index: any) => (
                <div
                  key={index}
                  className="w-full h-full translate-y-[-1.5vw]  items-center flex justify-between"
                >
                  <input
                    type="radio"
                    name="diametro"
                    id={`option-${index}`}
                    value={option}
                    className="w-[60%] h-[40%]"
                    checked={selectedOption === option}
                    onChange={() => handleRadioChange(option)}
                  />
                  <label
                    className="w-[70%] h-[40%] text-[2rem] translate-y-[-3vw] translate-x-[1vw] "
                    htmlFor={`option-${index}`}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[94vw]  !mt-5  flex rowForm">
            <div className="w-[55%]  text-xl !-ml-4">
              <TextInputComponent
                type="text"
                // isOT={false}
                label="RUT Beneficiario"
                name="rut_beneficiario"
                data={
                  rutBeneficiarioSignal.value ||
                  (formValues && formValues["rut_beneficiario"])
                }
                control={control}
                handleChange={handleChange}
                textAlign="text-right !text-[1.7rem] !h-[3.9rem]"
                customWidth={"!text-[1.5rem] w-[54vw]"}
                error={errors.rut_beneficiario}
              />
            </div>
            <div className="w-[20%]   ">
              <TextInputComponent
                type="number"
                label="DP"
                name="dp1"
                handleChange={(e: any) => {
                  codDP1.value = e.value;
                  setValue("Armazon1", "");
                  codArmazon1.value = "";
                  setValue("Armazon2", "");
                  codArmazon2.value = "";
                  codArmazon3.value = "";
                  setValue("Armazon3", "");
                }}
                data={formValues && formValues["dp1"]}
                isOT={true}
                control={control}
                customWidth={"w-[28vw]"}
                textAlign="text-right !text-[1.8rem]  !h-[3.9rem]"
                error={errors.dp1}
                // classNameError={"!right-0 !translate-x-[5vw]"}
              />
            </div>
            <div className="w-[20%] ">
              <TextInputComponent
                type="number"
                label="DP"
                name="dp2"
                handleChange={(e: any) => {
                  codDP2.value = e.value;
                  setValue("Armazon1", "");
                  codArmazon1.value = "";
                  setValue("Armazon2", "");
                  codArmazon2.value = "";
                  codArmazon3.value = "";
                  setValue("Armazon3", "");
                  setValue("dp2", e.value);
                }}
                data={formValues && formValues["dp2"]}
                isOT={true}
                control={control}
                customWidth={"w-[28vw]"}
                isOptional={true}
                // onlyRead={
                //   tipo_de_anteojo.value !== "3" &&
                //   tipo_de_anteojo.value !== "4" &&
                //   tipo_de_anteojo.value !== "5"
                // }
                textAlign="text-right !text-[1.8rem]  !h-[3.9rem]"
                error={errors.dp2}
              />
            </div>
          </div>
          <div className="!mt-10 flex flex-col justify-between  h-[15rem]">
            <div className="w-[22rem]   flex rowForm">
              <div className="w-[100%]  text-2xl !-ml-4">
                <TextInputInteractive
                  type="number"
                  inputRef={inputsRef.armazon_1}
                  label="Armazón 1"
                  name="Armazon1"
                  control={control}
                  data={codArmazon1.value}
                  textAlign="pr-[5rem] !text-[1.6rem] !h-[3.5rem] !custom-required"
                  customWidth={"!text-[2rem] w-[87.5vw] !custom-required"}
                  error={errors.Armazon1}
                  // handleFocus={()=>handleFocus('Armazon1')}
                  // onlyRead={true}
                  handleChange={(e) => {
                    codArmazon1.value = e;
                  }}
                  reservaArmazones={true}
                  handleFocusReservaArmazones={() => handleFocus("Armazon1")}
                />
              </div>
            </div>
            <div className="w-[22rem]  flex rowForm">
              <div className="w-[100%]  text-2xl !-ml-4">
                <TextInputInteractive
                  type="number"
                  inputRef={inputsRef.armazon_2}
                  label="Armazón 2"
                  name="Armazon2"
                  data={codArmazon2.value}
                  control={control}
                  textAlign=" pr-[5rem] !text-[1.6rem] !h-[3.5rem]"
                  customWidth={"!text-[2rem] w-[87.5vw]"}
                  error={errors.Armazon2}
                  isOptional={tipo_de_anteojo.value !== "3"}
                  // handleFocus={()=>handleFocus('Armazon2')}
                  // onlyRead={true}
                  handleChange={(e) => {
                    codArmazon2.value = e;
                  }}
                  reservaArmazones={true}
                  handleFocusReservaArmazones={() => handleFocus("Armazon2")}
                />
              </div>
            </div>
            <div className="w-[22rem]   flex rowForm">
              <div className="w-[100%]  text-2xl !-ml-4">
                <TextInputInteractive
                  type="number"
                  inputRef={inputsRef.armazon_3}
                  label="Armazón 3"
                  name="Armazon3"
                  data={codArmazon3.value}
                  control={control}
                  textAlign="pr-[4rem] !text-[1.6rem] !h-[3.5rem]"
                  customWidth={"!text-[2rem] w-[87.5vw]"}
                  error={errors.Armazon3}
                  handleChange={(e) => {
                    console.log(e);
                    codArmazon3.value = e;
                  }}
                  isOptional={true}
                  // handleFocus={()=>handleFocus('Armazon3')}
                  // onlyRead={true}
                  reservaArmazones={true}
                  handleFocusReservaArmazones={() => handleFocus("Armazon3")}
                />
              </div>
            </div>
            {/* {Object.keys(inputRefs).map((key:any, index) => (
                  <div className="mt-10 rowForm" key={index}>
                      <Input
                      {...register}
                        key={index}
                        label={key}
                        color='orange'
                        className="shadow appearance-none border bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline !w-[25rem]"
                        ref={inputRefs[key] }
                        value={Armazones[key]}
                        name={key}
                        onFocus={() => handleFocus(key)}
                        // error={errors[key]}
                        onChange={() => handleInputChange(inputRefs[key].current)}
                      />
                  </div>
                ))} */}
          </div>
          {/* {errors && <p>{errors}</p>} */}
          {isScanning && <Scanner setIsScanning={setIsScanning} />}
          {(tipo_de_anteojo.value === "3"
            ? codArmazon1.value !== "" && codArmazon2.value !== ""
            : codArmazon1.value !== "") &&
            isLoadingArmazon.value && (
              <div className="w-full !mt-10">
                <Button color="orange" type="submit">
                  Reservar
                </Button>
              </div>
            )}
        </div>
      </div>
    </form>
  );
};

export default FReservarArmazones;

{
  /* <div className="w-full h-full overflow-scroll">
          <div className="userFormBtnCloseContainer">
            <h1 className="userFormLabel mx-auto text-white decoration-inherit">
              Ingreso Reserva de Armazones
            </h1>
          </div>

          <Tabs>
            <TabList className="flex">
              <Tab className="custom-tab !w-1/2">Proyecto</Tab>
              <Tab className="custom-tab !w-1/2">Armazones</Tab>
            </TabList>
            <TabPanel>
              <div className="w-full !mb-5 rowForm ">
                <SelectInputComponent
                  label="Proyecto"
                  name="proyecto"
                  showRefresh={true}
                  data={codigoProyecto.value}
                  // handleSelectChange={}
                  // onlyFirstOption={true}
                  handleSelectChange={(e: any) => {
                    codProyecto.value = e.value;
                  }}
                  // readOnly={true}
                  isOT={true}
                  control={control}
                  entidad={["/api/proyectos/", "07", userID]}
                  customWidth={"w-[93vw]"}
                  onlyFirstOption={true}
                />
              </div>
              <div className="w-full !mb-5 rowForm">
                <SelectInputComponent
                  label="Operativo"
                  name="punto_venta_id"
                  showRefresh={true}
                  onlyFirstOption={true}
                  handleSelectChange={(e: any) => {
                    punto_venta.value = e.value;
                    codPuntoVenta.value = e.value;
                  }}
                  isOT={true}
                  control={control}
                  entidad={[
                    "/api/puntosventa/",
                    "06",
                    codProyecto.value,
                    `_p2=${userID}`,
                  ]}
                  customWidth={"w-[93vw]"}
                />
              </div>
              <div className="w-full !mb-7 rowForm">
                <SelectInputComponent
                  label="Tipo Anteojo"
                  name="tipo_anteojo"
                  showRefresh={true}
                  data={1}
                  handleSelectChange={(e: any) => {
                    tipo_de_anteojo.value = e.value;
                  }}
                  isOT={true}
                  control={control}
                  entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
                  customWidth={"w-[93vw] "}
                  error={errors.tipo_anteojo}
                />
              </div>

              <div className="w-[94vw]  translate-y-[-3vw] flex rowForm">
                <div className="w-[65%]  text-xl !-ml-4">
                  <TextInputComponent
                    type="text"
                    // isOT={false}
                    label="RUT Beneficiario"
                    name="rut_beneficiario"
                    data={
                      rutBeneficiarioSignal.value ||
                      (formValues && formValues["rut_beneficiario"])
                    }
                    control={control}
                    handleChange={handleChange}
                    textAlign="text-right !text-[1.7rem] !h-[3.9rem]"
                    customWidth={"!text-xl w-[54vw]"}
                    error={errors.rut_beneficiario}
                  />
                </div>
                <div className="w-[30%] !ml-8   ">
                  <TextInputComponent
                    type="number"
                    label="DP"
                    name="dp"
                    handleChange={(e: any) => {
                      codDP.value = e.value;
                    }}
                    data={formValues && formValues["dp"]}
                    isOT={true}
                    control={control}
                    customWidth={"w-[28vw]"}
                    textAlign="text-right !text-[2rem] -translate-x-6 !h-[3.9rem]"
                    error={errors.dp}
                  />
                </div>
              </div>

              <div className="w-[60%] !mb-7 rowForm translate-y-[8vw] ">
                <RadioButtonComponent
                  control={control}
                  label=""
                  name="param_cristales"
                  // data={data && data[EnumGrid.PARAM_CRISTALES]}
                  options={["+", "-"]}
                  error={errors.param_cristales}
                  horizontal={true}
                  labelProps={"frame2Options"}
                  customWidth={"labelInput inputStyles"}
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex flex-col  justify-between h-[15rem] ">
                <div className="w-[22rem]   flex rowForm">
                  <div className="w-[100%]  text-2xl !-ml-4">
                    <TextInputInteractive
                      type="number"
                      inputRef={inputsRef.armazon_1}
                      label="Armazón 1"
                      name="Armazon1"
                      control={control}
                      data={codArmazon1.value}
                      textAlign="pr-[5rem] !text-[1.6rem] !h-[3.5rem] !custom-required"
                      customWidth={"!text-3xl w-[87.5vw] !custom-required"}
                      error={errors.Armazon1}
                      // handleFocus={()=>handleFocus('Armazon1')}
                      // onlyRead={true}
                      handleChange={(e) => {
                        codArmazon1.value = e;
                      }}
                      reservaArmazones={true}
                      handleFocusReservaArmazones={() =>
                        handleFocus("Armazon1")
                      }
                    />
                  </div>
                </div>r
                <div className="w-[22rem]    flex rowForm">
                  <div className="w-[100%]  text-2xl !-ml-4">
                    <TextInputInteractive
                      type="number"
                      inputRef={inputsRef.armazon_2}
                      label="Armazón 2"
                      name="Armazon2"
                      data={codArmazon2.value}
                      control={control}
                      textAlign=" pr-[5rem] !text-[1.6rem] !h-[3.5rem]"
                      customWidth={"!text-3xl w-[87.5vw]"}
                      error={errors.Armazon2}
                      isOptional={tipo_de_anteojo.value !== "3"}
                      // handleFocus={()=>handleFocus('Armazon2')}
                      // onlyRead={true}
                      handleChange={(e) => {
                        codArmazon2.value = e;
                      }}
                      reservaArmazones={true}
                      handleFocusReservaArmazones={() =>
                        handleFocus("Armazon2")
                      }
                    />
                  </div>
                </div>
                <div className="w-[22rem]   flex rowForm">
                  <div className="w-[100%]  text-2xl !-ml-4">
                    <TextInputInteractive
                      type="number"
                      inputRef={inputsRef.armazon_3}
                      label="Armazón 3"
                      name="Armazon3"
                      data={codArmazon3.value}
                      control={control}
                      textAlign="pr-[4rem] !text-[1.6rem] !h-[3.5rem]"
                      customWidth={"!text-3xl w-[87.5vw]"}
                      error={errors.Armazon3}
                      handleChange={(e) => {
                        console.log(e);
                        codArmazon3.value = e;
                      }}
                      isOptional={true}
                      // handleFocus={()=>handleFocus('Armazon3')}
                      // onlyRead={true}
                      reservaArmazones={true}
                      handleFocusReservaArmazones={() =>
                        handleFocus("Armazon3")
                      }
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
          {isScanning && <Scanner setIsScanning={setIsScanning} />}
          {(tipo_de_anteojo.value === "3"
            ? codArmazon1.value !== "" && codArmazon2.value !== ""
            : codArmazon1.value !== "") &&
            isLoadingArmazon.value && (
              <div className="w-full mt-20">
                <Button color="orange" type="submit">
                  Reservar
                </Button>
              </div>
            )}
        </div> */
}

// return (
//   <form
//     className=" w-screen mx-auto px-6 !overflow-x-hidden form-container-reserva "
//     onSubmit={handleSubmit((data) => handleSaveChange(data))}
//   >
//     <div className="translate-y-[30vw] h-screen !mx-auto ">
//       {isOnline.value === false && isDataLocal.value === true && (
//         <Button
//           className="absolute -top-14 left-1 text-base z-30 "
//           onClick={() => handleUploadata()}
//         >
//           Subir Reservas
//         </Button>
//       )}

//       {isOnline.value === false && isDataLocal.value === true && (
//         <Tooltip content="Borrar Reservas">
//           <FontAwesomeIcon
//             icon={faTrash}
//             className=" absolute -top-14 right-4   w-12 h-12 text-base z-30 hover:!text-[#f8b179]"
//             onClick={async () => {
//               console.log("click");
//               toast.loading("Borrando...");
//               await openDatabase().then(async (db: IDBDatabase) => {
//                 await clearBaseDatos(db).then(() => {
//                   isOnline.value = false;
//                   isDataLocal.value = false;
//                   responseArmazones.value = [[], []];
//                 });
//               });
//               toast.dismiss();
//               // handleFocusReservaArmazones(name)
//             }}
//           />
//           {/* <Button className='absolute -top-14 right-1 text-base z-30 ' onClick={()=>handleUploadata()}></Button> */}
//         </Tooltip>
//       )}

//       {isOnline.value === false &&
//         isDataLocal.value === false &&
//         responseArmazones.value.length > 0 && (
//           // <Button className='relative bottom-4 right-0 text-base' color='green' onClick={()=>fetchReservaArmazones(punto_venta.value, codProyecto.value,userID,false).then(isDataLocal.value = false as any)}>Descargar Muestrario</Button>
//           <Button
//             className="absolute -top-14 left-1 text-base z-30"
//             color="green"
//             onClick={() => getLocalArmazones(reservaJSON)}
//           >
//             Descargar Muestrario
//           </Button>
//         )}
//       <div className="w-full h-[150vh] overflow-scroll">
//         <div className="w-full !mb-5 rowForm ">
//           <SelectInputComponent
//             label="Proyecto"
//             name="proyecto"
//             showRefresh={true}
//             data={codigoProyecto.value}
//             // handleSelectChange={}
//             // onlyFirstOption={true}
//             handleSelectChange={(e: any) => {
//               codProyecto.value = e.value;
//             }}
//             // readOnly={true}
//             isOT={true}
//             control={control}
//             entidad={["/api/proyectos/", "07", userID]}
//             customWidth={"w-[93vw]"}
//             onlyFirstOption={true}
//           />
//         </div>
//         <div className="w-full !mb-5 rowForm">
//           <SelectInputComponent
//             label="Operativo"
//             name="punto_venta_id"
//             showRefresh={true}
//             onlyFirstOption={true}
//             handleSelectChange={(e: any) => {
//               punto_venta.value = e.value;
//               codPuntoVenta.value = e.value;
//             }}
//             isOT={true}
//             control={control}
//             entidad={[
//               "/api/puntosventa/",
//               "06",
//               codProyecto.value,
//               `_p2=${userID}`,
//             ]}
//             customWidth={"w-[93vw]"}
//           />
//         </div>
//         <div className="w-full !mb-7 rowForm">
//           <SelectInputComponent
//             label="Tipo Anteojo"
//             name="tipo_anteojo"
//             showRefresh={true}
//             data={1}
//             handleSelectChange={(e: any) => {
//               tipo_de_anteojo.value = e.value;
//             }}
//             isOT={true}
//             control={control}
//             entidad={["/api/tipos/", "02", "OTTipoAnteojo"]}
//             customWidth={"w-[93vw] "}
//             error={errors.tipo_anteojo}
//           />
//         </div>
//         <div className="w-[88vw]  !mt-5  flex rowForm">
//           <div className="w-[65%]  text-xl !-ml-4">
//             <TextInputComponent
//               type="text"
//               // isOT={false}
//               label="RUT Beneficiario"
//               name="rut_beneficiario"
//               data={
//                 rutBeneficiarioSignal.value ||
//                 (formValues && formValues["rut_beneficiario"])
//               }
//               control={control}
//               handleChange={handleChange}
//               textAlign="text-right !text-[1.7rem] !h-[3.9rem]"
//               customWidth={"!text-xl w-[54vw]"}
//               error={errors.rut_beneficiario}
//             />
//           </div>
//           <div className="w-[30%] !ml-8   ">
//             <TextInputComponent
//               type="number"
//               label="DP"
//               name="dp"
//               handleChange={(e: any) => {
//                 codDP.value = e.value;
//               }}
//               data={formValues && formValues["dp"]}
//               isOT={true}
//               control={control}
//               customWidth={"w-[28vw]"}
//               textAlign="text-right !text-[2rem] -translate-x-6 !h-[3.9rem]"
//               error={errors.dp}
//             />
//           </div>
//         </div>

//         <div className="!mt-5 flex flex-col justify-evenly h-[15rem]">
//           <div className="w-[22rem]   flex rowForm">
//             <div className="w-[100%]  text-2xl !-ml-4">
//               <TextInputInteractive
//                 type="number"
//                 inputRef={inputsRef.armazon_1}
//                 label="Armazón 1"
//                 name="Armazon1"
//                 control={control}
//                 data={codArmazon1.value}
//                 textAlign="pr-[5rem] !text-[1.6rem] !h-[3.5rem] !custom-required"
//                 customWidth={"!text-3xl w-[87.5vw] !custom-required"}
//                 error={errors.Armazon1}
//                 // handleFocus={()=>handleFocus('Armazon1')}
//                 // onlyRead={true}
//                 handleChange={(e) => {
//                   codArmazon1.value = e;
//                 }}
//                 reservaArmazones={true}
//                 handleFocusReservaArmazones={() => handleFocus("Armazon1")}
//               />
//             </div>
//           </div>
//           <div className="w-[22rem] !mt-10   flex rowForm">
//             <div className="w-[100%]  text-2xl !-ml-4">
//               <TextInputInteractive
//                 type="number"
//                 inputRef={inputsRef.armazon_2}
//                 label="Armazón 2"
//                 name="Armazon2"
//                 data={codArmazon2.value}
//                 control={control}
//                 textAlign=" pr-[5rem] !text-[1.6rem] !h-[3.5rem]"
//                 customWidth={"!text-3xl w-[87.5vw]"}
//                 error={errors.Armazon2}
//                 isOptional={tipo_de_anteojo.value !== "3"}
//                 // handleFocus={()=>handleFocus('Armazon2')}
//                 // onlyRead={true}
//                 handleChange={(e) => {
//                   codArmazon2.value = e;
//                 }}
//                 reservaArmazones={true}
//                 handleFocusReservaArmazones={() => handleFocus("Armazon2")}
//               />
//             </div>
//           </div>
//           <div className="w-[22rem]   flex rowForm">
//             <div className="w-[100%]  text-2xl !-ml-4">
//               <TextInputInteractive
//                 type="number"
//                 inputRef={inputsRef.armazon_3}
//                 label="Armazón 3"
//                 name="Armazon3"
//                 data={codArmazon3.value}
//                 control={control}
//                 textAlign="pr-[4rem] !text-[1.6rem] !h-[3.5rem]"
//                 customWidth={"!text-3xl w-[87.5vw]"}
//                 error={errors.Armazon3}
//                 handleChange={(e) => {
//                   console.log(e);
//                   codArmazon3.value = e;
//                 }}
//                 isOptional={true}
//                 // handleFocus={()=>handleFocus('Armazon3')}
//                 // onlyRead={true}
//                 reservaArmazones={true}
//                 handleFocusReservaArmazones={() => handleFocus("Armazon3")}
//               />
//             </div>
//           </div>
//           {/* {Object.keys(inputRefs).map((key:any, index) => (
//                 <div className="mt-10 rowForm" key={index}>
//                     <Input
//                     {...register}
//                       key={index}
//                       label={key}
//                       color='orange'
//                       className="shadow appearance-none border bg-white rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline !w-[25rem]"
//                       ref={inputRefs[key] }
//                       value={Armazones[key]}
//                       name={key}
//                       onFocus={() => handleFocus(key)}
//                       // error={errors[key]}
//                       onChange={() => handleInputChange(inputRefs[key].current)}
//                     />
//                 </div>
//               ))} */}
//         </div>
//         {isScanning && <Scanner setIsScanning={setIsScanning} />}
//         {(tipo_de_anteojo.value === "3"
//           ? codArmazon1.value !== "" && codArmazon2.value !== ""
//           : codArmazon1.value !== "") &&
//           isLoadingArmazon.value && (
//             <div className="w-full">
//               <Button color="orange" type="submit">
//                 Reservar
//               </Button>
//             </div>
//           )}
//       </div>
//     </div>
//   </form>
// );
// };
