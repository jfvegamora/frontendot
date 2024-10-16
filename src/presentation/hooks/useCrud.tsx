// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useRef } from "react";
import axios, { AxiosInstance } from "axios";
// import { signal } from "@preact/signals-react";
import { AppStore, useAppSelector } from "../../redux/store";
import { URLBackend } from "../utils/config";

// PRODUCCION
//  export const URLBackend = signal('https://gestionprod.mtoopticos.cl');

// DESARROLLO
// export const URLBackend = signal('https://gestiondev.mtoopticos.cl');

//CAPACITACION
// export const URLBackend = signal('https://gestioncap.mtoopticos.cl')

export const baseURL = (params: string) => {
  return params.startsWith("http") ? params : `${URLBackend}${params}`;
};

const useCrud = (
  apiBaseUrl: string
): {
  createdEntity: (entityData: any) => Promise<any | undefined>;
  verifyUserEmail: (correo: string) => Promise<any | undefined>;
  forgotPassword: (correo: string) => Promise<any | undefined>;
  editEntity: (entityData: any) => Promise<any | undefined>;
  excelTypes: (tableName: any) => Promise<any | undefined>;
  deleteAllEntity: (id: number[], comilla?: string) => Promise<any | undefined>;
  focusFirstInput: (strInputName: string) => void;
  loginEntity: (data: any) => Promise<any | undefined>;
  focusSecondInput: (strInputName: string) => void;
  exportEntity: (
    primaryKey?: string,
    strEntidad?: string,
    query?: string,
    jsonData?: any,
    customExport?: boolean,
    OTAreas?: any,
    idMenu?: any
  ) => Promise<any | undefined>;
  ListEntity: (
    primaryKeys: any,
    query: string,
    jsonSearch?: boolean
  ) => Promise<any | undefined>;
  firstInputRef: any;
  secondInputRef: any;
} => {
  const baseUrl = baseURL(apiBaseUrl);
  const usuario: any = useAppSelector((store: AppStore) => store.user);

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: usuario?.token || "",
    },
  });

  const loginEntity = async (data: { _p1: any; _p3: any }) => {
    try {
      if (!data) return "Faltan Credenciales";
      const { _p1, _p3 } = data;

      const query = {
        correo: _p1,
        password: _p3,
      };
      const response = await axiosInstance.post("/login/", query);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const secondInputRef = useRef<HTMLInputElement | null>(null);

  const focusFirstInput = (strInputName: string) => {
    if (firstInputRef.current) {
      const firstInput = firstInputRef.current.querySelector(
        `input[name=${strInputName}]`
      );
      if (firstInput) {
        (firstInput as HTMLInputElement).focus();
      }
    }
  };

  const focusSecondInput = (strInputName: string) => {
    if (secondInputRef.current) {
      const secondInput = secondInputRef.current.querySelector(
        `input[name=${strInputName}]`
      );
      if (secondInput) {
        (secondInput as HTMLInputElement).focus();
      }
    }
  };

  const excelTypes = async (tableName: string) => {
    try {
      const table_name = {
        table_name: tableName,
      };
      const result = await axios.post(
        `${URLBackend}/api/typesexcel/`,
        table_name
      );
      return result.data;
    } catch (error) {
      return error;
    }
  };

  const verifyUserEmail = async (correo: string) => {
    try {
      const result = await axiosInstance.get(
        `${baseUrl}listado/?query=07&_p1=${correo}`
      );
      return result.data.length > 0 ? "Correo existe" : "Correo no existe";
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const forgotPassword = async (correo: string) => {
    try {
      const body = {
        query: "07",
        _p1: correo,
      };
      const response = await axiosInstance.post("/forwardpassword/", body);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const exportEntity = async (
    primaryKey?: string,
    strEntidad?: string,
    query?: string,
    jsonData?: any,
    customExport?: boolean,
    OTAreas?: any,
    idMenu?: any
  ): Promise<void> => {
    try {
      let strUrl = "";
      let response: any = {};

      if (customExport && query) {
        strUrl = "/otros/?query=01";
        response = await axiosInstance.get(
          `${URLBackend}/api/otros/excel/?query=01`,
          {
            responseType: "blob",
          }
        );
      } else if (jsonData) {
        strUrl = `/excelindividual/?query=06&_pkToDelete=${jsonData}`;

        response = await axiosInstance.get(strUrl, {
          responseType: "blob",
        });
      } else {
        if (idMenu === 28) {
          strUrl = primaryKey
            ? OTAreas
              ? `/excel/?${
                  query ? query : "query=144"
                }&_origen=${OTAreas}&${primaryKey}`
              : `/excel/?${query ? query : "query=144"}&${primaryKey}`
            : OTAreas;
        } else if (idMenu === 1) {
          strUrl = primaryKey
            ? `/excel/?${query ? query : "query=144"}&${primaryKey}`
            : `/excel/?${query ? query : "query=144"}`;
        } else {
          strUrl = primaryKey
            ? `/excel/?${query ? query : "query=11"}&${primaryKey}`
            : `/excel/?${query ? query : "query=11"}`;
        }

        response = await axiosInstance.get(strUrl, {
          responseType: "blob",
        });
      }

      //GENERAL
      const fileURL: string = URL.createObjectURL(
        new Blob([response.data], { type: "application/vnd.ms-excel" })
      );
      const currentDate = new Date();
      const formattedDate = currentDate
        .toLocaleDateString("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split("/")
        .reverse()
        .join("-");

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `${strEntidad}_${formattedDate}.xls`);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.log(error);
      throw new Error("Error al descargar Excel");
    }
  };

  const ListEntity = async (
    primaryKeys: any,
    query: any,
    jsonSearch?: boolean
  ): Promise<any | undefined> => {
    // const searchUrl =
    //   baseUrl === "https://gestionprod.mtoopticos.cl/api/tipos/"
    //     ? `${baseUrl}listado/?query=${query === undefined ? "01" : query}&${
    //         primaryKeys || "_p1=OTMotivoGarantia"
    //       }`
    //     : `${baseUrl}listado/?query=${query === undefined ? "01" : query}${
    //         primaryKeys === "" ? "&_limit=100" : `&${primaryKeys}`
    //       }`;
    // console.log(primaryKeys);
    const searchUrl =
      jsonSearch === true
        ? `${baseUrl}listado/?query=${query === undefined ? "01" : query}${
            primaryKeys === ""
              ? "&_limit=100"
              : `&_pkToDelete=${encodeURIComponent(
                  JSON.stringify(primaryKeys)
                )}`
          }`
        : `${baseUrl}listado/?query=${query === undefined ? "01" : query}${
            primaryKeys === "" ? "&_limit=100" : `&${primaryKeys}`
          }`;

    // console.log(searchUrl);
    try {
      const response = await axiosInstance.get(searchUrl);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const createdEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post("/crear/", entityData);
      return response.data;
    } catch (error: any) {
      if (error.response.data.Error) {
        const mensajeError = procesarMensajeError(error.response.data.Error);
        return new Error(mensajeError);
      } else {
        return error.response.data;
      }
    }
  };

  const editEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post(`/editar/`, entityData);
      return response.data;
    } catch (error: any) {
      const mensajeError = procesarMensajeError(error.response.data.Error);
      return new Error(mensajeError);
    }
  };

  const deleteAllEntity = async (pk: any[]): Promise<void | unknown> => {
    try {
      const newUrl = `/eliminar/?query=05&${pk[0]}`;
      const response = await axiosInstance.delete(newUrl);
      return response.data;
    } catch (error: any) {
      return new Error(error.response.data.Error);
    }
  };

  return {
    createdEntity,
    editEntity,
    ListEntity,
    deleteAllEntity,
    exportEntity,
    focusFirstInput,
    firstInputRef,
    verifyUserEmail,
    forgotPassword,
    loginEntity,
    focusSecondInput,
    secondInputRef,
    excelTypes,
  };
};

export default useCrud;

export const procesarMensajeError = (mensajeError: any) => {
  if (mensajeError.includes("Duplicate entry")) {
    return "Ya existe un registro con el mismo valor";
  } else if (mensajeError.includes("Duplicate entry")) {
    return "No se pudo guardar: Entrada duplicada.";
  } else if (mensajeError.includes("truncated")) {
    return "Valor excede máximo permitido.";
  } else if (mensajeError.includes("The document is empty")) {
    return "No hay registros.";
  } else if (mensajeError.includes("Cannot add or update a child row")) {
    return "No existe el código";
  }

  return mensajeError;
};
