import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { MODAL, TITLES, validationOTNumeroEnvio } from "../../utils";
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';


interface IFOTEmpaque {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?:any;
    setSelectedRows?:any;
    params?:string[]
}

const strUrl = `${URLBackend}/api/proyectodocum/listado`


const FOTEmpaque: React.FC<IFOTEmpaque> = ({
    setSelectedRows,
    closeModal,
    pktoDelete
}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationOTNumeroEnvio()), })
    const [fechaHoraActual, _setFechaHoraActual]  = useState(new Date());
    const { showModal, CustomModal } = useModal();

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        if(pktoDelete.length < 1){
            return toast.error('No Hay OT Seleccionada')
        }

        if(!(parseInt(jsonData.numero_doc) >= 0)){
            return toast.error('Número de documento debe ser mayor a 0')
        }

        const proyectoPrimero = pktoDelete[0].proyecto;
        if (pktoDelete.some((ot:any) => ot.proyecto !== proyectoPrimero)) {
            toast.error('OT deben pertenecer al mismo proyecto');
            return;
        }



        // if(parseInt(pktoDelete[0]["numero_reporte_firma"]) !== 0){
        //     return toast.error(`OT ${pktoDelete[0]["folio"]} ya tiene un reporte de firma asignado `)
        // }

        if(parseInt(pktoDelete[0]["numero_envio"]) !== 0){
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene Número de envio asignado, ¿Desea agregar uno nuevo? `,
                '', 
                MODAL.keepYes,
                MODAL.kepNo
              );

            if(!result){
                return;
            }
        }

        console.log(pktoDelete)


       
        const toastLoading = toast.loading('Cargando...');

        try {
            const query07 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${8}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                _p2: jsonData["numero_doc"],
                _p3: pktoDelete[0]["proyecto_codigo"],
                _id: 8,
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))
            };
            let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
            const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)
            if (resultQuery07?.status === 200) {
                toast.success('Número de Envío generado')
                toast.dismiss(toastLoading)

                dispatch(fetchOT({ OTAreas:OTAreas, searchParams: paramsOT.value}))


            } else {
                toast.dismiss(toastLoading)
                toast.error('error: Número de envío')
            }
            setSelectedRows([])
            closeModal()
            toast.dismiss(toastLoading)
            
        } catch (error) {
            console.log(error)
            toast.error('Error número de Envío')
            toast.dismiss(toastLoading)
            throw error
        }


        // if ((pktoDelete.some((OT: any) => OT.estado_id !== 20 ))) {            
        //     pktoDelete.filter((ot:any)=> ot.estado_id !== 20).map((ot:any)=>{
        //         toast.error(`Folio: ${ot["folio"]} estado: ${ot["estado"]} `);
        //     })
        // }else{
        //     const year             = fechaHoraActual.getFullYear();
        //     const month            = String(fechaHoraActual.getMonth() + 1).padStart(2, '0'); 
        //     const day              = String(fechaHoraActual.getDate()).padStart(2, '0'); 
        //     const fechaFormateada  = `${year}/${month}/${day}`;
        //     const dateHora         = new Date().toLocaleTimeString();
        //     const tipoDocumento    = 8;            

        //     try {
        //         const query03 = {
        //             _p1: `"${pktoDelete[0] && pktoDelete[0]["proyecto_codigo"]}", "${fechaFormateada + " " + dateHora}", ${tipoDocumento}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"    `
        //         }
        //         const strUrl           = `${URLBackend}/api/proyectodocum/listado`
        //         let   queryURL03       = `?query=03&_p1=${query03["_p1"]}`
        //         const resultQuery03    = await axios(`${strUrl}/${queryURL03}`)
                
        //        const promises =  pktoDelete.map(async(OT:any)=>{
                    
        //             if(resultQuery03?.status === 200){
        //                 const query07 = {
        //                     _p2 :  jsonData["numero_doc"],
        //                     _pkToDelete: JSON.stringify({folio: OT["folio"]}),
        //                     _id: 8
        //                 }

        //                 let queryURL07 = `?query=07&_p2=${query07["_p2"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
        //                 const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)

        //                 if(resultQuery07?.status === 200){
        //                     toast.success('Numero de envío generado')
        //                     dispatch(fetchOT({OTAreas:90, searchParams:params}))

        //                 }else{
        //                     toast.error('Error: Numero de envío')
        //                 }     
        //             }
        //         })
        //         await Promise.all(promises);
        //         setSelectedRows([])
        //         closeModal()
        //     } catch (error) {
        //       console.log(error)
        //       throw error        
        //     }
        // }
    
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedRows([])
                closeModal()
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal]);

    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];
    // console.log('render')
    return (
        <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Asignación de Numero Envio</h1>
            </div>
            <div className=''>
                <button onClick={closeModal} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>
            <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                {/* <h1 className='text-2xl mt-2'>Asignación de Orden de Compra</h1> */}

                <div className="flex  items-center rowForm w-full">
                    <div className="w-[100%]">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={pktoDelete && pktoDelete[0] && pktoDelete[0]["proyecto"]}
                            onlyRead={true}
                        // handleChange={handleInputChange}
                        // data={formValues && formValues["rut"]}
                        // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>

                <div className="w-full flex items-center !h-20 rowForm !mt-16">
                    <div className="w-full ">
                        <TextInputComponent
                            type="number"
                            label="N° Documento"
                            name="numero_doc"
                            control={control}
                            error={errors.numero_doc}
                        />
                    </div>
                    <div className="w-full ">
                        <TextInputComponent
                            type="date"
                            label="Fecha Doc"
                            name="fecha_doc"
                            control={control}
                            data={fechaFormateada}
                            textAlign='text-center'
                            error={errors.fecha_doc}
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
                            isOptional={true}
                        // handleChange={handleInputChange}
                        // data={formValues && formValues["rut"]}
                        // error={errors.fecha_nacimiento}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <div className="w-[40%] mx-auto">
                        <button type="submit" tabIndex={1} className="userFormBtnSubmit">
                            {`${TITLES.aceptar}`}
                        </button>
                    </div>
                </div>
                <CustomModal />
            </form>

        </div>
    )
}

export default FOTEmpaque;