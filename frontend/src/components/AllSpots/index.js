import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getAllSpots } from '../../store/spotsReducer';
import { getReviewsCurrentUser } from '../../store/UserReviewsReducer';
import './AllSpots.css'
import '../../index.css'


const SpotsList = () => {
    const dispatch = useDispatch();
    const spotsList = useSelector((state) => Object.values(state.spots));
    const user = useSelector((state) => state?.session?.user)

    useEffect(() => {
        dispatch(getAllSpots());
        if (user) {
            dispatch(getReviewsCurrentUser())
        }
    }, [dispatch]);

    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p></p>
        } else {
            return (
                <img src={spot.previewImage} alt='Main Image' className='card-image' />
            )
        }
    }


    if (!spotsList) return <div>Loading All Spots...</div>
    return (
        <div className='page-container2' >
        {/* <div className='page-container'> */}
            <div className='all-spots-page'>

                {/* ALL CARDS CONTAINER */}
                <div className='all-cards-grid'>

                    {spotsList.map((spot) => (
                        // INDIVIDUAL CARD CONTAINER
                        <div className='card-container' >
                            <NavLink key={spot.id} to={`/spots/${spot.id}`} className=''>

                                {/* IMG CONTAINER DIV */}
                                <div className='image-container-div'>
                                    {imageCheck(spot)}
                                </div>
                            </NavLink>

                            {/* TEXT CONTAINER */}
                            <div className='text-container'>

                                <div>
                                    {/* LOCATION / STAR CONTAINER  */}
                                    <div className='location-star-container'>
                                        <div className='location-text'>
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
                                    <div className='text-separator'></div>
                                    <div className='price-container'>
                                        <div className='price-number'>
                                            ${spot.price}
                                        </div>
                                        <div className=''>
                                            /night
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        {/* </div> */}
        </div>
    );
};

export default SpotsList;
