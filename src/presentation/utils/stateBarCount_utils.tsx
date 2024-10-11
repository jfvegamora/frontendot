import { Tooltip } from "@material-tailwind/react";

const estadoTerminado: any = {
  10: true,
  15: true,
  20: true,
  50: true,
  84: true,
  86: true,
};

export const hanldeBitacoraStateCountBar = (entities: any) => {
  const reduceEntities = entities.reduce((acc: any, registro: any) => {
    // let registsroArea = registro[4];
    // let origen = registro[4];
    // let destino = registro[6];
    let estado = registro[9];
    let situacion = registro[11];
    // let folio = registro[8];

    if (!acc["Total Producción"]) {
      acc["Total Producción"] = {
        totalProd: 0,
        totalOT: 0,
        totolPord2: 0,
        totalDerivados: 0,
      };
    }

    const isFinished = estadoTerminado[estado];

    // if (estado === 40) {
    //   acc["Total Producción"].totalDerivados += 1;
    // } else {
    //   if (isFinished && origen !== destino) {
    //     acc["Total Producción"].totolPord2 += 1;
    //   } else if (origen === 60 && estado !== 15 && destino !== origen) {
    //     acc["Total Producción"].totolPord2 += 1;
    //     // } else if (origen === 70 || (origen === 75 && isFinished)) {
    //   } else if (
    //     origen === 60 &&
    //     estado !== 15 &&
    //     destino === origen &&
    //     situacion === "Armazón"
    //   ) {
    //     acc["Total Producción"].totolPord2 += 1;
    //   } else if (origen === 70 && destino === origen && isFinished) {
    //     acc["Total Producción"].totolPord2 += 1;
    //   }
    // }

    // acc["Total"] = (acc["Total"] ?? 0) + 1;

    acc["Total Producción"].totalOT += 1; // Incrementa totalOT en cada iteración
    if (estado === 40) {
      acc["Total Producción"].totalDerivados += 1;
    } else {
      // if (isFinished && origen !== destino) {
      //   acc["Total Producción"].totalProd += 1;
      // } else if (origen === 60 && estado !== 15 && destino !== origen) {
      //   acc["Total Producción"].totalProd += 1;
      //   // } else if (origen === 70 || (origen === 75 && isFinished)) {
      // } else if (
      //   origen === 60 &&
      //   estado !== 15 &&
      //   destino === origen &&
      //   situacion === "Armazón"
      // ) {
      //   acc["Total Producción"].totalProd += 1;
      // } else if (origen === 70 && destino === origen && isFinished) {
      //   acc["Total Producción"].totalProd += 1;
      // }

      if (isFinished) {
        if (situacion !== "Cristal") {
          acc["Total Producción"].totalProd += 1;
        }
      }
    }

    console.log(acc);
    // acc[registroA  rea] = (acc[registroArea] ?? 0) + 1;

    return acc;
  }, {});
  const ObjectReduce = Object.entries(reduceEntities);

  return ObjectReduce;
};

export const renderBitacoraStateCountBar = (state: any) => {
  const render = state && Object.entries(state);
  return (
    <div className="flex  w-[90%] ">
      <div className=" w-[100%]">
        Total:
        <span>{"  "}</span>
        <span>{render[1][1]["totalOT"]}</span>
      </div>

      <div className=" w-[100%] rounded-full mb-[0.6rem]">
        Total Producción:
        <span>{"  "}</span>
        <span>{render[1][1]["totalProd"]}</span>
      </div>
      {render[1][1]["totalDerivados"] !== 0 && (
        <div className="bg-red-500 w-[65%] rounded-full mb-[0.6rem] text-white px-4">
          Total Derivadas
          <span>{"  "}</span>
          <span>{render[1][1]["totalDerivados"]}</span>
        </div>
      )}
    </div>
  );
};

export const renderStateCountBar = (state: any) => {
  const render = state && Object.entries(state);
  let registro_count = render && render[0];
  return (
    <div>
      <Tooltip content="Total">
        <span>Total: </span>
      </Tooltip>
      <span>{registro_count && registro_count[1]}</span>
    </div>
  );
};

export const handleStateCountBar = (entities: any) => {
  const reduceEntities = entities.reduce((acc: any, _registro: any) => {
    acc["Total"] = (acc["Total"] ?? 0) + 1;
    return acc;
  }, {});

  return [reduceEntities];
};

export const isTrabajoDerivado = (rowData: any) => {
  if (!rowData) {
    return false;
  }
  let estado = rowData[9];

  if (estado === 40) {
    return true;
  }

  return false;
};
