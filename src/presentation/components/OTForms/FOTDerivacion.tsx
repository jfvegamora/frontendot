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
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        <div className="userFormBtnCloseContainer">
            <button onClick={closeModal} className="userFormBtnClose">
                X
            </button>
        </div>
        <h1 className='userFormLabel'>Derivación de OT</h1>

        <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full flex items-center rowForm">
                    <div className="w-[30%]">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            textAlign="text-center"
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                    <div className="w-[70%]">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-full">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            customWidth={"mt-[2rem]"}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center rowForm">
                    <div className="w-[50%]">
                        <TextInputComponent
                            type="text"
                            label="Área desde"
                            name="area_desde"
                            control={control}
                            data= {data && data[EnumGrid.area]}
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
                            entidad={["/api/tipos/", "02", "OTSituaciones"]}
                            customWidth={"w-[] ml-[1rem] mr-[-1rem] mt-[2rem]"}
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
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button  type="submit" className='otActionButton bg-red-900'>Derivar</Button>
                </div>
        </form>

    </div>
  )
}

export default FOTDerivacion