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
    let [lat, setLat] = useState('');
    let [lng, setLng] = useState('');
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
        let errors = {}
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

        lng = Number(lng)
        lat = Number(lat)

        if (!address) errors.address = "Street address is required"
        if (!city) errors.city = "  City is required"
        if (!state) errors.state = "  State is required"
        if (typeof lat != 'number') errors.lat = "  Latitude is not valid"
        if (typeof lng != 'number') errors.lng = "  Longitude is not valid"
        if (!country) errors.country = "  Country address is required"
        if (!name) errors.name = "  Name is required"
        if (name.length >= 50) errors.name = "  Name must be less than 50 characters"
        if (!description) errors.description = "  Description is required"
        if (!price) errors.price = "  Price per day is required"


        if (Object.keys(errors).length != 0) {
            return alert(Object.values(errors))
        }


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
                                            <div>
                                                <div className='padding-left-5' >Address</div>
                                                <div className='
                                border-bottom'>
                                                    <div className='padding-left-5'>
                                                        <input
                                                            type="text"
                                                            placeholder="Address"

                                                            value={address}
                                                            onChange={updateAddress}
                                                            className='inputs' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <div className='padding-left-5'>City</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="City"

                                                        value={city}
                                                        onChange={updateCity}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >City</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="State"
                                                        
                                                        value={state}
                                                        onChange={updateState}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Country</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="Country"
                                                        value={country}
                                                        onChange={updateCountry}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Latitude</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="number"
                                                        placeholder="Latitude (numbers only!)"
                                                        value={lat}
                                                        onChange={updateLat}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Longitude</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="number"
                                                        placeholder="Longitude (numbers only!)"
                                                        value={lng}
                                                        onChange={updateLng}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Name</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="Name"
                                                        value={name}
                                                        onChange={updateName}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Description</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="text"
                                                        placeholder="Description"
                                                        value={description}
                                                        onChange={updateDescription}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Price</div>
                                            <div className='
                                border-bottom'>
                                                <div className='padding-left-5'>
                                                    <input
                                                        type="number"
                                                        placeholder="Price (numbers only!)"
                                                        value={price}
                                                        onChange={updatePrice}
                                                        className='inputs' />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='padding-left-5' >Image</div>
                                            <div className='
                                height-30'>
                                                <div className='padding-left-5'>
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
