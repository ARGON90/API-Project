import { csrfFetch } from "./csrf"

const CURRENT_USER_BOOKINGS = 'bookings/currentUser'

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
export const createBooking = (spotId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (response.ok) {
        const booking = await response.json();
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
