import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DemoLogin from './DemoLogin'

import './Login.css'

function LoginFormModalMain() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='here-div' onClick={() => setShowModal(true)}>Want to Log in as a Demo User? Click Here!</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DemoLogin />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModalMain;
