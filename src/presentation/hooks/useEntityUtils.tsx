/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";

import { useCrud } from ".";
import { useModal } from "./useModal";
import { baseURL } from "./useCrud";


export const useEntityUtils = (entityApiBaseUrl: string, query: string) => {

  const baseUrl = baseURL(entityApiBaseUrl)

  const [entity, setEntity] = useState<any | null>(null);
  const [entities, setEntities] = useState<never[]>([]);
  const [pageSize, setPageSize] = useState(1);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // const [intLastId, setIntLastId] = useState<number | null>(0);
  const [isModalInsert, setisModalInsert] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [isModalPermisoOT, setIsModalPermisOT] = useState<boolean>(false);
  const [isEntityProfile, setIsEntityProfile] = useState<boolean>(false);
  const [onDelete, setDataGrid] = useState<boolean>(false);

  const { showModal } = useModal();
  const { deleteAllEntity, ListEntity } = useCrud(baseUrl);

  // console.log("queryutils", query);
  const refreshData = useCallback(() => {
    ListEntity("", query)
      .then((data: []) => data && setEntities([...data]))
      .catch((e) => {
        console.log(e);
      });
  }, [pageSize, onDelete, query]);

  const openModal = useCallback(() => {
    setisModalInsert(true);
  }, []);

  const closeModal = useCallback(() => {
    setisModalInsert(false);
    setIsModalEdit(false);
    setIsEntityProfile(false);
    setSelectedRows([]);
    setIsModalPermisOT(false);
  }, []);

  const resetEntities = () => {
    setEntities([]);
    setSelectedRows([]);
    setPageSize(1);
    setDataGrid((prev) => !prev);
    //reset()
  };

  const handleRefresh = useCallback(() => {
    if (pageSize !== 1) {
      setEntities([]);
      setPageSize(1);
    }
  }, [pageSize]);

  //Metodo Check aLL
  const handleSelectedAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, row?: any) => {
      console.log(row)
      const selectedRowsLimited = event.target.checked ? row.slice(0, 500) : [];
      console.log(selectedRowsLimited)
      setSelectedRows(selectedRowsLimited);
    },
    [entities]
  );

  const handleEntity = (id: number) => {
    setSelectedRows([id]);
    const selectedEntity = entities.find((entity) => entity[1] === id);
    setEntity(selectedEntity || null);
    setIsEntityProfile((prev) => !prev);
  };

  //METODO CHECK INDIVIDUAL
  const handleSelect = useCallback((rowIndex: number): void => {
    // console.log("id handleselect", id);
    console.log(rowIndex)
    setSelectedRows((prevSelectedRow) =>{

      // console.log(prevSelectedRow)
      if(prevSelectedRow.length >= 400){
        toast.error("Ya tienes 100 elementos seleccionados")
        return prevSelectedRow;
      }
      
      return prevSelectedRow.includes(rowIndex)
      ? prevSelectedRow.filter((selectedRow) => selectedRow !== rowIndex)
      : [...prevSelectedRow, rowIndex]
    }
      
      
    );
  }, []);

  //METODO EDITAR DE LA GRILLA
  const toggleEditModal = useCallback(
    (rowIndex?: number) => {
      console.log(rowIndex)
      setIsModalEdit((prev) => !prev);

      if (rowIndex !== undefined) {
        rowIndex >= 0
          ? (setSelectedRows([rowIndex]), setEntity(entities[rowIndex]))
          : (setSelectedRows([]), setEntity(null));
      }
    },
    [entities]
  );
  //METODO PERMISOS DE OT USUARIO DE LA GRILLA
  const togglePermisoOTModal = useCallback(
    (rowIndex?: number) => {
      console.log(rowIndex)
      setIsModalPermisOT((prev) => !prev);

      // if (rowIndex !== undefined) {
      //   rowIndex >= 0
      //     ? (setSelectedRows([rowIndex]), setEntity(entities[rowIndex]))
      //     : (setSelectedRows([]), setEntity(null));
      // }
    },
    [entities]
  );
  //METODO EXCEL DE LA GRILLA
  const toggleExcel = useCallback(
    (rowIndex?: number) => {
      if (rowIndex !== undefined) {
        rowIndex >= 0
          ? (setSelectedRows([rowIndex]), setEntity(entities[rowIndex]))
          : (setSelectedRows([]), setEntity(null));
      }
    },
    [entities]
  );

  // FACTORIZAR
  const resetDelete = () => {
    // console.log("entitiesresetdelete:", entities);
  };

  const handleDeleteSelected = useCallback(
    async (rowData?: any, comilla?: string) => {
      if (selectedRows.length >= 1) {
        try {
          console.log("comilla", comilla);
          const response = await deleteAllEntity([rowData, comilla]);
          const errorDelete = response?.response?.data?.error;
          if (errorDelete) {
            toast.error(errorDelete);
          } else {
            setEntities((prev) => {
              const positionsToRemove = selectedRows;
              console.log("positiontoRemove", positionsToRemove);
              const removedEntities = [];

              const filteredEntities = prev.filter((entity, index) => {
                if (positionsToRemove.includes(index)) {
                  removedEntities.push(entity);
                  return false;
                }
                return true;
              });
              return filteredEntities;
            });
            resetDelete();
            setSelectedRows([]);
            setPageSize(1);
            setDataGrid((prev) => !prev);
            toast.success("Eliminados Correctamente");
          }
        } catch (error: any) {
          toast.error(error.message);
          console.log(error);
          return error;
        }
      }
    },
    [selectedRows, showModal]
  );

  // useEffect(() => {
  //   ListEntity("_id=20000", query)
  //     .then((data: any) => {
  //       if (data?.name === "AxiosError") {
  //         return;
  //       } else {
  //         // console.log("data", data);
  //         data &&
  //           setEntities((prev) =>
  //             prev ? [...prev, ...data] : data && [...data]
  //           );
  //       }
  //     })
  //     .catch((e) => {
  //       return e;
  //     });
  // }, [pageSize, onDelete]);

  return {
    openModal,
    closeModal,
    pageSize,
    setPageSize,
    isModalInsert,
    entities,
    setEntities,
    handleRefresh,
    toggleEditModal,
    togglePermisoOTModal,
    isModalEdit,
    selectedRows,
    setSelectedRows,
    handleSelectedAll,
    handleSelect,
    handleDeleteSelected,
    isEntityProfile,
    handleEntity,
    setDataGrid,
    entity,
    refreshData,
    resetEntities,
    toggleExcel,
    isModalPermisoOT
  };
};
