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

    function imageCheck(singleSpot) {
        if (singleSpot.images) {
            let imgArray = Object.values(singleSpot.images)
            if (singleSpot.images.length < 1) {
                return <p>No Images Exists for Spot</p>
            } else {
                return imgArray.map((image) => (
                    <div key={image.id}>
                        <img src={image.url} key={image.id}
                            className={'img-size'} alt='Spot Image' />
                    </div>
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
        <>
            <div className='font-family'>
                <h1> Spot {singleSpot.id}:{' '}{singleSpot.description}</h1>
                <h1> <svg viewBox='0 0 32 32'>
                                                <path
                                                    d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                    fillRule='evenodd'
                                                ></path>
                                            </svg> {singleSpot.avgRating}</h1>
                <h1>Images</h1>
                <div>
                    {imageCheck(singleSpot)}
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
            </div>
        </>
    );
};

export default SpotById;
