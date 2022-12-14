import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import spotsReducer from "./spotsReducer";
import singleSpotReducer from "./singleSpotReducer";
import reviewsReducer from "./UserReviewsReducer";
import bookingsReducer from "./bookingsReducer";
import spotBookingsReducer from "./spotbookingsReducer";


const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  bookings: bookingsReducer,
  spotBookings: spotBookingsReducer,
  // singleSpot: singleSpotReducer
});



let enhancer;
if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};


export default configureStore;
