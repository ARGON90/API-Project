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
import beelogo from '../../data/beelogo.png'
import hive from '../../data/hive.png'
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
    <div className='
    flex-box
    justify-content-center'>


      <div className='font-family
    flex-row
    justify-content-between
    align-items-center
    width-90'>


        <div className='
      width-25
      flex-box
      '>
          <NavLink exact to="/spots" className={'flex-column align-items-center'}>
            <div className='
          width-100
          flex-box
          justify-content-around'>
              <img id='logo' src={beelogo} alt='Bee-Bee Logo' className=''></img>
              <img id='logo' src={hive} alt='Hive Logo' className='padding-r-4 padding-l-10'></img>
              <img id='logo' src={beelogo} alt='Bee-Bee Logo' className='padding-r-4 bee-2'></img>
            </div>

            <div className='
          flex-column
          justify-content-center
          flex-end'>
              <div className='logo-font font-black padding-16'>
                <div className='padding-l-10'>
                  Bee & Bee
                </div>
              </div>
            </div>
          </NavLink>
        </div>


        <div id='search-bar' className='
      width-50
      justify-content-center
      text-center'>
          See what the buzz is about!
        </div>


        <div className='
      width-25'>
          <div className='flex-box row-reverse column-gap
          align-items-center'>
            {checkState()}
            {isLoaded && sessionLinks}
            {sessionId && (
              <NavLink to="/create" className='font-black'>Become a Host</NavLink>
            )}
            {!sessionId && (
              <NavLink to="/signup" className='font-black'>Become a Host</NavLink>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}



export default Navigation;
