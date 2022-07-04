import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import DeleteModal from './DeleteForm';

function DeleteNBFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <button onClick={() => setShowModal(true)}
        className='del-nb-button'>
            <i className="fas fa-trash"></i>
        </button>    
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <DeleteModal />
            </Modal>
         )}
    </>
  );
}

export default DeleteNBFormModal;