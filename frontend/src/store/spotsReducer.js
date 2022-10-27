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

const loadOneSpot = (spotId, images, owner) => {
    console.log('INSIDE LOAD ONE SPOT', spotId)
    return {
        type: GET_ONE_SPOT,
        spotId,
        images,
        owner
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

    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json()
        console.log('GET ONE SPOT THUNK DATA', data)
        let images = data[0].Images
        let owner = data[0].Owner
        console.log('OWNER', owner)
        dispatch(loadOneSpot(spotId, images, owner));
        return data;
    }
}
//THUNK - GET CURRENT USER SPOT
export const getCurrentUserSpot = () => async (dispatch) => {
    await dispatch(getAllSpots())

    const response = await fetch(`/api/spots/current`);
    if (response.ok) {
        const data = await response.json()

        dispatch(currentUser(data));
        return data;
    }
}


let createdSpotId;
//THUNK - CREATE A SPOT
export const createSpot = (payload) => async (dispatch) => {

    const response = await csrfFetch('/api/spots/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const spot = await response.json();
        createdSpotId = spot.id
        dispatch(addSpot(spot));
        return spot;
    }
}

//THUNK - EDIT A SPOT
export const editSpot = (spotId, spotInfo) => async (dispatch) => {
    await dispatch(getAllSpots())

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotInfo)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(putSpot(spotId, spot));
        return spot;
    }
}

//THUNK - DELETE A SPOT
export const deleteSpot = (id) => async (dispatch) => {
    await dispatch(getAllSpots())

    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(deleteSpotById(id));
        return spot;
    }
}





const ADD_IMG_TO_SPOT = '/oneSpot/addImgToSpot'

//ACTION FOR IMG TO SPOT
const addImg = (spotId, url) => {

    return {
        type: ADD_IMG_TO_SPOT,
        url
    }
}

//THUNK - ADD IMG TO ONE SPOT
export const addImgSpot = (spotId, url) => async (dispatch) => {

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({url})
    })
    console.log('IMAGESS', response)
    if (response.ok) {
        const data = await response.json()
        dispatch(addImg(spotId, data));
        return data;
    }
}


const initialState = {}

//REDUCER
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IMG_TO_SPOT: {
            const newState = { ...state };
            newState[createdSpotId].previewImage = action.url.url
            return state;
        }
        case GET_ALL_SPOTS: {
            const newState = {};
            action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        }
        case GET_ONE_SPOT: {
            const newState = { ...state }
            let id = action.spotId
            newState[id].images = action.images
            newState[id].firstName = action.owner.firstName
            newState[id].lastName = action.owner.lastName
            return newState
        }
        case CURRENT_USER_SPOT: {
            const newState = action.spot
            return newState
        }
        case CREATE_SPOT: {
            const newState = { ...state, [action.newSpot.id]: action.newSpot };
            return newState;
        }
        case EDIT_SPOT: {
            const newState = { ...state };
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state };
            return newState;
        }
        default:
            return state;
    }
}

export default spotsReducer
