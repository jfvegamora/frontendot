import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLBackend } from "../../presentation/hooks/useCrud";
import { EnumGrid } from "../../presentation/views/mantenedores/MOTHistorica";
import { validarImpresion } from "../../presentation/utils";
import { OTGrillaEnum } from "../../presentation/Enums";
// import { OTGrillaEnum } from "../../presentation/Enums";
// import { toast } from "react-toastify";

export interface DataState {
  estadosOT: any;
  cristales: any[];
  armazones: any[];
  derivacionColores: any;
  data: any[];
  dataHistorica: any[];
  ot: any[];
  impresionOT: any[];
}

const initialState: DataState = {
  estadosOT: {},
  cristales: [],
  armazones: [],
  data: [],
  dataHistorica: [],
  ot: [],
  impresionOT: [],
  derivacionColores: localStorage.getItem("OTColores")
    ? JSON.parse(localStorage.getItem("OTColores") as string)
    : {
        // Ingresada: ["#000000", "#FFFFFF"],
        // "En proceso": ["#000000", "#FFFFFF"],
        // Pendiente: ["#000000", "#FFFF00"],
        // Derivada: ["#FFFFFF", "#FF0000"],
        // Entregada: ["#000000", "#FFFFFF"],
        // Cerrada: ["#000000", "#FFFFFF"],
        // Facturada: ["#000000", "#FFFFFF"],
        // Anulada: ["#FFFFFF", "#808080"],
      },
};

const limit = 0;

export const fetchOT = createAsyncThunk("ot/fetchOT", async (params: any) => {
  const { OTAreas, searchParams, historica } = params;
  const OTUrl = searchParams
    ? historica
      ? `${URLBackend}/api/othistorica/listado/?query=14&${searchParams}&_limit=${limit}`
      : `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&${searchParams}&_limit=${limit}`
    : historica
    ? `${URLBackend}/api/othistorica/listado/?query=14&_limit=${limit}`
    : OTAreas
    ? `${URLBackend}/api/ot/listado/?query=14&_origen=${OTAreas}&_limit=${limit}`
    : `${URLBackend}/api/ot/listado/?query=14&${searchParams}&_limit=${limit}`;

  try {
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        const { data } = await axios(OTUrl, {
          // headers: {
          //     'Authorization' : `${token}`
          // }
        });
        return data;
      } catch (error) {
        if (retryCount >= maxRetries - 1) {
          throw error;
        }
        retryCount += 1;
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    }
  } catch (error) {
    throw error;
  }
});

export const fetchOTByID = createAsyncThunk(
  "ot/fetchOTbyID",
  async (params: any) => {
    try {
      const { folio, historica, estado } = params;

      const endpoint =
        historica === false
          ? `${URLBackend}/api/ot/listado/?query=01&_p1="${folio}"&_estado=${estado}&_p2=0`
          : `${URLBackend}/api/othistorica/listado/?query=01&_p1="${folio}"&_estado=${estado}&_p2=0`;

      const response = await axios.get(endpoint);
      return response.data[0];
    } catch (error) {
      throw error;
    }
  }
);

export const fetchOTImpresionByID = createAsyncThunk(
  "ot/fetchOTImpresionbyID",
  async (params: any) => {
    try {
      const { folio, OTAreas } = params;
      const response2 = await axios.get(
        `${URLBackend}/api/ot/imprimir/?query=02&_origen=${OTAreas}&_p1=${folio}&_p2=1`
      );

      // const response = await axios.get(
      //   `${URLBackend}/api/ot/imprimir/?query=01&_origen=${OTAreas}&_folio=${folio}`
      // );

      validarImpresion.value = response2.data[0][EnumGrid.estado_impresion_id];

      // const userOT = response2.data[0][EnumGrid.usuario_id];
      // console.log(userOT);
      // console.log(userID);

      // if (userID) {
      //   if (userOT !== userID) {
      //     console.log("render");
      //     throw `Folio ${folio} no pertenece al Usuario`;
      //   }
      // }

      return response2.data;
    } catch (error) {
      throw error;
    }
  }
);

const filterCodigos = (codigos: any) => {
  const codigosFiltrados = codigos.filter(
    (codigo: any) => codigo.codigo !== null && codigo.codigo !== "undefined"
  );
  return codigosFiltrados;
};

