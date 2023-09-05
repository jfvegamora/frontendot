/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useCallback, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [params, setParams] = useState<string[]>([]);
  const [modalResolve, setModalResolve] = useState<(result: boolean) => void>(
    () => () => {}
  );

  const showModal = useCallback(
    (message: string, ...props: string[]): Promise<boolean> => {
      setModalMessage(message);
      setIsModalOpen(true);
      setParams(props);

      return new Promise<boolean>((resolve) => {
        setModalResolve(() => resolve);
      });
    },
    []
  );
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen && event.key === "Enter") {
        modalResolve(true);
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, modalResolve, closeModal]);
  const CustomModal = useCallback(
    () => (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Custom Modal"
        style={customStyles}
        ariaHideApp={false}
        className="customModal"
        overlayClassName="overlay"
      >
        <h1 className="modalTitle">{modalMessage}</h1>

        <div className="modalButtonContainer">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded w-[7rem]"
            onClick={() => {
              modalResolve(true);
              closeModal();
            }}
          >
            {params[0]}
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-2 rounded w-[7rem]"
            onClick={() => {
              modalResolve(false);
              closeModal();
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
