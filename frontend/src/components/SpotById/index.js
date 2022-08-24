import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getAllSpots } from '../../store/spotsReducer';
import { getOneSpot } from '../../store/spotsReducer';
import { deleteSpot } from '../../store/spotsReducer';
import './SpotById.css'
import '../../index.css'

//make sure allspots data loads properly on /spots
//as well as spots/:id

//the job of the get spot by id action will be to add
//images array to the spot state for a given spot
//FETCH SINGLE SPOT DATA
//ADD THE IMG DATA INTO 'SPOTS' STATE

const SpotById = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const dispatch = useDispatch()
    const history = useHistory();
    const { id } = useParams()
    const spotsList = useSelector((state) => (state.spots));
    let singleSpot = spotsList[id]
    console.log('ID OF SPOT-BY-ID', id)

    useEffect(() => {
        console.log('INSIDE SPOT-BY-ID USE EFFECT')
        dispatch(getOneSpot(id))
    }, [dispatch])

    function imageCheck(singleSpot) {
        if (singleSpot.images) {
            console.log('SINGLESPOT IMAGES', typeof singleSpot.images)
            let imgArray = Object.values(singleSpot.images)
            console.log('SINGLESPOT IMAGESARR', imgArray.length)
            if (singleSpot.images.length < 1) {
                return <p>No Images Exists for Spot</p>
            } else {
                return imgArray.map((image) => (
                    <div>
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
                <NavLink to={`/spots/${id}/edit`}>
                Edit This Spot
                </NavLink>
                <button onClick={onClickDelete}>
                Delete This Spot
                </button>
            </div>
        </>
    );
};

export default SpotById;
