import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import { getBookingsCurrentSpot } from '../../store/spotbookingsReducer';
import { createBooking } from '../../store/bookingsReducer';
import { editBookingThunk } from '../../store/bookingsReducer';
import { editBookingThunkSpot } from '../../store/spotbookingsReducer';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

import './bookingsEditCalendar.css'


const BookingsSpotEdit = ({ rating, price, id, bookingId }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));
    const spotBookings = useSelector((state) => (state?.spotBookings?.Bookings));

    const [showCalendar, setShowCalendar] = useState(true)
    const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date())
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [totalDays, setTotalDays] = useState(0)
    const [totalPrice, setTotalPrice] = useState('')
    const [calClick, setCalClick] = useState(false)
    const [cleanUp, setCleanUp] = useState(false)
    const [errors, setErrors] = useState('')

    const updateSelectedDate = async (e) => { setCurrentSelectedDate(e) };
    const updateCheckInDate = (e) => setCheckInDate(e.target.value);
    const updateCheckOutDate = (e) => setCheckOutDate(e.target.value);

    let spotBookingsArray;
    useEffect(() => {
        if (cleanUp) {
            if (!spotBookings) {
                return 'Spot Bookings Issue'
            }
        }
        dispatch(getBookingsCurrentUser())
        dispatch(getBookingsCurrentSpot(id))
        calendarDates()
        if (checkInDate && checkOutDate) {
            selectCheckOutDate()
        }
        return setCleanUp(true)
    }, [dispatch, showCalendar, calClick, currentSelectedDate, checkOutDate])

    if (!currentUserId) return <div className='create-booking-login'>Log in to create a booking!</div>
    if (!userBookings) return <div className='create-booking-login'>Log in to create a booking!</div>
    if (!spotBookings) return <div className='create-booking-login'>Spot Bookings Issue</div>

    const userBookingsArray = Object.values(userBookings)
    const userBookingsSpot = userBookingsArray.filter(booking => booking?.spotId === Number(id))
    spotBookingsArray = Object.values(spotBookings)

    function calClicker() {
        setCalClick(!calClick)
        calendarDates()
    }

    function calendarDates() {
        if (!spotBookingsArray) {
            return null
        }
        spotBookingsArray.map((el) => {
            let totalDays = ((new Date(el.endDate).getTime() - new Date(el.startDate).getTime()) / 86400000)
            let startDate = el.startDate

            for (let i = 0; i <= totalDays; i++) {
                let startDateMarker = new Date(startDate)
                startDateMarker.setTime(startDateMarker.getTime() + (86400000 * (i + 1)))
                let dateStr = String(startDateMarker)
                let dateStrArray = dateStr.split(' ')
                let day = dayParser(dateStrArray[2])
                let month = monthParser(dateStrArray[1])
                let year = dateStrArray[3]
                let dateString = `${month} ${day}, ${year}`
                let dateQueryInput = `[aria-label="${dateString}"]`
                let endElement = document?.querySelector(dateQueryInput)
                if (endElement) {
                    endElement.className = 'pink'
                }
            }
        })
    }

    function selectCheckInDate() {
        if ((new Date(currentSelectedDate)).getTime() >= (new Date(checkOutDate)).getTime()) return alert('Check-in date must be before check-out date!')
        setCheckInDate(dateParserForInput(currentSelectedDate))
    }


    async function selectCheckOutDate() {
        if (!checkInDate) return alert('Please select a check-in date first!')
        if ((new Date(checkInDate)).getTime() >= (new Date(checkOutDate)).getTime()) {
            clearSelections()
            return alert('Check-out date must be after check-in date!')
        }
        setCheckOutDate(dateParserForInput(currentSelectedDate))

        let totalDays = ((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / 86400000)
        if (!totalDays) return
        setTotalDays(totalDays)
        setTotalPrice(Number(price) * totalDays)

    }

    function monthReverseParse(str) {
        let obj = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12",

        }
        return obj[str]
    }

    function monthParser(month) {
        if (month === 'Oct') return "October"
        if (month === 'Nov') return "November"
        if (month === 'Dec') return "December"
        if (month === 'Jan') return "January"
        if (month === 'Feb') return "February"
        if (month === 'Mar') return "March"
        if (month === 'Apr') return "April"
        if (month === 'May') return "May"
        if (month === 'Jun') return "June"
        if (month === 'Jul') return "July"
        if (month === 'Aug') return "August"
        if (month === 'Sep') return "September"
    }

    function dayParser(day) {
        if (day === '01') return '1'
        if (day === '02') return '2'
        if (day === '03') return '3'
        if (day === '04') return '4'
        if (day === '05') return '5'
        if (day === '06') return '6'
        if (day === '07') return '7'
        if (day === '08') return '8'
        if (day === '09') return '9'
        else {
            return day
        }
    }

    function dateParserForInput(str) {
        str = String(str)
        let dateArray = str.split(' ')
        let month = monthReverseParse(dateArray[1])
        let day = dateArray[2]
        let year = dateArray[3]
        return `${year}-${month}-${day}`

    }

    function clearSelections() {
        setCheckOutDate('');
        setCheckInDate('');
        setTotalPrice(0);
        setTotalDays(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let checkInDateUser = new Date(checkInDate)
        let checkOutDateUser = new Date(checkOutDate)
        let bookingErrors = {}

        let today = new Date()
        for (let i = 0; i < spotBookingsArray.length; i++) {
            let existingStartDate = new Date(spotBookingsArray[i].startDate)
            let existingEndDate = new Date(spotBookingsArray[i].endDate)

            if (!checkInDate) bookingErrors.checkIn = 'Select a check-in date'
            if (!checkOutDate) bookingErrors.checkOut = 'Select a check-out date'
            // start is in the past
            if (checkInDateUser.getTime() < today.getTime()) bookingErrors.past = ('You cannot select a date in the past')
            // end is before start
            if (checkInDateUser.getTime() > checkOutDateUser.getTime()) bookingErrors.future = (`Check-out (${checkOutDate}) must be after check-in (${checkInDate})`)
            // start date inside of an existing booking
            if (checkInDateUser.getTime() >= existingStartDate.getTime() &&
                checkInDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.conflict = (`This start date (${checkInDate}) conflicts with an existing booking`)
            }
            // end date inside of existing booking
            if (checkOutDateUser.getTime() >= existingStartDate.getTime() &&
                checkOutDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.conflict = (`This end date (${checkInDate}) conflicts with an existing booking`)
            }
            // check in /checkout 'surround' existing booking
            if (checkInDateUser.getTime() <= existingStartDate.getTime() &&
                checkOutDateUser.getTime() >= existingEndDate.getTime()) {
                bookingErrors.conflict = (`These dates (${checkInDate} - ${checkOutDate}) overlap with an existing booking`)
            }
            setErrors((errors) => errors = Object.values(bookingErrors))
        }

        clearSelections()

        const bookingInfo = {
            spotId: id,
            userId: currentUserId,
            startDate: checkInDate,
            endDate: checkOutDate
        }
        let editedBooking;
        let editedBookingSpot
        if (Object.values(bookingErrors).length === 0) {

            await dispatch(getBookingsCurrentUser())
            await dispatch(getBookingsCurrentSpot(id))
            await dispatch(editBookingThunk(bookingId, bookingInfo))
            // editedBookingSpot = await dispatch(editBookingThunkSpot(bookingId, bookingInfo))
            alert ('Bookig Successfully Updated!')
            clearSelections()
            history.push('/bookings/')
        }

    }

    function totalPriceFormatter() {
        if (totalPrice) {

            return `$${totalPrice}`
        }
    }


    if (!userBookingsArray) return <div>Loading Bookings</div>
    return (

        <div className='edit-cal-page'>

            <div className='dates-errors-container'>

                <div className='dates-form'>
                    <form onSubmit={handleSubmit} className='booking-container'>
                        <div className='price-stars'>
                            <div className='price-div'>
                                <div className='price-number'>${price}</div>
                                <div>/ night</div>
                            </div>
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
                                    <input type='text' className='date-input-checkin'
                                        onChange={updateCheckInDate}
                                        value={checkInDate}
                                        placeholder='yyyy-mm-dd'
                                    >
                                    </input>
                                </div>

                                <div className='date-container'>
                                    <label>Check-Out</label>
                                    <input type='text' className='date-input-checkout'
                                        onChange={updateCheckOutDate}
                                        value={checkOutDate}
                                        placeholder='yyyy-mm-dd'
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>

                        <div className='subtotal'>
                            <div className='prices'>
                                <div>${price} x {totalDays} nights</div>
                                <div className='total-container'>
                                    <div className='total'>Total:</div>
                                    <div className='bold'>{totalPriceFormatter()}</div>
                                </div>
                            </div>
                            <button type='submit' className='reserve-button'>Edit</button>
                        </div>

                    </form>
                </div>

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

            </div>

            <div className='react-calendar-edit' onClick={() => calClicker()}>
                <div className='calendar-container-edit'>
                    <Calendar
                        onChange={updateSelectedDate}
                        value={currentSelectedDate}
                    />
                    <p>Selected Date: <b>{moment(currentSelectedDate).format('MMMM Do YYYY')}</b></p>
                    <div className='check-in-out-buttons-edit'>
                        <button className='calendar-btns-edit' onClick={selectCheckInDate}>Set as Check-in</button>
                        <button className='calendar-btns-edit' onClick={selectCheckOutDate}>Set as Check-out</button>
                        <button className='calendar-btns-edit' onClick={clearSelections}>Clear Selections</button>
                    </div>
                </div>
            </div>


            {calendarDates()}
        </div>

    );
};

export default BookingsSpotEdit;
