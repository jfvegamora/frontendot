import { signal } from '@preact/signals-react';
import React, { ReactNode } from 'react';
import { BsFillFilterCircleFill } from "react-icons/bs";

interface IProps{
    children:ReactNode
}

export const filterToggle = signal(false);

const FilterButton:React.FC<IProps> = ({
    children
}) => {
  const toggleFilters = () => {
    filterToggle.value = !filterToggle.value
  };

  console.log(filterToggle.value)
  
  return (
    <div className="fixed top-[5rem] left-10 z-[13] items-center">
      <BsFillFilterCircleFill
        className={`bg-blue-500 w-[4.5rem] h-[4.5rem] text-white p-3 rounded-full shadow-lg top-0 absolute z-30 transition-transform transform hover:scale-110 cursor-pointer ${filterToggle.value ? 'scale-110' : ''}`}
        onClick={toggleFilters}
      />
      <div
        className={`${
          filterToggle.value ? 'w-[93vw] h-auto mx-auto' : 'w-0 h-0 '
        } transition-all duration-500 bg-white h-10 p-2 items-center rounded shadow-lg overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterButton;
