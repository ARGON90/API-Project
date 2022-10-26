import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import { getBookingsCurrentSpot } from '../../store/spotbookingsReducer';

import './bookings.css'

const BookingsSpotId = ({ rating, price, id }) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));
    const spotBookings = useSelector((state) => (state?.spotBookings?.Bookings));

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [errors, setErrors] = useState('')

    const updateCheckIn = (e) => setCheckIn(e.target.value);
    const updateCheckOut = (e) => setCheckOut(e.target.value);


    useEffect(() => {
        // console.log('INSIDE BOOKINGS SPOT-BY-ID USE EFFECT')
        dispatch(getBookingsCurrentUser())
        dispatch(getBookingsCurrentSpot(id))
    }, [dispatch, checkIn, checkOut])

    if (!currentUserId) return <div>Log in to create a booking!</div>
    if (!userBookings) return <div>Log in to create a booking!</div>

    const userBookingsArray = Object.values(userBookings)
    const userBookingsSpot = userBookingsArray.filter(booking => booking.spotId === Number(id))
    const spotBookingsArray = Object.values(spotBookings)



    const handleSubmit = async (e) => {
        e.preventDefault();

        let checkInDateUser = new Date(checkIn)
        let checkOutDateUser = new Date(checkOut)
        let bookingErrors = {}

        let today = new Date()
        for (let i = 0; i < spotBookingsArray.length; i++) {
            let existingStartDate = new Date(spotBookingsArray[i].startDate)
            let existingEndDate = new Date(spotBookingsArray[i].endDate)
            console.log(existingStartDate, 'start')
            console.log(existingEndDate, 'end')

            let existingStartDateErrors = String(existingStartDate).split(' ')
            let monthStartDateError = existingStartDateErrors[1]
            let dayStartDateError = existingStartDateErrors[2]
            let yearStartDateError = existingStartDateErrors[3]

            let existingEndDateErrors = String(existingEndDate).split(' ')
            let monthEndDateError = existingEndDateErrors[1]
            let dayEndDateError = existingEndDateErrors[2]
            let yearEndDateError = existingEndDateErrors[3]

            if (!checkIn) bookingErrors.checkIn = 'Select a check-in date'
            if (!checkOut) bookingErrors.checkOut = 'Select a check-out date'
            // start is in the past
            if (checkInDateUser.getTime() < today.getTime()) bookingErrors.past = ('You cannot select a date in the past')
            // end is before start
            if (checkInDateUser.getTime() > checkOutDateUser.getTime()) bookingErrors.future = ('Check-out must be after check-in')
            // start date inside of an existing booking
            if (checkInDateUser.getTime() >= existingStartDate.getTime() &&
                checkInDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.startConflict = ("This start date conflicts with an existing booking")
            }
            // end date inside of existing booking
            if (checkOutDateUser.getTime() >= existingStartDate.getTime() &&
                checkOutDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.endConflict = ("This end date conflicts with an existing booking")
            }
            // check in /checkout 'surround' existing booking
            if (checkInDateUser.getTime() <= existingStartDate.getTime() &&
                checkOutDateUser.getTime() >= existingEndDate.getTime()) {
                bookingErrors.conflict = (`These dates overlap with an existing booking`)
                //bookingErrors.conflict = (`Date Conflict: this property is booked between ${monthStartDateError} ${dayStartDateError} ${yearStartDateError}
                // and ${monthEndDateError} ${dayEndDateError} ${yearEndDateError}. Please try different dates`)
            }

            setErrors((errors) => errors = Object.values(bookingErrors))


            console.log('BOOKING ERRORS arr', bookingErrors)
            console.log('BOOKING ERRORS usestate', errors)

        }

        const bookingInfo = {

        }

        console.log('IN BOOKINGS HANDLE SUBMIT')

    }

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
                {/* {userBookingsSpot.length > 0 &&
                    <div className='user-booking-container'>
                        <div className='booking-title'> Your Bookings </div>
                        {userBookingsSpot.map((booking) =>
                            <div key={booking.id}>
                                <div>{`${dateParser(booking.startDate)[1]} ${dateParser(booking.startDate)[2]}, ${dateParser(booking.startDate)[0]} -
                        ${dateParser(booking.endDate)[1]} ${dateParser(booking.endDate)[2]}, ${dateParser(booking.endDate)[0]}`}
                                </div>
                            </div>
                        )}
                    </div>
                } */}

                {errors.length > 0 &&
                    <div className='errors-container'>
                        <div className='errors-title'> Sorry, there's a problem with your selection:</div>
                        <ul>
                            {errors.map((error, idx) =>
                                <div key={idx}>
                                    <li>{error}</li>
                                </div>
                            )}
                        </ul>
                    </div>
                }


                {currentUserId &&
                    <form onSubmit={handleSubmit} className='booking-container'>
                        <div className='booking-title'>Create a Booking</div>

                        <div className='price-stars'>
                            <div>${price} dollars per night</div>
                            <div>
                                <svg viewBox='0 0 32 32'>
                                    <path
                                        d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                        fillRule='evenodd'
                                    ></path>
                                </svg>
                                {rating}
                            </div>
                        </div>

                        <div className='check-dates-container'>
                            <div className='form-container'>
                                <div className='date-container'>
                                    <label>Check-in</label>
                                    <input type='date' className='date-input'
                                        value={checkIn} onChange={updateCheckIn}>
                                    </input>
                                </div>

                                <div className='date-container'>
                                    <label>Check-Out</label>
                                    <input type='date' className='date-input'
                                        value={checkOut} onChange={updateCheckOut}>
                                    </input>
                                </div>
                            </div>
                        </div>

                        <div className='subtotal'>
                            <div>dollars</div>
                            <div>nights</div>
                        </div>
                        <div className='total'>Total $</div>
                        <button type='submit' className='reserve'>Reserve</button>
                    </form>
                }
                {spotBookingsArray.length > 0 &&
                    <div className='spot-booking-container'>
                        <div className='booking-title'> All Bookings </div>
                        {spotBookingsArray.map((booking) =>
                            <div key={booking.id}>
                                <div>{`${dateParser(booking.startDate)[1]} ${dateParser(booking.startDate)[2]}, ${dateParser(booking.startDate)[0]} -
                        ${dateParser(booking.endDate)[1]} ${dateParser(booking.endDate)[2]}, ${dateParser(booking.endDate)[0]}`}
                                </div>
                            </div>
                        )}
                    </div>
                }

            </div>
        </>
    );
};

export default BookingsSpotId;
