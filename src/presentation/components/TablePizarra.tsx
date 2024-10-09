import React from "react";
import { table_head_pizarra } from "../utils";
import { Text } from "@chakra-ui/react";
import { Tooltip } from "@material-tailwind/react";
import { signal } from "@preact/signals-react";
import ModalPizarra from "./ModalPizarra";
import { useAppDispatch } from "../../redux/store";
import { fetchOT } from "../../redux/slices/OTSlice";
import { toast } from "react-toastify";
import { enumReporteAtencionPizarra } from "../views/mantenedores/MPizarra";

const showModal = signal(false);
const startFetchOT = signal(false);
const dataOnClick = signal({
  reporteAtencion: "",
  estado: "",
  area: "",
  paramsOT: "",
});

export const reduceDataPizarra = (data: any) => {
  return data.reduce((acc: any, registro: any) => {
    let area = registro[enumReporteAtencionPizarra["Area"]];
    let estado = registro[enumReporteAtencionPizarra["Estado ID"]];
    let reporteAtencion =
      registro[enumReporteAtencionPizarra["Reporte Atencion"]];
    let conteoOT = registro[enumReporteAtencionPizarra["Total de Trabajos"]];
    let areaID = registro[enumReporteAtencionPizarra["Area ID"]];
    let fechaEntrega = registro[enumReporteAtencionPizarra["Fecha de Entrega"]];

    if (!acc[reporteAtencion]) {
      acc[reporteAtencion] = {
        totalOT: 0,
        reporteAtencion,
        fechaEntrega,
      };
    }

    if (!acc[reporteAtencion]) {
      acc[reporteAtencion] = {};
    }

    if (!acc[reporteAtencion][area]) {
      acc[reporteAtencion][area] = {
        total: 0,
        area: areaID,
      };
    }

    acc[reporteAtencion][area].total += conteoOT;

    acc[reporteAtencion][area][estado] = conteoOT;

    acc[reporteAtencion].totalOT += conteoOT;
    return acc;
  }, {});
};

export const renderTextCell = (
  text: string,
  type?: number,
  color2?: boolean,
  backgroundAtrasadas?: boolean,
  color?: any,
  lowArmazonesStock?: any
) => {
  return (
    <Text // Combina estilos inline y de objeto
      variant="small"
      color="blue-gray"
      //   style={{ ...cellStyle }}
      className={` gridText h-[2.7rem]  py-2  ${
        (backgroundAtrasadas && color) || (lowArmazonesStock && color2)
          ? "!text-white "
          : "text-black"
      } ${
        type === 1 && color2 ? "" : type === 1 ? "!text-black" : "text-black"
      } `}
    >
      {text !== null && text !== undefined ? text.toString() : ""}
    </Text>
  );
};

