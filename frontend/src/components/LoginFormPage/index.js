import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import "./index.css";

import { CSSTransition } from 'react-transition-group';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (

    <>
      <button onClick={() => setShowModal(true)} className='loginbtn'
      >Log In</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}

    </>
  );
}

export default LoginFormModal;