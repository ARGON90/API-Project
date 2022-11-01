import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import { getBookingsCurrentSpot } from '../../store/spotbookingsReducer';
import { createBooking } from '../../store/bookingsReducer';
import BookingsEditCalendar from '../BookingsEditCalendar/bookingsEditCalendar';
import { getAllSpots } from '../../store/spotsReducer';

import 'react-calendar/dist/Calendar.css'

import './bookingsedit.css'


const BookingsEdit = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { bookingId } = useParams()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));
    const spotBookings = useSelector((state) => (state?.spotBookings?.Bookings));
    const allSpots = useSelector((state) => state?.spots)

    useEffect(() => {
        dispatch(getBookingsCurrentUser())
        dispatch(getAllSpots())
    }, [dispatch])

    if (!userBookings) return null
    if (!allSpots) return null

    const userBookingsArray = Object.values(userBookings)
    const userBookingArray = userBookingsArray.filter((bookings) => bookings.id === Number(bookingId))
    const userBooking = userBookingArray[0]
    const price = userBooking.Spot.price

    const spotId = userBooking.Spot.id
    const allSpotsArray = Object.values(allSpots)
    const spot = allSpotsArray.filter((spot) => spot?.id === spotId)

    if (!spot[0]) return 'spot not loaded'
    const rating = spot[0].avgRating

    function dateParser(string) {
        string = String(string)
        let dateArray = string.split('-')
        let dayPre = dateArray[2].split(' ')

        const months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December',
        }
        let year = dateArray[0]
        let month = months[dateArray[1]]
        let day = dayPre[0]
        return [year, month, day]
    }

    if (!userBooking) return <div>Loading Booking</div>
    return (
        <div className='page'>
            <div className='page-container'>
                <div className='user-bookings-page'>
                    {userBookingArray.length > 0 &&
                        <>
                            <h2 className='booking-title'> Edit Your Booking</h2>

                            <div key={userBooking.id} className='user-booking-card'>
                                <div className='user-booking-text'>
                                    <div className='spot-title'>{userBooking.Spot.name}</div>
                                    <div>{`${dateParser(userBooking.startDate)[1]} ${dateParser(userBooking.startDate)[2]}, ${dateParser(userBooking.startDate)[0]} -
                        ${dateParser(userBooking.endDate)[1]} ${dateParser(userBooking.endDate)[2]}, ${dateParser(userBooking.endDate)[0]}`}
                                    </div>
                                    <div>${userBooking.Spot.price}/night</div>
                                    <div className='bookings-container'>
                                        <NavLink to='/bookings/' className='edit-delete-btn'>Go Back</NavLink>
                                        <div className='edit-delete-btn'>Delete Booking</div>
                                    </div>
                                </div>
                                <div className='image-div'>
                                    <img className='preview-image' src={userBooking.Spot.previewImage}></img>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div className='cal-container'>
                    <div><BookingsEditCalendar price={price} rating={rating} id={spotId} bookingId={bookingId} /></div>
                </div>
            </div>
        </div>
    );
};

export default BookingsEdit;
