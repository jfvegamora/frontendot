import React from 'react'

interface ILogoImagenImpresion{
    imagen64:any
}


const LogoImagenImpresion:React.FC<ILogoImagenImpresion> = ({
    imagen64
}) => {
  return (
    <img src={`data:image/jpeg;base64, ${imagen64}`} alt="Imagen"  className='w-[90%] ml-2'/>
)
}

export default LogoImagenImpresion