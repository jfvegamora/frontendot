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

    console.log(registro);
    if (!acc["Total Produccion"]) {
      acc["Total Produccion"] = {
        total: 0,
      };
    }

    acc["Total"] = (acc["Total"] ?? 0) + 1;
    const isFinished = estadoTerminado[estado];

    if (isFinished && origen !== destino) {
      acc["Total Produccion"].total += 1;
    } else if (
      origen === 60 &&
      estado !== 15 &&
      isFinished &&
      destino !== origen
    ) {
      acc["Total Produccion"].total += 1;
    } else if ((origen === 70 || origen === 75) && isFinished) {
      acc["Total Produccion"].total += 1;
    }

    // acc[registroArea] = (acc[registroArea] ?? 0) + 1;

    console.log(acc);

    return acc;
  }, {});
  const ObjectReduce = Object.entries(reduceEntities);

  console.log(ObjectReduce);
  const resultStateCountBar = ObjectReduce.map((registro: any) => {
    // let nombre = registro[0].slice(0, 3);
    console.log(registro[0]);
    console.log(registro[1]);

    let key = registro[0];
    let value = registro[1];

    const obj: any = {};

    if (!obj[key]) {
      obj[key] = value;
    } else {
      obj[key] += value;
    }

    return obj;
  });

  console.log(resultStateCountBar);

  return ObjectReduce;
};

export const renderBitacoraStateCountBar = (state: any) => {
  console.log(state);
  const render = state && Object.entries(state);
  console.log(render);

  // let registro_name = render[0][0];
  // let registro_count = render[0][1];
  // let registro_name_completo = render[1][1];

  return (
    <div>
      <Tooltip content={"2"}>
        <span>{"3"}: </span>
      </Tooltip>
      <span>{"2"}</span>
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
