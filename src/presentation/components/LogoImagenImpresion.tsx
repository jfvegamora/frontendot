import React from 'react'

interface ILogoImagenImpresion{
    imagen64:any
}


const LogoImagenImpresion:React.FC<ILogoImagenImpresion> = ({
    imagen64
}) => {
  return (
    <img src={`data:image/jpeg;base64, ${imagen64}`} alt="Imagen" />
)
}

export default LogoImagenImpresion