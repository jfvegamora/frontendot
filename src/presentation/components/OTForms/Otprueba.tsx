import { signal } from '@preact/signals-react';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { URLBackend } from '../../utils/config';

export const inputName = signal(0);
export const entities = signal([]);

const Otprueba: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState(inputName.value);
  const [entities2, setEntities2] = useState([]);
  const selectRef = useRef<any>(null);

  const fetchEntities = async () => {
    try {
      const { data } = await axios(`${URLBackend}/api/tipos/listado/?query=02&_p1=CristalesDisenos`);
      entities.value = data;
      setEntities2(data)
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    setSelectedValue(inputName.value);
    fetchEntities();
  }, []);


  useEffect(() => {
    // Utiliza document.querySelector para seleccionar el elemento select
    const selectElement = document.querySelector('#hola');
    
    if (selectElement instanceof HTMLSelectElement) {
      // Verifica si el elemento select es una instancia de HTMLSelectElement y luego configura el índice
      selectElement.selectedIndex = 4;
    }

    // console.log(selectElement.selectedIndex)
  }, [selectedValue]);

  return (
    <div className="flex min-w-[100%] w-full items-center mx-4 mt-select mt-select-dropdown-up cursor-pointer">
      <select
       id='hola'
       ref={selectRef}
    //    value={selectedValue} 
       onChange={(e) => console.log(e) }>

        {entities2.map((entity, index) => (
          <option key={index} value={index}>
            {entity[1]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Otprueba;
