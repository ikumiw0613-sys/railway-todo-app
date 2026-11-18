import React from "react";
import Modal from "./Modal";
import EditList from "~/pages/lists/[listId]/edit/index.page";

const ListEditModal = ({ isOpen, handleCloseModal, listId, back }) => {
  return (
    <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
      <EditList handleCloseModal={handleCloseModal} />
    </Modal>
  );
};

export default ListEditModal;
