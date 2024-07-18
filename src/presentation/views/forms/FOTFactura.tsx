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
import { validationOTFacturaSchema } from "../../utils/validationFormSchemas";
import { useModal } from '../../hooks/useModal';
import { paramsOT } from '../mantenedores/MOT';
import { Button } from "@material-tailwind/react";


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?: any;
    setSelectedRows?: any;
}

const strUrl = `${URLBackend}/api/proyectodocum/listado`;
const strUrlOT = `${URLBackend}/api/othistorica/listado`;

const FOTFactura: React.FC<IDerivacion> = ({
    setSelectedRows,
    closeModal,
    pktoDelete
}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationOTFacturaSchema()), });
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const { showModal, CustomModal } = useModal();
    // const { control, handleSubmit  } = useForm<any>()
    // const [fechaHoraActual, _setFechaHoraActual]  = useState(new Date());

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const dispatch = useAppDispatch();

    // console.log(pktoDelete)
    // console.log(errors)    

    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        if (pktoDelete.length < 1) {
            return toast.error('No Hay OT Seleccionada')
        }

        console.log(parseInt(jsonData["numero_doc"]))

        if (!(parseInt(jsonData["numero_doc"]) >= 0)) {
            return toast.error('Número de documento debe ser mayor a 0');
        }


        if (pktoDelete.every((ot: any) => ot.estado !== 'Facturada' && ot.estado !== 'Cerrada')) {
            toast.error(`OT debe estar Cerrada o Facturada `);
            return;
        }

        if (parseInt(pktoDelete[0]["numero_factura"]) !== 0) {
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene Factura asignada, ¿Desea agregar una nueva? `,
                '!text-base',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
                return;
            }
        }

        if (jsonData["numero_doc"] > 0) {
            if (jsonData["valor_neto"] <= 0) {
                return toast.error('Valor neto debe ser mayor a 0')
            }

            const validateOrdenCompra = pktoDelete.some((OT: any) => {
                if (OT["orden_compra"] === '0') {
                    toast.error(`Folio: ${OT["folio"]} sin Orden de Compra`);
                    return false
                }

                // if(OT["numero_guia"] === 0){
                //     toast.error(`Folio: ${OT["folio"]} sin Número de Guia`);
                //     return false
                // }
                return true
            })

            if (!validateOrdenCompra) {
                return
            }
        }


        console.log(jsonData)
        const toastLoading = toast.loading('Cargando...');
        try {
            const query07 = {
                _p1: `"${pktoDelete[0]["proyecto_codigo"]}", ${5}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${jsonData["valor_neto"]}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"`,
                _p2: jsonData["numero_doc"],
                _p3: pktoDelete[0]["proyecto_codigo"],
                _id: 5,
                _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"] })))

            }
            let queryURL07 = `?query=07&_p1=${query07["_p1"]}&_p2=${query07["_p2"]}&_p3=${query07["_p3"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
            const resultQuery07 = await axios(`${strUrl}/${queryURL07}`)
            if (resultQuery07?.status === 200) {
                const query06 = {
                    _pkToDelete: JSON.stringify(pktoDelete.map((folioOT: any) => ({ folio: folioOT["folio"], estado: (jsonData["numero_doc"] === '0' ? 60 : 70), usuario: UsuarioID, observaciones: jsonData["observaciones"], boton: 4 })))
                }
                let queryURL06 = `?query=06&&_pkToDelete=${query06["_pkToDelete"]}`

                await axios(`${strUrlOT}/${queryURL06}`).then(() => {
                    toast.dismiss(toastLoading)
                    toast.success('Factura Generada')
                    dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
                })


            } else {
                toast.dismiss(toastLoading)
                toast.error('error: Factura')
            }
            setSelectedRows([])
            closeModal()
            toast.dismiss(toastLoading)
        } catch (error) {
            console.log(error)
            throw error
        }



    };




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
            <div className="userFormBtnCloseContainer">
                <h1 className="userFormLabel mx-auto">Asignación de Factura</h1>
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
                        <div className="input-container items-center rowForm">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="number"
                                    label="N° Documento"
                                    name="numero_doc"
                                    control={control}
                                    error={errors.numero_doc}
                                    customWidth={"labelInput inputStyles"}
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

                        <div className="input-container items-center rowForm">
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

export default FOTFactura