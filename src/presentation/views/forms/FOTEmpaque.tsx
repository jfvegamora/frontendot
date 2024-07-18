import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { MODAL, TITLES, clearAllCheck, validationOTNumeroEnvio } from "../../utils";
import { toast } from 'react-toastify';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';
import { Button } from "@material-tailwind/react";


interface IFOTEmpaque {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any;
    setSelectedRows?: any;
    params?: string[]
}

const strUrl = `${URLBackend}/api/proyectodocum/listado`


const FOTEmpaque: React.FC<IFOTEmpaque> = ({
    setSelectedRows,
    closeModal,
    pktoDelete
}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationOTNumeroEnvio()), })
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const { showModal, CustomModal } = useModal();

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id);
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        if (pktoDelete.length < 1) {
            return toast.error('No Hay OT Seleccionada')
        }

        if (!(parseInt(jsonData.numero_doc) >= 0)) {
            return toast.error('Número de documento debe ser mayor a 0')
        }

        const proyectoPrimero = pktoDelete[0].proyecto;
        if (pktoDelete.some((ot: any) => ot.proyecto !== proyectoPrimero)) {
            toast.error('OT deben pertenecer al mismo proyecto');
            return;
        }



        // if(parseInt(pktoDelete[0]["numero_reporte_firma"]) !== 0){
        //     return toast.error(`OT ${pktoDelete[0]["folio"]} ya tiene un reporte de firma asignado `)
        // }

        if (parseInt(pktoDelete[0]["numero_envio"]) !== 0) {
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene Número de envio asignado, ¿Desea agregar uno nuevo? `,
                '',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
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
                clearAllCheck.value = false;
                dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }))


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
        <div className="useFormContainer centered-div w-[35rem]">
            <div className="userFormBtnCloseContainer">
                <h1 className="userFormLabel mx-auto">Asignación de Número Envío</h1>
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
                                data={pktoDelete && pktoDelete[0] && pktoDelete[0]["proyecto"]}
                                onlyRead={true}
                                customWidth={"labelInput inputStyles"}
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-center">
                        <div className="input-container items-center rowForm">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="number"
                                    label="N° Documento"
                                    name="numero_doc"
                                    control={control}
                                    error={errors.numero_doc}
                                    customWidth={"labelInput inputStyles text-right"}
                                />
                            </div>
                        </div>

                        <div className="input-container items-center rowForm">
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
    )
}

export default FOTEmpaque;