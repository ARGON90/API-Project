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
            return <p></p>
        } else {
            return (
                <img src={spot.previewImage} alt='Main Image' className='
            width-card-image
            height-card-image
            border-radius-12'/>
            )
        }
    }

    console.log('SPOTSLIST ALL SPOTS', spotsList)
    if (!spotsList) return <div>Loading All Spots...</div>
    return (
        <div className='flex-box justify-content-center'>
            {/* ALL CARDS CONTAINER */}
            <div className='
            flex-box
            justify-content-between
            flex-wrap-wrap
            column-gap-15
            row-gap-15
            width-90'>

                {spotsList.map((spot) => (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`} className=''>

                        <div className=' font-family
                        max-width-400
                        flex-column
                        width-card
                        height-card'>

                            {/* IMG CONTAINER DIV */}
                            <div className='
                                    height-card-image-container
                                    width-card-image-container
                                    margin-card-image-container'>
                                {imageCheck(spot)}
                            </div>

                            {/* TEXT CONTAINER */}
                            <div className='
                            flex-column'>

                                <div>
                                    {/* LOCATION / STAR CONTAINER  */}
                                    <div className='
                                font-black
                                flex-row
                                justify-content-between'>
                                        <div className='
                                        bold'>
                                            {spot.city}, {spot.state}
                                        </div>

                                        <div>
                                            <svg viewBox='0 0 32 32'>
                                                <path
                                                    d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                    fillRule='evenodd'
                                                ></path>
                                            </svg>
                                            {spot.avgRating}
                                        </div>

                                    </div>

                                    <div className='
                                    margin-top-6
                                    flex-row'>
                                        <div className='
                                        font-black
                                        bold'>
                                            ${spot.price}
                                        </div>
                                        <div className='
                                        font-grey'>
                                            /night
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </NavLink>
                ))}

            </div>
        </div>
    );
};

export default SpotsList;
