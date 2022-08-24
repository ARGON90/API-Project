import { csrfFetch } from './csrf';

//regular actions
const GET_ALL_SPOTS = '/spots/getAllSpots'
const GET_ONE_SPOT = '/oneSpot/getOneSpot'
const CREATE_SPOT = '/spots/createSpots'
const EDIT_SPOT = '/spots/editSpot'
const CURRENT_USER_SPOT = '/spots/currentUser'
const DELETE_SPOT = 'spots/deleteSpot'



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

const putSpot = (spotId, spotInfo) => {
    return {
        type: EDIT_SPOT,
        spotId,
        spotInfo
    }
}

const currentUser = (spot) => {
    return {
        type: CURRENT_USER_SPOT,
        spot
    }
}

const deleteSpotById = (id) => {
    return {
        type: DELETE_SPOT,
        id
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
    await dispatch(getAllSpots())
    console.log('INSIDE SPOT-BY-ID THUNK')
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json()
        console.log('GET ONE SPOT THUNK DATA', data)
        let images = data[0].Images
        dispatch(loadOneSpot(spotId, images));
        return data;
    }
}
//THUNK - GET CURRENT USER SPOT
export const getCurrentUserSpot = () => async (dispatch) => {
    await dispatch(getAllSpots())
    console.log('INSIDE CURRENT USER THUNK')
    const response = await fetch(`/api/spots/current`);
    if (response.ok) {
        const data = await response.json()
        console.log('CURRENT USER THUNK DATA', data)
        dispatch(currentUser(data));
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
    console.log(' CREATE SPOTS THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
        return spot;
    }
}

//THUNK - EDIT A SPOT
export const editSpot = (spotId, spotInfo) => async (dispatch) => {
    await dispatch(getAllSpots())
    console.log("INSIDE EDIT SPOTS THUNK")
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotInfo)
    });
    console.log('EDIT SPOTS THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(putSpot(spotId, spot));
        return spot;
    }
}

//THUNK - DELETE A SPOT
export const deleteSpot = (id) => async (dispatch) => {
    await dispatch(getAllSpots())
    console.log("INSIDE DELETE SPOTS THUNK")
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    console.log('DELETE SPOT THUNK RESPONSE', response)
    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpotById(id));
        return spot;
    }
}


const initialState = {}

//REDUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            console.log('INSIDE GET SPOTS REDUCER')
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
        case CURRENT_USER_SPOT: {
            const newState = action.spot
            console.log('INSIDE SPOT-BY-ID REDUCER');
            return newState
        }
        case CREATE_SPOT: {
            console.log('INSIDE CREATE SPOT REDUCER');
            console.log('STATE', state);
            const newState = { ...state, [action.newSpot.id]: action.newSpot };
            return newState;
            }
        case EDIT_SPOT: {
            console.log('INSIDE EDIT SPOT REDUCER');
            const newState = { ...state };
            return newState;
        }
        case DELETE_SPOT: {
            console.log('INSIDE DELETE SPOT REDUCER');
            const newState = { ...state };
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer
