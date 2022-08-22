//regular actions
const GET_ONE_SPOT = '/oneSpot/getOneSpot'
const ADD_IMG_TO_SPOT = '/oneSpot/addImgToSpot'

const loadOneSpot = (payload) => {
    return {
        type: GET_ONE_SPOT,
        payload
    }
}

const addImg = (payload) => {
    return {
        type: ADD_IMG_TO_SPOT,
        payload
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
export const addImgSpot = (spotId, payload) => async(dispatch) => {
    console.log('INSIDE ADD-IMG-SPOT THUNK')
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json()
        console.log('ADD IMG DATA', data)
        dispatch(addImg(data));
        return data;
    }
}

const initialState = {}

//reducer
const singleSpotReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ONE_SPOT: {
            const newState = action.payload;
            console.log('INSIDE ONE SPOT-BY-ID REDUCER')
            // action.payload.forEach((spot) => (newState[spot.id] = spot));
            console.log('GET_ONE_SPOT newSTATE', newState)
            return newState
        }
        default:
            return state;
    }
}

export default singleSpotReducer
