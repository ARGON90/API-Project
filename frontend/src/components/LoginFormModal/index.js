import React, { useState, useContext } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);


  const clicky = () => {
    setShowModal(true)
  }

  return (
    <>
      <button className='nav-button-styling' onClick={clicky}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />

        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
