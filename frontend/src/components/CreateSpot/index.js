import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import { getPokemonTypes } from '../store/pokemon';

// const CreateSpotForm = ({ hideForm }) => {
const CreateSpotForm = ({ hideForm }) => {
    //   const pokeTypes = useSelector(state => state.pokemon.types);
    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    //   useEffect(() => {
    //     dispatch(getPokemonTypes());
    //   }, [dispatch]);

    //   useEffect(() => {
    //     if (pokeTypes.length && !type) {
    //       setType(pokeTypes[0]);
    //     }
    //   }, [pokeTypes, type]);

    //   const handleSubmit = async (e) => {
    //     e.preventDefault();

    // const payload = {
    //   number,
    //   attack,
    //   defense,
    //   imageUrl,
    //   name,
    //   type,
    //   move1,
    //   move2,
    //   moves: [move1, move2]
    // };

    //     let createdSpot;
    //     if (createdSpot) {
    //       history.push(`/spots/${spot.id}`);
    //       hideForm();
    //     }
    //   };

    //   const handleCancelClick = (e) => {
    //     e.preventDefault();
    //     hideForm();
    //   };

    return (
        <section className='font-family'>
            <div className='flex-box flex-direction-column'>
                <form>
                <div>
                    <h1>Create A Spot</h1>
                </div>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div>
                        Address
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={updateAddress} />
                    </div>
                    <div>
                        City
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={updateCity} />
                    </div>
                    <div>
                        State
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={updateState} />
                    </div>
                    <div>
                        Country:
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={updateCountry} />
                    </div>
                    <div>
                        Latitude:
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={lat}
                            onChange={updateLat} />
                    </div>
                    <div>
                        Longitude:
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={lng}
                            onChange={updateLng} />
                    </div>
                    <div>
                        Name:
                        <input
                            type="text"
                            placeholder="Name"
                            value={description}
                            onChange={updateName} />
                    </div>
                    <div>
                        Description:
                        <input
                            type="text"
                            placeholder="Description"
                            value={name}
                            onChange={updateDescription} />
                    </div>
                    <div>
                        Price:
                        <input
                            type="text"
                            placeholder="Price"
                            value={price}
                            onChange={updatePrice} />
                    </div>
                    <button type="submit">Create new Spot</button>
                    {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
                    <button type="button">Cancel</button>
                </form>
            </div>
        </section>
    );
};

export default CreateSpotForm;