export const switchDataPizarra = (
  _area: string,
  data: any,
  reporteAtencion: string
) => {
  const { total, area, ...newObj } = data;
  return (
    data &&
    Object.entries(newObj).map(([key, value], index) => {
      return (
        <div
          key={index}
          className="items-center w-[40%]  !mx-auto !flex !justify-around"
        >
          {key === "fechaEntrega" ? (
            <Tooltip content="fechaEntrega">
              <div className="rounded-full border border-black w-[70%]">{`${value}`}</div>
            </Tooltip>
          ) : key === "10" ? (
            <Tooltip content="Ingreso">
              <Text
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "10";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className=" rounded-full cursor-pointer bg-blue-300 w-full text-white !mx-auto"
              >
                {value as any}
              </Text>
            </Tooltip>
          ) : key === "15" ? (
            <Tooltip content="Standby">
              <Text
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "15";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-blue-600 w-full text-white"
              >
                {value as any}
              </Text>
            </Tooltip>
          ) : key === "40" ? (
            <Tooltip content="Derivada">
              <div
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "40";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-red-400 w-full text-white"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : key === "20" ? (
            <Tooltip content="En proceso">
              <div
                onClick={() => {
                  // reporteAtencionSignal.value = reporteAtencion;
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "20";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-green-400 w-full text-white"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : key === "30" ? (
            <Tooltip content="Pendiente">
              <div
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "30";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-yellow-400 w-full text-black"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : key === "82" ? (
            <Tooltip content="En marcado">
              <div
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "82";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-orange-500 w-full text-white"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : key === "84" ? (
            <Tooltip content="En bloqueo">
              <div
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "84";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-brown-400 w-full text-white"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : key === "86" ? (
            <Tooltip content="En biselado">
              <div
                onClick={() => {
                  dataOnClick.value["reporteAtencion"] = reporteAtencion;
                  dataOnClick.value["estado"] = "86";
                  dataOnClick.value["area"] = data["area"];
                  dataOnClick.value[
                    "paramsOT"
                  ] = `_estado=${key}&_p2=1&_p3=${reporteAtencion}`;
                  startFetchOT.value = true;
                }}
                className="rounded-full cursor-pointer bg-teal-700 w-full text-white"
              >
                {value as any}
              </div>
            </Tooltip>
          ) : null}{" "}
        </div>
      );
    })
  );
};

export const renderAreaReduce = (area: string, data: any) => {
  return (
    <>
      <td className="text-black">
        <div className="flex">
          {area === "totalOT" ? (
            <Text className="text-black !text-center w-full">
              {data && data["totalOT"]}
            </Text>
          ) : data && data[area] ? (
            switchDataPizarra(area, data[area], data["reporteAtencion"])
          ) : (
            ""
          )}
        </div>
      </td>
    </>
  );
};

export const renderTbodyPizarraData = (data: any) => {
  const ordersArray = Object.entries(data).map(([key, value]: any) => ({
    key,
    ...value,
  }));

  const ObjectEntries = ordersArray.sort(
    (a: any, b: any) =>
      (new Date(a.fechaEntrega) as any) - (new Date(b.fechaEntrega) as any)
  );
  const finalArray = ObjectEntries.map(({ key, ...rest }) => [key, rest]);

  return (
    data &&
    finalArray.map((registro: any) => {
      return (
        <tr className="!text-black" key={registro[0]}>
          <td className="text-black">{registro[0]}</td>

          {renderAreaReduce("totalOT", registro[1])}

          <td className="text-black">{registro[1]["fechaEntrega"]}</td>
          {renderAreaReduce("Ingreso", registro[1])}
          {renderAreaReduce("Control Prod.", registro[1])}
          {renderAreaReduce("Bodega Insumos", registro[1])}
          {renderAreaReduce("Taller Biselado 1", registro[1])}
          {renderAreaReduce("Taller Biselado 2", registro[1])}
          {renderAreaReduce("Taller Montaje", registro[1])}
          {renderAreaReduce("Control Calidad", registro[1])}
          {renderAreaReduce("Bod. Prod. Terminados", registro[1])}
          {renderAreaReduce("Empaque", registro[1])}
          {renderAreaReduce("Resolución", registro[1])}
          {renderAreaReduce("Compras", registro[1])}
          {renderAreaReduce("Cálculo", registro[1])}
          {renderAreaReduce("Lab.", registro[1])}
        </tr>
      );
    })
  );
};

interface ITablePizzara {
  data?: any;
}

const TablePizarra: React.FC<ITablePizzara> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [dataTable, setDataTable] = React.useState({});

  React.useEffect(() => {
    if (data) {
      const reduceData = reduceDataPizarra(data);
      setDataTable(reduceData);
    }
  }, [data]);

  React.useEffect(() => {
    if (!showModal) {
      dataOnClick.value["reporteAtencion"] = "";
    }
    if (dataOnClick.value["reporteAtencion"] !== "") {
      const toastLoading = toast.loading("Cargando....");
      dispatch(
        fetchOT({
          OTAreas: dataOnClick.value["area"],
          searchParams: dataOnClick.value["paramsOT"],
        })
      ).then(() => {
        showModal.value = true;
        toast.dismiss(toastLoading);
      });
    }
  }, [startFetchOT.value, dataOnClick.value["reporteAtencion"]]);
  return (
    <div className="">
      <table className="gridContainer !h-1/2 st">
        <thead className="gridTop">
          {table_head_pizarra &&
            table_head_pizarra.map((column: any, index: any) => {
              const isVisible = column.visible;
              return (
                isVisible && (
                  <th
                    key={index}
                    className={`gridHead   ${column.width || "w-auto"}`}
                  >
                    {renderTextCell(column.cell as string)}
                  </th>
                )
              );
            })}
        </thead>
        <tbody className="gridData ">
          {dataTable && renderTbodyPizarraData(dataTable)}
        </tbody>
      </table>

      {showModal.value && (
        <ModalPizarra
          onClose={() => (
            (dataOnClick.value["reporteAtencion"] = ""),
            (showModal.value = false),
            (startFetchOT.value = false)
          )}
          data={dataOnClick.value}
        />
      )}
    </div>
  );
};

export default TablePizarra;
