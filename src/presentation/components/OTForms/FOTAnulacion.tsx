import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { URLBackend } from '../../hooks/useCrud';


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

const FOTAnulacion:React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
}) => {
    const {control, handleSubmit} = useForm<FormData>()
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    // const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    // const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<FormData> = async(_jsonData) =>{
        try {
            const strUrl = `${URLBackend}/api/ot/listado`
            const _folio = data && data[EnumGrid.folio]
            const _estado = data && data[EnumGrid.estado_id]
            const userID =  UsuarioID
            const _origen = OTAreas["areaActual"]
      
              console.log('click')
      
              const query = `?query=05&_folio=${_folio}&_estado=${_estado}&_usuario=${userID}&_origen=${_origen}`
              const result = await axios(`${strUrl}/${query}`);
              console.log(result)
              if(result.status === 200){
                  toast.success('OT anulada ')
              }
              onClose()
          } catch (error) {
              // console.log(error)
              throw error
          }
    
    }



  return (
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        <div className="userFormBtnCloseContainer flex">
            <div className="w-[50%] mx-auto !text.center">
                <h1 className='userFormLabel'>Anulacion de OT</h1>
            </div>
            <div className="">
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>

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
                            entidad={["/api/otmotivoanulacion/", "02", "60"]}
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
                            isOptional={true}
                            />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button  type="submit" className='otActionButton bg-black'>Anular</Button>
                </div>
        </form>

    </div>
  )
}

export default FOTAnulacion;