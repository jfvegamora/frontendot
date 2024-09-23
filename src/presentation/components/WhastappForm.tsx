import React from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@material-tailwind/react";
import { yupResolver } from "@hookform/resolvers/yup";
// import { TextInputComponent } from './forms';
// import { FaWhatsapp } from "react-icons/fa";
import { validationWhastApp } from "../utils";
import { signal } from "@preact/signals-react";
import { toast } from "react-toastify";
import { IoSend } from "react-icons/io5";
import { dataWsp, foliosSinTelefono } from "./OTPrimaryButtons";

interface IDerivacion {
  data?: any;
  onClose?: any;
  formValues?: any;
  closeModal?: any;
}

// interface FormData {
//   descripcion: string;
// }

// let linkStatus = "https://nodeexpress3.onrender.com/status";
// let linkisWhastappConnected = "https://nodeexpress3.onrender.com/conection";
// let linkSendMessage = "https://nodeexpress3.onrender.com/enviar-mensaje";

let isWhastAppConnected = signal(true);
let isLoadingWhastAppConnection = signal(false);
let isLoadingStatus = signal(false);

const WhastappForm: React.FC<IDerivacion> = ({
  // data,
  onClose,
  // formValues,
  // closeModal,
  // formValues
}) => {
  const [linkNumber, setLinkNumber] = React.useState(
    dataWsp.value[0]?.telefono || ""
  );
  const schema = validationWhastApp();
  const {
    register,
    handleSubmit,
    // formState: { errors },
    // setValue,
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  // const onSubmit: SubmitHandler<FormData> = async (jsonData) => {
  //   console.log(jsonData);
  //   console.log(data);
  //   const body = {
  //     numero: ["56949018251"],
  //     mensaje: jsonData?.descripcion,
  //   };

  //   // if (!isWhastAppConnected.value) {
  //   //   fetchStatus();
  //   // }

  //   try {
  //     const { data } = await axios.post(linkSendMessage, body);
  //     console.log(data);
  //     toast.success("Mensaje enviado correctamente.");
  //     setValue("descripcion", "");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error as string);
  //   }
  // };

  const redirectToWhastappWeb = async () => {
    try {
      let url = "";
      console.log(dataWsp.value);
      console.log(linkNumber);
      await dataWsp.value.map((registro: any) => {
        if (registro.telefono === linkNumber) {
          url = `https://web.whatsapp.com/send?phone=${linkNumber}&text=${registro.mensaje}`;
          return window.open(url, "_blank", "noopener,noreferrer");
        } else {
          setLinkNumber(registro.telefono);
          url = `https://web.whatsapp.com/send?phone=${linkNumber}&text=${registro.mensaje}`;
          return window.open(url, "_blank", "noopener,noreferrer");
        }
      });

      dataWsp.value.find(
        (registro: any) => registro.telefono === linkNumber
      ).mensajeEnviado = true;

      return toast.success("Mensaje enviado correctamente", {
        autoClose: 500,
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //?Result link status =  { isWhatsAppConnection: true }
  //?Result whasapconec =

  //   const fetchStatus = async () => {
  //     try {
  //       const { data } = await axios(linkStatus);
  //       if (data?.isWhatsAppConnection) {
  //         isLoadingStatus.value = false;
  //         isWhastAppConnected.value = true;
  //       } else {
  //         isLoadingWhastAppConnection.value = true;
  //         isWhastAppConnected.value = false;
  //         const { data } = await axios(linkisWhastappConnected);
  //         console.log(data);
  //         if (data?.isWhatsAppConnection) {
  //           isWhastAppConnected.value = true;
  //           isLoadingStatus.value = false;
  //           isLoadingWhastAppConnection.value = false;
  //         }
  //       }
  //       console.log(data);
  //       console.log(isWhastAppConnected.value);
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   };

  //   React.useLayoutEffect(() => {
  //     isLoadingStatus.value = true;
  //     fetchStatus();
  //   }, []);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      isWhastAppConnected.value = false;
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="useFormContainer useFormDerivacion centered-div w-[90vw] sm:w-[30vw] sm:h-[50vh] !h-[25vw] z-30 !translate-y-[-14vw] !translate-x-[-14vw]">
      <div className="userFormBtnCloseContainer flex ">
        <div className="w-full mx-auto !text-center  ">
          <h1 className="userFormLabel mx-auto  w-full translate-x-[0.3rem] ">
            Enviar WhatsApp
          </h1>
        </div>
        <div className="mr-4">
          <button onClick={onClose} className="userFormBtnClose">
            X
          </button>
        </div>
      </div>

      <form
        className=" w-full translate-y-4 h-[10vh]"
        onSubmit={handleSubmit(redirectToWhastappWeb)}
      >
        <div className=" w-full flex items-center  rowForm">
          {isLoadingWhastAppConnection.value || isLoadingStatus.value ? (
            <div className="w-full items-center !h-[8rem] mt-8 translate-y-[0.5rem] rowForm bg-white rounded-xl"></div>
          ) : (
            <div className="w-[86%]">
              <div className="w-full ml-8 !-mt-3 !mb-4 bg-white ">
                {foliosSinTelefono.value.length > 0 && (
                  <h1 className="bg-[#4dc659] text-xl pl-32">
                    Folios Sin Numero
                  </h1>
                )}
                {foliosSinTelefono.value.map((sinNumero: any) => (
                  <div key={sinNumero.folio} className="flex flex-col scroll">
                    <p className="text-2xl">
                      Folio:{" "}
                      <span className="font-bold">{sinNumero.folio}</span> Sin
                      Numero Asignado
                    </p>{" "}
                    {/* <span>Sin Numero Asignado</span> */}
                  </div>
                ))}
                <h1 className="bg-[#4dc659] text-xl pl-32">
                  Folios Con Numero
                </h1>
                {dataWsp.value?.map((conNumero: any) => (
                  <div
                    key={conNumero.telefono}
                    className="flex flex-col scroll"
                  >
                    <p className="text-2xl">
                      Folio:{" "}
                      <span className="font-bold">{conNumero.folio}</span>
                      <input
                        className="mx-4"
                        type="checkbox"
                        checked={conNumero.mensajeEnviado}
                      />
                      {conNumero.mensajeEnviado
                        ? "Mensaje enviado"
                        : "Esperando Envio"}
                    </p>{" "}
                    {/* <span>Sin Numero Asignado</span> */}
                  </div>
                ))}
              </div>
              <div className="w-full ml-8">
                <Textarea
                  {...register("descripcion")}
                  name="descripcion"
                  value={
                    dataWsp.value[0]?.mensaje ||
                    "Sin numero asignado para enviar mensaje "
                  }
                  disabled={dataWsp.value.length === 0}
                  // type='text'
                  className="rounded w-full  !h-[8vw] bg-white border-none text-xl"
                />
              </div>
              <div className="flex justify-center  !rounded-full h-1/2 w-[40%] absolute translate-x-[52vw] sm:translate-x-[20.5vw] translate-y-7">
                {/* <FaWhatsapp /> */}
                <button
                  type="submit"
                  disabled={dataWsp.value.length === 0}
                  className="bg-[#4dc659] translate-y-[-5.5rem] mr-6 rounded-full w-10 h-10"
                  onClick={() => redirectToWhastappWeb()}
                >
                  <IoSend className="text-white mx-auto" />
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default WhastappForm;
