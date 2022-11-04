import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';

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
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import LoginFormModalMain from '../LoginFormModal/DemoIndexMain';
import SearchBar from './SearchBar';
import { getAllSpots } from '../../store/spotsReducer';

import hamburger from "../../data/hamburger.png"
import './Navigation.css';
import '../../index.css'

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state?.session?.user);
  const history = useHistory()
  const dispatch = useDispatch()

  const { currentNum, setCurrentNum } = useContext(ButtonContext)
  const [showSearchBar, setSearchBar] = useState(false)
  const [filterSpots, setFilterSpots] = useState([])

  let sessionId;
  if (sessionUserId && sessionUserId.user) {
    sessionId = sessionUserId.user.id
  }


  useEffect(() => {
    console.log('NAVIGATION GETSTATE USE EFFECT ')
    // dispatch(getState())
    dispatch(getAllSpots())
  }, [dispatch, sessionId, currentNum, filterSpots])


  // function checkState() {
  //   dispatch(getState())
  // }


  const logout = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    dispatch(getBookingsCurrentUser())
    setCurrentNum((num) => num + 1)
    console.log('HELLO LOGOUT')
    history.push(`/spots/`);
  };


  //OPEN-CLOSE DROPDOWN FUNCTION
  function showHide() {
    document.getElementById("drop-id").classList.toggle("show");
  }
  window.onclick = function (e) {
    if (!e.target.matches('.button-dropdown')) {
      let dropdowns = document.getElementsByClassName("drop-content");
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  // IF LOGGED IN
  //create spot, view all spots, view all reviews
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        {/* <ProfileButton user={sessionUser} /> */}
        <div className="drop-menu">
          <button onClick={() => showHide()} className="button-dropdown">

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

          <div id="drop-id" className="drop-content
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
              <NavLink to='/bookings' className='font-black'>See Your Bookings</NavLink>
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

        <div className="drop-menu">
          <button onClick={() => showHide()} className="button-dropdown">

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
          <div id="drop-id" className="drop-content
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
    <>
      <div className='
    flex-box
    justify-content-center'>


        <div className=' nav-container '>
          {/* <div className='font-family
    flex-row
    justify-content-between
    align-items-center
    width-90
    '> */}


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

            <div className='middle-container-logged-in'>
              <div >
                <SearchBar setSearchBar={setSearchBar} filterSpots={filterSpots} setFilterSpots={setFilterSpots} />
              </div>
            </div>

          <div className='width-25'>
            <div className='flex-box row-reverse column-gap align-items-center'>
              {/* {checkState()} */}
              {isLoaded && sessionLinks}
              {sessionUser && (
                <NavLink to="/create" className='font-black bold'>Welcome, {sessionUser.firstName} {sessionUser.lastName}</NavLink>
              )}
              {!sessionUser &&
                <>
                  <LoginFormModalMain />
                </>
              }
            </div>
          </div>


        </div>
      </div>
      <div className='bottom-border'></div>
    </>
  );
}



export default Navigation;
