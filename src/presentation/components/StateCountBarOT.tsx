import React from "react";
import { AppStore, useAppSelector } from "../../redux/store";
import { OTGrillaEnum } from "../Enums";
import { totoalTrabajosSeleccionados } from "../views/mantenedores/MOT";
import { Tooltip } from "@material-tailwind/react";
import { LuBox } from "react-icons/lu";

export const estadoIDNombre: any = {
  10: "Ingresada",
  20: "En Proceso",
  30: "Pendiente",
  40: "Derivada",
  50: "Entregada",
  60: "Cerrada",
  70: "Facturada",
  80: "Anulada",
  99: "Por Vencer",
};

export interface IStateCountBar {
  checkCount?: any;
  isMotHistorica?: boolean;
}

let ot_atrasadas = "S";
let width = "w-[6vw]";

const StateCountBarOT: React.FC<IStateCountBar> = React.memo(
  ({ checkCount, isMotHistorica }) => {
    const OTs: any = useAppSelector((store: AppStore) => store.OTS);
    const [stateCheckCount, setStateCheckCount] = React.useState(
      checkCount.value
    );
    const [newCountAnteojos, setNewCountAnteojos] = React.useState(0);

    React.useEffect(() => {
      setStateCheckCount(checkCount);
    }, [checkCount]);

    React.useEffect(() => {
      const newCount = OTs.data.reduce((acc: any, ot: any) => {
        if (ot[OTGrillaEnum.tipo_anteojo_id] === 3) {
          acc = acc + 2;
        } else {
          acc = acc + 1;
        }
        return acc;
      }, 0);
      setNewCountAnteojos(newCount);
    }, [OTs.data]);

    return (
      <>
        <div
          className={`${
            isMotHistorica ? "w-[74%] left-[1vw]" : "w-[60%] left-[1vw]"
          } bg-white absolute bottom-[1%] h-[4.5vh]   rounded-full  flex text-[1.2vw]`}
        >
          <div className={` w-[8vw]  flex ml-4 mt-1`}>
            <p className=" text-center rounded-full mr-2">
              <LuBox className="primaryBtnIcon translate-y-[-0.35vw]" />,
            </p>
            <label className="text-center">
              <Tooltip content="OT Con Ubicacion">
                <span>
                  {OTs.data.length - (OTs.estadosOT["Sin Ubicacion"] ?? 0)} /{" "}
                </span>
              </Tooltip>
              <Tooltip content="OT Total">
                <span>{OTs.data.length}</span>
              </Tooltip>
            </label>
          </div>

          {Object.keys(OTs.estadosOT).map((estadoID, index) => {
            const derivacionColor = OTs.derivacionColores[estadoID];
            if (derivacionColor) {
              const backgroundColor = derivacionColor[1];
              const textColor = derivacionColor[0];
              const borderColor = derivacionColor[2];

              if (OTs.estadosOT[estadoID] === 0) {
                return;
              }

              return (
                <div className={`${width} h-[5vh] flex mr-4 `} key={index}>
                  <Tooltip content={estadoID}>
                    <p
                      style={{
                        backgroundColor,
                        color: textColor,
                        borderColor,
                        borderWidth: "2px",
                      }}
                      className="translate-y-[-0.2rem] mx-2 w-full text-center rounded-2xl"
                    >
                      {/* {estadoID}s: */}
                      <label className="text-center">
                        {OTs.estadosOT[estadoID]}
                      </label>
                    </p>
                  </Tooltip>
                </div>
              );
            }

            return null;
          })}

          {OTs.estadosOT[ot_atrasadas] > 0 && (
            <div className={`${width} h-[5vh] flex `}>
              <Tooltip content="Atrasadas">
                <p className="text-center w-full translate-y-[-0.2rem] rounded-2xl bg-black  mx-auto text-white">
                  <label className="text-center text-white">
                    {OTs.estadosOT[ot_atrasadas]}
                  </label>
                </p>
              </Tooltip>
            </div>
          )}

          {stateCheckCount >= 1 && (
            <div className="w-[8vw] flex mx-2 ">
              <p className="text-center">Checked: </p>{" "}
              <label className="text-center ">{stateCheckCount}</label>
            </div>
          )}
        </div>

        <div
          className={`${
            isMotHistorica ? "w-[20%] right-[1vw]" : "w-[30%] right-[1vw]"
          } bg-white absolute bottom-[1%] h-[4.5vh]  rounded-full  flex text-[1.2vw]`}
        >
          {newCountAnteojos > 0 && (
            <div className="w-[13vw] flex ml-4 ">
              <p>
                ANTEOJOS Total: <span>{newCountAnteojos}</span>
              </p>
            </div>
          )}

          {totoalTrabajosSeleccionados.value >= 1 && (
            <div className="w-[16vw] flex mx-">
              <p className="text-center">Checked: </p>{" "}
              <label className="text-center ">
                {totoalTrabajosSeleccionados.value}
              </label>
            </div>
          )}
        </div>
      </>
    );
  }
);

export default StateCountBarOT;
