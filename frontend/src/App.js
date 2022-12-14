import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import SpotsList from "./components/AllSpots";
import SpotById from "./components/SpotById";
import CreateSpotForm from "./components/CreateSpot";
import AddImage from "./components/AddImgToSpot/Index";
import EditSpot from "./components/EditSpot";
import CurrentUserSpot from "./components/CurrentUserSpot";
import { sessionUserId } from "./store/session";
import { getState } from "./store/session";
import ReviewsCurrentUser from "./components/ReviewsCurrentUser";
import ReviewsSpotId from "./components/ReviewsSpotId";
import CreateReview from "./components/ReviewCreate";
import BookingsUser from "./components/BookingsUser/bookingsUser";
import BookingsEdit from "./components/BookingsEdit/bookingsEdit";
import ReviewsEdit from "./components/ReviewsEdit/reviewsEdit";
import Footer from "./components/Footer/footer";


import notFoundRalph from "./data/ralph.gif"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  let sessionId;
  if (sessionUserId && sessionUserId.user) {
    sessionId = sessionUserId.user.id
  }

  // useEffect(() => {
  //   console.log('App GETSTATE USE EFFECT ')
  //   dispatch(getState())
  // }, [dispatch, sessionId])

  // function checkState() {
  //   dispatch(getState())
  // }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Footer />
      {isLoaded && (
        <Switch>
          <Route path='/create' exact={true} >
            <CreateSpotForm />
          </Route>
          <Route path='/' exact={true}>
            <SpotsList />
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
          <Route path='/spots' exact={true} >
            <SpotsList />
          </Route>
          <Route path='/spots/current' exact={true}>
            <CurrentUserSpot />
          </Route>
          <Route path='/spots/:id' exact={true}>
            <SpotById />
          </Route>

          <Route path='/spots/:spotId/edit' exact={true}>
            <EditSpot />
          </Route>
          <Route path='/reviews/current' exact={true}>
            <ReviewsCurrentUser />
          </Route>

          <Route path='/spots/review/create/:spotId' exact={true}>
            <CreateReview />
          </Route>
          <Route path='/bookings' exact={true}>
            <BookingsUser />
          </Route>
          <Route path='/bookings/:bookingId/edit' exact={true}>
            <BookingsEdit />
          </Route>
          <Route path='/reviews/:reviewId/edit' exact={true}>
            <ReviewsEdit />
          </Route>

          <>
            <div>You must be lost...</div>
            <img src={notFoundRalph} alt={"page not found"}></img>
          </>
        </Switch>
      )}
      {/* {checkState()} */}
    </>
  );
}

export default App;
