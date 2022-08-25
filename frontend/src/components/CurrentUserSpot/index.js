import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


import { getCurrentUserSpot } from '../../store/spotsReducer';
import './CurrentUserSpot.css'
import '../../index.css'

const CurrentUserSpot = () => {
    console.log('INSIDE CURRENT-USER-SPOT COMPONENT')
    const dispatch = useDispatch()
    // let spotsState = useSelector((state) => Object.values(state.spots))
    let spotsState = useSelector((state) => (state.spots))
    console.log('SPOTSSTATE', spotsState)

    let spotsList;
    if (spotsState) {
        spotsList = Object.values(spotsState)
        if (spotsList[0]) {
            let newList = Array.from(spotsList[0])
            spotsList = newList
        }
    }

    useEffect(() => {
        console.log('INSIDE CURRENT USER SPOT USE EFFECT')
        dispatch(getCurrentUserSpot())
    }, [dispatch])

    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img src={spot.previewImage}
            className='img-size' alt='Main Image' />
        }
    }

    if (!spotsList) return <div>Loading Current User's Spots...</div>
    return (
        <>
            <h1 className='font-family'>Here are your Spots!</h1>
            <div className='flex-box justify-content-center flex-wrap-wrap'>
                {spotsList.map((spot) => (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                        <div className='card font-family'>
                            {imageCheck(spot)}
                            <p>{spot.city}</p>
                            <p>{spot.state}</p>
                            <p>⭐{spot.avgRating}</p>
                            <p>${spot.price}/night</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default CurrentUserSpot;
