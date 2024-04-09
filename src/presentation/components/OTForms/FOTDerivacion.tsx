import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { MODAL, punto_venta, secondProcessBodega, tipo_de_anteojo, updateOT, validationMotivosOTSchema, validationNivel3 } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';
import axios from 'axios';
import { URLBackend } from '../../hooks/useCrud';
import { toast } from 'react-toastify';
import { useModal } from '../../hooks/useModal';
import { yupResolver } from '@hookform/resolvers/yup';
import { paramsOT } from '../../views/mantenedores/MOT';


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
    const schema = validationMotivosOTSchema()

    const {control, handleSubmit, formState:{errors}} = useForm<any>({
        resolver: yupResolver(schema)
    })
    const { showModal, CustomModal } = useModal();
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID:any = useAppSelector((store:AppStore)=> store.user?.id)
    const OTSlice:any = useAppSelector((store:AppStore)=>store.OTS)
    const dispatch = useAppDispatch();

    const { 
        validar_cristal1_od,
        validar_cristal1_oi, 
        validar_cristal2_od,
        validar_cristal2_oi
    } = formValues?.["cristales"] || {}

    const insumoCristales = [
        validar_cristal1_od,
        validar_cristal1_oi,
        validar_cristal2_od,
        validar_cristal2_oi
    ]
    
    const {
        validar_armazon1,
        validar_armazon2
    } = formValues?.["armazones"] || {}

    const insumoArmazones = [
        validar_armazon1,
        validar_armazon2
    ]
    const sumatoriaNivel3 = validationNivel3.value.reduce((index,objecto) => index + objecto.valor, 0);  



    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        // fetchDerivacion(jsonData)
        let promiseResponses:any = {}
        let validarCamposVacios = false
        let isDerivacion        = false

        // console.log(secondProcessBodega.value)
        // console.log(validationNivel3.value)
        // console.log(OTAreas["areaActual"])
      
        // console.log(secondProcessBodega.value)

        if(secondProcessBodega.value){

            validarCamposVacios = tipo_de_anteojo.value === '3' ? (sumatoriaNivel3  === 0 ? true : false ) : (sumatoriaNivel3 === 3 ? true : false)
    

            if(validarCamposVacios && OTAreas["areaActual"] === 60){
                const result = await showModal(
                    'Campos vacios, Quiere Continuar?',
                    '', 
                    MODAL.keepYes,
                    MODAL.kepNo
                  );

                if(result){
                    isDerivacion = true
                }
            }

            const cristalesJSON = insumoCristales
                                            .filter((insumo)=> insumo && insumo.trim() !== '')
                                            .map((insumo)=>(
                                                {
                                                    folio       : data && data[EnumGrid.folio],
                                                    punto_venta : punto_venta.value,
                                                    insumo      : insumo
                                                }
                                            ))
    
    
            const armazonesJSON = insumoArmazones
                                            .filter((insumo) => insumo && insumo.trim() !== '')
                                            .map((insumo)=>(
                                                {
                                                    folio        : data && data[EnumGrid.folio],
                                                    punto_venta  : punto_venta.value,
                                                    insumo       : insumo
                                                }
                                            ))
    
            const promesas = [
                axios(`${URLBackend}/api/cristaleskardex/listado/?query=06&_pkToDelete=${JSON.stringify(cristalesJSON)}`),
                axios(`${URLBackend}/api/armazoneskardex/listado/?query=06&_pkToDelete=${JSON.stringify(armazonesJSON)}`)
            ]
    
            promiseResponses = await Promise.all(promesas)
    
            
            for (const response of promiseResponses) {
                const [status, message] = response.data[0];
                if (status !== 0) {
                    toast.error(message,{
                        autoClose: 6500
                    });
                    
                }
    
            }
        }



        if(  isDerivacion  ||  !secondProcessBodega.value || (promiseResponses[0]?.data[0][0] === 0 && promiseResponses[1]?.data[0][0] === 0)){
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
                jsonData.observaciones,
                false,
                jsonData.situacion,
                false,
                'Derivada'
            ).then(()=>{
                closeModal()
                dispatch(fetchOT({OTAreas:OTAreas["areaActual"], searchParams: paramsOT.value}))
            })
        }
    
    }




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