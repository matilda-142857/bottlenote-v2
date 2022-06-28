import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import "./index.css";

// import { CSSTransition } from 'react-transition-group';

function LoginFormModal() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className='loginbtn'>
        Log In
      </button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}
    </>
  );
}

{/* <button onClick={() => setShowModal(true)} className='loginbtn'>
Log In
</button>
<CSSTransition
  in={this.state.isOpen}
  timeout={300}
  className="dialog"
>
  {showModal && (
    <Modal
      closeTimeoutMS={500}
      isOpen={this.state.isOpen}
      onClose={() => setShowModal(false)}
    >
      <LoginForm />
    </Modal>
  )}
</CSSTransition> */}

export default LoginFormModal;