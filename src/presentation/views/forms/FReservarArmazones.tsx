import React from 'react'

const FReservarArmazones = () => {
    return (
        <form className="max-w-md mx-auto px-6">
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
            <input type="text" id="nombre" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label htmlFor="mensaje" className="block text-gray-700 text-sm font-bold mb-2">Mensaje</label>
            <textarea id="mensaje" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Enviar</button>
          </div>
        </form>
);
}

export default FReservarArmazones