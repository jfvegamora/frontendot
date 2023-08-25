/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance } from "axios";

const useCrud = (
  apiBaseUrl: string
): {
  createdEntity: (entityData: any) => Promise<any | undefined>;
  editEntity: (entityData: any) => Promise<any | undefined>;
  deleteAllEntity: (id: number[]) => Promise<any | undefined>;
  exportEntity: () => Promise<any | undefined>;
  searchEntityByPrimaryKeys: (
    primaryKeys: string,
    query: string
  ) => Promise<any | undefined>;
} => {
  const baseUrl = apiBaseUrl.startsWith("http")
    ? apiBaseUrl
    : //  : `https://mtoopticos.cl${apiBaseUrl}`;
      `http://127.0.0.1:8000${apiBaseUrl}`;
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const exportEntity = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get("/excel/?query=01", {
        responseType: "blob",
      });

      const fileURL: string = URL.createObjectURL(
        new Blob([response.data], { type: "application/vnd.ms-excel" })
      );

      const link: HTMLAnchorElement = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "entidad.xls");
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      throw new Error("Error al descargar Exceñ");
    }
  };

  const searchEntityByPrimaryKeys = async (
    primaryKeys: string,
    query: string
  ): Promise<any | undefined> => {
    // spUsuarios(1,'sand', 0, '', 0, 0);
    console.log("primarykeys", primaryKeys);
    const searchUrl = `${baseUrl}listado/?query=${query}&${primaryKeys}`;
    try {
      console.log("searchUrl", searchUrl);
      const response = await axiosInstance.get(searchUrl);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createdEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post("/crear/", entityData);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const editEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post(`/editar/`, entityData);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const deleteAllEntity = async (id: number[]): Promise<void | unknown> => {
    try {
      const idsDelete = `"${id.join(",")}"`;
      const response = await axiosInstance.delete(
        `/eliminar/?query=05&_p2=${idsDelete}&`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  // const listEntity = async (
  //   query: string,
  //   params: {
  //     _p1?: string;
  //     _p2?: number;
  //     _p3?: string;
  //     _p4?: number;
  //   } = {}
  // ): Promise<void | unknown> => {
  //   try {
  //     console.log("params:", params);
  //     const _p1 = params._p1;
  //     const { _p2 = 0, _p3 = "", _p4 = 0 } = params;

  //     console.log("_p2:", _p2);
  //     console.log("_p1:", _p1);

  //     const endpoint = `/listado/?query=${query}&_p1=${_p1}&_p2=${_p2}&_p3=${_p3}&_p4=${_p4}`;
  //     console.log("endpoint", endpoint);
  //     const response = await axiosInstance.get(endpoint);
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  // const listEntity = async (
  //   query: string,
  //   _p1 = "",
  //   _p2 = 0,
  //   _p3 = "",
  //   _p4 = 0
  // ): Promise<void | unknown> => {
  //   try {
  //     console.log("_p1:", _p1);
  //
  //     const endpoint = `/listado/?query=${query}&_p1=${_p1}&_p2=${_p2}&_p3=${_p3}&_p4=${_p4}`;
  //     const response = await axiosInstance.get(endpoint);
  //     return response.data;
  //   } catch (error) {
  //     return error;
  //   }
  // };

  return {
    createdEntity,
    editEntity,
    searchEntityByPrimaryKeys,
    deleteAllEntity,
    exportEntity,
  };
};

export default useCrud;
