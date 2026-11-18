import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, handleCloseModal, children }) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <>
      <div id="overlay">
        <div id="content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
