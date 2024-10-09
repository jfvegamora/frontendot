import React from "react";
import TablePizarra from "../../components/TablePizarra";
import { PrimaryKeySearch } from "../../components";
import { useEntityUtils } from "../../hooks";

// const strEntidad = "Reporte de Atención";
// const strEntidadExcel = "Informe_ot_reporte_atencion";
const strBaseUrl = "/api/proyectopizarra/";
// const idMenu = 47;

export const enumReporteAtencionPizarra = {
  "Reporte Atencion": 0,
  "Total de Trabajos": 1,
  "Fecha de Entrega": 2,
  "Area ID": 3,
  Area: 4,
  "Estado ID": 5,
};

const MReporteAtencion: React.FC = () => {
  const [_params, setParams] = React.useState([]);

  const { setEntities, entities } = useEntityUtils(strBaseUrl, "01");

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  console.log(entities);
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width50">
        <div className="w-[100%] mantenedorHeadSub">
          <PrimaryKeySearch
            baseUrl={strBaseUrl}
            updateParams={updateParams}
            setEntities={setEntities}
            primaryKeyInputs={[
              {
                name: "_p2",
                label: "Proyecto",
                type: "select",
                selectUrl: "/api/proyectos/",
                styles: {
                  styles: "labelInput inputStyles w-[19vw]",
                  container: "!w-[19vw]  text-[1vw] ",
                  labelProps: "labelInput",
                },
              },
              {
                name: "_p1",
                label: "Reporte Atención",
                type: "text",
                styles: {
                  styles: "!w-[10vw] labelInput inputStyles ",
                  container: "!w-[10vw] translate-x-[-2.5vw] !ml-8  ",
                  labelProps: "labelInput",
                },
              },

            ]}
            classNameSearchButton=" mr-10"
            jsonSearch={false}
          />
        </div>
      </div>
      <div className="overflow-x-scroll h-[32vw]">
        <TablePizarra data={entities} />
      </div>
    </div>
  );
};

export default MReporteAtencion;
