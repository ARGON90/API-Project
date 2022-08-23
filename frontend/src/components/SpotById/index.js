import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getOneSpot } from '../../store/singleSpotReducer';
import './SpotById.css'
import '../../index.css'

const SpotById = () => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const dispatch = useDispatch()
    const { id } = useParams()
    const singleSpot = useSelector((state) =>
        (state.singleSpot[0]));

    useEffect(() => {
        console.log('INSIDE SPOT-BY-ID USE EFFECT')
        dispatch(getOneSpot(id))
    }, [dispatch])

    function imageCheck(singleSpot) {
        console.log('SINGLESPOT', singleSpot.Images)
        console.log('IMAGESLENGTH', typeof singleSpot.Images)
        if (singleSpot.Images.length < 1) {
            return <p>No Images Exists for Spot</p>
        } else {
            let imgArray = Array.from(singleSpot.Images)
            console.log('IMAGEARRAY', imgArray)
            return imgArray.map((image) => (
                    <div>
                <img src={image.url} key={image.id} alt='Spot Image' />
                </div>
            ))

        }
    }

    if (!singleSpot) return <div>Loading a Single Spot...</div>
    return (
        <>
            <div className='font-family'>
                <h1>Spot By Id: Spot {singleSpot.id}</h1>
                <h1>Description: {singleSpot.description}</h1>
                <h1>⭐ {singleSpot.avgRating}</h1>
                <h1>Images</h1>
                {imageCheck(singleSpot)}
            </div>
        </>
    );
};

export default SpotById;
