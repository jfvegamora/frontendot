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


interface IDerivacion {
    data?: any;
    onClose?: any;
    formValues?: any;
    closeModal?: any;
    pktoDelete?:any;
    setSelectedRows?:any;
}



const FOTFactura: React.FC<IDerivacion> = ({
    setSelectedRows,
    closeModal,
    pktoDelete
}) => {
    const { control, handleSubmit, formState: { errors }} = useForm<any>({resolver: yupResolver(validationOTFacturaSchema()),});
    const [fechaHoraActual, _setFechaHoraActual] = useState(new Date());
    const { showModal, CustomModal } = useModal();
    // const { control, handleSubmit  } = useForm<any>()
    // const [fechaHoraActual, _setFechaHoraActual]  = useState(new Date());

    const UsuarioID: any = useAppSelector((store: AppStore) => store.user?.id)
    const dispatch = useAppDispatch();

    // console.log(pktoDelete)
    // console.log(errors)    

    const onSubmit: SubmitHandler<any> = async (jsonData) => {

        console.log(jsonData)
        console.log(pktoDelete)

        if(pktoDelete.length < 1){
            return toast.error('No Hay OT Seleccionada')
        }

        if(jsonData["numero_doc"] <= 0){
            return toast.error('Número de documento debe ser mayor a 0');
        }

        if(jsonData["valor_neto"] <= 0){
            return toast.error('Valor neto debe ser mayor a 0')
        }

        if(parseInt(pktoDelete[0]["numero_factura"]) !== 0){
            const result = await showModal(
                `OT: ${pktoDelete[0]["folio"]} Tiene Factura asignada, ¿Desea agregar una nueva? `,
                '!text-base', 
                MODAL.keepYes,
                MODAL.kepNo
              );
      
            if(!result){
                return;
            }
        }

        if ((pktoDelete.some((OT: any) => parseInt(OT["orden_compra"])) === '')) {
            pktoDelete.filter((ot:any)=> ot["orden_compra"] === '').map((ot:any)=>{
                console.log('render')
                toast.error(`Folio: ${ot["folio"]} sin Orden de Compra`);
            })
        }else{
            try {
                const query03 = {
                    _p1         : `"${pktoDelete[0]["proyecto_codigo"]}", ${5}, "${jsonData["numero_doc"]}", "${jsonData["fecha_doc"]}", ${jsonData["valor_neto"]}, ${0}, ${0}, ${UsuarioID}, "${jsonData["observaciones"]}"    `
                }

                const query07 = {
                    _id         : 5,
                    _p2         : jsonData["numero_doc"],
                    _pkToDelete : JSON.stringify(pktoDelete.map((folioOT:any)=>({folio: folioOT["folio"]})))
                   
                }

                const strUrl             = `${URLBackend}/api/proyectodocum/listado`
                let   queryURL03         = `?query=03&_p1=${query03["_p1"]}`
                const resultQuery03      = await axios(`${strUrl}/${queryURL03}`)

                if(resultQuery03?.status === 200){
                    //TODO: EJECUTAR QUERY 07 PARA ASIGNAR ORDEN DE COMPRA A OT SELECCIONADA (1 O N OTS)
                    let   queryURL07            = `?query=07&_p2=${query07["_p2"]}&_pkToDelete=${query07["_pkToDelete"]}&_id=${query07["_id"]}`
                    const resultQuery07         = await axios(`${strUrl}/${queryURL07}`) 

                    if(resultQuery07?.status === 200){
                        toast.success('Factura Generada')
                        dispatch(fetchOT({historica:true, searchParams: paramsOT.value  }))

                    }else{
                        toast.error('error: Factura Generada')
                    }
                    setSelectedRows([])
                    closeModal()
                }
            } catch (error) {
              console.log(error)
              throw error
            }
        }}
  
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
        // <div className='useFormContainer useFormDerivacion h-[55%] w-[60%] left-[20%] top-[30%] z-30'>
        //     <div className=" flex justify-end w-full">
        //         <h2 className='text-2xl cursor-pointer' onClick={onClose}>X</h2>
        //     </div>
        <div className='useFormContainer useFormDerivacion centered-div use40rem z-30'>
        
        <div className="userFormBtnCloseContainer flex ">
            <div className='w-[50%] mx-auto !text-center  '>
                <h1 className='userFormLabel mx-auto  w-full '>Asignación de Factura</h1>
            </div>
            <div className=''>
                <button onClick={closeModal} className="userFormBtnClose">
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
                            data={pktoDelete[0] && pktoDelete[0]["proyecto"]}
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
                            error={errors.numero_doc}
                        />
                    </div>
                    <div className="w-full ">
                        <TextInputComponent
                            type="date"
                            label="Fecha Doc"
                            name="fecha_doc"
                            control={control}
                            data={fechaFormateada}
                            textAlign='text-center'
                            error={errors.fecha_doc}
                        />
                    </div>
                    <div className="w-full ml-[]">
                        <TextInputComponent
                            type="number"
                            label="Valor Neto $"
                            name="valor_neto"
                            control={control}
                            textAlign='text-right'
                            error={errors.valor_neto}
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
                    <CustomModal/>
                </div>

            </form>

        </div>
    )
}

export default FOTFactura