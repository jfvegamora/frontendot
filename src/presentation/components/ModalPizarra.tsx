import React, { lazy, Suspense } from "react";
import { useEntityUtils } from "../hooks";
import TableComponent2 from "./TableComponent2";
import { table_head_OT_diaria2, TITLES } from "../utils";
import { AppStore, useAppSelector } from "../../redux/store";
// import { EnumAreas } from "./OTPrimaryButtons";
import { OTAreasEnum } from "../Enums";

const FOT = lazy(() => import("../views/forms/FOT"));

interface IModalPizarra {
  onClose: () => void;
  data: any;
}

const ModalPizarra: React.FC<IModalPizarra> = ({ onClose, data }) => {
  const TotalOT: any = useAppSelector(
    (store: AppStore) => store.OTS.data.length
  );

  const strEntidad = React.useMemo(() => " ", []);

  const strBaseUrl = React.useMemo(() => "/api/ot/", []);
  const strQuery = React.useMemo(() => "14", []);

  const {
    handleSelect,
    handleSelectedAll,
    selectedRows,
    setSelectedRows,
    toggleEditOTModal,
    isModalEdit,
    closeModal,
    entity,
    setEntities,
  } = useEntityUtils(strBaseUrl, strQuery);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isModalEdit) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="!z-30 w-[65vw] h-[40vw] bg-[#676f9d] absolute top-[3vw] left-[15vw] rounded-2xl">
      <div className="absolute right-0 userFormBtnCloseContainer">
        <h1 className=" flex  !w-[50vw]  text-4xl text-white  mb-5 -translate-x-[10vw] mt-10">
          Reporte:
          <span className="text-orange-300 ml-2 mr-10">
            {data && data["reporteAtencion"]}
          </span>
          Total:
          <span className="text-orange-300 mr-10 ml-2">{TotalOT}</span>
          Area:
          <span className="text-orange-300 ml-2">
            {OTAreasEnum[data["area"]]}
          </span>
        </h1>
        <button
          onClick={() => {
            // resetFields();
            // handleClose();
            onClose();
          }}
          className=" cursor-pointer userFormBtnClose mr-8"
        >
          X
        </button>
      </div>

      <div className="w-[95%] mx-auto overflow-x-scroll !mt-[8rem] h-[30vw] overflow-y-scroll bg-white">
        <TableComponent2
          handleSelectChecked={handleSelect}
          handleSelectedCheckedAll={handleSelectedAll}
          toggleEditOTModal={toggleEditOTModal}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          entidad={strEntidad}
          tableHead={table_head_OT_diaria2}
          idMenu={28}
          isOT={true}
        />
      </div>

      <Suspense>
        {isModalEdit && (
          <div className="absolute top-[-3vw] left-[-15vw] z-30 !bg-red-400 w-[100vw] h-[100vh] ">
            <FOT
              label={`${TITLES.edicion} ${strEntidad}`}
              selectedRows={selectedRows}
              setEntities={setEntities}
              // params={params}
              data={entity}
              closeModal={closeModal}
              isEditting={true}
              onlyRead={true}
              isMOT={false}
              idMenu={200}
              permisos_ot_historica={{
                permisoPostVenta: false,
                permisoAnular: false,
              }}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default ModalPizarra;
