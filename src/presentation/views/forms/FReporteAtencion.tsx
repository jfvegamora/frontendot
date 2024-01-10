import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
// import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { updateOT } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { SelectInputComponent, TextInputComponent } from '../../components';
import { toast } from 'react-toastify';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any
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

const FReporteAtencion:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    closeModal,
    formValues
}) => {
    const {control, handleSubmit} = useForm<FormData>()
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        // fetchDerivacion(jsonData)
        // updateOT(
        //     jsonData,
        //     OTAreas["areaActual"],
        //     jsonData.area_hasta.toString() as any,
        //     40,
        //     formValues,
        //     data,
        //     OTSlice.cristales, 
        //     OTSlice.armazones,
        //     UsuarioID.toString(),
        //     jsonData.observaciones
        // ).then(()=>{
        //     closeModal()
        //     dispatch(fetchOT({OTAreas:OTAreas["areaActual"]}))
        // })
        
        const result = validarEstadoOT()
        console.log(result)
        if(Array.isArray(result)){
            toast.error(`folio: ${result}`)
        }

        if(result){

        }
    
    }

    const validarEstadoOT = (posicionCampo?:number, nombreCampo?:string ) => {
        console.log(OTSlice.data)
        return OTSlice.data.map((OT:any)=>{
            const estado = OT[3]
            console.log(estado)
            if(estado !== 'Entregado'){
                return OT[1]
            }
            return true
        })
        
    }



    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === "Escape") {
            closeModal()
          }
        };
      
        window.addEventListener("keydown", handleKeyDown);
      
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [closeModal]);
      
  return (
    <div className='useFormContainer useFormDerivacion h-[55%] w-[60%] left-[20%] top-[30%] z-30'>
        <div className=" flex justify-end w-full">
            <h2 className='text-2xl cursor-pointer' onClick={closeModal}>X</h2>
        </div>
        <form className='text-center  !h-[80%]' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl mt-2'>Reporte de Atencion</h1>

                <div className="flex  items-center rowForm w-full">
                    <div className="w-[50%] ml-4">
                        <SelectInputComponent
                            label="Proyecto"
                            name="proyecto"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/proyecto/", "02"]}
                            customWidth={"w-full ml-4"}
                            // error={errors.establecimiento}
                            // customWidth={"345px"}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center !h-20 rowForm !mt-16">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Área desde"
                            name="area_desde"
                            control={control}
                            data= {data && data[EnumGrid.area]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[20%] ml-7 mr-16">
                        <SelectInputComponent
                            label="Área hasta"
                            name="area_hasta"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTAreas"]}
                            customWidth={"w-[20.8rem]"}
                            // error={errors.establecimiento}
                            // customWidth={"345px"}
                        />
                    </div>
                    <div className="w-[20%] ml-[4.8rem]    ">
                        <SelectInputComponent
                            label="Situacion"
                            name="situacion"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTSituaciones"]}
                            // error={errors.establecimiento}
                            customWidth={"w-[20.6rem] ml-4"}
                            // customWidth={"345px"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-[98%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className=' w-full flex justify-end mx-[-1.5rem] h-12'>
                    <Button  type="submit" className='otActionButton bg-green-600'>Generar Reporte</Button>
                </div>
        </form>

    </div>
  )
}

export default FReporteAtencion