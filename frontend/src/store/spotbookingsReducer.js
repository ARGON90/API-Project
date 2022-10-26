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
    console.log('INSIDE BOOKINGS CURRENT SPOT')
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    console.log('BOOKINGS CURRENT SPOT RESPONSE', response)
    if (response.ok) {
        const data = await response.json()
        console.log('BOOKINGS CURRENT SPOT THUNK DATA', data)
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
            console.log('NEWSTATE', newState)
            console.log('INSIDE BOOKINGS CURRENT SPOT REDUCER');
            return newState
        }
        default:
            return state;
    }
}

export default spotBookingsReducer;
