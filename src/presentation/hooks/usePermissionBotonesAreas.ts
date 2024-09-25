import { AppStore, useAppSelector } from "../../redux/store";

export function usePermissionBotonesAreas() {
  const { OTAreas, OTAreaActual } = useAppSelector((store: AppStore) => ({
    OTAreas: store.OTAreas.areas,
    OTAreaActual: store.OTAreas.areaActual,
  }));

  console.log(OTAreaActual);
  console.log(OTAreas);
  return true;
}
