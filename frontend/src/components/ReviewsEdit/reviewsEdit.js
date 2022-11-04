import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getReviewsCurrentUser } from '../../store/UserReviewsReducer';
import { getAllSpots } from '../../store/spotsReducer';
import { getOneSpot } from '../../store/spotsReducer';
import { editReviewThunk } from '../../store/UserReviewsReducer';

import '../../index.css'
import './reviewsEdit.css'

const EditReview = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { reviewId } = useParams()
    const [review, setReview] = useState('');
    let [stars, setStars] = useState('');

    const spotsList = useSelector((state) => (state?.spots));
    const reviewsList = useSelector((state) => (state?.reviews?.Reviews));

    useEffect(() => {
        dispatch(getReviewsCurrentUser());
        dispatch(getAllSpots());
    }, [dispatch])

    if (!spotsList) return null;
    if (!reviewsList) return null;

    const reviewsArray = Object.values(reviewsList)
    const userReview = reviewsArray.filter((review) => review.id === Number(reviewId))[0]
    const spotId = userReview.Spot.id
    const singleSpot = spotsList[spotId]

    function imageCheckSingle(singleSpot) {
        if (singleSpot.previewImage) {
            let source = singleSpot.previewImage
            return (
                <img key={singleSpot.id} src={source} alt='Spot Image'
                    className={'img-sizing image-border'} />
            )
        }
    }

    if (!singleSpot) return <div className='font-family'>Loading...</div>

    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {}
        const reviewInfo = {
            review,
            stars: Number(stars)
        };
        stars = Number(stars)
        if (!review) errors.review = "Review text is required"
        if (!stars) errors.stars = "  Stars must be an integer from 1 to 5"
        if (typeof stars != 'number') errors.stars = "  Stars must be an integer from 1 to 5"
        if (stars > 5) errors.stars = "  Stars must be an integer from 1 to 5"
        if (stars < 1) errors.stars = "  Stars must be an integer from 1 to 5"
        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors))
        }

        let editedReview;
        editedReview = await dispatch(editReviewThunk(Number(reviewId), reviewInfo));
        if (editedReview) {
            history.push(`/reviews/current`);
        }
    };

    return (
        <div className='flex-box justify-content-center'>
            {/* // PAGE DIV */}
            <div className='font-family flex-column width-90'>

                <div className='flex-box justify-content-center margin-bottom-20'>
                    <h1>Edit Your Review for this Spot</h1>
                </div>

                {/* ROW CONTAINER FOR INFO/REVIEWS */}
                <div className='flex-row justify-content-between'>

                    {/* SPOT INFO FORM */}
                    <div className='flex-column width-48'>
                        <div className='name-stars'>
                            <h2 className='margin-remove'>{singleSpot.name}</h2>
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
                        <div className='height-400 width-100 large-image-pad'>
                            {imageCheckSingle(singleSpot)}
                        </div>
                        {/* <div className='review-description'>{singleSpot.description}</div> */}

                    </div>


                    {/* REVIEWS FORM */}
                    <div className='flex-column width-48'>

                        {/* header */}
                        <div className='margin-bottom-20'>
                            <h2 className='margin-remove'>Edit Your Review Here!</h2>
                        </div>

                        {/* form div */}
                        <form onSubmit={handleSubmit}>

                            {/* grey box div */}
                            <div className='grey-border margin-bottom-10'>

                                <div className=''>
                                    <div className='padding-left-5'>
                                        Number of Stars:
                                    </div>
                                    <div className='border-bottom'>
                                        <div className='padding-left-5'>
                                            <input
                                                type="number"
                                                placeholder={`You rated it ${userReview.stars} stars`}
                                                value={stars}
                                                onChange={updateStars}
                                                className='inputs-review' />
                                        </div>
                                    </div>
                                </div>

                                <div className='padding-left-5'>
                                    <div>
                                        Review Text:
                                    </div>
                                    <div>
                                        <textarea
                                            type="text"
                                            placeholder={`You said: ${userReview.review}`}
                                            value={review}
                                            onChange={updateReview}
                                            className='text-area-review' />
                                    </div>
                                </div>
                            </div>

                            <div className=''>
                                <button type="submit" className='looks-good-btn padding-top-20'>
                                    Edit Your Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditReview;
