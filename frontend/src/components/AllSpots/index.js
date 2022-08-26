import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllSpots } from '../../store/spotsReducer';
import { getReviewsCurrentUser } from '../../store/UserReviewsReducer';
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

    useEffect(() => {
        console.log('LOADING CURRENT USER REVIEWS ON HOMEPAGE')
        dispatch(getReviewsCurrentUser())
    }, [dispatch])

    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img src={spot.previewImage} alt='Main Image'
                className='width-image height-image border-radius-12' />
        }
    }

    console.log('SPOTSLIST ALL SPOTS', spotsList)
    if (!spotsList) return <div>Loading All Spots...</div>
    return (
        <>
            <h1></h1>
            <div>
                <div className='flex-box justify-content-between  flex-wrap-wrap'>
                    {spotsList.map((spot) => (
                        <div className=' font-family
                        width-card
                        height-card'>
                            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                                {imageCheck(spot)}
                                <div className='flex-box justify-content-between
                                width-32-100 height-30-100'>
                                    <p className='font-black bold'>{spot.city}, {spot.state}</p>
                                    <p>
                                        <svg
                                            viewBox='0 0 32 32'
                                        >
                                            <path
                                                d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                fillRule='evenodd'
                                            ></path>
                                        </svg>
                                        {spot.avgRating}
                                    </p>
                                </div>
                                <p className='font-grey margin-remove'>${spot.price}/night</p>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SpotsList;
