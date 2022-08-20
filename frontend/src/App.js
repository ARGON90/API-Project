import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SignupFormPage from "./components/SignupFormPage";
import SpotsList from "./components/AllSpots";
import SpotById from "./components/SpotById";
import notFoundRalph from "./data/ralph.gif"


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <h1>Home</h1>
          </Route>
          <Route path="/signup" exact={true}>
            <SignupFormPage />
          </Route>
            <Route path='/spots/:id' exact={true}>
              <SpotById />
            </Route>
          <Route path='/spots' exact={true} >
            <SpotsList />
          </Route>
          <>
            <div>page not found</div>
            <img src={notFoundRalph} alt={"page not found"}></img>
          </>
        </Switch>
      )}
    </>
  );
}

export default App;
