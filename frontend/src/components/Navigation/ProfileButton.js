import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import { ButtonContext } from "../../context/ButtonContext";
import { useHistory } from "react-router-dom";



function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const {currentNum, setCurrentNum} = useContext(ButtonContext)
  const history = useHistory();

  console.log('CURRENTNUM', currentNum)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
    setCurrentNum((num) => num + 1)
  };

  console.log('HELLO PROFILEBUTTON')


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
      setCurrentNum((num) => num + 1)
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    setCurrentNum((num) => num + 1)
    console.log('HELLO LOGOUT')
    history.push(`/spots/`);
  };

  return (
    <>

      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}



export default ProfileButton;
