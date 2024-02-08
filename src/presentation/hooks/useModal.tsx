/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useCallback, useEffect, useRef } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor:'rgb(103 111 157 / 1)',
    border:"none"
  },
};

export function useModal() {
  const [modalMessage, setModalMessage] = useState("");
  const [params, setParams] = useState<string[]>([]);
  const [style, setStyle]   = useState<any>("");
  const firstButtonRef =  useRef<HTMLButtonElement>(null);

  const [modalResolve, setModalResolve] = useState<(result: boolean) => void>(
    () => () => {}
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = useCallback(
    (message: string,style?:string, ...props: string[]): Promise<boolean> => {
      if(style){
        setStyle(style)
      }
      setModalMessage(message);
      setIsModalOpen(true);
      setParams(props);


      return new Promise<boolean>((resolve) => {
        setModalResolve(() => {
        return resolve
      });
      });
    },
    []
  );
  const closeModal = useCallback(() => {
    console.log("close");
    setIsModalOpen((prevIsModalOpen) => {
      if (prevIsModalOpen) {
        return false;
      }
      return prevIsModalOpen;
    });
  }, []);


  useEffect(() => {
    // Cuando el modal se renderiza, movemos el foco al primer botón
    if(firstButtonRef.current){
      firstButtonRef.current.focus();
    }
  }, []);



  // console.log(params)
  const CustomModal = useCallback(
    () => (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal"
        style={customStyles}
        ariaHideApp={false}
        className={`customModal`}
        overlayClassName="overlay"
        // ref={ref}
      >
        <div className={`${style}`}>
          <h1 className="modalTitle text-white">{modalMessage}</h1>
        </div>

          <div className="modalButtonContainer">
            <button
              ref={firstButtonRef}
              tabIndex={1}
              className="bg-orange-300 hover:bg-orange-500 text-white font-bold py-2 px-4 mr-2 rounded w-[7rem]"
              onClick={() => {
                closeModal();
                modalResolve(true);
              }}
            >
              {params[0]}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded w-[7rem]"
              onClick={() => {
                closeModal();
                modalResolve(false);
              }}
            >
              {params[1]}
            </button>
          </div>


      </Modal>
    ),
    [isModalOpen, modalMessage, params, modalResolve, closeModal]
  );

  return {
    showModal,
    CustomModal: React.memo(CustomModal),
  };
}