export const fetchColores = createAsyncThunk(
  "fetch/colores",
  async (token: any) => {
    try {
      const response = await axios.get(
        `${URLBackend}/api/tipos/listado/?query=02&_p1=OTEstados`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data) {
        const colores = response.data.reduce((acc: any, obj: any) => {
          acc[obj[1]] = [obj[2], obj[3], obj[4]];
          return acc;
        }, {});
        return colores;
      }
    } catch (error) {
      throw error;
    }
  }
);

const OTSlice = createSlice({
  name: "OTSlice",
  initialState,
  reducers: {
    clearData(state) {
      state.data = [];
      state.ot = [];
      state.impresionOT = [];
      state.estadosOT = [];
    },
    addToCristales(state, action) {
      const codigos = filterCodigos(action.payload);
      state.cristales.push(...codigos); // Agrega elementos al arreglo cristales
    },
    addToArmazones(state, action) {
      const codigos = filterCodigos(action.payload);
      state.armazones.push(...codigos); // Agrega elementos al arreglo armazones
    },
    clearCodigos(state) {
      state.armazones = [];
      state.cristales = [];
    },
    clearOTColores(state) {
      state.derivacionColores = {};
    },
    clearImpression(state) {
      state.impresionOT = [];
      state.ot = [];
    },
    updateEstadoImpresion(state) {
      console.log(state.impresionOT);
    },
    filterOtAtrasadas(state) {
      const filterAtrasadas = state.data.filter(
        (ot: any) => ot[OTGrillaEnum.por_vencer] === "S"
      );

      const initialAcc = Object.keys(state.derivacionColores).reduce(
        (acc: any, key: any) => {
          acc[key] = 0;
          return acc;
        },
        { S: 0 }
      );

      const reduce = filterAtrasadas.reduce((acc: any, ot: any) => {
        let estado_ot = ot[OTGrillaEnum.estado];
        let por_vencer = ot[OTGrillaEnum.por_vencer];

        // Manejar el caso de por_vencer
        if (por_vencer === "S") {
          acc[por_vencer] = (acc[por_vencer] ?? 0) + 1;
        }

        // Manejar el caso de estado_ot
        acc[estado_ot] = (acc[estado_ot] ?? 0) + 1;

        return acc;
      }, initialAcc);

      state.data = filterAtrasadas;
      state.estadosOT = reduce;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOT.fulfilled, (state, action) => {
      state.estadosOT = {};
      // state.estadosOT[99] = 0;
      const initialAcc = Object.keys(state.derivacionColores).reduce(
        (acc: any, key: any) => {
          acc[key] = 0;
          return acc;
        },
        { S: 0 }
      );

      const reduce = action.payload.reduce((acc: any, ot: any) => {
        let estado_ot = ot[OTGrillaEnum.estado];
        let por_vencer = ot[OTGrillaEnum.por_vencer];

        // Manejar el caso de por_vencer
        if (por_vencer === "S") {
          acc[por_vencer] ??= 0; // Si acc[por_vencer] es undefined o null, lo inicializa a 0
          acc[por_vencer]++;
        }

        // Manejar el caso de estado_ot
        acc[estado_ot] ??= 0; // Si acc[estado_ot] es undefined o null, lo inicializa a 0
        acc[estado_ot]++;

        return acc;
      }, initialAcc);

      state.estadosOT = reduce;
      state.data = action.payload;
      return state;
    });
    builder.addCase(fetchOTByID.fulfilled, (state, action) => {
      state.ot = action.payload;
      return state;
    });
    builder.addCase(fetchOTImpresionByID.fulfilled, (state, action) => {
      state.impresionOT = [...state.impresionOT, action.payload];
      console.log(action.payload);

      state.ot = [...state.ot, ...action.payload];
      return state;
    });
    builder.addCase(fetchOTImpresionByID.rejected, (state) => {
      console.log("render");

      return state;
    });
    builder.addCase(fetchColores.fulfilled, (state, action) => {
      state.derivacionColores = action.payload;
      localStorage.setItem("OTColores", JSON.stringify(action.payload));
      return state;
    });
  },
});

export const {
  clearData,
  addToCristales,
  addToArmazones,
  clearCodigos,
  clearOTColores,
  filterOtAtrasadas,
  clearImpression,
  updateEstadoImpresion,
} = OTSlice.actions;
export default OTSlice.reducer;
