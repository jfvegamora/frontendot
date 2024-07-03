import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { clearAllCheck, clearIndividualCheck, updateOT, validationMotivosOTSchema, validationNivel1 } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';
// import { toast } from 'react-toastify';
import { useModal } from '../../hooks/useModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { paramsOT } from '../../views/mantenedores/MOT';
import { OTGrillaEnum } from '../../Enums';
import { handleActionOTButtons } from '../../utils/FOTPendiente_utils';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any;
    isMasivo?:boolean;
}



interface FormData{
    proyecto_codigo: undefined;
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;

    area_desde:string;
    area_hasta:string;
    situacion:string
    observaciones:string;
    formValues:any
}

const FOTDerivacion:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    closeModal,
    formValues,
    isMasivo
}) => {
    const schema = validationMotivosOTSchema()

    const {control, handleSubmit, formState:{errors}} = useForm<any>({
        resolver: yupResolver(schema)
    })
    const { CustomModal } = useModal();
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    const dispatch = useAppDispatch();

    
    let EnumDerivacion:any;
    let dataDerivacion:any;

    if(isMasivo){
        EnumDerivacion = OTGrillaEnum
        dataDerivacion = data
    }else{
        EnumDerivacion = EnumGrid
        dataDerivacion = data
    }
    
    
    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        let estado = 40;

        if(isMasivo){
            let usuarioID = data[0]["usuario_id"]
            const folios = data.map((dataOT:any)=>dataOT.folio).join(',')

            const response:any = await handleActionOTButtons(
                folios,
                estado,
                jsonData?.situacion,
                OTAreas["areaActual"],
                jsonData.area_hasta.toString() as any,
                jsonData?.observaciones,
                usuarioID
            )

            if(response?.status === 200){
                onClose();
                dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}));
                clearAllCheck.value = false;
                clearIndividualCheck.value = true;
            }

        }else{
            const sumatoriaNivel1 = validationNivel1.value.reduce((index, objeto) => index + objeto.valor, 0);
            let estadoValidacion    = sumatoriaNivel1 === validationNivel1.value.length;
    
            updateOT(
                jsonData,
                OTAreas["areaActual"],
                jsonData.area_hasta.toString() as any,
                estado,
                formValues,
                data,
                OTSlice.cristales, 
                OTSlice.armazones,
                UsuarioID.toString(),
                jsonData.observaciones,
                false,
                jsonData.situacion,
                false,
                'Derivada',
                estadoValidacion
            ).then(()=>{
                closeModal()
                dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
                clearAllCheck.value = false;
            })
        }
        
    
    }

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
      }, [closeModal]);


    console.log(data)
  console.log(OTAreas["areas"].filter((areas:any)=>areas[1] ===  OTAreas["areaActual"])[0][2])
  return (
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        <div className="userFormBtnCloseContainer flex">
            <div className="w-[50%] mx-auto !text.center">
                <h1 className='userFormLabel'>Derivación de OT</h1>
            </div>
            <div className="">
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>

        <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full flex items-center rowForm">
                    <div className={`${isMasivo ? "w-[100%]" : "w-[70%]"}`}>
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={isMasivo ? dataDerivacion && dataDerivacion[0]?.proyecto : data && data[EnumDerivacion.proyecto_titulo]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                    {!isMasivo && (
                        <div className="w-[30%]">
                            <TextInputComponent
                                type="text"
                                label="Folio OT"
                                name="folio_ot"
                                control={control}
                                data={data && data[EnumDerivacion.folio]}
                                onlyRead={true}
                                textAlign="text-center"
                                customWidth={"mt-[2rem]"}
                            />
                        </div>
                    ) }
                </div>
                
                {!isMasivo && (
                    <div className=" w-full flex items-center rowForm">
                        <div className="w-full">
                            <TextInputComponent
                                type="text"
                                label="Nombre Cliente"
                                name="nombre_cliente"
                                control={control}
                                data={data && data[EnumDerivacion.cliente_nomnbre]}
                                onlyRead={true}
                                customWidth={"mt-[2rem]"}
                            />
                        </div>
                    </div>
                )}

                <div className="w-full flex items-center rowForm">
                    <div className="w-[50%]">
                        <TextInputComponent
                            type="text"
                            label="Área desde"
                            name="area_desde"
                            control={control}
                            data= {isMasivo ? (OTAreas["areas"].filter((areas:any)=>areas[1] ===  OTAreas["areaActual"])[0][2]) : data && data[EnumDerivacion.area]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                    <div className="w-[50%]">
                        <SelectInputComponent
                            label="Área hasta"
                            name="area_hasta"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            entidad={["/api/tipos/", "02", "OTAreas"]}
                            customWidth={"mr-[-1rem] mt-[2rem]"}
                            error={errors.area_hasta}

                        />
                    </div>
                </div>

                <div className="input-container items-center rowForm ">
                {/* <div className="w-full flex items-center rowForm"> */}
                    <div className="w-full  ">
                        <SelectInputComponent
                            label="Situacion"
                            name="situacion"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            entidad={["/api/otmotivoderivacion/", "02", "60"]}
                            customWidth={"w-[] ml-[1rem] mr-[-1rem] mt-[2rem]"}
                            error={errors.situacion}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-full">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            customWidth={"mt-[2rem]"}
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button  type="submit" className='otActionButton bg-red-900'>Derivar</Button>
                </div>

                <CustomModal />
        </form>

    </div>
  )
}

export default FOTDerivacion