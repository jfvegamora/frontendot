import React,{createContext, useState} from 'react'
import { IPerson } from '../../interfaces'

interface IFormContext{
    isFormOpen:boolean,
    setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
    formData: IPerson | null;
    setFormData: React.Dispatch<React.SetStateAction<IPerson | null >>;
}

export const FormContext = createContext<IFormContext>({
    isFormOpen: false,
    setIsFormOpen: () => {},
    formData: null,
    setFormData: () => {}
});

interface FormProviderProps{
    children: React.ReactNode;
}


const FormProvider:React.FC<FormProviderProps> = ({children}) => {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<IPerson | null>(null);
  return (
    <FormContext.Provider value={{isFormOpen, setIsFormOpen, formData, setFormData}}>
        {children}
    </FormContext.Provider>
  )
}

export default FormProvider