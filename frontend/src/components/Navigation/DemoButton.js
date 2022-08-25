import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { ButtonContext } from "../../context/ButtonContext";
import * as sessionActions from '../../store/session';

function DemoButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const {currentNum, setCurrentNum} = useContext(ButtonContext)
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    setCurrentNum((num) => num + 1)
    dispatch(sessionActions.logout());
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

export default DemoButton;
