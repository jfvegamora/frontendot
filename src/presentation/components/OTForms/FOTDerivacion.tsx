import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { updateOT } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';


interface IDerivacion {
    data?:any;
    onClose?: any;
    formValues:any;
    closeModal:any
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
    formValues
}) => {
    const {control, handleSubmit} = useForm<FormData>()
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        // fetchDerivacion(jsonData)
        updateOT(
            jsonData,
            OTAreas["areaActual"],
            jsonData.area_hasta.toString() as any,
            40,
            formValues,
            data,
            OTSlice.cristales, 
            OTSlice.armazones,
            UsuarioID.toString(),
            jsonData.observaciones
        ).then(()=>{
            closeModal()
            dispatch(fetchOT({OTAreas:OTAreas["areaActual"]}))
        })
    
    
    }
  return (
    <div className='useFormContainer useFormDerivacion h-[55%] w-[60%] left-[20%] top-[30%] z-30'>
        <div className=" flex justify-end w-full">
            <h2 className='text-2xl cursor-pointer' onClick={onClose}>X</h2>
        </div>
        <form className='text-center  !h-[80%]' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='text-2xl mt-2'>Derivación de OT</h1>

                <div className="flex  items-center rowForm w-full">
                    <div className="w-[25%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                        />
                    </div>
                    <div className="w-[35%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
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
                    <Button  type="submit" className='otActionButton bg-red-900'>Derivar</Button>
                </div>
        </form>

    </div>
  )
}

export default FOTDerivacion