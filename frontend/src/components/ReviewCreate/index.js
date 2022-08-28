import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { createReview } from '../../store/UserReviewsReducer';
import '../../index.css'


const CreateReview = () => {
    console.log('INSIDE CREATE REVIEW')
    const dispatch = useDispatch();
    const history = useHistory();
    const {spotId} = useParams()
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');


    const updateReview = (e) => setReview(e.target.value);
    const updateStars = (e) => setStars(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let errors = {}
        const payload = {
          review,
          stars,
        };

        console.log('INSIDE CREATE REVIEW FORM SUBMIT')
        console.log('PAYLOAD', payload)
        console.log('SPOT ID', spotId)

        if (stars < 1 || stars > 5) {
          errors.stars = 'stars must be between 1 and 5'
        }

        if (review.length < 10) {
          errors.review = 'review must be atleast 10 characters!'
        }

        if (Object.keys(errors).length > 0){
          alert(Object.values(errors))
        }

        let createdReview;
          createdReview = await dispatch(createReview(spotId, payload));
        if (createdReview) {
            console.log('CREATED REVIEW', createdReview)
          history.push(`/spots/${spotId}`);
        }
      };


    return (
        <section className='font-family'>
            <div className='flex-box flex-direction-column'>
                    <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Create A Review for Spot {spotId}</h1>
                    </div>
                    <div>
                        Review Text:
                        <input
                            type="text"
                            placeholder="Review here"
                            required
                            value={review}
                            onChange={updateReview} />
                    </div>
                    <div>
                        Number of Stars:
                        <input
                            type="number"
                            placeholder="Stars (1-5)"
                            required
                            value={stars}
                            onChange={updateStars} />
                    </div>
                    <button type="submit">Create new Review</button>
                </form>
            </div>
        </section>
    );
};

export default CreateReview;
