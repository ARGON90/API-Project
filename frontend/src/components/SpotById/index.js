import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { getOneSpot } from '../../store/spotsReducer';
import { deleteSpot } from '../../store/spotsReducer';
import { getState } from '../../store/session';
import { sessionUserId } from '../../store/session';
import { ButtonContext } from "../../context/ButtonContext";
import ReviewsSpotId from '../ReviewsSpotId';

import './SpotById.css'
import '../../index.css'

const SpotById = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const dispatch = useDispatch()
    const history = useHistory();
    const { id } = useParams()
    const spotsList = useSelector((state) => (state.spots));
    const singleSpot = spotsList[id]

    const { currentNum, setCurrentNum } = useContext(ButtonContext)
    let sessionId;
    if (sessionUserId && sessionUserId.user) {
        sessionId = sessionUserId.user.id
    }

    console.log('ID OF SPOT-BY-ID', id)

    useEffect(() => {
        console.log('INSIDE SPOT-BY-ID USE EFFECT')
        dispatch(getOneSpot(id))
    }, [dispatch])

    useEffect(() => {
        console.log('SPOTBYID GETSTATE USE EFFECT ')
        dispatch(getState())
    }, [dispatch, sessionId, currentNum])

    function checkState() {
        dispatch(getState());
    }

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

    function imageCheck(singleSpot) {
        if (singleSpot.images) {
            let imgArray = Object.values(singleSpot.images)
            let imgSlice = imgArray.slice(1, imgArray.length)
            if (imgSlice.length > 0) {
                return imgSlice.map((image) => (
                    <div className='
                    width-48
                    height-48
                    flex-row
                    flex-wrap-wrap'
                    ><img key={image.id} src={image.url} alt='Spot Image'
                        className={'img-sizing image-border'}/></div>
                ))
            }
        }
    }




    async function onClickDelete() {
        await dispatch(deleteSpot(id))
        history.push(`/spots/`);
        // await dispatch(deleteSpot(id))
    }

    if (!singleSpot) return <div className='font-family'>Loading...</div>
    return (
        // PAGE DIV
        <div className='font-family
        flex-column'>

            {/* HEADER DIV */}
            <div >
                <h1>{singleSpot.description}</h1>
                <h1> <svg viewBox='0 0 32 32'>
                    <path
                        d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                        fillRule='evenodd'
                    ></path>
                </svg> {singleSpot.avgRating}</h1>
            </div>

            {/* IMAGES DIV */}
            <div className='
            flex-row
            flex-wrap-wrap'>

                {/* large image container */}
                <div className='
                height-400
                width-400
                large-image-pad
                '>
                    {imageCheckSingle(singleSpot)}
                </div>

                {/* small image container */}
                    <div className='
                height-400
                width-400
                flex-row
                flex-end
                flex-wrap-wrap
                image-row-gap
                image-column-gap
                '>
                        {imageCheck(singleSpot)}
                    </div>



            </div>
            {checkState()}
            <div className='flex-box flex-start'>
                {singleSpot.ownerId === sessionId &&
                    (
                        <div>
                            <div>
                                <NavLink to={`/spots/${id}/edit`}>
                                    Edit This Spot
                                </NavLink>
                            </div>
                            <div>
                                <button onClick={onClickDelete}>
                                    Delete This Spot
                                </button>
                            </div>
                        </div>
                    )}
            </div>
            <div>
                {sessionId && (<NavLink to={`/review/create/${id}`} className='font-black'>
                    Create a review for this spot
                </NavLink>)}
            </div>
            <div>
                <ReviewsSpotId id={id} />
            </div>


        </div>
    );
};

export default SpotById;
