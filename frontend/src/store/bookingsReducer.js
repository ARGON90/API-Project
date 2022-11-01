import { csrfFetch } from "./csrf"

const CURRENT_USER_BOOKINGS = 'bookings/currentUser'
const EDIT_USER_BOOKING = 'bookings/edit'
const ADD_BOOKING = 'bookings/create'
const DELETE_BOOKING = 'bookings/delete'

//ACTIONS
const userBookings = (bookings) => {
    return {
        type: CURRENT_USER_BOOKINGS,
        bookings
    }
}

const addBooking = (bookings) => {
    return {
        type: ADD_BOOKING,
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

const deleteBookingById = (id) => {
    return {
        type: DELETE_BOOKING,
        id
    }
}

//THUNK - GET CURRENT USER BOOKINGS
export const getBookingsCurrentUser = () => async (dispatch) => {
    const response = await fetch(`/api/bookings/current`);
    if (response.ok) {
        const data = await response.json()
        dispatch(userBookings(data));
        return data;
    }
}

//THUNK - CREATE BOOKING
export const createBooking = (booking) => async (dispatch) => {
    console.log('create bookings reducer', booking)
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(addBooking(booking));
        return booking;
    }
}

export const editBookingThunk = (bookingId, bookingInfo) => async (dispatch) => {
    console.log('thunk info', bookingId, bookingInfo)
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

//THUNK - DELETE A BOOKING
export const deleteBooking = (id) => async (dispatch) => {

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
            const newState = { ...state };
            return newState;
        }
        case CURRENT_USER_BOOKINGS: {
            const newState = action.bookings
            return newState
        }
        case EDIT_USER_BOOKING: {
            const newState = { ...state };
            return newState
        }
        case ADD_BOOKING: {
            const newState = { ...state, [action.bookings.id]: action.bookings };
            return newState;
        }
        default:
            return state;
    }
}

export default bookingsReducer;
