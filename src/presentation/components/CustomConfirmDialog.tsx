// interface Props {
//   message: string;
//   onConfirm: () => void;
//   onCancel: () => void;
// }
// { message, onConfirm, onCancel }: Props)
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const CustomConfirmDialog = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Confirmar Eliminacion"
        style={customStyles}
        overlayClassName="overlay"
      >
        <h2 className="text-2xl font-bold mb4">Confirmar Eliminacion</h2>
        <p className="text-gray-700 mb-4">¿Qué desea exportar?</p>
      </Modal>
    </div>
  );
};
export default CustomConfirmDialog;
