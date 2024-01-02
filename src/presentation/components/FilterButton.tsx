import { signal } from '@preact/signals-react';
import React, { ReactNode, useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { RxDoubleArrowLeft } from "react-icons/rx";

interface IProps {
  children: ReactNode;
  isOT?:boolean;
  className?:string;
}

export const filterToggle = signal(false);

const FilterButton: React.FC<IProps> = ({
  children,
  isOT,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    filterToggle.value = true;
    setIsHovered(true);
  };

  // const handleMouseLeave = () => {
  //   filterToggle.value = false;
  //   setIsHovered(false);
  // };

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

  className
  return (
    <div className={`fixed ${className ? className : "top-[4rem] left-5"} z-[13] items-center bg-yellow-300`}>
      <MagnifyingGlassIcon
        className={`bg-[#f39c12] w-[3.5rem] h-[3.5rem] text-white p-3 rounded-full shadow-lg top-0 absolute z-30 transition-transform transform cursor-pointer ${isHovered ? 'scale-110' : ''}`}
        onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
      <div
        className={`${
          filterToggle.value ? 'w-[98vw] h-auto mx-auto' : 'w-0 -left-[70rem] absolute'
        } transition-all duration-500 bg-white ${isOT ? "!h-[12rem]" : "!h-[20rem]"} p-2 items-center rounded shadow-lg overflow-hidden`}
      >
        {children}
      </div>
        <RxDoubleArrowLeft onClick={()=>filterToggle.value = !filterToggle.value} className=" text-[#f39c12] hover:bg-gray-200  rounded-xl cursor-pointer w-[4rem] absolute h-[4rem] top-[6.5rem] right-4"/>
    </div>
  );
};

export default FilterButton;
