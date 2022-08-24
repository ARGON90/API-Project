import { csrfFetch } from './csrf';


// const GET_ONE_SPOT = '/oneSpot/getOneSpot'
const ADD_IMG_TO_SPOT = '/oneSpot/addImgToSpot'

// const loadOneSpot = (spot) => {
//     return {
//         type: GET_ONE_SPOT,
//         spot
//     }
// }

const addImg = (spotId, image) => {
    console.log('INSIDE ADD IMG image', image)
    console.log('INSIDE ADD IMG spotId', spotId)
    return {
        type: ADD_IMG_TO_SPOT,
        image,
        spotId
    }
}

// //THUNK - GET ONE SPOTS
// export const getOneSpot = (spotId) => async (dispatch) => {
//     console.log('INSIDE SPOT-BY-ID THUNK')
//     const response = await fetch(`/api/spots/${spotId}`);
//     if (response.ok) {
//         const data = await response.json()
//         console.log('GETONESPOT DATA', data)
//         dispatch(loadOneSpot(data));
//         return data;
//     }
// }

//THUNK - ADD IMG TO ONE SPOT
export const addImgSpot = (spotId, payload) => async (dispatch) => {
    console.log('INSIDE ADD-IMG-SPOT THUNK')
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const data = await response.json()
        dispatch(addImg(spotId, data));
        return data;
    }
}

const initialState = {}

//reducer
const singleSpotReducer = (state = initialState, action) => {
    switch (action.type) {
        // case GET_ONE_SPOT: {
        //     const newState = action.spot;
        //     console.log('INSIDE ONE SPOT-BY-ID REDUCER')
        //     return newState
        // }
        case ADD_IMG_TO_SPOT: {
            console.log('INSIDE ADD IMG ACTION / REDUCER')
            action.image.imageableId = Number(action.image.imageableId)
            const newState = { ...state };
            newState[0].Images = [...state[0].Images, action.image]
            return newState;
        }
        default:
            return state;
    }
}

export default singleSpotReducer
