import React from "react";
import {
  handleStateCountBar,
  hanldeBitacoraStateCountBar,
  renderBitacoraStateCountBar,
} from "../utils/stateBarCount_utils";

export interface IStateCountBar {
  entities?: any;
  entidad?: string;
}

const StateCountBar: React.FC<IStateCountBar> = React.memo(
  ({ entities, entidad }) => {
    const [totalCountBar, setTotalCountBar] = React.useState([]);

    React.useEffect(() => {
      let result: any = [];
      switch (entidad) {
        case "Bitácora de OT ":
          result = hanldeBitacoraStateCountBar(entities);
          setTotalCountBar(result);
          break;
        default:
          result = handleStateCountBar(entities);
          setTotalCountBar(result);
          break;
      }
    }, [entities]);

    return (
      <>
        <div
          className={`w-[60%] left-[1vw] bg-white absolute bottom-[1%] h-[4.5vh]   rounded-full  flex text-[1.2vw]`}
        >
          {totalCountBar.length > 0 &&
            totalCountBar?.map((registro, index) => {
              return (
                <div className={`h-[5vh] flex mr-4 mt-1 ml-4 `} key={index}>
                  {renderBitacoraStateCountBar(registro)}
                </div>
              );
            })}
        </div>
      </>
    );
  }
);

export default StateCountBar;
