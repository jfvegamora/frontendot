import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { clearAllCheck, MODAL, TITLES } from "../../utils";
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationOTGuiaSchema } from "../../utils/validationFormSchemas";
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';
import { Button } from "@material-tailwind/react";
// import { validationStateOT } from '../../components/OTPrimaryButtons';


interface Interface {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any
    setSelectedRows?: any
    otArchivo?: boolean

}


const strUrl = `${URLBackend}/api/proyectodocum/listado`;
// const strUrlOT = `${URLBackend}/api/othistorica/listado`;




const FOTReporteEntrega: React.FC<Interface> = ({
    closeModal,
    pktoDelete,
    setSelectedRows,
    otArchivo
}) => {
    const { control, handleSubmit, formState: { errors }, setValue } = useForm<any>({ resolver: yupResolver(validationOTGuiaSchema()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());

    const [numeroRepEntrega, setNumeroRepEntrega] = useState(null);
    // const { control, handleSubmit } = useForm<any>()
    // const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);

    const dispatch = useAppDispatch();
    const { showModal, CustomModal } = useModal();

    const fetchNumeroRepEntrega = async () => {
        try {
            const query = {
                _proyecto: pktoDelete[0]["proyecto_codigo"],
                _pkToDelete: pktoDelete[0]["folio"],
                _id: 1,
                _usuario: UsuarioID
            }


            const strUrl = `${URLBackend}/api/proyectodocum/listado`
            const queryURL = `?query=06&_p2=${query["_proyecto"]}&_id=${query["_id"]}&_pkToDelete=${query["_pkToDelete"]}&_p4=${query["_usuario"]}`
            const result = await axios(`${strUrl}/${queryURL}`);

            if (result.status === 200) {
                setNumeroRepEntrega(result.data[0][0])
                setValue('numero_doc', result.data[0][0])
            }
        } catch (error) {
            // toast.dismiss(toastLoading)
            console.log(error)
            throw error;
        }
    }

    React.useEffect(() => {
        const toastLoading = toast.loading('Cargando...');
        fetchNumeroRepEntrega().then(() => {
            toast.dismiss(toastLoading)
        })
    }, [])


    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        console.log(pktoDelete)

        if (pktoDelete.length < 1) {
            return toast.error('No Hay OT Seleccionada')
        }

        if (!(parseInt(jsonData["numero_doc"]) >= 0)) {
            return toast.error('Numero de documento debe ser mayor a 0')
        }

        if (pktoDelete.some((ot: any) => ot.estado !== 'Entregada' && ot.estado !== 'Cerrada')) {
            toast.error(`OT debe estar Entregada o Cerrada `);
            return;
        }

        if (parseInt(pktoDelete[0]["reporte_atencion"]) !== 0) {
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} tiene Reporte de Entrega asignado  ¿Desea modificarlo? `,
                '',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
                return;
            }
        }

        const toastLoading = toast.loading('Cargando...');
        console.log(jsonData["numero_doc"])
        try {
            console.log('render')
            const query07 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${1}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${0}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                _p2: jsonData["numero_doc"],
                _p3: pktoDelete[0]["proyecto_codigo"],
                _id: 1,
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))

            }

            let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
            const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)
            if(resultQuery07?.status === 200){
                toast.success('Número reporte asignado')
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
            // if (resultQuery07?.status === 200) {
            //     const query06 = {
            //         _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: (jsonData["numero_doc"] === '0' ? 50 : 60), usuario: UsuarioID, observaciones: jsonData["observaciones"], boton: 1 })))
            //     }
            //     let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`

            //     await axios(`${strUrlOT}/${queryURL06}`).then(() => {
            //         toast.dismiss(toastLoading)
            //         toast.success('Número de Envío generado')
            //         closeModal();
            //         dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
            //     })
            // } else {
            //     toast.dismiss(toastLoading)
            //     toast.error('error: Número de envío')
            // }
            setSelectedRows([])
            closeModal()
            toast.dismiss(toastLoading)
        } catch (error) {
            toast.dismiss(toastLoading)
            console.log(error)
            throw error
        }
    }

    console.log(errors)

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
        <div className="useFormContainer centered-div w-[35rem]">
            {numeroRepEntrega !== null && (
                <div className="">
                    <div className="userFormBtnCloseContainer">
                        <h1 className="userFormLabel mx-auto">Asignación Reporte de Entrega</h1>
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
                                            data={numeroRepEntrega}
                                            name="numero_doc"
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
                    <CustomModal/>
                </div>

            )}
        </div>
    )
}

export default FOTReporteEntrega;






