import { csrfFetch } from "./csrf"

const CURRENT_USER_REVIEWS = 'reviews/currentUser'
const REVIEWS_SPOT_ID = 'reviews/spotId'
const ADD_REVIEW = 'reviews/create'
const EDIT_REVIEW = 'reviews/edit'
const DELETE_REVIEW = 'reviews/delete'

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
const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}
const editReview = (reviewId, reviewInfo) => {
    return {
        type: EDIT_REVIEW,
        reviewId,
        reviewInfo
    }
}
const deleteReviewById = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

//THUNK - GET CURRENT USER REVIEWS
export const getReviewsCurrentUser = () => async (dispatch) => {

    const response = await fetch(`/api/reviews/current`);

    if (response.ok) {
        const data = await response.json()

        dispatch(userReviews(data));
        return data;
    }
}

//THUNK - GET CURRENT SPOT REVIEWS
export const getReviewsCurrentSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json()
        dispatch(spotReviews(data));
        return data;
    }
}

//THUNK - CREATE REVIEW
export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(addReview(review));
        return review;
    }
    if (response.status == 403) {
        alert('You already have a review for this spot!')
    }
}

// EDIT REVIEW
export const editReviewThunk = (reviewId, reviewInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewInfo)
    });

    if (response.ok) {
        const booking = await response.json();
        dispatch(editReview(reviewId, booking));
        return booking;
    }
}


//THUNK - DELETE A REVIEW
export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteReviewById(id));
        return spot;
    }
}



const initialState = {}

//REDUCER
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REVIEW: {
            console.log('INSIDE DELETE SPOT REDUCER');
            const newState = { ...state };
            return newState;
        }
        case CURRENT_USER_REVIEWS: {
            const newState = action.reviews
            return newState
        }
        case REVIEWS_SPOT_ID: {
            const newState = action.reviews
            return newState
        }
        case ADD_REVIEW: {
            const newState = { ...state, [action.review.id]: action.review };
            return newState;
        }
        case EDIT_REVIEW: {
            let newState = {...state}
            console.log( {...state}, 'state in reviews')
            let i = 0;
            for (let key in newState.Reviews) {
                if ( newState.Reviews[key].id === Number(action.reviewId)) {
                    console.log(i, 'i')
                }
                i++
            }

            newState = {
                ...newState,
            };
            newState.Reviews[i - 1].stars = action.reviewInfo.stars
            newState.Reviews[i - 1].review = action.reviewInfo.review

            return state
        }
        default:
            return state;
    }
}

export default reviewsReducer;
