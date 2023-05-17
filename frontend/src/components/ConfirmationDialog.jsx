import React, { useState } from "react";
import Modal from "./Modal";
import { BsCheckCircle, BsXCircle } from "react-icons/bs"; // Import Icons

const ConfirmationDialog = ({
  message,
  isDeleteDialogOpen,
  onConfirm,
  onCancel,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(isDeleteDialogOpen);

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <h2 className="mb-4 text-center">{message}</h2> {/* Add margin bottom */}
        <div className="flex justify-center space-x-4">
          {" "}
          {/* Center buttons and add spacing */}
          <button className="text-green-500 text-2xl" onClick={handleConfirm}>
            <BsCheckCircle /> {/* Check Mark Icon */}
          </button>
          <button className="text-red-500 text-2xl" onClick={handleClose}>
            <BsXCircle /> {/* X Mark Icon */}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
