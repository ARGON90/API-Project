import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import DemoIndex from '../LoginFormModal/DemoIndex'
import { sessionUserId } from '../../store/session';
import { getState } from '../../store/session';
import { ButtonContext } from "../../context/ButtonContext";
import logo from '../../data/logo.png'

import './Navigation.css';
import '../../index.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch()

  const {currentNum, setCurrentNum} = useContext(ButtonContext)

  let sessionId;
  if (sessionUserId && sessionUserId.user) {
    sessionId = sessionUserId.user.id
  }


  useEffect(() => {
    console.log('NAVIGATION GETSTATE USE EFFECT ')
    dispatch(getState())
  }, [dispatch, sessionId, currentNum])


  function checkState() {
    dispatch(getState())
  }

  console.log('SESSIONID', sessionId)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <DemoIndex />
        <NavLink to="/signup" className='font-black'>Sign Up</NavLink>
      </>
    );
  }

  return (
    <div className='font-family'>
      <ul className='padding-remove'>
        <li id='container'>
          <div className='flex-box column-gap align-items-center'>
            <NavLink exact to="/spots"><img id='logo' src={logo} alt='Abnb Logo'></img></NavLink>
            {sessionId && (
              <NavLink to="/create" className='font-black'>Become a Host</NavLink>
            )}
          </div>
          <div className='flex-box justify-content-center align-items-center'>
            <div id='search-bar'>
              Search...
            </div>
          </div>
          <div className='flex-box row-reverse column-gap
          align-items-center'>
            {checkState()}
            {isLoaded && sessionLinks}
            {sessionId && (
              <NavLink to="/spots/current" className='font-black'> View Your Spots </NavLink>
            )}
            {sessionId && (
              <NavLink to="/reviews/current" className='font-black'> View Your Reviews </NavLink>
            )}
          </div>
        </li>
      </ul>
    </div>

  );
}



export default Navigation;
