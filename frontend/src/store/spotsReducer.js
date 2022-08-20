//regular actions
const GET_ALL_SPOTS = '/spots/getAllSpots'
//read
//update
//delete

//regular action creators
const loadSpots = (spots) => {
    return {
        type: GET_ALL_SPOTS,
        spots
    }
}

//thunks action creator (for use inside component)
export const getAllSpots = () => async(dispatch) => {
    console.log('INSIDE SPOTS THUNK')
    const response = await fetch('/api/spots/');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data;
    }
}

const initialState = {}

//reducer
const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_SPOTS: {
            const newState = {};
            console.log('INSIDE ALL SPOTS REDUCER')
            action.spots.Spots.forEach((spot) => (newState[spot.id] = spot));
            return newState
        }
        default:
            return state;
    }
}

export default spotsReducer
