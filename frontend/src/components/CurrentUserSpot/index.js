import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spotsReducer';

import './CurrentUserSpot.css'
import '../../index.css'

const CurrentUserSpot = () => {
    const dispatch = useDispatch()
    const spotsState = useSelector((state) => (state?.spots))
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    let spotsArr = Object.values(spotsState)
    let userSpotsArr = spotsArr.filter((spot) => spot.ownerId == currentUserId)
    let spotsList = userSpotsArr

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img src={spot.previewImage} alt='Main Image'
            className='user-spot-card-image'/>
        }
    }

    if (!spotsList) return <div>Loading Current User's Spots...</div>
    return (
        <div className='
        flex-box
        justify-content-center
        current-user-spot'>
            {/* PAGE DIV */}
            <div className='
            flex-column
            width-65'>

                {/* ALLSPOTS CONTAINER */}
                <div className='
                flex-column
                align-items-center
                '>

                    {/* HERE ARE YOUR SPOTS */}
                    <div>
                        <h1 className='font-family padding-bottom-10'>Here are your Spots!</h1>
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div className='
                    flex-row
                    flex-wrap-wrap
                    column-gap-20
                    row-gap-16'>

                        {spotsList.map((spot) => (
                            <NavLink key={spot.id} to={`/spots/${spot.id}`}
                            className='
                            user-spot-card'>

                                {/* INDIVIDUAL IMAGE CARD */}
                                <div className='
                                font-family
                                height-100
                                '>
                                    {/* IMAGE */}
                                    <div className='current-user-img-div'>
                                        {imageCheck(spot)}
                                    </div>
                                    <div className='
                                    padding-top-8'>
                                        <svg viewBox='0 0 32 32'>
                                            <path
                                                d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                fillRule='evenodd'
                                            ></path>
                                        </svg>
                                        {spot.avgRating}
                                        <div>
                                            {spot.description}
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentUserSpot;
