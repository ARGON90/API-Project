import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


import { getReviewsCurrentUser } from '../../store/UserReviewsReducer';
import '../../index.css'

const ReviewsCurrentUser = () => {
    console.log('INSIDE REVIEWS-CURRENT-USER COMPONENT')
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('INSIDE REVIEWS CURRENT USER')
        dispatch(getReviewsCurrentUser())
    }, [dispatch])

    let reviewsState = useSelector((state) => (state.reviews));

    let reviewsList;
    if (reviewsState.Reviews) {
        reviewsList = Object.values(reviewsState.Reviews)
        // if (spotsList[0]) {
        //     let newList = Array.from(spotsList[0])
        //     spotsList = newList
    }
    console.log('REVIEWSLIST', reviewsList)


    function imageCheck(review) {
        if (!review.Images.length) {
            return <p>No image was added to this review</p>
        } else {
            return <img key={review.Images[0].id} className='img-size'
                src={review.Images[0].url} alt='Review Image' />
        }
    }

    if (!reviewsList) return <div>Loading Current User's Reviews...</div>
    if (!reviewsList[0].Spot) return <div>Loading Current User's Reviews...</div>
    return (
        <>
            <h1 className='font-family'>Reviews by {reviewsList[0].User.firstName}{' '}
                {reviewsList[0].User.lastName}</h1>
            <div className='flex-box justify-content-center'>
                {reviewsList.map((review) => (
                    <NavLink key={review.id} to={`/spots/${review.id}`}>
                        <div className='card font-family'>
                            <p>Review for Spot {review.Spot.id}</p>
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

export default ReviewsCurrentUser;
