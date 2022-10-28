import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import 'react-calendar/dist/Calendar.css'

import './bookingsUser.css'


const BookingsUser = () => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));



    useEffect(() => {
        dispatch(getBookingsCurrentUser())
    }, [dispatch])

    if (!currentUserId) return <div>Log in to create a booking!</div>
    if (!userBookings) return <div>Log in to create a booking!</div>

    const userBookingsArray = Object.values(userBookings)



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




    if (!userBookingsArray) return <div>Loading Bookings</div>
    return (
        <>
            <div className='page'>
                <div className='user-bookings-page'>
                    {userBookingsArray.length > 0 &&
                        <>
                            <div className='booking-title'> Your Bookings </div>
                            {userBookingsArray.map((booking) =>
                                <div key={booking.id} className='user-booking-card'>
                                    <div className='user-booking-text'>
                                        <div>{booking.Spot.name}</div>
                                        <div>{`${dateParser(booking.startDate)[1]} ${dateParser(booking.startDate)[2]}, ${dateParser(booking.startDate)[0]} -
                        ${dateParser(booking.endDate)[1]} ${dateParser(booking.endDate)[2]}, ${dateParser(booking.endDate)[0]}`}
                                        </div>
                                        <div>${booking.Spot.price}/night</div>
                                    </div>
                                    <div>
                                        <div> Image</div>
                                    </div>
                                </div>
                            )}
                        </>
                    }
                </div>
            </div>
        </>
    );
};

export default BookingsUser;
