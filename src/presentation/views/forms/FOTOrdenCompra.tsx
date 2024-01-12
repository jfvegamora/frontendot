import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { EnumGrid } from '../mantenedores/MOTHistorica';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { updateOT } from '../../utils';
import { fetchOT } from '../../../redux/slices/OTSlice';
import { TextInputComponent } from '../../components';
import { TITLES } from "../../utils";


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any
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

const FOTOrdenCompra: React.FC<IDerivacion> = ({
    data,
    onClose,
    // formValues,
    closeModal,
    formValues
}) => {
    const { control, handleSubmit } = useForm<FormData>()
    const OTAreas: any = useAppSelector((store: AppStore) => store.OTAreas);
    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTSlice: any = useAppSelector((store: AppStore) => store.OTS)
    const dispatch = useAppDispatch();


    const onSubmit: SubmitHandler<FormData> = async (jsonData) => {
        // fetchDerivacion(jsonData)
        updateOT(
            jsonData,
            OTAreas["areaActual"],
            jsonData.area_hasta.toString() as any,
            40,
            formValues,
            data,
            OTSlice.cristales,
            OTSlice.armazones,
            UsuarioID.toString(),
            jsonData.observaciones
        ).then(() => {
            closeModal()
            dispatch(fetchOT({ OTAreas: OTAreas["areaActual"] }))
        })
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
    return (
        // <div className='useFormContainer useFormDerivacion h-[55%] w-[60%] left-[20%] top-[30%] z-30'>
        //     <div className=" flex justify-end w-full">
        //         <h2 className='text-2xl cursor-pointer' onClick={onClose}>X</h2>
        //     </div>
        <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Asignación de Orden de Compra</h1>
            </div>
            <div className=''>
                <button onClick={onClose} className="userFormBtnClose">
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
                            data={data && data[EnumGrid.proyecto_titulo]}
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
                        />
                    </div>
                    <div className="w-full ">
                        <TextInputComponent
                            type="date"
                            label="Fecha Doc"
                            name="fecha_doc"
                            control={control}
                        />
                    </div>
                    <div className="w-full ml-[]">
                        <TextInputComponent
                            type="number"
                            label="Valor Neto $"
                            name="valor_neto"
                            control={control}
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

            </form>

        </div>
    )
}

export default FOTOrdenCompra