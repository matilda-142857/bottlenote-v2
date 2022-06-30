import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewNotebookFormContent from './NewNBForm';

function NewNotebookFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <i className="fas fa-plus-circle"></i>
        <button onClick={() => setShowModal(true)}
            className='new-nb-button'> 
            New Notebook
        </button>
            {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <NewNotebookFormContent />
            </Modal>
         )}
    </>
  );
}

export default NewNotebookFormModal;