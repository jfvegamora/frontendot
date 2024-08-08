import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { MODAL, TITLES, clearAllCheck } from "../../utils";
import { toast } from 'react-toastify';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOTGuiaSchema } from "../../utils/validationFormSchemas";
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';
import { Button } from "@material-tailwind/react";
import { URLBackend } from '../../utils/config';


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any;
    setSelectedRows?: any;
    params?: any
    otArchivo?: boolean
}

// const strUrlOT = `${URLBackend}/api/othistorica/listado`;


const FOTGuiaDespacho: React.FC<IDerivacion> = ({
    closeModal,
    pktoDelete,
    setSelectedRows,
    otArchivo
}) => {
    const strUrl = `${URLBackend}/api/proyectodocum/listado`;
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationOTGuiaSchema()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const [numeroGuia, setNumeroGuia] = useState(null);

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
    const dispatch = useAppDispatch();
    const { showModal, CustomModal } = useModal();

    const folios = pktoDelete.map((OT: any) => OT.folio)


    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        console.log(pktoDelete)
        console.log(jsonData)
        console.log(errors)

        const proyectoPrimero = pktoDelete[0].proyecto;
        if (pktoDelete.some((ot: any) => ot.proyecto !== proyectoPrimero)) {
            toast.error('OT deben pertenecer al mismo proyecto');
            return;
        }


        if (parseInt(pktoDelete[0]["numero_guia"]) !== 0) {
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene número de guia asignado, ¿Desea agregar uno nuevo? `,
                '',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
                return;
            }
        }

        if (otArchivo) {

            if (jsonData["numero_doc"] > 0) {
                if (!(parseInt(jsonData["numero_doc"]) >= 0)) {
                    return toast.error('Numero de documento debe ser mayor a 0')
                }
                if (pktoDelete.some((OT: any) => parseInt(OT["orden_compra"]) as any === '' || OT["orden_compra"] === '0')) {
                    pktoDelete.filter((ot: any) => ot["orden_compra"] <= 0).map((ot: any) => {
                        return toast.error(`Folio: ${ot["folio"]} sin Orden de Compra asignado.`);
                    })
                    return;
                }
            }

            if (jsonData["numero_doc"] === '0') {
                const validateNumeroFactura = pktoDelete.some((OT: any) => {
                    if (OT.numero_factura !== 0) {
                        return false;
                    }
                    return true;
                })

                if (!validateNumeroFactura) {
                    console.log(pktoDelete)
                    return toast.error(`Folio: ${folios} tiene Factura asignada.`)
                }
            }
        }


        const toastLoading = toast.loading('Cargando...');
        let tipo_documento = 4;
        try {
            const query07 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${tipo_documento}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                _p2: jsonData["numero_doc"],
                _p3: pktoDelete[0]["proyecto_codigo"],
                _id: otArchivo ? 4 : 9,
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => (
                    { 
                        folio: folioOT["folio"],
                        usuario: UsuarioID,
                        origen: OTAreas,
                        estado: `${folioOT.estado_id}`,
                        obs: `Asigna N° Guía: ${jsonData["numero_doc"]}` 
                    }
                )))
            };

            let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
            const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)

            // if (resultQuery07?.status === 200) {
            //     const query06 = {
            //         _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: 60, usuario: UsuarioID, observaciones: jsonData["observaciones"], boton: 3 })))
            //     }
            //     let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`

            //     await axios(`${strUrlOT}/${queryURL06}`).then(() => {
            //         toast.success('Guia generado')
            //         toast.dismiss(toastLoading)
            //         clearAllCheck.value = false;
            //         otArchivo ? (
            //             dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))

            //         ) : (
            //             dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }))
            //         )
            //     })

            // } else {
            //     toast.dismiss(toastLoading)
            //     toast.error('error: Guia')
            // }

            if(resultQuery07?.status === 200){
                toast.success('Número de Guía asignado.')
                toast.dismiss(toastLoading)
                clearAllCheck.value = false;
                otArchivo ? (
                    dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
    
                ) : (
                    dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }))
                )
                setSelectedRows([])
                closeModal()
                toast.dismiss(toastLoading)
            }
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


    // <h1 className='userFormLabel mx-auto  w-full '>Asignación de Guía Despacho</h1>

    return (
        <div className="useFormContainer centered-div w-[35rem]">
            {setNumeroGuia !== null && (
                <div className="">
                    <div className="userFormBtnCloseContainer">
                        <h1 className="userFormLabel mx-auto">Asignación de Guía Despacho</h1>
                        <button onClick={closeModal} className="userFormBtnClose mr-4">
                            X
                        </button>
                    </div>

                    <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                        <div className="userFormularioContainer">
                            <div className="input-container items-center rowForm">
                                <div className="labelInputDiv">
                                    <TextInputComponent
                                        type="text"
                                        label="Proyecto"
                                        name="proyecto"
                                        control={control}
                                        data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
                                        onlyRead={true}
                                        customWidth={"labelInput inputStyles"}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex items-center">
                                <div className="input-container items-center rowForm w-[50%]">
                                    <div className="labelInputDiv">
                                        <TextInputComponent
                                            type="number"
                                            label="N° Documento"
                                            name="numero_doc"
                                            data={numeroGuia}
                                            control={control}
                                            error={errors.numero_doc}
                                            customWidth={"labelInput inputStyles text-right"}
                                        />
                                    </div>
                                </div>
                                <div className="input-container items-center rowForm w-[50%]">
                                    <div className="labelInputDiv">
                                        <TextInputComponent
                                            type="date"
                                            label="Fecha Doc"
                                            name="fecha_doc"
                                            control={control}
                                            data={fechaFormateada}
                                            textAlign='text-center'
                                            error={errors.fecha_doc}
                                            customWidth={"labelInput inputStyles"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="input-container items-center rowForm">
                                <div className="labelInputDiv">
                                    <TextInputComponent
                                        type="text"
                                        label="Observaciones"
                                        name="observaciones"
                                        control={control}
                                        isOptional={true}
                                        customWidth={"labelInput inputStyles"}
                                    />
                                </div>
                            </div>

                            <div className="w-full !mt-5 !mb-5">
                                <div className="w-[50%] mx-auto">
                                    <Button type="submit" tabIndex={1} className="userFormBtnSubmit">
                                        {`${TITLES.aceptar}`}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <CustomModal />
                </div>
            )}

        </div>
    )
}

export default FOTGuiaDespacho




