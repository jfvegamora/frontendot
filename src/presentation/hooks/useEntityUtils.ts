/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

import { useCrud, usePermission } from ".";

export const useEntityUtils = (entityApiBaseUrl: string, query: string) => {
  const baseUrl = entityApiBaseUrl.startsWith("http")
    ? entityApiBaseUrl
    : // : `https://mtoopticos.cl${entityApiBaseUrl}`;
      `http://127.0.0.1:8000${entityApiBaseUrl}`;
  const [entity, setEntity] = useState<any | null>(null);
  const [entities, setEntities] = useState<never[]>([]);
  const [pageSize, setPageSize] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isModalInsert, setisModalInsert] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [isEntityProfile, setIsEntityProfile] = useState<boolean>(false);
  const [onDelete, setDataGrid] = useState<boolean>(false);

  const { escritura } = usePermission();
  const { deleteAllEntity, searchEntityByPrimaryKeys } = useCrud(baseUrl);
  // console.log("queryutils", query);
  const refreshData = useCallback(() => {
    searchEntityByPrimaryKeys("", query)
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
    setSelectedIds([]);
  }, []);

  const handlePageSize = () => {
    setPageSize((prev) => prev + 1);
  };

  const resetEntities = () => {
    setEntities([]);
    setSelectedIds([]);
    setPageSize(1);
    setDataGrid((prev) => !prev);
  };

  const handleRefresh = useCallback(() => {
    if (pageSize !== 1) {
      setEntities([]);
      setPageSize(1);
    }
  }, [pageSize]);

  // const handleDeleteSelected = useCallback(() => {
  //   async (id?: number) => {
  //     console.log("handledelete");
  //     if (!escritura) return;

  //     const idsToDelete = id ? [id] : selectedIds;

  //     const result = window.confirm("¿Estás seguro de eliminar?");
  //     if (!result) return;

  //     try {
  //       const response = await deleteAllEntity(idsToDelete);
  //       const errorDelete = response?.response?.data?.error;

  //       if (errorDelete) {
  //         toast.error(errorDelete);
  //       } else {
  //         resetEntities();
  //         toast.success("Eliminados Correctamente");
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //       console.log("handleDeleteSelected:", error);
  //       return error;
  //     }
  //   };
  // }, [selectedIds, escritura]);

  const handleSelectedAll = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedIds(
        event.target.checked ? entities.map((entity) => entity[1]) : []
      );
    },
    [entities]
  );

  const handleEntity = (id: number) => {
    setSelectedIds([id]);
    const selectedEntity = entities.find((entity) => entity[1] === id);
    setEntity(selectedEntity || null);
    setIsEntityProfile((prev) => !prev);
  };

  const handleSelect = useCallback((id: number): void => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  }, []);

  const toggleEditModal = useCallback(
    (id: number) => {
      if (!escritura) {
        alert("No tienes permisos");
        return;
      }

      setIsModalEdit((prev) => !prev);

      if (id) {
        setSelectedIds([id]);
        const selectedEntity = entities.find((entity) => entity[1] === id);
        setEntity(selectedEntity || null);
      } else {
        setSelectedIds([]);
        setEntity(null);
      }
    },
    [entities, escritura]
  );

  // const handleDelete = async (id: number) => {
  //   if (escritura) {
  //     const result = window.confirm("Estas seguro de eliminar?");
  //     if (result) {
  //       try {
  //         const response = await deleteEntity(id);
  //         const errorDelete = response?.response?.data?.error;
  //         if (errorDelete) {
  //           toast.error(errorDelete);
  //         } else {
  //           setEntities([]);
  //           setDataGrid((value) => !value);
  //           toast.success("Eliminado Correctamente");
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         toast.error("Error al eliminar");
  //       }
  //     }
  //   }
  // };

  // FACTORIZAR
  const handleDeleteSelected = useCallback(
    async (id?: number) => {
      if (escritura) {
        if (selectedIds.length >= 1 || (id && id > 0)) {
          const result = window.confirm("¿Estás seguro de eliminar?");
          try {
            if (result) {
              if (id && id > 0) {
                const response = await deleteAllEntity([id]);
                const errorDelete = response?.response?.data?.error;
                console.log("errorDelete", response);
                console.log("response", errorDelete);
                if (errorDelete) {
                  toast.error(errorDelete);
                } else {
                  setSelectedIds([]);
                  setEntities([]);
                  setPageSize(1);
                  setDataGrid((prev) => !prev);
                  toast.success("Eliminados Correctamente");
                }
              } else {
                const response = await deleteAllEntity(selectedIds);
                const errorDelete = response?.response?.data?.error;
                console.log("errorDelete", response);
                console.log("response", errorDelete);
                if (errorDelete) {
                  toast.error(errorDelete);
                } else {
                  setSelectedIds([]);
                  setEntities([]);
                  setPageSize(1);
                  setDataGrid((prev) => !prev);
                  toast.success("Eliminados Correctamente");
                }
              }
            }
          } catch (error: any) {
            toast.error(error.message);
            console.log(error);
            return error;
          }
        }
      }
    },
    [selectedIds, escritura]
  );

  // const handleSelectedAll = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.checked) {
  //       const allID = entities.map((entity) => entity[1]);
  //       setSelectedIds(allID);
  //     } else {
  //       setSelectedIds([]);
  //     }
  //   },
  //   [entities],
  // );

  // const handleSelect = useCallback((id: number): void => {
  //   setSelectedIds((prevSelectedIds) => {
  //     if (prevSelectedIds.includes(id)) {
  //       return prevSelectedIds.filter((selectedId) => selectedId !== id);
  //     } else {
  //       return [...prevSelectedIds, id];
  //     }
  //   });
  // }, []);

  // const toggleEditModal = useCallback(
  //   (id: number) => {
  //     if (escritura) {
  //       setIsModalEdit((prev) => !prev);
  //       if (id) {
  //         setEntityID(id);
  //         setSelectedIds([id]);
  //         const selectedEntity = entities.find((entity) => entity[1] === id);
  //         setEntity(selectedEntity || null);
  //       } else {
  //         setEntityID(0);
  //         setEntity(null);
  //       }
  //     } else {
  //       alert("No tienes permisos");
  //     }
  //   },
  //   [entities, escritura],
  // );

  // const handleEdit = useCallback((data)=>{
  //     if(escritura){
  //         const cleanedData = mappedPerson(data)
  //         console.log('edit', cleanedData)
  //         editEntity(entity.id, cleanedData)
  //           .then(()=>{
  //             setEntities([])
  //             setDataGrid((prev)=>!prev)
  //             toast.success('Editado correctamente')
  //             closeModal()
  //           })
  //           .catch((e)=>{
  //             toast.error('Error al editar')
  //             console.log(e)
  //           })
  //     }else{
  //         alert('No tienes permiso requerido')
  //     }
  // },[closeModal, escritura, entityID])

  useEffect(() => {
    searchEntityByPrimaryKeys("", query)
      .then((data: any) => {
        if (data?.name === "AxiosError") {
          return;
        } else {
          console.log('data', data)
          data &&
            setEntities((prev) =>
              prev ? [...prev, ...data] : data && [...data]
            );
        }
      })
      .catch((e) => {
        return e;
      });
  }, [pageSize, onDelete]);

  return {
    openModal,
    closeModal,
    handlePageSize,
    pageSize,
    setPageSize,
    isModalInsert,
    entities,
    setEntities,
    handleRefresh,
    toggleEditModal,
    isModalEdit,
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    handleSelect,
    handleDeleteSelected,
    isEntityProfile,
    handleEntity,
    setDataGrid,
    entity,
    refreshData,
    resetEntities,
  };
};
