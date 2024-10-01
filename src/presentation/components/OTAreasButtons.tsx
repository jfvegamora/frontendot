import React, { useMemo, useRef, useState, useCallback } from "react";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { Button } from "@material-tailwind/react";
import {
  updateActualArea,
  updateNextArea,
} from "../../redux/slices/OTAreasSlice";
import {
  clearData,
  fetchOT,
  filterOtAtrasadas,
} from "../../redux/slices/OTSlice";
import { signal } from "@preact/signals-react";
import { switchAtrasadas } from "./FilterButton";

interface IOTAreaButtons {
  setSelectedRows: any;
  params: any;
}

export const areaActualOT = signal<any>(0);

const OTAreasButtons: React.FC<IOTAreaButtons> = React.memo(
  ({ setSelectedRows, params }) => {
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
    const dispatch = useAppDispatch();
    const [_areaActual, setAreaActual] = useState();
    const areaActualRef = useRef<string | null>(null);

    const [botonPresionado, setBotonPresionado] = useState<string | null>(null);

    const handleEstado = useCallback(
      (area: any) => {
        dispatch(clearData());
        setAreaActual(area[1]);
        dispatch(updateActualArea(area[1]));
        areaActualOT.value = area[1];
        dispatch(updateNextArea(area[4]));
        setBotonPresionado(area[1]);
        // setSelectedRows([]);
        areaActualRef.current = area[1];

        if (params) {
          dispatch(fetchOT({ OTAreas: area[1], searchParams: params })).then(
            () => {
              if (switchAtrasadas.value) {
                dispatch(filterOtAtrasadas());
              }
            }
          );
        } else {
          dispatch(fetchOT({ OTAreas: area[1] })).then(() => {
            if (switchAtrasadas.value) {
              dispatch(filterOtAtrasadas());
            }
          });
        }
      },
      [dispatch, params, setSelectedRows]
    );

    const renderButtons = useMemo(() => {
      return (
        OTAreas &&
        OTAreas.areas &&
        OTAreas.areas
          .filter((area: any) => area[1] !== 110)
          .map((area: any, index: number) => (
            <div className="w-auto h-[9vh] items-center !mt-8" key={index}>
              <div className="!h-[10vh] items-center">
                <Button
                  className={` w-full h-[9vh] text-center text-[0.9vw] btnAreas ${
                    botonPresionado === area[1]
                      ? "bg-tuColorPresionado btnPresionado"
                      : "bg-tuColorNormal"
                  }`}
                  onClick={() => handleEstado(area)}
                  key={area[1]}
                >
                  {area[2]}
                </Button>
              </div>
            </div>
          ))
      );
    }, [OTAreas, handleEstado, botonPresionado]);

    return <div className="w-full flex items-center">{renderButtons}</div>;
  }
);

export default OTAreasButtons;
