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
    let origen = registro[4];
    let destino = registro[6];
    let estado = registro[9];
    // let folio = registro[8];

    if (!acc["Total Producción"]) {
      acc["Total Producción"] = {
        totalProd: 0,
        totalOT: 0,
      };
    }

    const isFinished = estadoTerminado[estado];

    // if(origen ==)

    // acc["Total"] = (acc["Total"] ?? 0) + 1;

    acc["Total Producción"].totalOT += 1; // Incrementa totalOT en cada iteración

    if (isFinished && origen !== destino) {
      acc["Total Producción"].totalProd += 1;
    } else if (origen === 60 && estado !== 15 && destino !== origen) {
      acc["Total Producción"].totalProd += 1;
      // } else if (origen === 70 || (origen === 75 && isFinished)) {
    } else if (origen === 70 && destino === origen && isFinished) {
      acc["Total Producción"].totalProd += 1;
    }

    // acc[registroArea] = (acc[registroArea] ?? 0) + 1;

    return acc;
  }, {});
  const ObjectReduce = Object.entries(reduceEntities);

  return ObjectReduce;
};

export const renderBitacoraStateCountBar = (state: any) => {
  const render = state && Object.entries(state);
  return (
    <div className="flex mx-2 px-2  w-[50%] ">
      <div className=" w-[100%]">
        Total OT:
        <span>{"  "}</span>
        <span>{render[1][1]["totalOT"]}</span>
      </div>

      <div className="bg-green-500 w-[100%] rounded-full mb-[0.6rem] text-white px-4">
        Total Produccion
        <span>{"  "}</span>
        <span>{render[1][1]["totalProd"]}</span>
      </div>
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

export const isTrabajoTerminado = (rowData: any) => {
  if (!rowData) {
    return false;
  }
  console.log(rowData);
  let origen = rowData[4];
  let estado = rowData[9];
  let destino = rowData[6];

  const isFinished = estadoTerminado[estado];

  if (isFinished && origen !== destino) {
    return true;
  } else if (origen === 60 && estado !== 15 && destino !== origen) {
    return true;
  } else if (origen === 70 && destino === origen && isFinished) {
    return true;
  }

  return false;
};
