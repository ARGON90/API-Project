import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';

import { getOneSpot } from '../../store/spotsReducer';
import { deleteSpot } from '../../store/spotsReducer';
import { getState } from '../../store/session';
import { sessionUserId } from '../../store/session';
import { ButtonContext } from "../../context/ButtonContext";

import './SpotById.css'
import '../../index.css'

const SpotById = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const dispatch = useDispatch()
    const history = useHistory();
    const { id } = useParams()
    const spotsList = useSelector((state) => (state.spots));
    const singleSpot = spotsList[id]

  const {currentNum, setCurrentNum} = useContext(ButtonContext)
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
    }

    if (!singleSpot) return <div className='font-family'>Loading...</div>
    return (
        <>
            <div className='font-family'>
                <h1>Spot By Id: Spot {singleSpot.id}</h1>
                <h1>Description: {singleSpot.description}</h1>
                <h1>⭐ {singleSpot.avgRating}</h1>
                <h1>Images</h1>
                {imageCheck(singleSpot)}
                <NavLink to={`/spots/${id}/reviews`}>
                    Reviews of this spot
                </NavLink>

                {checkState()}
                {singleSpot.ownerId === sessionId &&
                    (
                    <div>
                    <NavLink to={`/spots/${id}/edit`}>
                    Edit This Spot
                    </NavLink>
                    <button onClick={onClickDelete}>
                        Delete This Spot
                    </button>
                    </div>
                    )}
                    {checkState()}
            </div>
        </>
    );
};

export default SpotById;
