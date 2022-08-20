import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getOneSpot } from '../../store/singleSpotReducer';

const SpotById = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')

    const dispatch = useDispatch()

    const { id } = useParams()
    console.log('SPOT-BY-ID ID', id)

    const singleSpot = useSelector((state) =>
        (state.singleSpot[id]));


    useEffect(() => {
        console.log('INSIDE SPOT-BY-ID USE EFFECT')
        dispatch(getOneSpot(id))
    }, [dispatch])

    console.log('SPOT-BY-ID SINGLE SPOT', singleSpot)
    if (!singleSpot) return <div>Loading...</div>
    return (
        <>
            <h1>SpotbyId</h1>
             <h1>Spot By Id: Spot {singleSpot.id}</h1>
             <h1>Description: {singleSpot.description}</h1>
            <h1>⭐ {singleSpot.avgRating}</h1>
            <h1>Images</h1>
            {singleSpot.Images.map((image) => (
                <div key={image.id}>
                    <div>{image.url}</div>
                    --------------------
                </div>
            ))}
        </>
    );
};

export default SpotById;
