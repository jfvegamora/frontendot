import React from 'react';

const Navbar:React.FC = () => {
    return(
        <nav className='flex items-center justify-between bg-gray-200 p-3'>
            <div className='flex flex-row items-center'>
                {/*logo */}
                <div className='flex ites-center'>
                    <a href="/" className="text-gray-800 font-bold text-lg">Logo</a>
                </div>
            </div>
            <ul className='hidden md:flex space-x-4'>
                <li><a href="/" className='text-gray-600 hover:text-gray-800 '>Ruta1</a></li>
                <li><a href="/" className='text-gray-600 hover:text-gray-800 '>Ruta2</a></li>
            </ul>
        </nav>
    )
}


export default Navbar;