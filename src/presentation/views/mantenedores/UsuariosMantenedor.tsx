/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
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
  const { createdEntity, editEntity } = useCrud(strBaseUrl);

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
  } = useEntityUtils(strBaseUrl, strQuery);
  // console.log("entity", selectedIds);

  console.log("entities:", entities);

  const handleSaveChange = React.useCallback(
    async (data: IUserInputData, isEditting: boolean) => {
      try {
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
    (response: any, isEditting: boolean) => {
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
      setEntities([]);
      setDataGrid((prev) => !prev);
    },
    [setEntities, setDataGrid]
  );

  return (
    <div className="mantenedorContainer">
      <h1 className="mantenedorH1">Mantenedor de Usuarios</h1>

      <div className="mantenedorHead">
        <PrimaryKeySearch
          baseUrl={strBaseUrl}
          selectUrl={strListUrl}
          setState={setEntities as React.Dispatch<React.SetStateAction<any[]>>}
          primaryKeyInputs={[
            { name: "_p1", label: "Nombre", type: "text" },
            { name: "_p2", label: "Cargos", type: "select" },
          ]}
        />

        <PrimaryButtonsComponent
          handleAddPerson={openModal}
          handleDeleteSelected={handleDeleteSelected}
          strBaseUrl={strBaseUrl}
          showAddButton={true}
          showExportButton={true}
          showDeleteButton={true}
          showForwardButton={false}
          showRefreshButton={false}
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
