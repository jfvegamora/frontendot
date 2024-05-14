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


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any;
    setSelectedRows?: any;
    params?:any
    otArchivo?:boolean
}

const strUrl    = `${URLBackend}/api/proyectodocum/listado`;
const strUrlOT  = `${URLBackend}/api/othistorica/listado`;


const FOTGuiaDespacho: React.FC<IDerivacion> = ({
    closeModal,
    pktoDelete,
    setSelectedRows,
    otArchivo
}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationOTGuiaSchema()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const [numeroGuia, setNumeroGuia] = useState(null);

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
    const dispatch = useAppDispatch();
    const { showModal, CustomModal } = useModal();


    const onSubmit: SubmitHandler<any> = async (jsonData) => {

     

        const proyectoPrimero = pktoDelete[0].proyecto;
        if (pktoDelete.some((ot:any) => ot.proyecto !== proyectoPrimero)) {
            toast.error('OT deben pertenecer al mismo proyecto');
            return;
        }
        

        if(parseInt(pktoDelete[0]["numero_guia"]) !== 0){
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene número de guia asignado, ¿Desea agregar uno nuevo? `,
                '', 
                MODAL.keepYes,
                MODAL.kepNo
              );
      
            if(!result){
                return;
            }
        }

        if(otArchivo){
            // if (pktoDelete.some((OT: any) => OT["orden_compra"] <= 0)) {

            if(jsonData["numero_doc"] > 0){
                if(!(parseInt(jsonData["numero_doc"]) >= 0)){
                    return toast.error('Numero de documento debe ser mayor a 0')
                }
    
                if (pktoDelete.some((OT: any) => parseInt(OT["orden_compra"]) as any === '' || OT["orden_compra"] === '0') ) {
                pktoDelete.filter((ot: any) => ot["orden_compra"] <= 0).map((ot: any) => {
                    return toast.error(`Folio: ${ot["folio"]} sin Orden de Compra`);
                })
                return;        
            }
           
        }    
        }
        
        
        const toastLoading = toast.loading('Cargando...');
        
        try {
                const query07 = {
                    _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${4}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                    _p2: jsonData["numero_doc"],
                    _p3: pktoDelete[0]["proyecto_codigo"],
                    _id: otArchivo ? 4 : 9,
                    _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))
                };

                let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
                const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)

                if (resultQuery07?.status === 200) {
                    const query06 = {
                        _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: 70, usuario: UsuarioID, observaciones: jsonData["observaciones"], boton:3})))
                    }   
                    let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`
                    
                    await axios(`${strUrlOT}/${queryURL06}`).then(()=>{
                        toast.success('Guia generado')
                        toast.dismiss(toastLoading)
                        otArchivo ? (
                            dispatch(fetchOT({ historica:true, searchParams: paramsOT.value}))
    
                        ) : (
                            dispatch(fetchOT({ OTAreas:OTAreas, searchParams: paramsOT.value}))
                        )
                    })
                    
                } else {
                    toast.dismiss(toastLoading)
                    toast.error('error: Guia')
                }
                setSelectedRows([])
                closeModal()
                toast.dismiss(toastLoading)
            } catch (error) {
                console.log(error)
                toast.error('Error Guia')
                toast.dismiss(toastLoading)
                throw error
            }
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

            {setNumeroGuia !== null && (
    
            <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
            <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Asignación de Guía Despacho</h1>
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
                        name="numero_doc"
                        data={numeroGuia}
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

export default FOTGuiaDespacho




