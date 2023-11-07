/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import RegProCom from "../components/RegProCom";
import { useForm } from "react-hook-form";

const LandingPage: React.FC = () => {
  const {control} = useForm()
 
 
  return (
    <div className="mantenedorContainer">
        <RegProCom
         control={control}
         name="comuna_id"
        />
    </div>
  );
};

export default LandingPage;
