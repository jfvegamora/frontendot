import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { A1_CR_OD, A1_CR_OI, A2_CR_OD, A2_CR_OI, a1_armazon, a2_armazon, codigoProyecto, punto_venta } from '../../utils';
import { paramsOT } from '../../views/mantenedores/MOT';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { URLBackend } from '../../utils/config';


interface IAnulacion {
    data?:any;
    onClose?: any;
    formValues?:any;
    closeModal?:any;
    otHistorica?:any;
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
    formValues:any;
  
}

const FOTAnulacion:React.FC<IAnulacion> = ({
    data,
    onClose,
    closeModal,
    otHistorica
    // formValues,
}) => {
    const {control, handleSubmit} = useForm<FormData>()
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id);
    const dispatch = useAppDispatch();
    // const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    // const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<FormData> = async(_jsonData) =>{
        try {
            const strUrl   = otHistorica ? `${URLBackend}/api/othistorica/listado` : `${URLBackend}/api/ot/listado`
            const _folio   = data && data[EnumGrid.folio]
            const _estado  = 80
            const userID   = UsuarioID
            const _origen  = otHistorica ? 110 :  OTAreas["areaActual"]
            let pktoDeleteJSON = [{}]

            if(otHistorica){
                pktoDeleteJSON = [{
                    query        : "05",
                    estado      : _estado,
                    folio       : _folio,
                    usuario     : userID,
                    origen      : _origen,
                    situacion   : _jsonData.situacion,
                    obs         : _jsonData.observaciones


                }]
            }

            const armazones = [
               {codigo: a1_armazon.value},
               {codigo: a2_armazon.value}
            ].filter((armazon)=>armazon.codigo !== '')

            
            const cristales = [
                {codigo: A1_CR_OD.value},
                {codigo: A1_CR_OI.value},
                {codigo: A2_CR_OD.value},
                {codigo: A2_CR_OI.value}
            ].filter((cristal) => cristal.codigo !== '')

            console.log(cristales)
            console.log(codigoProyecto.value)
            console.log(punto_venta.value)
            console.log(strUrl)

              const query = 
                    otHistorica
                           ?  `?query=05&_pkToDelete=${encodeURIComponent(JSON.stringify(pktoDeleteJSON))}`
                           :  `?query=05&_folio=${_folio}&_estado=${_estado}&_proyecto=${codigoProyecto.value}&_punto_venta=${punto_venta.value}&_usuario=${userID}&_origen=${_origen}&_situacion=${_jsonData.situacion}&_cristalJSONOri=${JSON.stringify(cristales)}&_armazonJSONOri=${JSON.stringify(armazones)}`
              
              const result = await axios(`${strUrl}/${query}`);
              if(result.status === 200){
                  otHistorica ? (
                      dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
                      
                    ) : (
                        dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }))
                    )
                    toast.success('OT anulada ')
              }
              onClose()
              closeModal()
          } catch (error) {
              console.log(error)
              throw error
          }
    
    }



  return (
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        <div className="userFormBtnCloseContainer flex">
            <div className="w-[50%] mx-auto !text.center">
                <h1 className='userFormLabel'>Anulación de OT</h1>
            </div>
            <div className="">
                <button onClick={onClose} className="userFormBtnClose mr-4">
                    X
                </button>
            </div>
        </div>

        <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className=" w-full flex items-center rowForm">
                    <div className="w-[70%] ml-4">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            customWidth={"labelInput inputStyles"}
                        />
                    </div>
                    <div className="w-[30%] mr-4">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            textAlign="text-center"
                            customWidth={"labelInput inputStyles"}
                        />
                    </div>
                </div>

                <div className=" w-full flex items-center rowForm">
                    <div className="w-full ml-4">
                        <TextInputComponent
                            type="text"
                            label="Nombre Cliente"
                            name="nombre_cliente"
                            control={control}
                            data={data && data[EnumGrid.cliente_nomnbre]}
                            onlyRead={true}
                            customWidth={"labelInput inputStyles !w-[38.5vw]"}
                        />
                    </div>
                </div>


                <div className="input-container ml-5 mt-4 items-center rowForm ">
                {/* <div className="w-full flex items-center rowForm"> */}
                    <div className="w-full  ">
                        <SelectInputComponent
                            label="Situacion"
                            name="situacion"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            entidad={["/api/otmotivoanulacion/", "02", "60"]}
                            customWidth={"labelInput inputStyles w-[41.2vw]"}
                        />
                    </div>
                </div>

                <div className=" w-full flex ml-4 items-center rowForm">
                    <div className="w-full">
                        <TextInputComponent
                            type="text"
                            label="Observaciones"
                            name="observaciones"
                            control={control}
                            customWidth={"labelInput inputStyles !w-[38.5vw]"}
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