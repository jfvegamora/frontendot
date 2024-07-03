/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import { Controller } from "react-hook-form";
import { A1_DP } from "../../utils";
import { toast } from "react-toastify";
import { faTrash, faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { codArmazon1, codArmazon2, codArmazon3 } from "../../views/forms/FReservarArmazones";
import { clearRutCliente } from "../../utils/FOTClientes_utils";

// import debounce from "lodash/debounce"
// import debounce from 'lodash/debounce'

interface ITextInputProps {
  label: string;
  name: string;
  defaultValue?: any;
  onlyRead?: boolean;
  type: string;
  control: any;
  data?: any;
  error?: any;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?:string;
  handleChange?: (data:any)=>void;
  maxLength?:number;
  step?:number;
  tabIndex?: number;
  isOT?:boolean;
  customWidth?: any;
  isOptional?:boolean;
  textAlign?: string;
  validarBodega?:boolean
  handleFocus?:any
  reservaArmazones?:boolean;
  handleFocusReservaArmazones?:any;
}

const TextInputInteractive: React.FC<ITextInputProps> = ({
  label,
  type,
  control,
  name,
  handleChange,
  onlyRead,
  data,
  error,
  inputRef, 
  className,
  maxLength,
  step,
  tabIndex,
  isOT,
  customWidth,
  isOptional,
  textAlign,
  validarBodega,
  handleFocus,
  reservaArmazones,
  handleFocusReservaArmazones
}) => {
  const [_defaultValue, setDefaultValue] = useState<any>(data || " "); 
  const[_render, setRender] = useState(false);

  const [value, setValue] = useState<any>(data || "");

  
  let armazonInput:any = '';

  if(reservaArmazones){
    switch (name) {
      case 'Armazon1':
        armazonInput = codArmazon1;
        break;
      case 'Armazon2':
        armazonInput = codArmazon2;
        break;
      case 'Armazon3':
        armazonInput = codArmazon3;
        break;
    
      default:
        break;
    }

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
    if (handleChange) {
      console.log(e.target)
      console.log(armazonInput)
      if(isOT){
        handleChange(e.target)
        console.log(e.target)
        setRender((prev)=>!prev)
      }else{
        handleChange(e.target.value)
        setRender((prev)=>!prev)
      }
    }   

    setValue(e.target.value)
    setRender((prev)=>!prev)

  };
  
  useEffect(()=>{
    if (data === "") {
      console.log('render')
      setDefaultValue("");
      setValue("");
  } else {
      setDefaultValue(data);
      setValue(data);


    if (data !== undefined) {
      if(name === 'a2_dp'){
        if(A1_DP.value !== ''){
          if( parseInt(data) > parseInt(A1_DP.value)){
            setValue('')
            toast.error('DP2 debe ser menor a DP1')
            return 
          }
        }
      }
      
      
    
      setRender(prev => !prev);
  }
}

  },[data])

  
React.useEffect(()=>{
  if(name === 'cliente_rut' || name === 'rut_beneficiario'){
    console.log(data)
    if(data === ''){
      console.log(data)
      setValue("")
    }
  }
},[clearRutCliente.value])





if(name === 'a1_od'){
  console.log(value)
  console.log(data)
}



return (
  <div className={`  mr-4 rounded-xl ${customWidth ? customWidth : ""}`}>
    <Controller
      name={name}
      control={control}
      defaultValue={value}
      render={({ field }) => (
        <div className={`labelInput !mb-[1rem] !ml-[1rem] relative ${error ? '!border-red-500' : 'border-gray-500'}`}>
          <Input
            {...field}
            error={error ? true : false}
            label={label}
            id={label}
            type={type}
            value={value}
            onFocus={handleFocus && handleFocus}
            readOnly={onlyRead}
            maxLength={maxLength}
            onBlur={(e) =>  {
              console.log(e)
              handleInputChange(e)
            }}
            onChange={(e)=> {
                console.log(e.target.value)
                setValue(e.target.value)
                setRender((prev)=>!prev)
                if(validarBodega){
                  handleInputChange(e as any)  
                }
            }}
            
            ref={inputRef}
            className={`${className ? className : "custom-input trans"}  ${name.startsWith("Armazon") ? "!cursor-not-allowed pr-10" : ""}  ${onlyRead ? (name.startsWith("Armazon") ? '!bg-white !cursor-not-allowed' : "custom-onlyread cursor-not-allowed" )  : isOptional ?  (name.startsWith("Armazon") ? 'custom-optional !cursor-not-allowed ' : "custom-optional") : "custom-required"} ${textAlign && textAlign}`}
            tabIndex={onlyRead ? 0 : (tabIndex || 1)}
            placeholder={type === 'date' ? "dd-mm-yyyy" : ''}
            autoComplete="off"
            step={step ? step : 1 } 
          />

          {error && (
            <p className="absolute top-0 right-[50%] labelErr">
              {error.message}
            </p>
          )}
{/* 
          {reservaArmazones && (
            <FontAwesomeIcon icon={faTrash} onClick={()=>{
              setValue('')
              console.log('click')
              armazonInput.value = ''
              console.log(name)
            }} className=" translate-x-[16rem] -translate-y-8 hover:!text-[#f8b179]"/>
          )}

          {reservaArmazones && handleFocusReservaArmazones && (
            <FontAwesomeIcon 
              icon={faCamera} 
              className="translate-x-[13rem] -translate-y-8  hover:!text-[#f8b179]"
              onClick={()=>{
                console.log('click')
                handleFocusReservaArmazones(name)
            }} />
          )} */}


          {reservaArmazones && (
            <div className="w-[28%]  flex  -translate-y-10 right-0 absolute">
              <div className="w-full">
                <FontAwesomeIcon 
                icon={faCamera} 
                className=" translate-x-2 hover:!text-[#f8b179]"
                onClick={()=>{
                  console.log('click')
                  handleFocusReservaArmazones(name)
              }} />
              </div>
              <div className="w-full">
                  <FontAwesomeIcon icon={faTrash} onClick={()=>{
                  setValue('')
                  console.log('click')
                  armazonInput.value = ''
                  console.log(name)
                }} className=" translate-x-2 hover:!text-[#f8b179]"/>                
              </div>
            </div>
          )}



        </div>
      )}
    />
  </div>
);
};

export default TextInputInteractive;

