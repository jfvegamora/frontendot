import { Tooltip } from "@material-tailwind/react";

export const hanldeBitacoraStateCountBar = (entities: any) => {
  const reduceEntities = entities.reduce((acc: any, _registro: any) => {
    // let registsroArea = registro[4];

    acc["Total"] = (acc["Total"] ?? 0) + 1;
    // acc[registroArea] = (acc[registroArea] ?? 0) + 1;

    return acc;
  }, {});

  const ObjectReduce = Object.entries(reduceEntities);

  const resultStateCountBar = ObjectReduce.map((registro: any) => {
    let nombre = registro[0].slice(0, 3);

    return {
      [nombre]: registro[1],
      ["Nombre"]: registro[0],
    };
  });

  return resultStateCountBar;
};

export const renderBitacoraStateCountBar = (state: any) => {
  const render = state && Object.entries(state);

  // let registro_name = render[0][0];
  let registro_count = render[0][1];
  let registro_name_completo = render[1][1];

  return (
    <div>
      <Tooltip content={registro_name_completo}>
        <span>{registro_name_completo}: </span>
      </Tooltip>
      <span>{registro_count}</span>
    </div>
  );
};

export const handleStateCountBar = (entities: any) => {
  console.log(entities);
};
