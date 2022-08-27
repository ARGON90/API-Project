import React, { useContext } from 'react';
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

  const { currentNum, setCurrentNum } = useContext(ButtonContext)

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

  //
  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  //
  console.log('SESSIONID', sessionId)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <div class="dropdown">
          <button onClick={()=> myFunction()} class="dropbtn">LOGO</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#home">Home</a>
            <LoginFormModal />
            <DemoIndex />
            <NavLink to="/signup" className='font-black'>Sign Up</NavLink>
            <NavLink to='/create' className='font-black'>Host Your Home</NavLink>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <DemoIndex />
        <NavLink to="/signup" className='font-black'>Sign Up</NavLink>

        <div class="dropdown">
          <button onClick={()=> myFunction()} class="dropbtn">LOGO</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#home">Home</a>
            <LoginFormModal />
            <DemoIndex />
            <NavLink to="/signup" className='font-black'>Sign Up</NavLink>
            <NavLink to="/signup" className='font-black'>Host Your Home</NavLink>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
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
