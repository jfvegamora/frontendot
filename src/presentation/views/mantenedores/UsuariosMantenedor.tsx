/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  PrimaryButtonsComponent,
  PrimaryKeySearch,
  TableComponent,
} from "../../components";
import { useCrud, useEntityUtils } from "../../hooks";
import UserForm, {
  IUserInputData,
  transformInsertQuery,
  transformUpdateQuery,
} from "../forms/UserForm";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  table_head_usuarios,
} from "../../utils";

export enum EnumGrid {
  ID = 1,
  Nombre = 2,
  Telefono = 3,
  Correo = 4,
  Estado = 5,
  Cargo_id = 6,
  Cargo = 7,
}
const strEntidad = "Usuario ";
const strBaseUrl = "/api/usuarios/";
const strListUrl = "/api/cargos/";
const strQuery = "01";

const UsuariosMantenedor: React.FC = () => {
  const { createdEntity, editEntity, ListEntity } = useCrud(strBaseUrl);
  const [params, setParams] = useState([]);

  const updateParams = (newParams: any) => {
    setParams(newParams);
  };

  const {
    //entities state
    entities,
    setEntities,
    entity,
    //modal methods
    isModalInsert,
    isModalEdit,
    toggleEditModal,
    openModal,
    closeModal,
    setDataGrid,
    //Check methods
    handleSelect,
    selectedIds,
    setSelectedIds,
    handleSelectedAll,
    //primary buttons methods
    handleDeleteSelected,
    resetEntities,
    handlePageSize,
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entities:", entities);

  // console.log("params:", params);

  // const handleApiRequest = async (
  //   data: IUserInputData,
  //   isEditting: boolean,
  //   selectedIds: string
  // ) => {
  //   try {
  //     const transformedData = isEditting
  //       ? transformUpdateQuery(data, selectedIds)
  //       : transformInsertQuery(data);

  //     const response = isEditting
  //       ? await editEntity(transformedData)
  //       : await createdEntity(transformedData);

  //     handleApiResponse(response, isEditting);
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error);
  //   }
  // };

  const handleSaveChange = React.useCallback(
    async (data: IUserInputData, isEditting: boolean) => {
      //  const blnKeep = false //estado
      //   if(!blnKeep){
      //     const result = window.confirm("¿Quieres continuar Ingresando?");
      //     if(result){
      //         // agregar usuario         | handleApiRequest(data,isEditting, selectedIds.toString())
      //         // limpiar inputs          |
      //         // blnKeep = true
      //         // mantener modal abierto  | !closeModal()
      //     }else{
      //      //agregar usuario        | handleApiRequest(data,isEditting, selectedIds.toString())
      //     //cerrar modal            |  closeModal()
      //     }
      //   }
      try {
        // console.log("newData:", data);
        const transformedData = isEditting
          ? transformUpdateQuery(data, selectedIds.toString())
          : transformInsertQuery(data);
        const response = isEditting
          ? await editEntity(transformedData)
          : await createdEntity(transformedData);
        handleApiResponse(response, isEditting);
      } catch (error: any) {
        console.log(error);
        toast.error(error);
      }
    },
    [selectedIds, editEntity, createdEntity]
  );

  const handleApiResponse = React.useCallback(
    async (response: any, isEditting: boolean) => {
      const errorResponse = response?.response?.data.error;
      if (errorResponse) {
        const errorMessage =
          errorResponse === "IntegrityError"
            ? isEditting
              ? strEntidad.concat(ERROR_MESSAGES.delete)
              : strEntidad.concat(ERROR_MESSAGES.create)
            : errorResponse;
        toast.error(errorMessage);
      } else {
        toast.success(
          isEditting
            ? strEntidad.concat(SUCCESS_MESSAGES.edit)
            : strEntidad.concat(SUCCESS_MESSAGES.create)
        );
      }

      closeModal();

      console.log("params:", params);
      const newEntity = await ListEntity(params, "01");
      console.log("newEntity:", newEntity);
      setEntities(newEntity);
    },
    [setEntities, setDataGrid, params]
  );
  console.log("params:", params);
  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Usuarios</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          selectUrl={strListUrl}
          setParams={setParams}
          updateParams={updateParams}
          setEntities={setEntities}
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          handleRefresh={resetEntities}
          handlePageSize={handlePageSize}
          params={params}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={true}
        />
      </div>

      <>
        <TableComponent
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditModal={toggleEditModal}
          handleDeleteSelected={handleDeleteSelected}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          entidad={strEntidad}
          data={entities}
          tableHead={table_head_usuarios}
          showEditButton={true}
          showDeleteButton={true}
        />
      </>

      {isModalInsert && (
        <UserForm
          label={`Crear ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, false)}
          closeModal={closeModal}
          isEditting={false}
        />
      )}

      {isModalEdit && (
        <UserForm
          label={`Editar ${strEntidad}`}
          handleChange={(data) => handleSaveChange(data, true)}
          data={entity}
          closeModal={closeModal}
          isEditting={true}
        />
      )}
    </div>
  );
};

export default UsuariosMantenedor;
