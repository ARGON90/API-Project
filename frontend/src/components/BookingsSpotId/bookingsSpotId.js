import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useContext } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';

import './bookings.css'

const BookingsSpotId = ({ id }) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));

    useEffect(() => {
        console.log('INSIDE BOOKINGS SPOT-BY-ID USE EFFECT')
        dispatch(getBookingsCurrentUser())
    }, [dispatch])

    if (!userBookings) { return null }
    const userBookingsArray = Object.values(userBookings)

    const userBookingsSpot = userBookingsArray.filter(booking => booking.spotId === Number(id))

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
            <div>
                {userBookingsSpot.length > 0 ?
                    <div>Your Bookings
                        {userBookingsSpot.map((booking, idx) =>
                            <div key={idx}>
                                <div>{`${dateParser(booking.startDate)[1]} ${dateParser(booking.startDate)[2]}, ${dateParser(booking.startDate)[0]} -
                        ${dateParser(booking.endDate)[1]} ${dateParser(booking.endDate)[2]}, ${dateParser(booking.endDate)[0]}`}
                                </div>
                            </div>
                        )}
                    </div>
                 : 'hi'}
            </div>
        </>
    );
};

export default BookingsSpotId;
