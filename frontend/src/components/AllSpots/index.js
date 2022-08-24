import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllSpots } from '../../store/spotsReducer';
import './AllSpots.css'
import '../../index.css'


const SpotsList = () => {
    console.log('INSIDE SPOTSLIST COMPONENT')
    const dispatch = useDispatch();
    const spotsList = useSelector((state) => Object.values(state.spots));


    useEffect(() => {
        console.log('INSIDE SPOTSLIST USE EFFECT')
        dispatch(getAllSpots());
    }, [dispatch]);

    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img src={spot.previewImage}
            className='img-size' alt='Main Image' />
        }
    }

    console.log('SPOTSLIST ALL SPOTS', spotsList)
    if (!spotsList) return <div>Loading All Spots...</div>
    return (
        <>
            <h1 className='font-family'>SpotsList</h1>
            <div className='flex-box justify-content-center'>
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

export default SpotsList;
