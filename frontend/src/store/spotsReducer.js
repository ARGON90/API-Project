//regular actions
const GET_ALL_SPOTS = '/spots/getAllSpots'
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

export const createSpot = (data) => async (dispatch) => {
    console.log("INSIDE CREATE SPOTS THUNK")
    const response = await fetch('/api/spots/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: data
    });
    if (response.ok) {
        const spot = await response.json();
        dispatch(createSpot(spot));
        return spot;
    }
}

const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            console.log('INSIDE ALL SPOTS REDUCER')
            action.payload.Spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer
