import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import '../../index.css'
import { editSpot } from '../../store/spotsReducer';


function EditSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const spotInfo = {
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
        console.log('PAYLOAD', spotInfo)

        let editedSpot;
        editedSpot = await dispatch(editSpot(spotId, spotInfo));
        if (editedSpot) {
            console.log(editedSpot)
            history.push(`/spots/${editedSpot.id}`);
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
                        <h1>Edit Your Spot's Details</h1>
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
                                height-30'>
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

export default EditSpot
