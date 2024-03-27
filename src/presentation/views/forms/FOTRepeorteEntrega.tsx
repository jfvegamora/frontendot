import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { MODAL, TITLES } from "../../utils";
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOTGuiaSchema } from "../../utils/validationFormSchemas";
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';


interface Interface {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any
    setSelectedRows?: any
}




const FOTReporteEntrega: React.FC<Interface> = ({
    closeModal,
    pktoDelete,
    setSelectedRows
}) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<any>({ resolver: yupResolver(validationOTGuiaSchema()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());

    const [numeroRepEntrega, setNumeroRepEntrega] = useState(null);
    // const { control, handleSubmit } = useForm<any>()
    // const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const dispatch = useAppDispatch();
    const { showModal, CustomModal } = useModal();

    const fetchNumeroRepEntrega = async() => {
        try {
            const query = {
              _proyecto   :    pktoDelete[0]["proyecto_codigo"],
              _pkToDelete :   pktoDelete[0]["folio"],
              _id         :   1,
              _usuario    :   UsuarioID
            }
      
      
            const strUrl      = `${URLBackend}/api/proyectodocum/listado`
            const queryURL    = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
            const result      = await axios(`${strUrl}/${queryURL}`);

            if(result.status === 200){
              setNumeroRepEntrega(result.data[0][0])
              setValue('numero_doc', result.data[0][0])
            }
          } catch (error) {
            // toast.dismiss(toastLoading)
            console.log(error)
            throw error;
          }      
    }







    React.useEffect(()=>{
        const toastLoading = toast.loading('Cargando...');
        console.log(pktoDelete)
        fetchNumeroRepEntrega().then(()=>{
            toast.dismiss(toastLoading)
        })

         
    },[])

    const onSubmit: SubmitHandler<any> = async (jsonData) => {
        if(pktoDelete.length < 1){
            return toast.error('No Hay OT Seleccionada')
        }

        if(jsonData["numero_doc"] <= 0){
            return toast.error('Numero de documento debe ser mayor a 0')
        }
        const toastLoading = toast.loading('Cargando...');

        console.log(pktoDelete)


        try {
            const query03 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${1}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"    `
            }

            const query07 = {
                _id: 1,
                _p2: jsonData["numero_doc"],
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))

            }

            console.log(query03)
            console.log(query07)

            const strUrl = `${URLBackend}/api/proyectodocum/listado`
            let queryURL03 = `?query=03&_p1=${query03["_p1"]}`
            const resultQuery03 = await axios(`${strUrl}/${queryURL03}`)

            console.log(resultQuery03)
            if (resultQuery03?.status === 200) {
                let queryURL07 = `?query=07&_p2=${query07["_p2"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
                    const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)
                    
                    console.log(resultQuery07)
                    if (resultQuery07?.status === 200) {
                        toast.success('Reporte de Entrega generado')
                        dispatch(fetchOT({ historica: true, searchParams: paramsOT.value}))
                        toast.dismiss(toastLoading)
                        setSelectedRows([])
                        closeModal()
                    } else {
                        toast.error('error: Reporte de entrega')
                    
                    }
                    
            }
        } catch (error) {
            console.log(error)
            throw error
        }

        // if(parseInt(pktoDelete[0]["numero_guia"]) !== 0){
        //     const result = await showModal(
        //         `OT: ${pktoDelete[0]["folio"]} Tiene Reporte de atención asignado, ¿Desea agregar uno nuevo? `,
        //         '', 
        //         MODAL.keepYes,
        //         MODAL.kepNo
        //       );
      
        //     if(!result){
        //         return;
        //     }
        // }

        




        // if (pktoDelete.some((OT: any) => OT["reporte_atencion"] <= 0)) {
        //     pktoDelete.filter((ot: any) => ot["reporte_atencion"] <= 0).map((ot: any) => {
        //         toast.error(`Folio: ${ot["folio"]} sin Reporte de atencion`);
        //     })
        // } else {
         

        //     try {

        //         const query03 = {
        //             _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${4}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"    `
        //         };

        //         const query07 = {
        //             _id: 4,
        //             _p2: jsonData["numero_doc"],
        //             _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))

        //         }

        //         console.log(query03);
        //         console.log(query07);

        //         const strUrl = `${URLBackend}/api/proyectodocum/listado`
        //         let queryURL03 = `?query=03&_p1=${query03["_p1"]}`
        //         const resultQuery03 = await axios(`${strUrl}/${queryURL03}`)


        //         if (resultQuery03?.status === 200) {
        //             //TODO: EJECUTAR QUERY 07 PARA ASIGNAR ORDEN DE COMPRA A OT SELECCIONADA (1 O N OTS)
        //             let queryURL07 = `?query=07&_p2=${query07["_p2"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
        //             const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)

        //             if (resultQuery07?.status === 200) {
        //                 toast.success('Orden de Compra generado')
        //                 dispatch(fetchOT({ historica: true, searchParams: paramsOT.value}))

        //             } else {
        //                 toast.error('error: Orden de compra')
        //             }

        //             setSelectedRows([])
        //             closeModal()
        //         }

        //     } catch (error) {
        //         console.log(error)
        //         throw error
        //     }

        // }
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

    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];



    return (
        <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
            {numeroRepEntrega !== null && (
                <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>

                <div className="userFormBtnCloseContainer flex ">
                    <div className='w-[50%] mx-auto !text-center  '>
                        <h1 className='userFormLabel mx-auto  w-full '>Asignación Reporte de Entrega</h1>
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
                                data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
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
                                data={numeroRepEntrega}
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
                        <CustomModal/>
                    </div>
                
                </form>
                
                </div>
            )}
        </div>
    )
}

export default FOTReporteEntrega;






