import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext, useState } from 'react';

import { getOneSpot } from '../../store/spotsReducer';
import { deleteSpot } from '../../store/spotsReducer';
import { sessionUserId } from '../../store/session';
import ReviewsSpotId from '../ReviewsSpotId';
import BookingsSpotId from '../BookingsSpotId/bookingsSpotId';

import './SpotById.css'
import '../../index.css'

const SpotById = () => {
    // console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const dispatch = useDispatch()
    const history = useHistory();
    const { id } = useParams()
    const spotsList = useSelector((state) => (state.spots));
    const singleSpot = spotsList[id]
    const userId = useSelector((state) => state?.session?.user?.id)

    let reviewsState = useSelector((state) => (state?.reviews));
    let userReview;
    let reviewsList;
    if (reviewsState.Reviews) {
        reviewsList = Object.values(reviewsState?.Reviews)
        let i = 0;
        for (i; i < reviewsList.length; i++) {
            if (reviewsList[i].userId === userId) {
                userReview = reviewsList.splice(i, 1)
            }
        }
    }

    const [showCalendar, setShowCalendar] = useState(false)
    let sessionId;
    if (sessionUserId && sessionUserId.user) {
        sessionId = sessionUserId.user.id
    }

    useEffect(() => {
        dispatch(getOneSpot(id))
    }, [dispatch, userId])


    function imageCheckSingle(singleSpot) {
        if (singleSpot.images) {
            let imgArray = Object.values(singleSpot.images)
            if (singleSpot.images.length < 1) {
                return <p>No Images Exists for Spot</p>
            } else {
                return (

                    <img key={imgArray[0].id} src={imgArray[0].url} alt='Spot Image'
                        className='single-image' />
                )
            }
        }
    }

    function imageCheck(singleSpot) {
        if (singleSpot.images) {
            let imgArray = Object.values(singleSpot.images)
            let imgSlice = imgArray.slice(1, imgArray.length)
            if (imgSlice.length > 0) {
                return imgSlice.map((image, idx) => (
                    <img key={idx} src={image.url} alt='Spot Image'
                        className='multi-image' />
                ))
            }
        }
    }

    async function onClickDelete() {
        await dispatch(deleteSpot(id))
        history.push(`/spots/`);
    }

    function sessionCheck() {
        if (sessionId && sessionId !== singleSpot.ownerId) {
            return (
                <NavLink to={`/review/create/${id}`} className='font-black bold'>
                    Create a review for this spot
                </NavLink>
            )
        }
    }

    if (!singleSpot) return <div className='font-family'>Loading...</div>
    return (
        <div className='page-div-spots'>



            <div className='page-container-spotId'>

                {/* HEADER DIV */}
                <div className='header-stars'>
                    <div>
                        <h1>{singleSpot.description}</h1>
                    </div>

                    <div className=''>
                        <div>
                            <svg viewBox='0 0 32 32'>
                                <path
                                    d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                    fillRule='evenodd'
                                ></path>
                            </svg>
                            {singleSpot.avgRating}
                        </div>

                    </div>
                </div>

                {/* IMAGES DIV */}
                <div className='all-images-container'>

                    {/* large image container */}
                    <div className='single-image-container'>
                        {imageCheckSingle(singleSpot)}
                    </div>

                    {/* small image container */}
                    <div className='multi-image-container'>
                        {imageCheck(singleSpot)}
                    </div>
                </div>

                {showCalendar === false &&
                    <div className='calendar-false-container'>
                        {/* HOSTED BY ... */}
                        <div className='hosted-container'>
                            <div className='booking-owner-container'>
                                {singleSpot.ownerId == userId &&
                                    <h2 className='hosted-header-true'>This spot is hosted by you, {singleSpot.firstName} {singleSpot.lastName}! </h2>
                                }
                                {singleSpot.ownerId != userId &&
                                    <h2 className='hosted-header-true'>This spot is hosted by {singleSpot.firstName} {singleSpot.lastName} </h2>
                                }
                                <div className='edit-delete-container'>
                                    <div className='edit-delete-btn'>
                                        <NavLink to={`/spots/${id}/edit`} className='edit-nav'>
                                            <div className='btn-container-spot'>
                                                Edit This Spot
                                            </div>
                                        </NavLink>
                                    </div>
                                    <div className='edit-delete-btn'>
                                        <div onClick={onClickDelete} className='btn-container-spot'>
                                            Delete This Spot
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {singleSpot.ownerId !== userId &&
                                <div className='bookings-container-true'>
                                    <BookingsSpotId showCalendar={showCalendar} setShowCalendar={setShowCalendar} rating={singleSpot.avgRating} price={singleSpot.price} id={id} ownerId={singleSpot.ownerId} />
                                </div>
                            }

                            {singleSpot.ownerId === userId &&
                                <div className='booking-owner-container'>
                                    <div className='bookings-container-owner-true'>
                                        <BookingsSpotId showCalendar={showCalendar} setShowCalendar={setShowCalendar} rating={singleSpot.avgRating} price={singleSpot.price} id={id} ownerId={singleSpot.ownerId} />
                                    </div>
                                </div>
                            }

                        </div>

                        <div className='all-reviews-header-container'>
                            <h2 className='all-reviews-header'>All Reviews</h2>
                            <svg viewBox='0 0 32 32'>
                                <path
                                    d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                    fillRule='evenodd'
                                ></path>
                            </svg>
                            {singleSpot.avgRating}
                            {userId && !userReview && <NavLink className='nav-create' to={`review/create/${id}`}>Create a Review</NavLink>}
                            {!userId && <div className='nav-create'>Log in to create a review!</div>}

                        </div>

                        {/* {checkState()} */}
                        {sessionCheck()}

                        {/* REVIEWS SECTION */}
                        <ReviewsSpotId id={id} />
                    </div>
                }

                {showCalendar === true &&
                    <div className='calendar-true-container'>
                        {/* HOSTED BY ... */}
                        <div className='headers-reviews'>
                            <div className='hosted-container-true'>
                                {singleSpot.ownerId == userId &&
                                    <h2 className='hosted-header-true'>This spot is hosted by you, {singleSpot.firstName} {singleSpot.lastName}! </h2>
                                }
                                {singleSpot.ownerId != userId &&
                                    <h2 className='hosted-header-true'>This spot is hosted by {singleSpot.firstName} {singleSpot.lastName} </h2>
                                }
                            </div>

                            <div className='all-reviews-header-container-true'>
                                <h2 className='all-reviews-header'>All Reviews</h2>
                                <svg viewBox='0 0 32 32'>
                                    <path
                                        d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                        fillRule='evenodd'
                                    ></path>
                                </svg>
                                {singleSpot.avgRating}
                            </div>
                            <ReviewsSpotId id={id} />
                        </div>


                        <div className='bookings-container-true'>
                            <BookingsSpotId showCalendar={showCalendar} setShowCalendar={setShowCalendar} rating={singleSpot.avgRating} price={singleSpot.price} id={id} />
                        </div>



                        {sessionCheck()}
                    </div>
                }



            </div>
        </div>
    );
};

export default SpotById;
