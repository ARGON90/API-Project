
const CURRENT_USER_REVIEWS = 'reviews/currentUser'

//ACTIONS
const userReviews = (reviews) => {
    return {
        type: CURRENT_USER_REVIEWS,
        reviews
    }
}



//THUNK - GET CURRENT USER SPOT
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

const initialState = {}

//REDUCER
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CURRENT_USER_REVIEWS: {
            const newState = action.reviews
            console.log('INSIDE REVIEWS CURRENT USER REDUCER');
            return newState
        }
        default:
            return state;
    }
}

export default reviewsReducer;
