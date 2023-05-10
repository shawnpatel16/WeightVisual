import React from "react";
import { CSSTransition } from "react-transition-group";
import "./modal-transition.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div className="fixed inset-0 z-1000000 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="relative z-100000000 w-full sm:max-w-md md:max-w-lg lg:max-w-xl max-w-sm p-8  bg-primary rounded shadow-lg max-h-screen overflow-y-auto">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          {title && <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
