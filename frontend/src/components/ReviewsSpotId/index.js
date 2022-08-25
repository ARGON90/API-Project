import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { getReviewsCurrentSpot } from '../../store/UserReviewsReducer';
import '../../index.css'

const ReviewsSpotId = ({ id }) => {
    console.log('INSIDE REVIEWS SPOT-BY-ID COMPONENT')
    console.log('PROPS ID', id)
    const dispatch = useDispatch()
    const { spotId } = useParams()

    // const reviewsList = useSelector((state) => Object.values(state.reviews.Reviews));

    let reviewsState = useSelector((state) => (state.reviews));


    let reviewsList;
    if (reviewsState.Reviews) {
        reviewsList = Object.values(reviewsState.Reviews)
        // if (spotsList[0]) {
        //     let newList = Array.from(spotsList[0])
        //     spotsList = newList
    }


    useEffect(() => {
        console.log('INSIDE REVIEWS SPOT-BY-ID USE EFFECT')
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
            <div className='flex-box flex-start'>
                <h1 className='font-family'>Reviews for Spot {id}:</h1>
                <div className='flex-box'>
                    <div>
                        {checkReviewList()}
                        {reviewsList.map((review) => (
                                <div className='card font-family'>
                                    <p>Review by: {review.User.firstName}{' '}{review.User.lastName}</p>
                                    <p>Description: {review.review}</p>
                                    <p>Stars: ⭐ {review.stars}</p>
                                    {imageCheck(review)}
                                </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsSpotId;
