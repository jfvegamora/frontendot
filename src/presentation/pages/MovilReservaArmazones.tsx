import { Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MovilReservaArmazones:React.FC = () => {
  const navigate = useNavigate();


  return (
    <div className='bg-white !w-[70%] mx-auto !h-full mt-40 flex flex-col'>
        MovilReservaArmazones

        <div className="sm:w-[40%] mx-auto">
          <Button>Reserva Online</Button>
        </div>
        <div className="sm:w-[40%] mx-auto mt-4">
          <Button 
            color='green'
            onClick={()=>(
              navigate('/terreno')
            )}
          >
            Reserva Ofline
          </Button>
        </div>
    </div>
  )
}

export default MovilReservaArmazones