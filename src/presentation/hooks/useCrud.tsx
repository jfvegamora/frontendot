/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, { AxiosInstance } from "axios";

const useCrud = (
  apiBaseUrl: string
): {
  createdEntity: (entityData: any) => Promise<any | undefined>;
  verifyUserEmail: (correo: string) => Promise<any | undefined>
  editEntity: (entityData: any) => Promise<any | undefined>;
  deleteAllEntity: (id: number[]) => Promise<any | undefined>;
  exportEntity: (
    primaryKey?: string,
    strEntidad?: string
  ) => Promise<any | undefined>;
  ListEntity: (primaryKeys: any, query: string) => Promise<any | undefined>;
} => {
  const baseUrl = apiBaseUrl.startsWith("http")
    ? apiBaseUrl
    : `https://mtoopticos.cl${apiBaseUrl}`;
  //`http://127.0.0.1:8000${apiBaseUrl}`;


  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const verifyUserEmail = async (correo: string) => {
    try {
      // const result = await axiosInstance.get(`${baseUrl}listado/?query=07&_p1=${correo}`)
      const result = await axiosInstance.get(`https://mtoopticos.cl/api/usuarios/listado/?query=07&_p1=${correo}`)
      console.log('result email', result.data)
      return result.data.length > 0 ? 'Correo existe' : 'correo no existe'
    } catch (error) {
      return error
    }
  }

  const exportEntity = async (
    primaryKey?: string,
    strEntidad?: string
  ): Promise<void> => {
    try {
      const strUrl = primaryKey
        ? `/excel/?query=01&${primaryKey}`
        : `/excel/?query=01`;

      const response = await axiosInstance.get(strUrl, {
        responseType: "blob",
      });

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
      throw new Error("Error al descargar Exceñ");
    }
  };

  const ListEntity = async (
    primaryKeys: any,
    query: any
  ): Promise<any | undefined> => {
    const searchUrl = `${baseUrl}listado/?query=${query}&${primaryKeys}`;
    try {
      // console.log("searchUrl", searchUrl);
      const response = await axiosInstance.get(searchUrl);
      return response.data;
    } catch (error) {
      return error;
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
      const idsDelete = `${id.join(",")}`;
      const response = await axiosInstance.delete(
        `/eliminar/?query=05&_p1=${idsDelete}&`
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
    ListEntity,
    deleteAllEntity,
    exportEntity,
    verifyUserEmail
  };
};

export default useCrud;
