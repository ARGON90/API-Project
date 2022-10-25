import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';

import './bookings.css'

const BookingsSpotId = () => {
    const dispatch = useDispatch()
    const userBookings = useSelector((state) => (state?.bookings));
    const userBookingsArray = Object.values(userBookings)


    let startDateTest =  userBookingsArray[0][0].startDate

    useEffect(() => {
        console.log('INSIDE BOOKINGS SPOT-BY-ID USE EFFECT')
        dispatch(getBookingsCurrentUser())
    }, [dispatch])

    if (!userBookingsArray) return <div>Loading Bookings</div>
    return (
        <>
            <div>{startDateTest}</div>
            <div>!!! Bookings !!!</div>
        </>
    );
};

export default BookingsSpotId;
