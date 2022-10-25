import { csrfFetch } from "./csrf"

const CURRENT_USER_BOOKINGS = 'bookings/currentUser'
const BOOKINGS_SPOT_ID = 'bookings/spotId'
const ADD_BOOKING = 'bookings/create'
const DELETE_BOOKING = 'bookings/delete'

//ACTIONS
const userBookings = (bookings) => {
    return {
        type: CURRENT_USER_BOOKINGS,
        bookings
    }
}
const spotBookings = (bookings) => {
    return {
        type: BOOKINGS_SPOT_ID,
        bookings
    }
}
const addBooking = (bookings) => {
    return {
        type: ADD_BOOKING,
        bookings
    }
}

const deleteBookingById = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

//THUNK - GET CURRENT USER BOOKINGS
export const getBookingsCurrentUser = () => async (dispatch) => {
    console.log('INSIDE BOOKINGS CURRENT USER')
    const response = await fetch(`/api/bookings/current`);
    console.log('BOOKINGS CURRENT USER THUNK RESPONSE', response)
    if (response.ok) {
        const data = await response.json()
        console.log('BOOKINGS CURRENT USER THUNK DATA', data)
        dispatch(userBookings(data));
        return data;
    }
}

//THUNK - GET CURRENT SPOT BOOKINGS
export const getBookingsCurrentSpot = (spotId) => async (dispatch) => {
    console.log('INSIDE BOOKINGS CURRENT SPOT')
    const response = await fetch(`/api/spots/${spotId}/bookings`);
    if (response.ok) {
        const data = await response.json()
        console.log('BOOKINGS CURRENT SPOT THUNK DATA', data)
        dispatch(spotBookings(data));
        return data;
    }
}

//THUNK - CREATE BOOKING
export const createBooking = (spotId, booking) => async (dispatch) => {
    console.log("INSIDE Booking SPOTS THUNK")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    console.log(' CREATE BOOKING THUNK RESPONSE', response)
    if (response.ok) {
        const booking = await response.json();
        console.log(' CREATE BOOKING THUNK RESPONSE', booking)
        dispatch(addBooking(booking));
        return booking;
    }
    if (response.status == 403) {
        alert('You already have a review for this spot!')
    }
}

//THUNK - DELETE A BOOKING
export const deleteBooking = (id) => async (dispatch) => {
    console.log("INSIDE DELETE BOOKINGS THUNK")
    console.log('ID INSIDE BOOKING THUNK', id)
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log('DELETE BOOKINGS THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteBookingById(id));
        return spot;
    }
}



const initialState = {}

//REDUCER
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_BOOKING: {
            console.log('INSIDE DELETE BOOKING REDUCER');
            const newState = { ...state };
            return newState;
        }
        case CURRENT_USER_BOOKINGS: {
            const newState = action.bookings
            console.log('NEWSTATE', newState)
            console.log('INSIDE BOOKINGS CURRENT USER REDUCER');
            return newState
        }
        case BOOKINGS_SPOT_ID: {
            const newState = action.bookings
            console.log('NEWSTATE', newState)
            console.log('INSIDE BOOKINGS CURRENT SPOT REDUCER');
            return newState
        }
        case ADD_BOOKING: {
            const newState = { ...state, [action.bookings.id]: action.bookings };
            console.log('INSIDE CREATE BOOKING REDUCER');
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
