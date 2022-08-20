import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllSpots } from '../../store/spotsReducer';

const SpotById = ({ spotsList }) => {
    console.log('INSIDE SPOTS-BY-ID COMPONENT')
    const { id } = useParams()
    const singleSpot = spotsList.find(spot => spot.id === id);
    const singleSpot2 = useSelector((state) => state.spots[id]);

    // console.log(Object.values(singleSpot))
    console.log('SPOTSLIST', typeof spotsList)
    console.log('singleSpot', singleSpot2)
    console.log('SPOTSLIST0', spotsList[0])
    console.log('SPOT-BY-ID ID', id)


    function imageCheck(spot) {
        if (!spot.previewImage) {
            return <p>No Preview Image Exists for Spot</p>
        } else {
            return <p>spot.previewImage</p>
        }
    }

    if (singleSpot) return <div>Loading...</div>
    return (
        <>
            <h1>Spot By Id</h1>
            {spotsList.map((spot) => (
                <div key={spot.id}>
                    {imageCheck(spot)}
                    <p>{spot.city}</p>
                    <p>{spot.state}</p>
                    <p>⭐{spot.avgRating}</p>
                    <p>${spot.price}/night</p>
                    --------------------
                </div>

            ))}
        </>
    );
};

export default SpotById;
