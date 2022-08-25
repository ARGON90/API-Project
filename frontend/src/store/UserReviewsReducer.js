import { csrfFetch } from "./csrf"

const CURRENT_USER_REVIEWS = 'reviews/currentUser'
const REVIEWS_SPOT_ID = 'reviews/spotId'

//ACTIONS
const userReviews = (reviews) => {
    return {
        type: CURRENT_USER_REVIEWS,
        reviews
    }
}
const spotReviews = (reviews) => {
    return {
        type: REVIEWS_SPOT_ID,
        reviews
    }
}
const addReview = (spotId, review) => {
    return {
        type: REVIEWS_SPOT_ID,
        review
    }
}

//THUNK - GET CURRENT USER REVIEWS
export const getReviewsCurrentUser = () => async (dispatch) => {
    console.log('INSIDE REVIEWS CURRENT USER')
    const response = await fetch(`/api/reviews/current`);
    if (response.ok) {
        const data = await response.json()
        console.log('REVIEWS CURRENT USER THUNK DATA', data)
        dispatch(userReviews(data));
        return data;
    }
}

//THUNK - GET CURRENT SPOT REVIEWS
export const getReviewsCurrentsSpot = (spotId) => async (dispatch) => {
    console.log('INSIDE REVIEWS CURRENT SPOT')
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json()
        console.log('REVIEWS CURRENT SPOT THUNK DATA', data)
        dispatch(spotReviews(data));
        return data;
    }
}

export const createReview = (spotId, payload) => async (dispatch) => {
    console.log("INSIDE CREATE SPOTS THUNK")
    const response = await csrfFetch('/api/spots/:spotId/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    console.log(' CREATE SPOTS THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(addReview(spot));
        return spot;
    }
}

const initialState = {}

//REDUCER
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_REVIEWS: {
            const newState = action.reviews
            console.log('INSIDE REVIEWS CURRENT USER REDUCER');
            return newState
        }
        case REVIEWS_SPOT_ID: {
            const newState = action.reviews
            console.log('INSIDE REVIEWS CURRENT SPOT REDUCER');
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer;
