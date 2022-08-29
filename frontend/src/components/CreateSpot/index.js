import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addImgSpot, createSpot, getAllSpots } from '../../store/spotsReducer';
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
        <div className='
        flex-box
        justify-content-center'>

            {/* // PAGE DIV */}
            <div className='font-family
        flex-column
        width-90'>

                <div className='
                flex-column
                align-items-center'>

                    <div className='
                '>
                        <h1>Confirm Your Spot's Details</h1>
                    </div>

                    {/* FORM DIV */}
                    <div className='
                form-container'>

                        <form onSubmit={handleSubmit} className='
                    form'>


                            <div className='
                        width-65
                        flex-column
                        align-items-center'>
                                <div
                                    className='
                            grey-border
                            width-90
                            margin-bottom-30
                            font-grey
                            '>
                                    <div>
                                        <div>
                                            Address
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="Address"
                                                    required
                                                    value={address}
                                                    onChange={updateAddress}
                                                    className='inputs' />
                                            </div>
                                        </div>

                                        <div>
                                            City
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    required
                                                    value={city}
                                                    onChange={updateCity}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            State
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    required
                                                    value={state}
                                                    onChange={updateState}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Country:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="Country"
                                                    value={country}
                                                    onChange={updateCountry}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Latitude:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="number"
                                                    placeholder="Latitude (numbers only!)"
                                                    value={lat}
                                                    onChange={updateLat}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Longitude:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="number"
                                                    placeholder="Longitude (numbers only!)"
                                                    value={lng}
                                                    onChange={updateLng}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Name:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="Name"
                                                    value={name}
                                                    onChange={updateName}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Description:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="text"
                                                    placeholder="Description"
                                                    value={description}
                                                    onChange={updateDescription}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Price:
                                            <div className='
                                border-bottom'>
                                                <input
                                                    type="number"
                                                    placeholder="Price (numbers only!)"
                                                    value={price}
                                                    onChange={updatePrice}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                        <div>
                                            Image URL:
                                            <div className='
                                height-30'>
                                                <input
                                                    type="text"
                                                    placeholder="URL format: http://..."
                                                    value={url}
                                                    onChange={updateUrl}
                                                    className='inputs' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='
                                flex-row
                                width-90'>
                                    <button type="submit" className='
                                    looks-good-btn'>
                                        Looks Good
                                        </button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CreateSpotForm;
