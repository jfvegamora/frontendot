import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';


import { TextInputComponent } from '../../components';
import { useModal } from '../../hooks/useModal';
import { TITLES, validationUbicacionSchema } from '../../utils';
import { AppStore, useAppSelector } from '../../../redux/store';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';


interface IFOTUbicacion {
    closeModal?:()=>void;
    setSelectedRows?: ()=>void;
    pkToDelete?:any
}


const FOTUbicacion:React.FC<IFOTUbicacion> = ({
    closeModal,
    setSelectedRows,
    pkToDelete

}) => {
    const { control, handleSubmit, formState: { errors } } = useForm<any>({ resolver: yupResolver(validationUbicacionSchema()), });
    const { showModal, CustomModal } = useModal();

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const OTAreaActual: any = useAppSelector((store: AppStore) => store.OTAreas.areaActual);

    const folios = pkToDelete?.map((OT: any) => {
        return {
            "folio": `${OT.folio}`,
            "estado": `${OT.estado_id}`
        }
    });


    const onSubmit = async(jsonData:any) => {

        const query17 = {
            query: "17",
            _ubicacion : jsonData?.ubicacion,
            _dataJSON : encodeURIComponent(JSON.stringify(folios)),
            _usuario : `${UsuarioID}`,
            _origen : `${OTAreaActual}`
        }

        try {
            const response = await axios.post(`${URLBackend}/api/ot/editar/`, query17);
            console.log(response)

            // if(response.status === 200){
            //     toast.success('Número de Guía asignado.')
            //     toast.dismiss(toastLoading)
            //     clearAllCheck.value = false;
            //     otArchivo ? (
            //         dispatch(fetchOT({ historica: true, searchParams: paramsOT.value }))
    
            //     ) : (
            //         dispatch(fetchOT({ OTAreas: OTAreas, searchParams: paramsOT.value }))
            //     )
            //     setSelectedRows([])
            //     closeModal()
            //     toast.dismiss(toastLoading)
            // }
            

        } catch (error) {
            console.log(error)            
        }
    }



    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                closeModal && closeModal()
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [closeModal]);


    return (
        <div className="useFormContainer centered-div w-[35rem]">

                <div className="">
                    <div className="userFormBtnCloseContainer">
                        <h1 className="userFormLabel mx-auto">Asignación de Ubicación</h1>
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
                                        label="Nombre Ubicacion"
                                        name="ubicacion"
                                        control={control}
                                        // data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
                                        // onlyRead={true}
                                        error={errors.ubicacion}
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
        </div>
    )
}

export default FOTUbicacion