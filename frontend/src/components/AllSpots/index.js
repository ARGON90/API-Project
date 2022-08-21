import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';

import { getAllSpots } from '../../store/spotsReducer';


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
            return <p>{spot.previewImage}</p>
        }
    }
    if (!spotsList) return <div>Loading...</div>
    return (
        <>
            <h1>SpotsList</h1>
            {spotsList.map((spot) => (
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                <div>
                    {imageCheck(spot)}
                    <p>{spot.city}</p>
                    <p>{spot.state}</p>
                    <p>⭐{spot.avgRating}</p>
                    <p>${spot.price}/night</p>
                    --------------------
                </div>
                </NavLink>
            ))}
        </>
    );
};

export default SpotsList;
