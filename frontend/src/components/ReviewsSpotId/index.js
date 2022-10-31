import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { getReviewsCurrentSpot } from '../../store/UserReviewsReducer';
import '../../index.css'
import './reviews.css'

const ReviewsSpotId = ({ id }) => {
    // console.log('INSIDE REVIEWS SPOT-BY-ID COMPONENT')
    const dispatch = useDispatch()
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



    useEffect(() => {
        // console.log('INSIDE REVIEWS SPOT-BY-ID USE EFFECT')
        dispatch(getReviewsCurrentSpot(id))
    }, [dispatch])

    function imageCheck(review) {
        if (!review.Images.length) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img key={review.Images[0].id} className='img-size'
                src={review.Images[0].url} alt='Review Image' />
        }
    }

    function checkReviewList() {
        if (reviewsList.length < 1) {
            return (
                <>
                    <div className='font-family'>No Reviews for this spot yet</div>
                </>
            )
        }
    }

    if (!reviewsList) return <div className='font-family'>Loading Reviews of Current Spot...</div>
    return (
        <>
            {/* REVIEWS CONTAINER */}
            <div className='reviews-container'>
                {checkReviewList()}


                {/* USER HAS A REVIEW */}
                {userReview && userReview[0] &&
                    <>

                        <div className='individual-review-container-user'>
                            <div className='header-title'>
                                <div className='bold'>{userReview[0].User.firstName}{' '}{userReview[0].User.lastName}:</div>
                                <div>{userReview[0].stars}</div>
                                <svg viewBox='0 0 32 32'>
                                    <path
                                        d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                        fillRule='evenodd'
                                    ></path>
                                </svg>
                                <NavLink to={`/reviews/current`} className='nav-edit'>Edit Your Review</NavLink>
                            </div>
                            <div>{userReview[0].review}</div>
                        </div>

                        {reviewsList.map((review) => (
                            <div className='individual-review-container'>
                                <div className='header-title'>
                                    <div className='bold'>{review.User.firstName}{' '}{review.User.lastName}:</div>
                                    <div>{review.stars}</div>
                                    <svg viewBox='0 0 32 32'>
                                        <path
                                            d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                            fillRule='evenodd'
                                        ></path>
                                    </svg>
                                </div>
                                <div>{review.review}</div>
                            </div>
                        ))}

                    </>}



                {/* USER DOESN'T HAVE A REVIEW */}
                {!userReview &&
                    <>
                        {reviewsList.map((review) => (
                            <div className='individual-review-container'>
                                <div className='header-title'>
                                    <div className='bold'>{review.User.firstName}{' '}{review.User.lastName}:</div>
                                    <div>{review.stars}</div>
                                    <svg viewBox='0 0 32 32'>
                                        <path
                                            d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                            fillRule='evenodd'
                                        ></path>
                                    </svg>
                                </div>
                                <div>{review.review}</div>
                            </div>
                        ))}
                    </>
                }



            </div>
        </>
    );
};

export default ReviewsSpotId;
