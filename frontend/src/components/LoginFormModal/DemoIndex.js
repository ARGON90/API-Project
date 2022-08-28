import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoLogin from './DemoLogin'

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='nav-button-styling' onClick={() => setShowModal(true)}>Demo Login</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DemoLogin />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
