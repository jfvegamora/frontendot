import axios from 'axios';
import React,{useState, useEffect} from 'react'
import useCustomToast from '../hooks/useCustomToast';

const LongPolling:React.FC = () => {
  const [data, setData] = useState(null);
  const { show } = useCustomToast();


  const fetchData = async() => {
        try {
            const response = await axios('https://mtoopticos.cl/api/usuarios/longpolling/?query=01')
            setData(response.data.data)
            console.log('response', response.data.data)
            show({
                message: 'nueva data disponible',
                type: "success",
              });
        } catch (error) {
            console.log('error:', error)
        }
  }

  useEffect(()=>{
    const intervalId = setInterval(fetchData, 4000);

    return () => clearInterval(intervalId)
  },[])
  return (
    <div>
      <h1>Long Polling Example</h1>
      {data ? <p>Nuevos datos disponibles: {data}</p> : <p>Esperando nuevos datos...</p>}
    </div>
  )
}

export default LongPolling