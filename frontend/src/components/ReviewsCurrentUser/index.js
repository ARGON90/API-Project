import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getAllSpots } from '../../store/spotsReducer';

import { deleteReview, getReviewsCurrentUser } from '../../store/UserReviewsReducer';
import '../../index.css'
import './reviewsUser.css'

const ReviewsCurrentUser = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allSpots = useSelector((state) => (state?.spots));


    useEffect(() => {
        dispatch(getReviewsCurrentUser())
        dispatch(getAllSpots)
    }, [dispatch])

    let reviewsState = useSelector((state) => (state.reviews));

    let reviewsList;
    if (reviewsState.Reviews) {
        reviewsList = Object.values(reviewsState.Reviews)
    }


    function imageCheck(review, idx) {
        console.log(allSpots[review.Spot.id].previewImage, 'id')
        return <img key={idx}
            src={allSpots[review.Spot.id].previewImage} alt='Review Image'
            className='width-100 border-radius-12' />

    }

    async function onClickDelete(id) {
        // console.log('hello')
        // let buttonList = document.querySelectorAll("button.button")
        // console.log('BUTTON', buttonList)
        // console.log('BUTTON0', buttonList[0])
        // console.log('BUTTON0 DATASET', buttonList[0].dataset.type)
        // let buttonArray = Array.from(buttonList)
        // let buttonData = buttonArray.map((button) => button.dataset.type)
        // console.log('BUTTON VALUES', buttonData)
        // dispatch(deleteSpot())
    }

    const [buttonId, setButtonId] = useState(0)

    useEffect(() => {
        if (buttonId) {
            async function deletion() {
                await dispatch(deleteReview(buttonId))
            }
            deletion()
            dispatch(getReviewsCurrentUser())
            history.push(`/reviews/current`)
        }
    }, [buttonId])


    if (!reviewsList) return <div className='font-family'>Loading Current User's Reviews...</div>
    if (!reviewsList[0]) return <div className='flex-row justify-content-center'><div className='font-family bold'>
        You have no Reviews!
    </div></div>
    if (!reviewsList[0].Spot) return <div className='font-family'>Loading Current User's Reviews...</div>
    return (
        <div className='flex-box justify-content-center'>
            {/* // PAGE DIV */}
            <div className='page-container'>
                {/* NAME DIV */}
                <div>
                    <h1 className='reviews-title'>
                        Here are your reviews, {reviewsList[0].User.firstName}
                    </h1>
                </div>


                {/* ALL REVIEW DIV */}
                <div className='reviews-cards-container'>

                    {reviewsList.map((review, idx) => (

                        // INDIVIDUAL REVIEW CARD
                        <div key={review.id} className='review-card'>

                            {/* nav button and delete button div */}
                            <div className='flex-column align-content-center justify-content-evenly rev-left-panel'>

                                <div className='padding-trb-10 flex-column rev-text'>
                                    <div className='bold margin-bottom-5 rev-title'> {review.Spot.name} </div>
                                    <div className='bold margin-bottom-5'> {review.Spot.city}, {review.Spot.state}</div>
                                    <NavLink className='font-black' to={`/spots/${review.id}`}>
                                        {review.review}
                                    </NavLink>
                                </div>

                                <div className='padding-all-10'>
                                    <NavLink to={`/spots/${review.id}`}>
                                        <svg viewBox='0 0 32 32'>
                                            <path
                                                d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                fillRule='evenodd'
                                            ></path>
                                        </svg>
                                    </NavLink>
                                    {review.stars}
                                </div>



                                <div className='rev-buttons-container'>

                                    <NavLink to={`/reviews/${review.id}/edit`} className='reviews-btns-edit nav-styling'>
                                        <div>
                                            Edit Review
                                        </div>
                                    </NavLink>

                                    <button id={`${review.id}`} className='reviews-btns-edit' data-type={review.id}
                                        onClick={(e) => setButtonId(e.target.id)
                                        }>
                                        Delete Review
                                    </button>

                                </div>

                            </div>

                            <div className='width-25 padding-left'>
                                <NavLink to={`/spots/${review.Spot.id}`}>
                                    {imageCheck(review, idx)}
                                </NavLink>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
        </div>

    );
};

export default ReviewsCurrentUser;
