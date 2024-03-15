import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { EnumGrid } from '../../views/mantenedores/MOTHistorica';
import { validationOTlevel2, validationOTlevel3, validation_A1_armazon, validation_A2_armazon } from '../../utils/validationOT';
import { URLBackend } from '../../hooks/useCrud';
import { toast } from 'react-toastify';
import { A1_DP, A1_Diametro, A2_DP, A2_Diametro, a1_armazon, a2_armazon, a2_od_cil, a2_od_esf, a2_oi_cil, a2_oi_esf, a3_armazon, codigoProyecto, dioptrias_receta, punto_venta, tipo_de_anteojo, validar_armazon1, validar_armazon2, validar_parametrizacion, validationNivel3 } from '../../utils';
// import TextInputInteractive from '../forms/TextInputInteractive';
import { AppStore, useAppSelector } from '../../../redux/store';
import { OTTextInputComponent } from '.';

interface IArmazones {
    control:any;
    onDataChange: any;
    formValues: any;
    formValuesCompleto: any
    data:any;
    onlyRead?:boolean;
    permiso_usuario_armazones:boolean;
    permiso_areas_armazones:boolean;
    isEditting?:boolean,
    setSelectedTab?:any
}

const FOTArmazones:React.FC<IArmazones> = ({
    control,
    onDataChange,
    formValues,
    data, 
    permiso_usuario_armazones,
    permiso_areas_armazones,
    isEditting,
    formValuesCompleto
    // setSelectedTab
}) => {
    
    useEffect(()=>{
        if(isEditting){
            punto_venta.value = data?.[EnumGrid.punto_venta_id]
        }
    },[])
    
    
    const OTAreas:any = useAppSelector((store: AppStore) => store.OTAreas["areaActual"]);

    
    // const [codArmazon1, setCodArmazon1] = useState( formValues && formValues["codigo_armazon_1"] || 0);
    const [codArmazon1, setCodArmazon1] = useState(formValues ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id] || "");
    const [codArmazon2, setCodArmazon2] = useState(formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id] || "");
    const [codArmazon3, setCodArmazon3] = useState(formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id] || "");


    const [armazon1, setArmazon1] = useState<any>([])
    const [armazon2, setArmazon2] = useState<any>([])
    const [armazon3, setArmazon3] = useState<any>([])

    // const [render, setRender] = useState(false)



    const {
        cristal1_marca_id,
        cristal1_diseno_id,
        cristal1_indice_id,
        cristal1_material_id,
        cristal1_color_id,
        cristal1_tratamiento_id,

        cristal2_marca_id,
        cristal2_diseno_id,
        cristal2_indice_id,
        cristal2_color_id,
        cristal2_tratamiento_id
    } = (formValuesCompleto && formValuesCompleto["cristales"]) || {};

    const _pkToDelete1_od ={
          "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
          "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
          "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
          "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
          "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
          "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
          "diametro":   A1_Diametro.value,
          "esferico":   dioptrias_receta.value.a1_od.esf ?? 0, 
          "cilindrico": dioptrias_receta.value.a1_od.cil ?? 0,
          "punto_venta": punto_venta.value,
    }

    const _pkToDelete1_oi ={
        "marca":      cristal1_marca_id       || data?.[EnumGrid.cristal1_marca_id],
        "diseno":     cristal1_diseno_id      || data?.[EnumGrid.cristal1_diseno_id],
        "indice":     cristal1_indice_id      || data?.[EnumGrid.cristal1_indice_id],
        "material":   cristal1_material_id    || data?.[EnumGrid.cristal1_material_id],
        "color":      cristal1_color_id       || data?.[EnumGrid.cristal1_color_id],
        "tratamiento":cristal1_tratamiento_id || data?.[EnumGrid.cristal1_tratamiento_id],
        "diametro":   A1_Diametro.value,
        "esferico":   dioptrias_receta.value.a1_oi.esf ?? 0,
        "cilindrico": dioptrias_receta.value.a1_oi.cil ?? 0, 
        "punto_venta": punto_venta.value,
      }

      const _pkToDelete2_od ={
        "marca":      cristal2_marca_id        || data?.[EnumGrid.cristal2_marca_id],
        "diseno":     cristal2_diseno_id       || data?.[EnumGrid.cristal2_diseno_id],
        "indice":     cristal2_indice_id       || data?.[EnumGrid.cristal2_indice_id],
        "material":   cristal1_material_id     || data?.[EnumGrid.cristal2_material_id],
        "color":      cristal2_color_id        || data?.[EnumGrid.cristal2_color_id],
        "tratamiento":cristal2_tratamiento_id  || data?.[EnumGrid.cristal2_tratamiento_id],
        "diametro":   A2_Diametro.value,
        "esferico":   a2_od_esf.value ?? 0, 
        "cilindrico": a2_od_cil.value ?? 0,
        "punto_venta": punto_venta.value,
    }

    const _pkToDelete2_oi ={
        "marca":      cristal2_marca_id          || data?.[EnumGrid.cristal2_marca_id],
        "diseno":     cristal2_diseno_id         || data?.[EnumGrid.cristal2_diseno_id],
        "indice":     cristal2_indice_id         || data?.[EnumGrid.cristal2_indice_id],
        "material":   cristal1_material_id       || data?.[EnumGrid.cristal2_material_id],
        "color":      cristal2_color_id          || data?.[EnumGrid.cristal2_color_id],
        "tratamiento":cristal2_tratamiento_id    || data?.[EnumGrid.cristal2_tratamiento_id],
        "diametro":   A2_Diametro.value,
        "esferico":   a2_oi_esf.value ?? 0,
        "cilindrico": a2_oi_cil.value ?? 0, 
        "punto_venta": punto_venta.value,
      }
    
    //TODO! =========================== ENVIAR DP EN _P4 PARA VALIDAR ARMAZONES ===========================================================================


    const fetchArmazones1 = async (inputName:string, codArmazon:string)=>{
        
        let dp            = 0
        let diametro      = 0
        let pkJSON:any    = {}
        let encodedJSON   = {}

        // const pkJSON = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
        // const encodedJSON = encodeURIComponent(pkJSON)
        
        console.log(codArmazon)
        

        if(codArmazon && codArmazon.trim() === ''){
            return;
        }

        const toastLoading = toast.loading('Cargando...');
        
        switch (inputName) {
            case 'a1_armazon_id':
                 dp          = A1_DP.value as any
                 diametro    = A1_Diametro.value as any
                 pkJSON      = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
                 encodedJSON = encodeURIComponent(pkJSON)
                break
            case 'a2_armazon_id':
                dp           = A2_DP.value as any
                diametro     = A2_Diametro.value as any
                pkJSON       = JSON.stringify([_pkToDelete2_od, _pkToDelete2_oi])
                encodedJSON  = encodeURIComponent(pkJSON)
                // let _señal      = a2_armazon.value as any
                break;
            case 'a3_armazon_id':
                dp         = A1_DP.value as any
                diametro   = A1_Diametro.value as any
                pkJSON      = JSON.stringify([_pkToDelete1_od, _pkToDelete1_oi])
                encodedJSON = encodeURIComponent(pkJSON)
                break;
            default:
                break;
        }    
  
        try {
            const {data} = await axios((validar_parametrizacion.value === '1' ) 
                                                   ? (`${endpoint
                                                                        }&_p1=${codArmazon && codArmazon.trim() !== '' ? codArmazon.trim() : ""
                                                                        }&_p4=${
                                                                            tipo_de_anteojo.value === '3'
                                                                            ? (  
                                                                                typeof dp === 'number' 
                                                                                    ? (typeof dp === 'number' ? dp : 0) 
                                                                                    : (typeof dp === 'string' ? dp: 0)
                                                                            )
                                                                            : (
                                                                                typeof A1_DP.value === 'number' 
                                                                                    ? (typeof A1_DP.value === 'number' ? A1_DP.value : 0) 
                                                                                    : (typeof A1_DP.value === 'string' ? A1_DP.value : 0)
                                                                            )

                                                                        }&_p5=${
                                                                            tipo_de_anteojo.value === '3'
                                                                            ? (
                                                                                typeof diametro === 'number' 
                                                                                    ? (typeof diametro === 'number' ? diametro :  "" ) 
                                                                                    : (typeof diametro === 'string' ? diametro : "")
                                                                            )
                                                                            : (
                                                                                typeof A1_Diametro.value === 'number' 
                                                                                    ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value :  "" ) 
                                                                                    : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")
                                                                            )
                                                                        }&_pkToDelete=${encodedJSON}`) 
                                                   : (`${endpoint}&_p1=${codArmazon && codArmazon.trim() !== '' ? codArmazon : ''}`))
            // console.log(data[0])
            if(data && data[0] && data[0][0] === 'ERROR'){
                toast.error(data[0][1])
                // _señal = " "
                onDataChange({[inputName]: " "})
                if(inputName === 'a1_armazon_id'){
                    setArmazon1([])
                    setCodArmazon1(" ")
                    validation_A1_armazon('')
                    
                }

                if(inputName === 'a2_armazon_id'){
                    setArmazon2([])
                    setCodArmazon2(" ")
                    validation_A2_armazon('')
                }

                if(inputName === 'a3_armazon_id'){
                    setArmazon3([])
                    setCodArmazon3(" ")
                }
                toast.dismiss(toastLoading)
                return;
            }else{
                if(data[0]){
                    onDataChange({[inputName]:data[0][0]})
                    if(inputName === 'a1_armazon_id'){
                        localStorage.setItem('a1_armazon', data[0])
                        setArmazon1(data[0])
                        setCodArmazon1(data[0][0])
                        a1_armazon.value = data[0][0]
                    }
    
                    if(inputName === 'a2_armazon_id'){
                        localStorage.setItem('a2_armazon', data[0])
                        setArmazon2(data[0])
                        setCodArmazon2(data[0][0])
                        a2_armazon.value = data[0][0]
                    }
    
                    if(inputName === 'a3_armazon_id'){
                        localStorage.setItem('a3_armazon', data[0])
                        setArmazon3(data[0])
                    }
                }
            }
            toast.dismiss(toastLoading)

            switch (inputName) {
                    case 'a1_armazon_id':
                        if(a1_armazon.value.trim() === a2_armazon.value.trim() || a1_armazon.value.trim() === a3_armazon.value.trim() ){
                            toast.error(`Código Armazon 1 no puede ser igual a Código ${a1_armazon.value.trim() === a2_armazon.value.trim() ? 'Armazon 2': 'Armazon 3'}`);
                            onDataChange({['a1_armazon_id']: " "})
                            a1_armazon.value = " "
                            setCodArmazon1(" ")
                            setArmazon1([])
                            validation_A1_armazon("")
                            console.log('render')
                            return;
                        }
                        return
                    case 'a2_armazon_id':
                        if(a2_armazon.value.trim() === a1_armazon.value.trim() || a2_armazon.value.trim() === a3_armazon.value.trim()){
                            toast.error(`Código Armazon 2 no puede ser igual a Código ${a2_armazon.value.trim() === a1_armazon.value.trim() ? 'Armazon 1': 'Armazon 3'}`);
                            onDataChange({['a2_armazon_id']: " "})
                            a2_armazon.value = " "
                            setCodArmazon2(" ")
                            setArmazon2([])
                            validation_A2_armazon("")
                            return;
                        }
                        return;
                    case 'a3_armazon_id':
                        if(a3_armazon.value.trim() === a1_armazon.value.trim() || a3_armazon.value.trim() === a2_armazon.value.trim()){
                            toast.error(`Código Armazon 3 no puede ser igual a Código ${a3_armazon.value.trim() === a1_armazon.value.trim() ? 'Armazon 1': 'Armazon 2'}`);
                            onDataChange({['a3_armazon_id']: " "})
                            setCodArmazon3(" ")
                            setArmazon3([])
                            setCodArmazon3(" ")
                            return
                        }
                        return;
                    default:
                        break;
            }
        
            toast.dismiss(toastLoading)
        } catch (error) {
            toast.dismiss(toastLoading)
            throw error
        }
    }


    //TODO! =========================== ENVIAR Diametro EN _P5 PARA VALIDAR ARMAZONES =====================================================================

    // const endpoint = validar_parametrizacion.value === '0' 
    //                                                ? `${URLBackend}/api/armazones/listado/?query=01` 
    //                                                : `${URLBackend}/api/armazones/listado/?query=02&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;


    
    const endpoint =`${URLBackend}/api/armazones/listado/?query=02&_id=${permiso_areas_armazones === true ? 1 : 0}&_p6=${ isEditting ? (data && data[EnumGrid.validar_parametrizacion_id]) : 1 }&_p2=${codigoProyecto.value}&_p3=${punto_venta.value}`;

    // console.log(punto_venta.value)

    const handleInputChange = (e:any) => {
        const { name, value } = e;

        console.log(name)
        console.log(value)
        
        onDataChange({ [name]: value.trim() });
        if(value.trim() === ''){
            return;
        }
        console.log(value)


        if(name === 'a1_armazon_id'){
            a1_armazon.value = value.trim()
            setCodArmazon1(value.trim())
        }
        if(name === 'a2_armazon_id'){
            a2_armazon.value = value.trim()
            setCodArmazon2(value.trim())
        }
        if(name === 'a3_armazon_id'){
            a3_armazon.value = value.trim()
            setCodArmazon3(value.trim())
        }

        // setRender((prev)=>!prev)

        if((name === 'a1_armazon_id' || name === 'a2_armazon_id' || 'a3_armazon_id') ){
            fetchArmazones1(name, value)
            switch (name) {
                case 'a1_armazon_id':
                    if(value.trim() === ''){
                        setArmazon1([])
                    }
                    break;
                case 'a2_armazon_id':
                    if(value.trim() === ''){
                        setArmazon2([])
                    }
                    break;
                case 'a3_armazon_id':
                    if(value.trim() === ''){
                        setArmazon3([])
                    }
                    break;
                default:
                    break;
            }
        }
          
        
        
        validationOTlevel2(name, value)
        
    
        
        onDataChange({ [name]: value.trim() }); 
    };

    const handleInputValidationChange = (e:any) => {
        const { name, value } = e;

        console.log(name)
        console.log(value)
        validationOTlevel3(name, value)
        if(name === 'validar_armazon1'){
            console.log('render')
            validar_armazon1.value = value.trim()
            if(value.trim() !== ''){
                const item = validationNivel3.value.find((item: { campo: string; }) => item.campo === 'validar_armazon1');
                
                if(item && item.valor === 0){
                    toast.error('Códigos Armazon 1 no Coincide')
                    validar_armazon1.value = "";
                    onDataChange({['validar_armazon1']: ""})
                }
            }

        }

        if(name === 'validar_armazon2'){
            validar_armazon2.value = value.trim()
            if(value.trim() !== ''){
                const item = validationNivel3.value.find((item: { campo: string; }) => item.campo === 'validar_armazon2');

                if(item && item.valor === 0){
                    toast.error('Códigos Armazon 2 no Coincide')
                    validar_armazon2.value = " ";
                    // onDataChange({['validar_armazon2']: ""})

                }
            }

        }

        onDataChange({ [name]: value.trim() }); 
    }

    
    useEffect(()=>{
        if(codArmazon1 && armazon1[0] && armazon1.length > 2){
            onDataChange({['a1_armazon_id']: armazon1[0]})
        }
        
        // fetchArmazones1('a1_armazon_id', codArmazon1)
    },[armazon1, codArmazon1])

    useEffect(()=>{
        if(codArmazon2 && armazon2[0] && armazon2.length > 2){
            onDataChange({['a2_armazon_id']: armazon2[0]})
        }
        // fetchArmazones1('a2_armazon_id', codArmazon2)        
    },[armazon2, codArmazon2])
    useEffect(()=>{
        if(codArmazon3 && armazon3[0] && armazon3.length > 2){
            onDataChange({['a3_armazon_id']: armazon3[0]})
        }        
        // fetchArmazones1('a3_armazon_id', codArmazon3)
    },[armazon3, codArmazon3])



    useEffect(()=>{

    if(codArmazon1 && codArmazon1.trim() !== ''){
        localStorage.getItem('a1_armazon') 
                              ? setArmazon1(localStorage.getItem('a1_armazon')?.split(','))
                              : fetchArmazones1('a1_armazon_id', codArmazon1)
    }

    if(codArmazon2 && codArmazon2.trim() !== ''){
        localStorage.getItem('a2_armazon')
                              ? setArmazon2(localStorage.getItem('a2_armazon')?.split(','))
                              : fetchArmazones1('a2_armazon_id', codArmazon2) 
    }


    if(codArmazon3 && codArmazon3.trim() !== ''){
        localStorage.getItem('a3_armazon')
                              ? setArmazon3(localStorage.getItem('a3_armazon')?.split(','))
                              : fetchArmazones1('a3_armazon_id', codArmazon3)
    }

      
    },[])

  

    console.log(permiso_areas_armazones)
    console.log(permiso_usuario_armazones)
    

    console.log(!isEditting)
  return (
    <form>
        <div className='w-full frameOTForm'>
            {/* <div className='w-full items-center rowForm !h-[5rem]  grid grid-cols-3'> */}
            <div className="relative !mt-[2rem] !h-[30rem] grid grid-cols-3">
                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex !mt-2 rowForm ">
                                <div className="-mt-[0.40rem]">
                                    <OTTextInputComponent
                                        type="text"
                                        label="Código Armazón 1"
                                        name="a1_armazon_id"
                                        handleChange={handleInputChange}
                                        otData={ a1_armazon.value ? a1_armazon.value :  formValues  && formValues["a1_armazon_id"] ? formValues["a1_armazon_id"] : data && data[EnumGrid.a1_armazon_id]}
                                        // data={a1_armazon.value || data && data[EnumGrid.a1_armazon_id]}
                                        control={control}
                                        onlyRead={!(!isEditting || (permiso_usuario_armazones && permiso_areas_armazones))}
                                        // isOT={true}
                                        textAlign="text-center"
                                        className='!text-xl custom-input '
                                        />

                                </div>
                            {OTAreas === 60 && (
                                <div className="-mt-[0.35rem]">
                                    <OTTextInputComponent
                                        type="text"
                                        label="Validar Código"
                                        name="validar_armazon1"
                                        handleChange={handleInputValidationChange}
                                        otData={validar_armazon1.value ? validar_armazon1.value : formValues  && formValues["validar_armazon1"] && formValues["validar_armazon1"] }
                                        control={control}
                                        // isOT={true}
                                        textAlign="text-center"
                                        className='!text-xl custom-input '
                                    />
                                </div>
                            )}
                            </div>                            
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{ validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[2] : armazon1 && armazon1[2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[4] : armazon1 && armazon1[4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[5] : armazon1 && armazon1[5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[6] : armazon1 && armazon1[6] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[8] : armazon1 && armazon1[8] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[9] : armazon1 && armazon1[9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[10] : armazon1 && armazon1[10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[11] :armazon1 && armazon1[11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[12] :armazon1 && armazon1[12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon1[0] && armazon1[14] : armazon1 && armazon1[14]}</p>
                            </div>
                           
                        </div>
                    </div> 
                </div>

                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex mt-6 rowForm ">
                            <div className="-mt-[0.40rem]">
                                <OTTextInputComponent
                                    type="text"
                                    label="Código Armazón 2"
                                    name="a2_armazon_id"
                                    handleChange={handleInputChange}
                                    otData={ a2_armazon.value ? a2_armazon.value   : formValues ? formValues["a2_armazon_id"] : data && data[EnumGrid.a2_armazon_id]}
                                    control={control}
                                    onlyRead={!(!isEditting || (permiso_usuario_armazones && permiso_areas_armazones ))}
                                    // isOT={true}
                                    textAlign="text-center"
                                    className='!text-xl custom-input '
                                    />
                            </div>

                                {(OTAreas === 60 && tipo_de_anteojo.value === '3' ) && (
                                    <div className="-mt-[0.35rem]">
                                        <OTTextInputComponent
                                            type="text"
                                            label="Validar Código"
                                            name="validar_armazon2"
                                            handleChange={handleInputValidationChange}
                                            otData={validar_armazon2.value ? validar_armazon2.value : formValues  && formValues["validar_armazon2"] && formValues["validar_armazon2"]}
                                            control={control}
                                            onlyRead={tipo_de_anteojo.value === '3' ? false : true}
                                           //  isOT={true}
                                            textAlign="text-center"
                                            className='!text-xl custom-input '
                                         />
                                    </div>
                                     )}    
                            </div>                            
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[2] : armazon2 &&  armazon2[2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[4] : armazon2 &&  armazon2[4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[5] : armazon2 &&  armazon2[5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[6] : armazon2 &&  armazon2[6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[8] : armazon2 &&  armazon2[8]} </p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[9] : armazon2 &&  armazon2[9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[10] : armazon2 &&  armazon2[10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[11] : armazon2 &&  armazon2[11] }</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[12] : armazon2 &&  armazon2[12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon2[0] && armazon2[14] : armazon2 &&  armazon2[14]}</p>
                            </div>
                            
                        </div>

                    </div>
                </div>

                <div className='flex !h-[29rem] !ml-[1rem]'>
                    <div className="w-[90%] mx-auto ">
                        <div className="w-[90%] ml-4 flex items-center">
                            <div className="w-full flex mt-6 rowForm ">
                                <OTTextInputComponent
                                    type="text"
                                    label="Código Armazón 3"
                                    name="a3_armazon_id"
                                    handleChange={handleInputChange}
                                    otData={ a3_armazon.value ? a3_armazon.value  : formValues ? formValues["a3_armazon_id"] : data && data[EnumGrid.a3_armazon_id]}
                                    control={control}
                                    onlyRead={!(!isEditting || (permiso_usuario_armazones && permiso_areas_armazones ))}
                                    // isOT={true}
                                    isOptional={true}
                                    textAlign="text-center"
                                    className='!text-xl custom-input '
                                    />
                            </div>
                        </div>

                        <div className="w-[90%] mx-auto radioComponent">
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Tipo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[2] : armazon3 && armazon3[2]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Marca:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[4] : armazon3 && armazon3[4]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Modelo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[5] : armazon3 && armazon3[5]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Color:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[6] : armazon3 && armazon3[6]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Material:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[8] : armazon3 && armazon3[8]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Aro:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[9] : armazon3 && armazon3[9]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Puente:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[10] : armazon3 && armazon3[10]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between ">
                                <h2 className="textArmazonOT">Diagonal:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[11] : armazon3 && armazon3[11]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Brazo:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[12] : armazon3 && armazon3[12]}</p>
                            </div>
                            <div className="ml-2 mb-2 flex justify-between">
                                <h2 className="textArmazonOT">Uso:</h2>
                                <p className="textArmazonOTDetalle">{validar_parametrizacion.value === '1' ? armazon3[0] && armazon3[14] : armazon3 && armazon3[14]}</p>
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





    // const fetchArmazones1 = async (inputName:string, codArmazon:string)=>{
        
    //     console.log(inputName)
    //     let dp         = 0
    //     let diametro   = 0

    //     if(codArmazon.trim() === ''){
    //         return;
    //     }
        

    //     switch (inputName) {
    //         case 'a1_armazon_id':
    //              dp        = A1_DP.value as any
    //              diametro  = A1_Diametro.value as any
    //             break
    //         case 'a2_armazon_id':
    //             dp         = A2_DP.value as any
    //             diametro   = A2_Diametro.value as any
    //             break;
    //         default:
    //             break;
    //     }    

    //     console.log(codArmazon)
    //     console.log(dp)
    //     console.log(diametro)




    //     try {
    //         console.log('render')
    //         const {data} = await axios((validar_parametrizacion.value === '1' ) 
    //                                                ? (`${endpoint
    //                                                                     }&_p1=${codArmazon1 !== ' ' ? codArmazon1.trim() : "aaaa"
    //                                                                     }&_p4=${
    //                                                                         typeof A1_DP.value === 'number' 
    //                                                                         ? (typeof A1_DP.value === 'number' ? A1_DP.value : 0) 
    //                                                                         : (typeof A1_DP.value === 'string' ? A1_DP.value : 0)
    //                                                                     }&_p5=${
    //                                                                         typeof A1_Diametro.value === 'number' 
    //                                                                         ? (typeof A1_Diametro.value === 'number' ? A1_Diametro.value : "" ) 
    //                                                                         : (typeof A1_Diametro.value === 'string' ? A1_Diametro.value : "")}`) 
    //                                                : (`${endpoint}&_p1=${codArmazon1 !== ' ' ? codArmazon1 && codArmazon1.trim() : "aaaa"}`))
    //         // console.log(data[0])
    //         if(data && data[0] && data[0][0] === 'ERROR'){
    //             toast.error(data[0][1])
    //             a1_armazon.value = " "
    //             onDataChange({['a1_armazon_id']: " "})
    //             setArmazon1([])
    //         }else{
    //             setArmazon1(data[0])
    //         }
    //     } catch (error) {
    //         throw error
    //     }
    // }



