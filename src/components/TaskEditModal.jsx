import React from "react";
import Modal from "./Modal";
import EditTask from "~/pages/lists/[listId]/tasks/[taskId]/index.page";

const TaskEditModal = ({ isOpen, handleCloseModal,listId,taskId,back }) => {
  return (
    <Modal isOpen={isOpen} 
    onClose={handleCloseModal}
    aria-labelledby="task-modal-title"
    aria-describedby="task-modal-description"
    >
      <EditTask handleCloseModal={handleCloseModal} listId={listId} taskId={taskId}/>
    </Modal>
  );
};

export default TaskEditModal;
