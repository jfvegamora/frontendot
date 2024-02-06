import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { EnumGrid as EnumArmazones } from '../../views/mantenedores/MArmazones';
import { validationOTlevel2, validationOTlevel3 } from '../../utils/validationOT';
import { URLBackend } from '../../hooks/useCrud';
import { toast } from 'react-toastify';
import { A1_DP, A1_Diametro, A2_DP, A2_Diametro, codigoProyecto, punto_venta, tipo_de_anteojo, validar_parametrizacion } from '../../utils';
import TextInputInteractive from '../forms/TextInputInteractive';
import { validationNivel3 } from '../../views/forms/FOT';

interface IArmazones {
    control:any;
    onDataChange: any;
    formValues: any;
    data:any;
    onlyRead?:boolean;
    permiso_usuario_armazones:boolean;
    permiso_areas_armazones:boolean;
    isEditting?:boolean
}

const FOTArmazones:React.FC<IArmazones> = ({
    control,
    onDataChange,
    formValues,
    data, 
    permiso_usuario_armazones,
    permiso_areas_armazones,
    isEditting
}) => {

    
    // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
    const [codArmazon1, setCodArmazon1] = useState(formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id] || "");
    const [codArmazon2, setCodArmazon2] = useState(formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id] || "");
    const [codArmazon3, setCodArmazon3] = useState(formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id] || "");

    const [armazon1, setArmazon1] = useState([])
    const [armazon2, setArmazon2] = useState([])
    const [armazon3, setArmazon3] = useState([])

    const [validarA1, setValidarA2] = useState("");


    //TODO! =========================== ENVIAR DP EN _P4 PARA VALIDAR ARMAZONES ===========================================================================
    //TODO! =========================== ENVIAR Diametro EN _P5 PARA VALIDAR ARMAZONES =====================================================================

    // const endpoint = validar_parametrizacion.value === '0' 
    //                                                ? `${URLBackend}/api/armazones/listado/?query=01` 
    //                                                : `${URLBackend}/api/armazones/listado/?query=02&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;

    const endpoint =`${URLBackend}/api/armazones/listado/?query=02&_p6=${ isEditting ? (data && data[EnumGrid.validar_parametrizacion_id]) : 1 }&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;



    const handleInputChange = (e:any) => {
        const { name, value } = e;
        
        console.log(name)
        console.log(value)
        
        validationOTlevel2(name, value)
        validationOTlevel3(name, value)
       

        if(name === 'validar_armazon1'){
            const item = validationNivel3.value.find((item: { campo: string; }) => item.campo === 'validar_armazon1');

            if(item && item.valor === 0){
                toast.error('Códigos Armazon no Coincide')
                setValidarA2('   ')
            }

        }

        if(name === 'a1_armazon_id'){
            setCodArmazon1(value.trim())
        }
        if(name === 'a2_armazon_id'){
            setCodArmazon2(value.trim())
        }
        if(name === 'a3_armazon_id'){
            setCodArmazon3(value.trim())
        }
        onDataChange({ [name]: value }); 
    };



    useEffect(()=>{     
        if (codArmazon1 !== undefined && codArmazon1 !== null && codArmazon1.trim && A1_Diametro.value !== "") {
            if(!(!codArmazon1.trim())){
                const fetchArmazones1 = async ()=>{
                    try {
                       
                        const {data} = await axios((validar_parametrizacion.value === '1' ) ? (`${endpoint}&_p1=${codArmazon1 !== ' ' ? codArmazon1.trim() : "aaaa"}&_p4=${typeof A1_DP.value === 'string' ? A1_DP.value : 0}&_p5=${isEditting ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value : "" ) : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")}`) : (`${endpoint}&_p1=${codArmazon1 !== ' ' ? codArmazon1 && codArmazon1.trim() : "aaaa"}`))
    
                        if(data.length === 0){
                            toast.error('Armazon 1 no Existe')
                            onDataChange({['a1_armazon_id']: " "})
                            setArmazon1([])
                        }
    
    
                        if(data[0] && data[0].length === 1){
                            toast.error(data[0][0])
                            onDataChange({['a1_armazon_id']: " "})
                            setArmazon1([])
                             
                        }
                        
                        if(data[0] && data[0].length === 15 ||  data.length === 1){
                            setArmazon1(data[0])
                        }
    
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                }
                
                fetchArmazones1()
            }
        }
        
    }, [codArmazon1, validar_parametrizacion.value, A1_DP.value, A1_Diametro.value]);
    
    useEffect(()=>{
        if(codArmazon1 && armazon1[0] && armazon1.length > 2){
            onDataChange({['a1_armazon_id']: armazon1[0]})
        }        
    },[armazon1, codArmazon1])

    useEffect(()=>{
        if(codArmazon2 && armazon2[0] && armazon2.length > 2){
            onDataChange({['a2_armazon_id']: armazon2[0]})
        }        
    },[armazon2, codArmazon2])
    useEffect(()=>{
        if(codArmazon3 && armazon3[0] && armazon3.length > 2){
            onDataChange({['a3_armazon_id']: armazon3[0]})
        }        
    },[armazon3, codArmazon3])



    useEffect(()=>{
        if (codArmazon2 !== undefined && codArmazon2 !== null && codArmazon2.trim) {
            if(!(!codArmazon2.trim())){
                const fetchArmazones2 = async ()=>{
                    try {
                        const {data} = await axios((validar_parametrizacion.value === '1' ) ? (`${endpoint}&_p1=${codArmazon2 !== ' ' ? codArmazon2.trim() : "aaaa"}&_p4=${(tipo_de_anteojo.value === '3' ? (typeof A2_DP.value === 'string' ? A2_DP.value : 0) : A1_DP.value)}&_p5=${isEditting ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value : "" ) : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")}`) : (`${endpoint}&_p1=${codArmazon2 !== '' ? codArmazon2 && codArmazon2.trim() : "aaaa"}`))
    
                        if(data.length === 0){
                            toast.error('Armazon 2 no Existe')
                            onDataChange({['a2_armazon_id']: " "})
                            setArmazon2([])
                        }
    
    
                        if(data[0] && data[0].length === 1){
                            toast.error(data[0][0])
                            onDataChange({['a2_armazon_id']: " "})
                            setArmazon2([])
                             
                        }
                        
                        if(data[0] && data[0].length === 15 ||  data.length === 1){
                            setArmazon2(data[0])
                        }
    
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                }
                
                fetchArmazones2()
            }
        }

    }, [codArmazon2, validar_parametrizacion.value, A2_DP.value, A2_Diametro.value]);


    useEffect(()=>{
        if (codArmazon3 !== undefined && codArmazon3 !== null && codArmazon3.trim) {
            if(!(!codArmazon3.trim())){
                const fetchArmazones3 = async ()=>{
                    try {
                        const {data} = await axios((`${endpoint}&_p1=${codArmazon3 !== ' ' ? codArmazon3.trim() : "aaaa"}&_p4=${typeof A1_DP.value === 'string' ? A1_DP.value : 0}&_p5=${isEditting ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value : "" ) : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")}`))
    
                        if(data.length === 0){
                            toast.error('Armazon 3 no Existe')
                            onDataChange({['a3_armazon_id']: " "})
                            setArmazon3([])
                        }
    
    
                        if(data[0] && data[0].length === 1){
                            toast.error(data[0][0])
                            onDataChange({['a3_armazon_id']: " "})
                            setArmazon3([])
                             
                        }
                        
                        if(data[0] && data[0].length === 15 ||  data.length === 1){
                            setArmazon3(data[0])
                        }
    
                    } catch (error) {
                        console.log(error)
                        throw error
                    }
                }
                
                fetchArmazones3()
            }
        }

    }, [codArmazon3, validar_parametrizacion.value, A1_DP.value, A1_Diametro.value]);




    
    console.log(armazon1)
    console.log(formValues)

  return (
    <form>
        <div className='w-full frameOTForm'>
            {/* <div className='w-full items-center rowForm !h-[5rem]  grid grid-cols-3'> */}
            <div className="relative !mt-[2rem] !h-[30rem] grid grid-cols-3">
                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex mt-6 rowForm ">
                                <TextInputInteractive
                                    type="text"
                                    label="Código Armazón 1"
                                    name="a1_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id]}
                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones)}
                                    isOT={true}
                                    className=''
                                    textAlign="text-center"
                                    />

                                <TextInputInteractive
                                    type="text"
                                    label="Validar Código"
                                    name="validar_armazon1"
                                    handleChange={handleInputChange}
                                    data={validarA1 && validarA1}
                                    control={control}
                                    isOT={true}
                                    textAlign="text-center"
                                />
                            </div>                            
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{ validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[2] : armazon1 && armazon1[EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[4] : armazon1 && armazon1[EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[5] : armazon1 && armazon1[EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[6] : armazon1 && armazon1[EnumArmazones.color] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[8] : armazon1 && armazon1[EnumArmazones.armazon_material] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[9] : armazon1 && armazon1[EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[10] : armazon1 && armazon1[EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[11] :armazon1 && armazon1[EnumArmazones.diagonal]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[12] :armazon1 && armazon1[EnumArmazones.brazo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[14] : armazon1 && armazon1[EnumArmazones.armazon_uso]}</p>
                            </div>
                           
                        </div>
                    </div> 
                </div>

                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex mt-6 rowForm ">
                                <TextInputInteractive
                                    type="text"
                                    label="Código Armazón 2"
                                    name="a2_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id]}
                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones )}
                                    isOT={true}
                                    textAlign="text-center"
                                    />
                                <TextInputInteractive
                                    type="text"
                                    label="Validar Código"
                                    name="validar_armazon2"
                                    handleChange={handleInputChange}
                                    control={control}
                                    isOT={true}
                                    textAlign="text-center"
                                 />
                            </div>                            
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[2] : armazon2 &&  armazon2[EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[4] : armazon2 &&  armazon2[EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[5] : armazon2 &&  armazon2[EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[6] : armazon2 &&  armazon2[EnumArmazones.color]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[8] : armazon2 &&  armazon2[EnumArmazones.armazon_material]} </p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[9] : armazon2 &&  armazon2[EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[10] : armazon2 &&  armazon2[EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[11] : armazon2 &&  armazon2[EnumArmazones.diagonal] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[12] : armazon2 &&  armazon2[EnumArmazones.brazo] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[14] : armazon2 &&  armazon2[EnumArmazones.armazon_uso]}</p>
                            </div>
                            
                        </div>

                    </div>
                </div>

                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex mt-6 rowForm ">
                                <TextInputInteractive
                                    type="text"
                                    label="Código Armazón 3"
                                    name="a3_armazon_id"
                                    handleChange={handleInputChange}
                                    data={formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id]}

                                    control={control}
                                    onlyRead={!(permiso_usuario_armazones && permiso_areas_armazones )}
                                    isOT={true}
                                    isOptional={true}
                                    textAlign="text-center"
                                    />
                            </div>
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[2] : armazon3 && armazon3[EnumArmazones.armazon_tipo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[4] : armazon3 && armazon3[EnumArmazones.marca]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[5] : armazon3 && armazon3[EnumArmazones.modelo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[6] : armazon3 && armazon3[EnumArmazones.color]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[8] : armazon3 && armazon3[EnumArmazones.armazon_material]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[9] : armazon3 && armazon3[EnumArmazones.aro]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[10] : armazon3 && armazon3[EnumArmazones.puente]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[11] : armazon3 && armazon3[EnumArmazones.diagonal]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[12] : armazon3 && armazon3[EnumArmazones.brazo]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[14] : armazon3 && armazon3[EnumArmazones.armazon_uso]}</p>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default FOTArmazones

{/* <SelectInputComponent
label="Opción de Venta"
name="a1_opcion_vta_id"
showRefresh={true}
isOT={true}
handleSelectChange={handleInputChange}
data={formValues ? formValues["a1_opcion_vta_id"] : data && data[EnumGrid.a1_opcion_vta_id]}
control={control}
entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
// error={errors.establecimiento}
readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
customWidth={"345px"}
/>

<SelectInputComponent
label="Opción de Venta"
name="a2_opcion_vta_id"
showRefresh={true}
isOT={true}
handleSelectChange={handleInputChange}
data={formValues ? formValues["a2_opcion_vta_id"] : data && data[EnumGrid.a2_opcion_vta_id]}
control={control}
entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
// error={errors.establecimiento}
customWidth={"345px"}
readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
/>

<SelectInputComponent
    label="Opcion de Venta"
    name="a3_opcion_vta_id"
    showRefresh={true}
    isOT={true}
    handleSelectChange={handleInputChange}
    data={formValues ? formValues["a3_opcion_vta_id"] : data && data[EnumGrid.a3_opcion_vta_id]}
    control={control}
    entidad={["/api/tipos/", "02","OTOpcionVentaArmazon"]}
    // error={errors.establecimiento}
    customWidth={"345px"}
    readOnly={!(permiso_usuario_armazones && permiso_areas_armazones)}
/>
*/}



  // const [dataArmazon1, setDataArmazon1] = useState();
    // useEffect(()=>{
    //     setDataArmazon1(armazon1)
    // },[codArmazon1])