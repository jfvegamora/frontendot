import React, { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '@material-tailwind/react';


import { TextInputComponent } from '../../components';
import { useModal } from '../../hooks/useModal';
import { clearAllCheck, MODAL, TITLES, validationUbicacionSchema } from '../../utils';
import { AppStore, useAppDispatch, useAppSelector } from '../../../redux/store';
import { URLBackend } from '../../hooks/useCrud';
import axios from 'axios';
import { toast } from 'react-toastify';
import { paramsOT } from '../mantenedores/MOT';
import { fetchOT } from '../../../redux/slices/OTSlice';


interface IFOTUbicacion {
    closeModal?:()=>void;
    setSelectedRows?: ([])=>void;
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
    const dispatch          = useAppDispatch();

    const folios = pkToDelete?.map((OT: any) => {
        return {
            "folio": `${OT.folio}`,
            "estado": `${OT.estado_id}`
        }
    });

    console.log(pkToDelete)

    const onSubmit = async(jsonData:any) => {

        const validation_Ubicacion_Previa = pkToDelete.some((OT:any)=>OT.ot_ubicacion !== '')

        if(validation_Ubicacion_Previa){
            const result = await showModal(
                `OT: ${pkToDelete[0]["folio"]} Tiene ubicación asignada, ¿Desea agregar uno nuevo? `,
                '',
                MODAL.keepYes,
                MODAL.kepNo
            );

            if (!result) {
                return;
            }
        }

        
        const toastLoading = toast.loading('Cargando...')
        const query17 = {
            query: "17",
            _ubicacion : jsonData?.ubicacion,
            _dataJSON : encodeURIComponent(JSON.stringify(folios)),
            _usuario : `${UsuarioID}`,
            _origen : `${OTAreaActual}`
        }

        try {
            const response = await axios.post(`${URLBackend}/api/ot/editar/`, query17);

            if(response.status === 200){
                toast.success('Ubicacion asignada correctamente.')
                toast.dismiss(toastLoading)
                clearAllCheck.value = false;
                dispatch(fetchOT({ OTAreas: OTAreaActual, searchParams: paramsOT.value }))
                setSelectedRows && setSelectedRows([])
                closeModal && closeModal()
                toast.dismiss(toastLoading)
            }
            

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
        <div className="useFormContainer centered-div w-[25rem]">

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
                                        label="Ubicación"
                                        name="ubicacion"
                                        control={control}
                                        // data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
                                        // onlyRead={true}
                                        error={errors.ubicacion}
                                        customWidth={"labelInput inputStyles text-center"}
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