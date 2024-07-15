import { signal } from '@preact/signals-react';
import React, { ReactNode, useEffect } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { RxDoubleArrowLeft } from "react-icons/rx";

interface IProps {
  children: ReactNode;
  isOT?:boolean;
  className?:string;
}

export const filterToggle = signal(false);
export const isHovered    = signal(false);

const FilterButton: React.FC<IProps> = ({
  children,
  isOT,
  className
}) => {

  const handleMouseEnter = () => {
    isHovered.value      =  !isHovered.value
    filterToggle.value   =  !filterToggle.value
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        filterToggle.value = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  return (
    <div className={`fixed ${className ? className : "top-[4rem] left-5"} z-[13] items-center h-[30vh] transition-all duration-500`}>
      <MagnifyingGlassIcon
        className={`bg-[#f39c12] w-[3rem] h-[3rem] text-white p-3 rounded-full shadow-lg top-2 absolute z-30 transition-transform transform cursor-pointer ${isHovered.value ? 'scale-110 bg-orange-700' : ''}`}
        onClick={handleMouseEnter}
      />
      <div
        className={`${
          filterToggle.value ? 'w-[98vw] mx-auto' : 'w-0 translate-x-[-200rem] absolute'
        } transition-all duration-500 bg-white ${isOT ? "!h-[35vh] !w-[95vw]" : "!h-[20rem]"} p-2 items-center rounded shadow-lg overflow-hidden`}
      >
        {children}
      </div>
      {filterToggle.value && (
        <RxDoubleArrowLeft onClick={()=>handleMouseEnter()} 
        className={`${isOT ? "top-[10rem] " : "top-[10rem] "} transition-all duration-500 text-[#f39c12] hover:bg-gray-200  rounded-xl cursor-pointer w-[4rem]  h-[4rem] ${isOT ? "translate-x-[90vw] translate-y-[-5rem]" : "translate-x-[90vw] translate-y-[-5rem]"} `}/>
      )}
    </div>
  );
};

export default FilterButton;
