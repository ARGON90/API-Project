import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoLogin from './DemoLogin'

import './Login.css'

function LoginFormModalMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='here-div' onClick={() => setShowModal(true)}>Demo Login Here!</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DemoLogin />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModalMain;
