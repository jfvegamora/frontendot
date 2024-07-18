import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { MODAL, TITLES } from "../../utils";
import { toast } from 'react-toastify';
import axios from 'axios';
import { URLBackend } from '../../hooks/useCrud';
import { yupResolver } from "@hookform/resolvers/yup";
import { validationFOTOrdenCompra } from "../../utils/validationFormSchemas";
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';
import { Button } from "@material-tailwind/react";


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any
    setSelectedRows?: any
}

const strUrl = `${URLBackend}/api/proyectodocum/listado`;
const strUrlOT = `${URLBackend}/api/othistorica/listado`;


const FOTOrdenCompra: React.FC<IDerivacion> = ({
    closeModal,
    pktoDelete,
    setSelectedRows
}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationFOTOrdenCompra()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const dispatch = useAppDispatch();
    const { showModal } = useModal();

    const folios = pktoDelete.map((OT: any) => OT.folio);


    const onSubmit: SubmitHandler<any> = async (jsonData) => {
        // console.log(pktoDelete)

        if (pktoDelete.length < 1) {
            return toast.error('No Hay OT Seleccionada')
        }



        if (jsonData["valor_neto"] < 0) {
            return toast.error('Valor neto debe ser mayor a 0')
        }

        if (parseInt(pktoDelete[0]["orden_compra"]) !== 0) {
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene Orden de compra asignado, ¿Desea agregar uno nuevo? `,
                '',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
                return;
            }
        }

        if (jsonData["valor_neto"] !== '0') {
            if (!(parseInt(jsonData["numero_doc"]) >= 0) && !Number.isNaN(parseInt(jsonData["numero_doc"]))) {
                return toast.error('Número de documento debe ser mayor a 0')
            }
            if (jsonData["valor_neto"] < '0') {
                return toast.error('Valor neto debe ser mayor a 0')
            }

            const validateReporteEntre = pktoDelete.some((OT: any) => {
                if (OT["reporte_atencion"] <= 0) {
                    toast.error(`Folio: ${OT["folio"]} sin Reporte de Entrega.`);
                    return false
                }

                return true
            })
            if (!validateReporteEntre) {
                return
            }
        }


        if (jsonData["numero_doc"] === '0') {
            const validateNumeroGuia = pktoDelete.some((OT: any) => {
                if (OT.numero_guia !== 0) {
                    return false
                }
                return true;
            })

            if (!validateNumeroGuia) {
                return toast.error(`Folio: ${folios} tiene número de guía asignado.`)
            }


        }



        const toastLoading = toast.loading('Cargando...');

        try {
            const query07 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${3}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${jsonData["valor_neto"]}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                _p2: jsonData["numero_doc"],
                _p3: pktoDelete[0]["proyecto_codigo"],
                _id: 3,
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))

            }
            let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
            const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)
            if (resultQuery07?.status === 200) {

                const query06 = {
                    _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: 60, usuario: UsuarioID, observaciones: jsonData["observaciones"], boton: 2 })))
                }
                let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`

                await axios(`${strUrlOT}/${queryURL06}`).then(() => {
                    toast.success('Orden de Compra generado')
                    toast.dismiss(toastLoading)
                    dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))

                });

            } else {
                toast.dismiss(toastLoading)
                toast.error('error: Orden de Compra.')
            }
            setSelectedRows([])
            closeModal()
            toast.dismiss(toastLoading)
        } catch (error) {
            toast.dismiss(toastLoading)
            console.log(error)
            throw error
        }

    };

    // console.log('errors',errors)

    const fechaFormateada = fechaHoraActual.toISOString().split('T')[0];

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



    return (
        <div className="useFormContainer centered-div w-[35rem]">
            <div className="userFormBtnCloseContainer">
                <h1 className="userFormLabel mx-auto">Asignación de Orden de Compra</h1>
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
                        <div className="input-container items-center rowForm w-[35%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="text"
                                    label="N° Documento"
                                    name="numero_doc"
                                    control={control}
                                    error={errors.numero_doc}
                                    customWidth={"labelInput inputStyles text-right"}
                                />
                            </div>
                        </div>

                        <div className="input-container items-center rowForm w-[35%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="date"
                                    label="Fecha Doc"
                                    name="fecha_doc"
                                    data={fechaFormateada}
                                    control={control}
                                    textAlign='text-center'
                                    error={errors.fecha_doc}
                                    customWidth={"labelInput inputStyles"}
                                />
                            </div>
                        </div>

                        <div className="input-container items-center rowForm w-[30%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="number"
                                    label="Valor Neto $"
                                    name="valor_neto"
                                    control={control}
                                    textAlign='text-right'
                                    error={errors.valor_neto}
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
        </div>
    )
}

export default FOTOrdenCompra