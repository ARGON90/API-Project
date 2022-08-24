import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


import { getReviewsCurrentUser } from '../../store/UserReviewsReducer';
// import { getOneSpot } from '../../store/spotsReducer';
// import { getCurrentUserSpot } from '../../store/spotsReducer';
// import './CurrentUserSpot.css'
// import '../../index.css'

const ReviewsCurrentUser = () => {
    console.log('INSIDE REVIEWS-CURRENT-USER COMPONENT')
    const dispatch = useDispatch()
    // let reviewsList = useSelector((state) => Object.values(state.spots))
    // let newList = Array.from(spotsList[0])
    // spotsList = newList

    useEffect(() => {
        console.log('INSIDE REVIEWS CURRENT USER')
        dispatch(getReviewsCurrentUser())
    }, [dispatch])

    const reviewsList = useSelector((state) => Object.values(state.reviews.Reviews));

    console.log('REVIEWSLIST', reviewsList)
    console.log('REVIEWSLISTIMAGES', reviewsList[0].Images[0].url)


    function imageCheck(review) {
        if (!review.Images.length) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <img key={review.Images[0].id} className='img-size'
            src={review.Images[0].url} alt='Review Image' />
        }
    }

    if (!reviewsList) return <div>Loading Current User's Reviews...</div>
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
