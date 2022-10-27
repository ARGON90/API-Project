import { csrfFetch } from "./csrf"

const BOOKINGS_SPOT_ID = 'bookings/spotId'

const spotBookings = (bookings) => {
    return {
        type: BOOKINGS_SPOT_ID,
        bookings
    }
}

//THUNK - GET CURRENT SPOT BOOKINGS
export const getBookingsCurrentSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
        const data = await response.json()
        dispatch(spotBookings(data));
        return data;
    }
}

const initialState = {}

//REDUCER
const spotBookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case BOOKINGS_SPOT_ID: {
            const newState = action.bookings
            return newState
        }
        default:
            return state;
    }
}

export default spotBookingsReducer;
