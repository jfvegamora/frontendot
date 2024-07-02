import axios from "axios";
import { toast } from "react-toastify";
import {
  clearAllCheck,
  clearIndividualCheck,
  disabledIndividualCheck,
  isToggleImpression,
} from "./signalStateOT";
import { URLBackend } from "../hooks/useCrud";

const strUrl = `${URLBackend}/api/ot/listado`;

export const setEstadoImpresion = async (
  pkToDelete?: any,
  origen?: any,
  masivo?: boolean,
  usuario?: any
) => {
  const loadingToast = toast.loading("Cargando...");
  let estado_impresion = 1;
  try {
    console.log(pkToDelete);
    const data_JSON = pkToDelete.map((ot: any) => {
      return { folio: `${ot.folio}` };
    });

    const query = `?query=06&_dataJSON=${encodeURIComponent(
      JSON.stringify(data_JSON)
    )}&_p2=${estado_impresion}&_usuario=${usuario.id}&_origen=${origen}`;

    const result = await axios(`${strUrl}/${query}`, {
      headers: {
        Authorization: usuario.token,
      },
    });
    toast.dismiss(loadingToast);
    console.log(result);

    if (masivo) {
      clearAllCheck.value = false;
      clearIndividualCheck.value = true;
      console.log(masivo);
      return;
    }

    if (result.status === 200 && !masivo) {
      // toast.dismiss(loadingToast);
      disabledIndividualCheck.value = false;
      result.data[0][0] === 1
        ? (isToggleImpression.value = true)
        : (isToggleImpression.value = false);
      toast.success("Estado Impresión Cambiado.", {
        autoClose: 900,
      });
    }
  } catch (error) {
    if (masivo) return;
    // toast.dismiss(loadingToast)
    toast.error("Error Estado Impresión OT.");
    throw error;
  }
};
