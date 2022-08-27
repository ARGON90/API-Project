import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addImgSpot, createSpot } from '../../store/spotsReducer';
import '../../index.css'

// const CreateSpotForm = ({ hideForm }) => {
const CreateSpotForm = () => {
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
    const [url, setUrl] = useState('');

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateUrl = (e) => setUrl(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
          address,
          city,
          state,
          country,
          lat,
          lng,
          name,
          description,
          price
        };

        console.log('INSIDE CREATE FORM SUBMIT')
        console.log('PAYLOAD', payload)

        let createdSpot;
          createdSpot = await dispatch(createSpot(payload));
        if (createdSpot) {
            console.log('NEWLY CREATED SPOT', createdSpot)
            let id = createdSpot.id
            await dispatch(addImgSpot(id, url))
           history.push(`/spots/${createdSpot.id}`);
        }
      };

    return (
        <section className='font-family'>
            <div className='flex-box flex-direction-column'>
                    <form onSubmit={handleSubmit}>
                    <div>
                        <h1>Become a Host - Create Your Spot!</h1>
                    </div>
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
                            type="number"
                            placeholder="Latitude (numbers only!)"
                            value={lat}
                            onChange={updateLat} />
                    </div>
                    <div>
                        Longitude:
                        <input
                            type="number"
                            placeholder="Longitude (numbers only!)"
                            value={lng}
                            onChange={updateLng} />
                    </div>
                    <div>
                        Name:
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={updateName} />
                    </div>
                    <div>
                        Description:
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={updateDescription} />
                    </div>
                    <div>
                        Price:
                        <input
                            type="number"
                            placeholder="Price (numbers only!)"
                            value={price}
                            onChange={updatePrice} />
                    </div>
                    <div>
                        Image URL:
                        <input
                            type="text"
                            placeholder="URL format: http://..."
                            value={url}
                            onChange={updateUrl} />
                    </div>
                    <button type="submit">Create new Spot</button>
                </form>
            </div>
        </section>
    );
};

export default CreateSpotForm;
