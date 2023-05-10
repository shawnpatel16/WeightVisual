import React, { useState } from "react";
import Modal from "./Modal";

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
        <h2>{message}</h2>
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={handleClose}>No</button>
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
