// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useRef } from "react";
import axios, { AxiosInstance } from "axios";
import { signal } from "@preact/signals-react";
// import useSWR from "swr";

// PRODUCCION
//  export const URLBackend = signal('https://mtoopticos.cl');
//  export const URLBackend = signal('https://gestionprod.mtoopticos.cl');
// DESARROLLO
export const URLBackend = signal('https://gestiondev.mtoopticos.cl');

export const baseURL = (params:string) => {
  return params.startsWith("http") ? params : `${URLBackend}${params}`;
}


const useCrud = (
  apiBaseUrl: string
): {
  createdEntity: (entityData: any) => Promise<any | undefined>;
  verifyUserEmail: (correo: string) => Promise<any | undefined>;
  forgotPassword: (correo: string) => Promise<any | undefined>;
  editEntity: (entityData: any) => Promise<any | undefined>;
  excelTypes: (tableName:any) => Promise<any | undefined>;
  deleteAllEntity: (id: number[], comilla?: string) => Promise<any | undefined>;
  focusFirstInput: (strInputName: string) => void;
  loginEntity: (data: any) => Promise<any | undefined>;
  focusSecondInput: (strInputName: string) => void;
  exportEntity: (
    primaryKey?: string,
    strEntidad?: string,
    query?:string,
    jsonData?:any,
    customExport?:boolean,
    OTAreas?:any
  ) => Promise<any | undefined>;
  ListEntity: (primaryKeys: any, query: string) => Promise<any | undefined>;
  firstInputRef: any;
  secondInputRef: any;
} => {
  const baseUrl = baseURL(apiBaseUrl)

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
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

  const firstInputRef   = useRef<HTMLInputElement | null>(null);
  const secondInputRef  = useRef<HTMLInputElement | null>(null);

  const focusFirstInput = (strInputName: string) => {

    if(firstInputRef.current) {
      
      const firstInput = firstInputRef.current.querySelector(`input[name=${strInputName}]`);

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

  const excelTypes = async(tableName:string) => {
    try {
      const table_name = {
        table_name : tableName
      }
      // console.log(table_name)
      const result = await axios.post(`${URLBackend}/api/typesexcel/`, table_name)
      return result.data
    } catch (error) {
      console.log(error)
      return error
    }
  }

  

  const verifyUserEmail = async (correo: string) => {
    try {
      // const result = await axiosInstance.get(`${baseUrl}listado/?query=07&_p1=${correo}`)
      const result = await axiosInstance.get(
        `${baseUrl}listado/?query=07&_p1=${correo}`
      );
      return result.data.length > 0 ? "Correo existe" : "Correo no existe";
    } catch (error) {
      console.log(error)
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
      console.log(error)
      return error;
    }
  };

  // const changePassword = async(updatepassword:any) => {
  //   try{
  //     const response = await axiosInstance.post("/changepasswrod/", updatepassword);
  //     return response.data;
  //   }catch (error){
  //     return error;
  //   }
  // }

  const exportEntity = async (
    primaryKey?: string,
    strEntidad?: string,
    query?:string,
    jsonData?:any,
    customExport?:boolean,
    OTAreas?:any
  ): Promise<void> => {
    try {
      
      // console.log('query', query)
      // console.log("primaryKey", primaryKey);
      let strUrl = ''
      let response:any = {}

      
      if(customExport && query){
        strUrl ='/otros/?query=01'
        response = await axiosInstance.get(`${URLBackend}/api/otros/excel/?query=01`,{
          responseType: 'blob'
        })

        // console.log(response)
      }else if (jsonData){
        strUrl = `/excelindividual/?query=06&_pkToDelete=${jsonData}`
  
        response = await axiosInstance.get(strUrl,{
          responseType: 'blob'
        })
      }else{
        //CASO DE USO 1
        if(strEntidad?.includes('Orden')){
          console.log('entidades OT');
          console.log(OTAreas)
           
          strUrl = primaryKey
            ? OTAreas ? `/excel/?${query ?  query : "query=14"}&_origen=${OTAreas}&${primaryKey}` :  `/excel/?${query ?  query : "query=14"}&${primaryKey}`
            : OTAreas ?  `/excel/?${query ? query : "query=14"}&_origen=${OTAreas}`               :  `/excel/?${query ? query : "query=14"}`;


        }else{
          strUrl = primaryKey
            ? `/excel/?${query ?  query : "query=01"}&${primaryKey}`
            : `/excel/?${query ? query : "query=01"}`;
        }
        console.log(strUrl)
        console.log(strEntidad)

        
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
      console.log(error)
      throw new Error("Error al descargar Excel");
    }
  };

  const ListEntity = async (
    primaryKeys: any,
    query: any
  ): Promise<any | undefined> => {
    console.log(query)
    console.log(primaryKeys)
    
    const searchUrl = baseUrl === 'https://mtoopticos.cl/api/tipos/'
      ? `${baseUrl}listado/?query=${query === undefined ? "01" : query}&${primaryKeys || '_p1=OTMotivoGarantia'}`
      : `${baseUrl}listado/?query=${query === undefined ? "01" : query}${primaryKeys === "" ? "&_limit=100" : (`&${primaryKeys}`)}`;

    try {
      console.log("searchUrl", searchUrl);  
      const response = await axiosInstance.get(searchUrl);
      return response.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  };

  const createdEntity = async (entityData: any): Promise<any | undefined> => {
    try {
      const response = await axiosInstance.post("/crear/", entityData);
      return response.data;
    } catch (error:any) {
          const errorMessage = JSON.parse(error.request.responseText).error;
          const mensajeError = procesarMensajeError(errorMessage);
          return new Error(mensajeError)
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

  // function contarCampos(arreglo) {
  //   const numCampos = arreglo.map((item) => Object.keys(item).length);
  //   return numCampos;
  // }

  const deleteAllEntity = async (pk: any[]): Promise<void | unknown> => {
    try {
      console.log(pk[0])
      
      const newUrl = `/eliminar/?query=05&${pk[0]}`
      console.log(newUrl)
      const response = await axiosInstance.delete(newUrl);
      return response.data;

      // const intPk = pk[0].map((item: any) => Object.keys(item).length);
      // const pkQueryParam = encodeURIComponent(JSON.stringify(pk[0]));
      // const valoresPk1Obj1 = pk[0].map(

      //   (objeto: { pk1: any }) => `"${objeto.pk1}"`
        
      // );

      // console.log('valoresPk1Obj1', valoresPk1Obj1)
      // console.log('valoresPk1Obj1', pkQueryParam)
      // const p3Value = valoresPk1Obj1.map((val:any) => `'${val.replace(/"/g, '')}'`).join(',');

      // // `&_${strPDelete}=${}`


      // // console.log(p3Value)

      // const url =
      //   intPk[0] > 1 || pk[1] 
      //     ? `/eliminar/?query=05&_pkToDelete=${pkQueryParam}`
      //     :  !isNaN(parseInt(valoresPk1Obj1[0])) && /^\d+$/.test(valoresPk1Obj1[0])
      //          ? (`/eliminar/?query=05&_p1=${valoresPk1Obj1}`)//caso cubierto
      //          : (`/eliminar/?query=05&_p3=${encodeURIComponent(p3Value)}`)


      // console.log("url", url);

      // const response = await axiosInstance.delete(url);
      // return response.data;
    } catch (error) {
      return error;
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
    excelTypes
  };
};


export default useCrud;


export const procesarMensajeError = (mensajeError:any) => {
  if (mensajeError.includes('Duplicate entry')) {
    return 'Ya existe un registro con el mismo valor';
  } else if (mensajeError.includes('Duplicate entry')) {
    return 'No se pudo guardar: Entrada duplicada.';
  } else if (mensajeError.includes('truncated')) {
    return 'Valor excede máximo permitido.';
  } else if (mensajeError.includes('The document is empty')) {
    return 'No hay registros.';
  }else if (mensajeError.includes('Cannot add or update a child row')){
    return 'No existe el código'
  }

  return mensajeError
};