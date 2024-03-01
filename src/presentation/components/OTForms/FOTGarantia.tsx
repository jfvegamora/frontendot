import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { SelectInputComponent, TextInputComponent } from '..';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { AppStore, useAppSelector } from '../../../redux/store';
import { useCrud } from '../../hooks';
import { toast } from 'react-toastify';
import { Button } from '@material-tailwind/react';


interface IProps{
    data?:any,
    onClose:any,
    closeModal?:any
}

interface FormData{
    folio_ot: number;
    proyecto:string;
    nombre_cliente: string;
    motivo_post_venta:string;
    observaciones:string,
    onClose:any
}

const strBaseUrl = "/api/othistorica/"

const FOTGarantia:React.FC<IProps> = ({
    data,
    onClose,
    closeModal
}) => {
    const {control, handleSubmit} = useForm<FormData>();
    const userState = useAppSelector((store: AppStore) => store.user);
    const {createdEntity} = useCrud(strBaseUrl);

    
    const onSubmit: SubmitHandler<FormData> = async(jsonData) =>{
        console.log('jsondata', jsonData)
        const toastLoading = toast.loading('Cargando...');

        try {
            const query = {
                query:    "03",
                _folio:  `${data[EnumGrid.folio]}`,
                _p1:     `"${jsonData.observaciones}"`,
                _p2:     `${jsonData.motivo_post_venta}`,
                _usuario: userState?.id.toString()
            }
            console.log(query)
            const result = await createdEntity(query)
            console.log(result)
            const nuevoFolio = result && result["datos"][0][0]
            
            
            toast.dismiss(toastLoading)
            toast.success(`Nueva OT creada con folio: ${nuevoFolio}`)
            closeModal()
        } catch (error:any) {
            toast.dismiss(toastLoading)
            toast.error('Error al crear garantía')
            console.log(error)
        } 
    }

    //LOGICA OT GARANTIA
    // console.log(data)
  return (
    // <div className='useFormContainer h-[50%] w-[60%] left-[20%] top-[30%] z-30'>
    <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
          <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Nueva OT Post Venta</h1>
            </div>
            <div className=''>
                <button onClick={onClose} className="userFormBtnClose">
                    X
                </button>
            </div>
        </div>
        <form className='userFormulario' onSubmit={handleSubmit(onSubmit)}>

                <div className="flex  items-center rowForm w-full">
                    <div className="w-[30%]">
                        <TextInputComponent
                            type="text"
                            label="Folio OT"
                            name="folio_ot"
                            control={control}
                            data={data && data[EnumGrid.folio]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                            customWidth={"mt-[2rem]"}

                        />
                    </div>
                    <div className="w-[70%]">
                        <TextInputComponent
                            type="text"
                            label="Proyecto"
                            name="proyecto"
                            control={control}
                            data={data && data[EnumGrid.proyecto_titulo]}
                            onlyRead={true}
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            customWidth={"mt-[2rem]"}

                        />
                    </div>
                </div>


                <div className="w-full flex items-center rowForm">
                    <div className="w-full">
                            <TextInputComponent
                                type="text"
                                label="Nombre Cliente"
                                name="nombre_cliente"
                                control={control}
                                data={data && data[EnumGrid.cliente_nomnbre]}
                                onlyRead={true}
                                customWidth={"mt-[2rem]"}
                            />
                        </div>
                </div>

                <div className="input-container items-center rowForm">
                    <div className="w-full">
                        <SelectInputComponent
                            label="Motivo Post Venta"
                            name="motivo_post_venta"
                            showRefresh={true}
                            isOT={true}
                            control={control}
                            // data={data && data[EnumGrid.motivo_gtia_id]}
                            // handleSelectChange={handleInputChange}
                            // data={formValues && formValues["proyectos"]}
                            entidad={["/api/tipos/", "02", "OTMotivoGarantia"]}
                            // error={errors.establecimiento}
                            customWidth={"w-[] ml-[1rem] mr-[-1rem] mt-[2rem]"}

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
                            // handleChange={handleInputChange}
                            // data={formValues && formValues["rut"]}
                            // error={errors.fecha_nacimiento}
                            customWidth={"mt-[2rem]"}

                        />
                    </div>
                </div>

                <div className=' flex justify-center'>
                    <Button  type="submit" className=' !bg-green-400 otActionButton'>Nueva OT</Button>
                </div>
        </form>

    </div>
  )
}

export default FOTGarantia