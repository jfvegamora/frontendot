import { valueConfirmOT } from "../components/OTPrimaryButtons";
import { EnumGrid } from "../views/mantenedores/MOTHistorica";

export const renderDataModalErrorOT = (caseUso: any, data: any) => {
  switch (caseUso) {
    case "SearchOT":
      return renderSearchOTErrorModal(data);
    case "Cristales":
      return renderCristalesErrorModal(data);
    default:
      break;
  }
};

const renderSearchOTErrorModal = (data: any) => {
  return (
    <div>
      {data && data.length > 0 ? (
        <div>
          <h1>AREA ACTUAL : {data && data[0][EnumGrid.area]}</h1>
          <h1>FOLIO : {data && data[0][EnumGrid.folio]}</h1>
          <h1>ESTADO : {data && data[0][EnumGrid.estado]}</h1>
        </div>
      ) : (
        <div>
          <h1>OT NO EXISTE </h1>
          <h1>FOLIO : {valueConfirmOT || ""}</h1>
        </div>
      )}
    </div>
  );
};

const renderCristalesErrorModal = (data: any) => {
  return (
    <div className="flex flex-col justify-around h-[90%] w-[90%] mx-auto !text-[#424769]">
      {data && data["STOCK_OD"] < 1 && (
        <h2>
          CRISTAL OD: <span>{data && data["CR_OD"]}</span>
        </h2>
      )}
      {data && data["STOCK_OI"] < 1 && (
        <h2>
          CRISTAL OI: <span>{data && data["CR_OI"]}</span>
        </h2>
      )}
    </div>
  );
};

export const renderTitleOTErrorModal = (caseUso: string) => {
  switch (caseUso) {
    case "Cristales":
      return "CRISTAL SIN STOCK";
      break;
    case "SearchOT":
      return "OT NO ENCONTRADA";
    default:
      break;
  }
};
