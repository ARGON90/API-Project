import { csrfFetch } from "./csrf"

const BOOKINGS_SPOT_ID = 'bookings/spotId'
const EDIT_USER_BOOKING = 'bookings/edit'

const spotBookings = (bookings) => {
    return {
        type: BOOKINGS_SPOT_ID,
        bookings
    }
}

const editBooking = (bookingId, bookingInfo) => {
    return {
        type: EDIT_USER_BOOKING,
        bookingId,
        bookingInfo
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

export const editBookingThunkSpot = (bookingId, bookingInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingInfo)
    });
    console.log('think response', response)

    if (response.ok) {
        const booking = await response.json();
        dispatch(editBooking(bookingId, booking));
        return booking;
    }
}


const initialState = {}

//REDUCER
const spotBookingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case BOOKINGS_SPOT_ID: {
            const newState = action.bookings
            return newState
        }
        case EDIT_USER_BOOKING: {
            let bookingInfo = action.bookingInfo
            let i = 0;
            for (let key in newState.Bookings) {
                if ( newState.Bookings[key].id === Number(action.bookingId)) {
                    console.log(i, 'i')
                }
                i++
            }
            newState = {
                ...newState
            };
            newState.Bookings[i - 1].startDate = action.bookingInfo.startDate
            newState.Bookings[i - 1].endDate = action.bookingInfo.endDate
            return newState
        }
        default:
            return state;
    }
}

export default spotBookingsReducer;
