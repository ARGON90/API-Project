import { csrfFetch } from './csrf';

//regular actions
const GET_ALL_SPOTS = '/spots/getAllSpots'
const CREATE_SPOT = '/spots/createSpots'
//read
//update
//delete

//regular action creators
const loadSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}
const addSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}

//THUNKS
export const getAllSpots = () => async (dispatch) => {
    console.log('INSIDE GET ALL SPOTS THUNK')
    const response = await fetch('/api/spots/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return JSON.stringify(data);
    }
}

export const createSpot = (payload) => async (dispatch) => {
    console.log("INSIDE CREATE SPOTS THUNK")
    const response = await csrfFetch('/api/spots/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    console.log('SPOTS THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot;
    }
}

const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            console.log('INSIDE GET SPOTS ACTION / REDUCER')
            const newState = {};
            action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        }
        case CREATE_SPOT:
            console.log('INSIDE CREATE SPOT ACTION / REDUCER')
            console.log('STATE', state)
            const newState = { ...state, [action.newSpot.id]: action.newSpot };
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
