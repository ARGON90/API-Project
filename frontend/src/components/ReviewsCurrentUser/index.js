import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { deleteReview, getReviewsCurrentUser } from '../../store/UserReviewsReducer';
import '../../index.css'

const ReviewsCurrentUser = () => {
    console.log('INSIDE REVIEWS-CURRENT-USER COMPONENT')
    const dispatch = useDispatch()
    const history = useHistory()

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
            return <div className='font-family'>This Review Has No Images</div>
        } else {
            return <img key={review.Images[0].id}
                src={review.Images[0].url} alt='Review Image' className='
                 width-100
                 border-radius-12
                 ' />
        }
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
        console.log('ID INSIDE USEEFFECT', buttonId)
        if (buttonId) {
            async function deletion() {
                console.log('ID IN DELETE FXN', buttonId)
                console.log('INSIDE DELETE FXN REVIEWS')
                await dispatch(deleteReview(buttonId))
            }
            deletion()
            dispatch(getReviewsCurrentUser())
            history.push(`/reviews/current`)
            dispatch(getReviewsCurrentUser())
        }
    }, [buttonId])


    console.log('REVIEWSLIST IN CURRENT REVIEWS', reviewsList)
    if (!reviewsList) return <div className='font-family'>Loading Current User's Reviews...</div>
    if (!reviewsList[0]) return <div className='flex-row justify-content-center'><div className='font-family bold'>
        You have no Reviews!
        </div></div>
    if (!reviewsList[0].Spot) return <div className='font-family'>Loading Current User's Reviews...</div>
    return (
        <div className='
        flex-box
        justify-content-center'>
            {/* // PAGE DIV */}
            <div className='
            font-family
            flex-column
            width-90
            '>

                <div className='
            flex-column
            align-items-center'>

                    {/* NAME DIV */}
                    <div>
                        <h1 className='font-family'>
                            Here are your reviews, {reviewsList[0].User.firstName}
                        </h1>
                    </div>



                    {/* ALL REVIEW DIV */}
                    <div className='flex-column
                justify-content-center'>

                        {reviewsList.map((review) => (

                            // INDIVIDUAL REVIEW CARD
                            <div key={review.id} className='
                        flex-row
                        width-100
                        padding-all-15
                        justify-content-evenly'>

                                {/* nav button and delete button div */}
                                <div className='
                            flex-column
                            align-content-center
                            justify-content-evenly
                            '>


                                    <div>

                                        <div className='
                                    padding-all-10'>
                                            <NavLink to={`/spots/${review.id}`}>
                                                {review.review}
                                            </NavLink>
                                        </div>

                                        <div className='
                                    padding-all-10'>
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

                                    </div>


                                    <div div='
                                    padding-all-10'>
                                        {console.log('reviewID', review.id)}
                                        <button id={`${review.id}`} className={`button  looks-good-btn z-index-2`} data-type={review.id}
                                            onClick={(e) => setButtonId(e.target.id)
                                            }>
                                            Delete This Review
                                        </button>
                                    </div>

                                </div>

                                <div className='
                                width-25
                                padding-left'>
                                    <NavLink to={`/spots/${review.id}`}>
                                        {imageCheck(review)}
                                    </NavLink>
                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReviewsCurrentUser;
