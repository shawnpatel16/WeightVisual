import React from "react";
import { CSSTransition } from "react-transition-group";
import "./modal-transition.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  const innerModalRef = React.useRef();

  const handleClickOutside = (event) => {
    if (
      innerModalRef.current &&
      !innerModalRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  return (
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div
        className="fixed z-10 inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={handleClickOutside}
      >
        <div
          ref={innerModalRef}
          className="absolute z-10 w-full sm:max-w-md md:max-w-lg lg:max-w-xl max-w-sm p-8 m-4 bg-primary rounded shadow-lg overflow-y-auto"
          style={{ maxHeight: "80vh" }}
        >
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          {title && (
            <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
          )}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
