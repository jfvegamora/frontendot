import React from "react";
import { useEntityUtils } from "../../hooks";

// const strEntidad = "Cargo ";
const strBaseUrl = "/api/cargos/";
const strQuery = "02";

const FuncionalidadesMantenedor: React.FC = () => {
  // const { createdEntity, editEntity } = useCrud(strBaseUrl);

  const {
    //Entities State
    entities,
  } = useEntityUtils(strBaseUrl, strQuery);

  console.log("entity:", entities);

  return <div>FuncionalidadesMantenedor</div>;
};

export default FuncionalidadesMantenedor;
