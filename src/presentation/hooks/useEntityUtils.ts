/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
     : `https://mtoopticos.cl${entityApiBaseUrl}`;
     // `http://127.0.0.1:8000${entityApiBaseUrl}`;
  const [entity, setEntity] = useState<any | null>(null);
  const [entities, setEntities] = useState<never[]>([]);
  const [pageSize, setPageSize] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  // const [intLastId, setIntLastId] = useState<number | null>(0);
  const [isModalInsert, setisModalInsert] = useState<boolean>(false);
  const [isModalEdit, setIsModalEdit] = useState<boolean>(false);
  const [isEntityProfile, setIsEntityProfile] = useState<boolean>(false);
  const [onDelete, setDataGrid] = useState<boolean>(false);

  const { escritura } = usePermission();
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
    setSelectedIds([]);
  }, []);

  const handlePageSize = useCallback(() => {
    // console.log("lastidhandle:", intLastId);
    // const strParams = `_p4=${intLastId}`;
    // // const strParams = "_p4=${intLastId}";
    // setPageSize((prev) => prev + 1);
    // ListEntity(strParams, "01")
    //   .then((data) => {
    //     data &&
    //       setEntities((prev) =>
    //         prev ? [...prev, ...data] : data && [...data]
    //       );
    //   })
    //   .catch((e) => console.log(e));
  }, []);

  const resetEntities = () => {
    setEntities([]);
    setSelectedIds([]);
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
  const resetDelete = () => {
    // console.log("entitiesresetdelete:", entities);
  };

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
                if (errorDelete) {
                  toast.error(errorDelete);
                } else {
                  setEntities((prev) => {
                    const filteredEntities = prev.filter(
                      (entity) => entity[1] !== id
                    );
                    console.log("estado filtrado:", filteredEntities);
                    return filteredEntities;
                  });
                  resetDelete();
                  setSelectedIds([]);
                  setPageSize(1);
                  setDataGrid((prev) => !prev);
                  toast.success("Eliminados Correctamente");
                }
              } else {
                const response = await deleteAllEntity(selectedIds);
                console.log("state entities:", entities);
                const errorDelete = response?.response?.data?.error;
                // const errorDelete = false;
                if (errorDelete) {
                  toast.error(errorDelete);
                } else {
                  setEntities((prev) => {
                    const filteredEntities = prev.filter(
                      (entity) => !selectedIds.includes(entity[1])
                    );
                    console.log("estado filtrado:", filteredEntities);
                    return filteredEntities;
                  });
                  resetDelete();
                  setSelectedIds([]);
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

  useEffect(() => {
    ListEntity("_id=10000", query)
      .then((data: any) => {
        if (data?.name === "AxiosError") {
          return;
        } else {
          // console.log("data", data);
          data &&
            setEntities((prev) =>
              prev ? [...prev, ...data] : data && [...data]
            );

          // const maxIdElement = data.reduce(
          //   (maxElement: number[], currentElement: any[]) => {
          //     const currentValue = currentElement[1];
          //     if (currentValue > maxElement[1]) {
          //       return currentElement;
          //     }
          //     return maxElement;
          //   },
          //   data[0]
          // );

          // setIntLastId((prevId) => {
          //   return maxIdElement[1];
          // });
          // console.log("masID:", maxIdElement[1]);
        }
      })
      .catch((e) => {
        return e;
      });
  }, [pageSize, onDelete]);

  // console.log("lastid", intLastId);

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
