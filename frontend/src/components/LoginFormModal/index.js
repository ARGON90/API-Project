import React, { useState, useContext } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { ButtonContext } from '../../context/ButtonContext';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const {currentNum, setCurrentNum} = useContext(ButtonContext)


  const clicky = () => {
    setShowModal(true)
    setCurrentNum((num) => num + 1)
  }

  return (
    <>
      <button onClick={clicky}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />

        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
