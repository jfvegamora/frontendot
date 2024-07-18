import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
// import { SEXO, TIPO_CLIENTE } from '../../utils';
import { Button } from '@material-tailwind/react';
import { clearAllCheck, clearIndividualCheck, updateOT, validationNivel1, validationPendienteOTSchema } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { paramsOT } from '../../views/mantenedores/MOT';
import { OTGrillaEnum } from '../../Enums';
import { handleActionOTButtons } from '../../utils/FOTPendiente_utils';


interface IPendiente {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    isMasivo?: boolean

}

interface FormData {
    proyecto_codigo: undefined;
    folio_ot: number;
    proyecto: string;
    nombre_cliente: string;

    area_desde: string;
    area_hasta: string;
    situacion: string
    observaciones: string;
    formValues: any
}

const FOTPendiente: React.FC<IPendiente> = ({
    data,
    onClose,
    isMasivo,
    // formValues,
    closeModal,
    formValues
}) => {
    const schema = validationPendienteOTSchema()
    const { control, handleSubmit, formState: { errors } } = useForm<any>({
        resolver: yupResolver(schema),
        defaultValues: {
            situacion: '',
            observaciones: ''
        }
    })
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTSlice: any = useAppSelector((store: AppStore) => store.OTS)
    const dispatch = useAppDispatch();

    const sumatoriaNivel1 = validationNivel1.value.reduce((index, objeto) => index + objeto.valor, 0);

    let EnumPendiente: any;
    let dataPendiente: any;

    if (isMasivo) {
        EnumPendiente = OTGrillaEnum
        dataPendiente = data
    } else {
        EnumPendiente = EnumGrid
        dataPendiente = data
    }





    const onSubmit: SubmitHandler<FormData> = async (jsonData) => {
        // fetchDerivacion(jsonData)
        let estado = 30;
        console.log(data)
        if (isMasivo) {
            let usuarioID = data[0]["usuario_id"]
            const folios = data.map((dataOT: any) => dataOT.folio).join(',')

            const response: any = await handleActionOTButtons(
                folios,
                estado,
                jsonData?.situacion,
                OTAreas["areaActual"],
                OTAreas["areaActual"],
                jsonData?.observaciones,
                usuarioID
            )
            if (response?.status === 200) {
                onClose()
                dispatch(fetchOT({ OTAreas: OTAreas["areaActual"], searchParams: paramsOT.value }));
                clearAllCheck.value = false;
                clearIndividualCheck.value = true;
            }

        } else {
            let estadoValidacion = sumatoriaNivel1 === validationNivel1.value.length;

            updateOT(
                jsonData,
                OTAreas["areaActual"],
                OTAreas["areaActual"],
                30,
                formValues,
                data,
                OTSlice.cristales,
                OTSlice.armazones,
                UsuarioID.toString(),
                jsonData.observaciones,
                false,
                jsonData.situacion,
                false,
                'Pausada',
                estadoValidacion
            ).then(() => {
                closeModal()
                console.log(paramsOT.value)
                dispatch(fetchOT({ OTAreas: OTAreas["areaActual"], searchParams: paramsOT.value }));


            })
        }


    }


    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
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
                <h1 className="userFormLabel mx-auto">OT Pendiente</h1>
                <button onClick={closeModal} className="userFormBtnClose mr-4">
                    X
                </button>
            </div>

            <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className="userFormularioContainer">
                    <div className="w-full flex items-center">
                        <div className="input-container items-center rowForm w-[65%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="text"
                                    label="Proyecto"
                                    name="proyecto"
                                    control={control}
                                    data={isMasivo ? dataPendiente && dataPendiente[0]?.proyecto : dataPendiente && dataPendiente[EnumPendiente.proyecto_titulo]}
                                    onlyRead={true}
                                    customWidth={"labelInput inputStyles"}
                                />
                            </div>
                        </div>
                        {!isMasivo && (
                            <div className="input-container items-center rowForm w-[35%]">
                                <div className="labelInputDiv">
                                    <TextInputComponent
                                        type="text"
                                        label="Folio OT"
                                        name="folio_ot"
                                        control={control}
                                        data={data && data[EnumPendiente.folio]}
                                        onlyRead={true}
                                        textAlign="text-center"
                                        customWidth={"labelInput inputStyles"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {!isMasivo && (
                        <div className="input-container items-center rowForm">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="text"
                                    label="Nombre Cliente"
                                    name="nombre_cliente"
                                    control={control}
                                    data={data && data[EnumPendiente.cliente_nomnbre]}
                                    onlyRead={true}
                                    customWidth={"labelInput inputStyles"}
                                />
                            </div>
                        </div>
                    )}

                    <div className="input-container items-center rowForm">
                        <div className="selectInputDiv">
                            <SelectInputComponent
                                label="Motivo Pendiente"
                                name="situacion"
                                showRefresh={true}
                                isOT={true}
                                control={control}
                                entidad={["/api/otmotivopendiente/", "02", OTAreas["areaActual"]]}
                                customWidth={"labelInput inputStyles"}
                                error={errors.situacion}
                            />
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
                </div>

                <div className="flex justify-center">
                    <Button type="submit" className='otActionButton bg-yellow-700'>Pausar</Button>
                </div>
            </form>

        </div>
    )
}

export default FOTPendiente;