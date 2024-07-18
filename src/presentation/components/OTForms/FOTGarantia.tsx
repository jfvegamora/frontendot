import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppSelector } from '../../../redux/store';
import { useCrud } from '../../hooks';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';


interface IProps {
    data?: any,
    onClose: any,
    closeModal?: any
}

interface FormData {
    folio_ot: number;
    proyecto: string;
    nombre_cliente: string;
    motivo_post_venta: string;
    observaciones: string,
    onClose: any
}

const strBaseUrl = "/api/othistorica/"

const FOTGarantia: React.FC<IProps> = ({
    data,
    // onClose,
    closeModal
}) => {
    const { control, handleSubmit } = useForm<FormData>();
    const userState = useAppSelector((store: AppStore) => store.user);
    const { createdEntity } = useCrud(strBaseUrl);


    const onSubmit: SubmitHandler<FormData> = async (jsonData) => {
        console.log('jsondata', jsonData)
        const toastLoading = toast.loading('Cargando...');

        try {
            const query = {
                query: "03",
                _folio: `${data[EnumGrid.folio]}`,
                _p1: `"${jsonData.observaciones}"`,
                _p2: `${jsonData.motivo_post_venta}`,
                _usuario: userState?.id.toString()
            }
            console.log(query)
            const result = await createdEntity(query)
            console.log(result)
            const nuevoFolio = result && result["datos"][0][0]


            toast.dismiss(toastLoading)
            toast.success(`Nueva OT creada con folio: ${nuevoFolio}`)
            closeModal()
        } catch (error: any) {
            toast.dismiss(toastLoading)
            toast.error('Error al crear OT Post-Venta')
            console.log(error)
        }
    }

    return (
        <div className="useFormContainer centered-div w-[35rem]">
            <div className="userFormBtnCloseContainer">
                <h1 className="userFormLabel mx-auto">Nueva OT Post-Venta</h1>
                <button onClick={closeModal} className="userFormBtnClose mr-4">
                    X
                </button>
            </div>

            <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>
                <div className="userFormularioContainer">
                    <div className="w-full flex items-center">
                        <div className="input-container items-center rowForm w-[30%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="text"
                                    label="Folio OT"
                                    name="folio_ot"
                                    control={control}
                                    data={data && data[EnumGrid.folio]}
                                    onlyRead={true}
                                    customWidth={"labelInput inputStyles"}
                                />
                            </div>
                        </div>
                        <div className="input-container items-center rowForm w-[70%]">
                            <div className="labelInputDiv">
                                <TextInputComponent
                                    type="text"
                                    label="Proyecto"
                                    name="proyecto"
                                    control={control}
                                    data={data && data[EnumGrid.proyecto_titulo]}
                                    onlyRead={true}
                                    customWidth={"labelInput inputStyles"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="input-container items-center rowForm">
                        <div className="labelInputDiv">
                            <TextInputComponent
                                type="text"
                                label="Nombre Cliente"
                                name="nombre_cliente"
                                control={control}
                                data={data && data[EnumGrid.cliente_nomnbre]}
                                onlyRead={true}
                                customWidth={"labelInput inputStyles"}
                            />
                        </div>
                    </div>

                    <div className="input-container items-center rowForm">
                        <div className="selectInputDiv">
                            <SelectInputComponent
                                label="Motivo Post Venta"
                                name="motivo_post_venta"
                                showRefresh={true}
                                isOT={true}
                                control={control}
                                entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                                customWidth={"labelInput inputStyles"}
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
                                customWidth={"labelInput inputStyles"}
                            />
                        </div>
                    </div>

                    <div className="w-full !mt-5 !mb-5">
                        <div className="w-[50%] mx-auto">
                            <Button type="submit" className=' !bg-green-400 otActionButton'>Nueva OT</Button>
                        </div>
                    </div>
                </div>
            </form >

        </div >
    )
}

export default FOTGarantia