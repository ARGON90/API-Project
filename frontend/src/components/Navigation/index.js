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
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";

import hamburger from "../../data/hamburger.png"
import './Navigation.css';
import '../../index.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()
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


  const logout = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.logout());
    setCurrentNum((num) => num + 1)
    console.log('HELLO LOGOUT')
    history.push(`/spots/`);
  };


  //OPEN-CLOSE DROPDOWN FUNCTION
  function showHide() {
    document.getElementById("drop-id").classList.toggle("show");
  }
  window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
      let dropdowns = document.getElementsByClassName("drop-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  //
  console.log('SESSIONID', sessionId)

  // IF LOGGED IN
  //create spot, view all spots, view all reviews
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* <ProfileButton user={sessionUser} /> */}
        <div class="drop-menu">
          <button onClick={() => showHide()} class="dropbtn">

          <div className='
            pointer-events-none
            flex-row
            justify-content-around
            align-items-center'>

              <div className=''>
                <img src={hamburger} alt='hamburger' className='hamburger
                padding-top-5
                padding-right-5'>
                </img>
              </div>

              <div className='
              padding-right-5'>
                <svg className='profile-svg ' viewBox='0 0 32 32'>
                  <path
                    d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'>
                  </path>
                </svg>
              </div>
            </div>
          </button>

          <div id="drop-id" class="drop-content
          flex-column
          padding-topbottom-4
          font-black">
            <div className='navbar-divs'>
              <NavLink to='/create' className='font-black'>Host Your Home</NavLink>
            </div>
            <div className='navbar-divs'>
              <NavLink to='/spots/current' className='font-black'>See Your Listings</NavLink>
            </div>
            <div className='navbar-divs'>
              <NavLink to='/reviews/current' className='font-black'>See Your Reviews</NavLink>
            </div>
            <div className='navbar-divs'>
              <button className='nav-button-styling' onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
      </>
    );


    // IF NOT LOGGED IN
    // Login, Demo-login, Sign-up
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal />
        <DemoIndex />
        <NavLink to="/signup" className='font-black'>Sign Up</NavLink> */}

        <div class="drop-menu">
          <button onClick={() => showHide()} class="dropbtn">

            <div className='
            pointer-events-none
            flex-row
            justify-content-around
            align-items-center'>

              <div className=''>
                <img src={hamburger} alt='hamburger' className='hamburger
                padding-top-5
                padding-right-5'>
                </img>
              </div>

              <div className='
              padding-right-5'>
                <svg className='profile-svg ' viewBox='0 0 32 32'>
                  <path
                    d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'>
                  </path>
                </svg>
              </div>
            </div>


            </button>
          <div id="drop-id" class="drop-content
          flex-column
          padding-topbottom-4
          font-black">
            <div className='navbar-divs'>
              <LoginFormModal />
            </div>
            <div className='navbar-divs'>
              <DemoIndex />
            </div>
            <div className='navbar-divs'>
              <NavLink to="/signup" className='font-black'>Sign Up</NavLink>
            </div>
            <div className='navbar-divs'>
              <NavLink to="/signup" className='font-black'>Host Your Home</NavLink>
            </div>
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
            {/* {sessionId && (
              <NavLink to="/create" className='font-black'>Become a Host</NavLink>
            )} */}
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
            {/* {sessionId && (
              <NavLink to="/spots/current" className='font-black'> View Your Spots </NavLink>
            )}
            {sessionId && (
              <NavLink to="/reviews/current" className='font-black'> View Your Reviews </NavLink>
            )} */}
            {sessionId && (
              <NavLink to="/create" className='font-black'>Become a Host</NavLink>
            )}
            {!sessionId && (
              <NavLink to="/signup" className='font-black'>Become a Host</NavLink>
            )}
          </div>
        </li>
      </ul>
    </div>

  );
}



export default Navigation;
