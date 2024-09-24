import React from "react";
import { TextInputComponent } from "../forms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateOT, validationEmpaqueSchema } from "../../utils";
import { Button } from "@material-tailwind/react";
import { AppStore, useAppDispatch, useAppSelector } from "../../../redux/store";
import { toast } from "react-toastify";
import { paramsOT } from "../../views/mantenedores/MOT";
import { fetchOT } from "../../../redux/slices/OTSlice";

interface IFOTValidarEmpaque {
  onClose?: any;
  pkToDelete?: any;
  setSelectedRows?: any;
}

const FOTValidarEmpaque: React.FC<IFOTValidarEmpaque> = ({
  onClose,
  pkToDelete,
}) => {
  const schema = validationEmpaqueSchema();
  const dispatch = useAppDispatch();
  const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
  const User: any = useAppSelector((store: AppStore) => store.user.id);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (jsonData: any) => {
    console.log("click");
    console.log(jsonData);
    console.log(pkToDelete);
    let estado = "50";
    const toastLoading = toast.loading("Cargando....");
    const observaciones = `Retirado por ${jsonData?.nombre_beneficiario}`;

    try {
      pkToDelete.map(async (ot: any) => {
        await updateOT(
          [],
          OTAreas["areaActual"],
          OTAreas["areaSiguiente"],
          estado,
          [],
          ot,
          [],
          [],
          User,
          observaciones,
          true,
          0,
          false,
          "Procesada"
        ).then(() => {
          dispatch(
            fetchOT({
              OTAreas: OTAreas["areaActual"],
              searchParams: paramsOT.value,
            })
          );
          // toast.success('OTs Procesadas Correctamente',{
          //     autoClose: 900
          //  });
          // setSelectedRows([]);
          toast.dismiss(toastLoading);
          onClose();
        });
      });
    } catch (error) {
      toast.dismiss(toastLoading);
      console.log(error);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className=" bg-[#676f9d] mx-auto xl:w-[90%] xl:left-[35rem]  absolute top-[10vw] left-auto right-auto rounded-xl shadow-md overflow-hidden lg:left-[18rem]     sm:w-[25rem]    md:max-w-[35rem] z-40">
      <div className="absolute right-0 userFormBtnCloseContainer">
        <h1 className="userFormLabel text-center text-2xl text-white mr-[10rem] mb-7">
          Entrega de Anteojos
        </h1>
        <button onClick={onClose} className="userFormBtnClose mr-4">
          X
        </button>
      </div>

      <form
        className="mt-14"
        onSubmit={handleSubmit((data: any) => onSubmit(data))}
      >
        <div className=" rowForm px-3 py-3">
          <TextInputComponent
            type="text"
            label="RUT y Nombre quien retira"
            name="nombre_beneficiario"
            // handleChange={handleInputChange}
            isOT={true}
            // data={formValues && formValues["a1_armazon"]}
            control={control}
            textAlign="text-left"
            customWidth={"labelInput inputStyles"}
            error={errors.nombre_beneficiario}
            // inputRef={inputsRef.a1_armazon}
            // validarBodega={true}
          />
        </div>
        <div className="ml-1">
          <Button type="submit" color="green" className="otActionButton mx-4">
            Procesar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FOTValidarEmpaque;
