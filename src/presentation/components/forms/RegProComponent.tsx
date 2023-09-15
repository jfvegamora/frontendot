import React,{useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { SelectInputComponent } from ".";
import { useCrud } from "../../hooks";

interface Props{
    control:any;
    isEditting:boolean;
    data?:any
    EnumGrid:any;
    errors:any;

}


const RegProComponent: React.FC<Props> = React.memo(({
    control,
    isEditting,
    data,
    EnumGrid,
    errors
})=>{
    const [provincias, setProvincias] =  useState([]);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([])
    const [selectedProvincia, setSelectedProvincia] = useState(0)

    const {ListEntity} = useCrud("/api/provincias/")
    const {ListEntity:ListEntityComunas} = useCrud("/api/comunas/")

    useEffect(()=>{
     const _p1 = `_p1=${regiones}`
     ListEntity(_p1,"02")
        .then((provincias)=>setProvincias(provincias))
        .catch((e)=>console.log(e))
    },[regiones])


    useEffect(()=>{
     const _p1 = `_p1=${selectedProvincia}`
     selectedProvincia !== 0 && (
        ListEntityComunas(_p1,"02")
            .then((comunas)=>setComunas(comunas))
            .catch((e)=>console.log(e))
     )
    },[selectedProvincia, provincias])



    return(
        <div  className="flex flex-col min-w-[60px] w-full items-center mb-2 mx-4 mt-select mt-select-dropdown-up cursor-pointer ">
            <SelectInputComponent
              label        ="Region"
              name         ="region"
              showRefresh  ={true}
              control      ={control}
              data         ={data && data[EnumGrid?.region]}   
              entidad      ={["/api/regiones/", "02"]}
              error        ={!isEditting && errors.region}
              setState     ={setRegiones}
            />
            

            <select
                className="min-w-full mb-4"
                onChange={(e)=>setSelectedProvincia(e.target.value)}            
            >
                {provincias.length > 1 && (
                    provincias.map((provincia,index)=>(
                        <option value={provincia[0]} key={index}>{provincia[1]}</option>
                    ))
                )}
            </select>

            <Controller
            name="comuna"
            control={control}
            render={({field}) => <select
                {...field}
                className="min-w-full"
            >
                {comunas.length > 1 && (
                    comunas.map((comuna, index) => (
                        <option value={comuna[0]} key={index}>{comuna[1]}</option>
                    ))
                )}
            </select>}
            />



        </div>
    )
});


export default RegProComponent;