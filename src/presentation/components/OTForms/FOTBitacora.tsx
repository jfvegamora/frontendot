import React, { useEffect, useState } from "react";
import { TableComponent } from "..";
import { table_head_OT_bitacora } from "../../utils";
import axios from "axios";
import { EnumGrid } from "../../views/mantenedores/MOTHistorica";
import { URLBackend } from "../../utils/config";

// const strQuery = "01&_p2=126"

interface IBitacora {
  otData: any;
  isMOT: any;
}

const FOTBitacora: React.FC<IBitacora> = ({ otData, isMOT }) => {
  const [dataBitacora, setDataBitacora] = useState();

  const strURL = `${URLBackend}/api/${
    isMOT ? "otbitacorahistorica" : "otbitacora"
  }/listado/?query=01`;

  const fetchData = async () => {
    const result = await axios(
      `${strURL}&_p2=${otData?.[EnumGrid.folio] || 0}&_p3=${
        otData?.[EnumGrid.estado_id]
      }`
    );
    setDataBitacora(result.data || "");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="frameOTForm h-[85vh] bg-white ">
      <div className="scroll !h-[85vh]">
        <TableComponent
          tableHead={table_head_OT_bitacora}
          entidad={"bitacora"}
          idMenu={28}
          data={dataBitacora}
        />
      </div>
    </div>
  );
};

export default FOTBitacora;
