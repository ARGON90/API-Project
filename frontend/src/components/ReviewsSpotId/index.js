import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { getReviewsCurrentSpot } from '../../store/UserReviewsReducer';
import '../../index.css'

const ReviewsSpotId = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
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
        console.log('INSIDE SPOT-BY-ID USE EFFECT')
        dispatch(getReviewsCurrentSpot(spotId))
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

    console.log('REVIEWSLIST', reviewsList)
    if (!reviewsList) return <div className='font-family'>Loading Reviews of Current Spot...</div>
    return (
        <>
            <h1 className='font-family'>Reviews for Spot {spotId}</h1>
            <div className='flex-box justify-content-center'>
                {checkReviewList()}
                {reviewsList.map((review) => (
                    <NavLink key={review.id} to={`/spots/${review.id}`}>
                        <div className='card font-family'>
                            <p>Review by: {review.User.firstName}{' '}{review.User.lastName}</p>
                            <p>Description: {review.review}</p>
                            <p>Stars: ⭐ {review.stars}</p>
                            {imageCheck(review)}
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
};

export default ReviewsSpotId;