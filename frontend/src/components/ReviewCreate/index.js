import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getState } from '../../store/session';
import { getOneSpot } from '../../store/spotsReducer';
import { ButtonContext } from "../../context/ButtonContext";
import { sessionUserId } from '../../store/session';
import SpotById from '../SpotById';
import { createReview } from '../../store/UserReviewsReducer';
import '../../index.css'


const CreateReview = () => {
  console.log('INSIDE CREATE REVIEW')
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams()
  const [review, setReview] = useState('');
  let [stars, setStars] = useState('');


  // begin spotID

  const spotsList = useSelector((state) => (state.spots));
  const singleSpot = spotsList[spotId]

  const { currentNum, setCurrentNum } = useContext(ButtonContext)
  let sessionId;
  if (sessionUserId && sessionUserId.user) {
    sessionId = sessionUserId.user.id
  }

  useEffect(() => {
    console.log('INSIDE SPOT-BY-ID USE EFFECT')
    dispatch(getOneSpot(spotId))
  }, [dispatch])

  useEffect(() => {
    console.log('SPOTBYID GETSTATE USE EFFECT ')
    // dispatch(getState())
  }, [dispatch, sessionId, currentNum])

  // function checkState() {
  //   dispatch(getState());
  // }

  function imageCheckSingle(singleSpot) {
    if (singleSpot.images) {
      let imgArray = Object.values(singleSpot.images)
      if (singleSpot.images.length < 1) {
        return <p>No Images Exists for Spot</p>
      } else {
        return (
          <img key={imgArray[0].id} src={imgArray[0].url} alt='Spot Image'
            className={'img-sizing image-border'} />

        )
      }
    }
  }
  if (!singleSpot) return <div className='font-family'>Loading...</div>


  // end spotid


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

    stars = Number(stars)

    if (!review) errors.review = "Review text is required"
    if (!stars) errors.stars = "  Stars must be an integer from 1 to 5"
    if (typeof stars != 'number') errors.stars = "  Stars must be an integer from 1 to 5"
    if (stars > 5) errors.stars = "  Stars must be an integer from 1 to 5"
    if (stars < 1) errors.stars = "  Stars must be an integer from 1 to 5"

    if (Object.keys(errors).length > 0) {
      return alert(Object.values(errors))
    }

    let createdReview;
    createdReview = await dispatch(createReview(spotId, payload));
    if (createdReview) {
      console.log('CREATED REVIEW', createdReview)
      history.push(`/spots/${spotId}`);
    }
  };


  return (
    <div className='
        flex-box
        justify-content-center'>
      {/* // PAGE DIV */}
      <div className='font-family
        flex-column
        width-90'>

        <div className='
        flex-box
        justify-content-center
        margin-bottom-20'>
          <h1>Create a Review for this Spot</h1>
        </div>

        {/* ROW CONTAINER FOR INFO/REVIEWS */}
        <div className='
        flex-row
        justify-content-between'>

          {/* SPOT INFO FORM */}
          <div className='
          flex-column
          width-48'>

            <div className='
            margin-bottom-20'>
              <h2 className='
              margin-remove'>{singleSpot.description}</h2>
            </div>

            <div className='
                height-400
                width-100
                large-image-pad
                '>
              {imageCheckSingle(singleSpot)}
            </div>

            <div>{singleSpot.name}</div>
            <div className='
            margin-bottom-10'>
              <svg viewBox='0 0 32 32'>
                <path
                  d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                  fillRule='evenodd'
                ></path>
              </svg>
              {singleSpot.avgRating}
            </div>
          </div>


          {/* REVIEWS FORM */}
          <div className='
          flex-column
          width-48'>

            {/* header */}
            <div className='
            margin-bottom-20'>
              <h2 className='
              margin-remove'>Write Your Review Here!</h2>
            </div>

            {/* form div */}
            <form onSubmit={handleSubmit}>

              {/* grey box div */}
              <div className='
              grey-border
              margin-bottom-10'>

                <div className=''>
                  <div className='
                  padding-left-5'>
                    Number of Stars:
                  </div>
                  <div className='
                border-bottom'>
                    <div className='
                  padding-left-5'>
                      <input
                        type="number"
                        placeholder="Must be a number 1-5!"

                        value={stars}
                        onChange={updateStars}
                        className='
                    inputs' />
                    </div>
                  </div>
                </div>

                <div className='
                padding-left-5'>
                  <div>
                    Review Text:
                  </div>
                  <div>
                    <textarea
                      type="text"
                      placeholder="Review here"

                      value={review}
                      onChange={updateReview}
                      className='
                    text-area' />
                  </div>
                </div>
              </div>

              <div className=''>
                <button type="submit" className='
              looks-good-btn
              padding-top-20'>
                  Create New Review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReview;
