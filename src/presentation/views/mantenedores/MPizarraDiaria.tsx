import React from "react";
import TablePizarra from "../../components/TablePizarra";
import { PrimaryKeySearch } from "../../components";
import { useEntityUtils } from "../../hooks";

// const strEntidad = "Reporte de Atención";
// const strEntidadExcel = "Informe_ot_reporte_atencion";
const strBaseUrl = "/api/proyectopizarra/";
// const idMenu = 47;

export const enumReporteAtencionPizarra: any = {
  "Reporte Atencion": 0,
  "Fecha Reporte": 1,
  "Fecha de Entrega": 2,
  "Dias Restantes": 3,
  "Total de Trabajos": 4,
  "Area ID": 5,
  Area: 6,
  "Estado ID": 7,
};

const MPizarraDiaria: React.FC = () => {
  const [_params, setParams] = React.useState([]);

  const { setEntities, entities } = useEntityUtils(strBaseUrl, "01");

  const updateParams = (newParams: Record<string, never>) => {
    setParams(Object.keys(newParams).map((key) => newParams[key]));
  };

  console.log(entities);
  return (
    <div className="mantenedorContainer">
      <div className="mantenedorHead width60">
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
                  styles: "labelInput inputStyles w-[25vw]",
                  container:
                    "!w-[30vw]  text-[1vw] translate-x-[0.5vw] translate-y-[0.5vw] ",
                  labelProps: "labelInput",
                },
              },

              {
                name: "_p1",
                label: "Reporte Atención",
                type: "text",
                styles: {
                  styles: "!w-[10vw] labelInput inputStyles ",
                  container: "!w-[10vw] translate-x-[2vw] !ml-8  ",
                  labelProps: "labelInput",
                },
              },
            ]}
            classNameSearchButton=" mr-10"
            jsonSearch={false}
          />
        </div>
      </div>
      <div className="overflow-x-scroll h-[77%]">
        <TablePizarra data={entities} />
      </div>
    </div>
  );
};

export default MPizarraDiaria;
