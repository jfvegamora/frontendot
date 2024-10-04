import React, { useEffect } from "react";
import { valueSearchOT } from "./OTPrimaryButtons";
import {
  renderDataModalErrorOT,
  renderTitleOTErrorModal,
} from "../utils/errorOTModal_utils";

interface IDerivacion {
  data?: any;
  onClose?: any;
  formValues?: any;
  closeModal?: any;
  valueConfirmOT?: any;
  caseUso?: any;
}

const ErrorOTModal: React.FC<IDerivacion> = ({ data, onClose, caseUso }) => {
  const [backgroundColor, setBackgroundColor] = React.useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        valueSearchOT.value = "";
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  React.useEffect(() => {
    switch (caseUso) {
      case "Cristales":
        setBackgroundColor("!bg-yellow-600");
        break;
      case "SearchOT":
        setBackgroundColor("!bg-red-500");
        break;
      default:
        break;
    }
  }, []);

  if (backgroundColor === "") {
    return null;
  }

  return (
    <div
      className={`useFormContainer useFormDerivacion centered-div  use40rem z-30 ${backgroundColor}`}
    >
      <div className="userFormBtnCloseContainer flex ">
        <div className="w-[80%] mx-auto !text-center mt-2 ">
          <h1
            className={` mx-auto   w-full ml-4 !text-5xl ${
              caseUso === "Cristales" ? "!text-[#424769]" : "!text-white"
            }`}
          >
            ADVERTENCIA
          </h1>
          <h1
            className={` mx-auto   w-full ml-4 !text-3xl ${
              caseUso === "Cristales" ? "!text-[#424769]" : "!text-white"
            }`}
          >
            {renderTitleOTErrorModal(caseUso)}
          </h1>
        </div>

        <div className="mr-8">
          <button
            onClick={onClose}
            className={`userFormBtnClose translate-y-[-2rem] ${
              caseUso === "Cristales" ? "!text-[#424769]" : ""
            } `}
          >
            X
          </button>
        </div>
      </div>
      <div className="h-[20rem] text-center w-[100%] mx-auto text-3xl">
        {renderDataModalErrorOT(caseUso, data)}
      </div>
    </div>
  );
};

export default ErrorOTModal;
