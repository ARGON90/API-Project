//regular actions
const GET_ONE_SPOT = '/oneSpot/getOneSpot'

const loadOneSpot = (spots) => {
    return {
        type: GET_ONE_SPOT,
        spots
    }
}

//thunks action creator (for use inside component)
export const getOneSpot = (spotId) => async(dispatch) => {
    console.log('INSIDE SPOT-BY-ID THUNK')
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json()
        console.log('GETONESPOT DATA', data)
        dispatch(loadOneSpot(data));
        return data;
    }
}

const initialState = {}

//reducer
const singleSpotReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ONE_SPOT: {
            const newState = {};
            console.log('INSIDE ONE SPOT-BY-ID REDUCER')
            action.spots.forEach((spot) => (newState[spot.id] = spot));
            console.log('GET_ONE_SPOT newSTATE', newState)
            return newState
        }
        default:
            return state;
    }
}

export default singleSpotReducer
