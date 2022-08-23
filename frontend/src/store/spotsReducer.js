import { csrfFetch } from './csrf';

//regular actions
const GET_ALL_SPOTS = '/spots/getAllSpots'
const GET_ONE_SPOT = '/oneSpot/getOneSpot'

const CREATE_SPOT = '/spots/createSpots'



//regular action creators
const loadSpots = (payload) => {
    return {
        type: GET_ALL_SPOTS,
        payload
    }
}

const loadOneSpot = (spotId, images) => {
    console.log('INSIDE LOAD ONE SPOT', spotId)
    return {
        type: GET_ONE_SPOT,
        spotId,
        images
    }
}

const addSpot = (newSpot) => {
    return {
        type: CREATE_SPOT,
        newSpot
    }
}



//THUNK - GET ALL SPOTS
export const getAllSpots = () => async (dispatch) => {
    console.log('INSIDE GET ALL SPOTS THUNK')
    const response = await fetch('/api/spots/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return JSON.stringify(data);
    }
}

//THUNK - GET ONE SPOT
export const getOneSpot = (spotId) => async (dispatch) => {
    console.log('INSIDE SPOT-BY-ID THUNK')
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json()
        console.log('GETONESPOT DATA', data)
        let images = data[0].Images
        dispatch(loadOneSpot(spotId, images));
        return data;
    }
}

//THUNK - CREATE A SPOT
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

//REDUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            console.log('INSIDE GET SPOTS EDUCER')
            const newState = {};
            action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        }
        case GET_ONE_SPOT: {
            const newState = { ...state }
            console.log('INSIDE SPOT-BY-ID REDUCER');
            let id =  action.spotId
            newState[id].images = action.images
            return newState
        }
        case CREATE_SPOT:
            console.log('INSIDE CREATE SPOT REDUCER');
            console.log('STATE', state);
            const newState = { ...state, [action.newSpot.id]: action.newSpot };
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
