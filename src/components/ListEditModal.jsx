import React from "react";
import Modal from "./Modal";
import EditList from "~/pages/lists/[listId]/edit/index.page";

const ListEditModal = ({ isOpen, handleCloseModal }) => {
  return (
    <Modal isOpen={isOpen}
    onClose = {handleCloseModal}
      aria-describedby="modal-body"
      aria-labelledby="modal-header"
    >
      <EditList handleCloseModal={handleCloseModal} />
    </Modal>
  );
};

export default ListEditModal;
