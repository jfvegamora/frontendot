// import React from 'react'

import { useState } from "react";
import QrScannerInput from "../../components/QrScannerInput";
// import { SelectInputComponent } from "../../components";

const FReservarArmazones = () => {
  const [showScannQR, setShowScannQR] = useState(false)

    return (
        <form className="max-w-md mx-auto px-6">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Proyecto</label>
            <select name="" id=""></select>
            
            {/* <SelectInputComponent
                        label="Nombre Proyecto"
                        name="proyecto_codigo"
                        showRefresh={true}
                        isOT={true}
                        handleSelectChange={handleInputChange}
                        data={codigoProyecto.value || formValues && formValues["proyecto_codigo"] ? formValues["proyecto_codigo"]  : data && data[EnumGrid.proyecto_codigo]}
                        data={codigoProyecto.value ||  (data && data[EnumGrid.proyecto_codigo])}
                        control={control}
                        entidad={["/api/proyectos/", "07", userID]}
                        // error={errors.establecimiento}
                        customWidth={"345px"}
                        // readOnly={isEditting}
                    /> */}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="mensaje" className="block text-gray-700 text-sm font-bold mb-2">Mensaje</label>
            <textarea id="mensaje" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="mb-4">
            <button onClick={(e)=>{
              e.preventDefault()
              setShowScannQR(true)
            }}>Scann QR</button>
            
          {
              showScannQR && (
                <QrScannerInput/>

          )}
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
          </div>
        </form>
);
}

export default FReservarArmazones