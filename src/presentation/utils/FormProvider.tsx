// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { createContext, useState } from "react";
// import { IPerson } from "../../interfaces";

// interface IFormContext {
//   isFormOpen: boolean;
//   setIsFormOpen: any;
//   formData: IPerson | null;
//   setFormData: any;
// }

// export const FormContext = createContext<IFormContext>({
//   isFormOpen: false,
//   setIsFormOpen: () => {},
//   formData: null,
//   setFormData: () => {},
// });

// interface FormProviderProps {
//   children: React.ReactNode;
// }

// const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
//   const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
//   const [formData, setFormData] = useState<IPerson | null>(null);
//   return (
//     <FormContext.Provider
//       value={{ isFormOpen, setIsFormOpen, formData, setFormData }}
//     >
//       {children}
//     </FormContext.Provider>
//   );
// };

// export default FormProvider;
