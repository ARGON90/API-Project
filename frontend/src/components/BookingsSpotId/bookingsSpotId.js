import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import { getBookingsCurrentSpot } from '../../store/spotbookingsReducer';
import { createBooking } from '../../store/bookingsReducer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import './bookings.css'


const BookingsSpotId = ({ rating, price, id }) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));
    const spotBookings = useSelector((state) => (state?.spotBookings?.Bookings));

    const [checkInDate, setCheckInDate] = useState(new Date())
    const [checkOutDate, setCheckOutDate] = useState(new Date())
    const [checkInSelected, setCheckInSelected] = useState(false)
    const [checkOutSelected, setCheckOutSelected] = useState(false)
    const [calClick, setCalClick] = useState(false)
    const [showCalendar, setShowCalendar] = useState(false)
    const [cleanUp, setCleanUp] = useState(false)
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [errors, setErrors] = useState('')

    let testvar;
    console.log(checkInDate, 'checkin date outside', updateDate())

    const updateCheckInDate = async (e) => { setCheckInDate(e) };
    const updateCheckIn = (e) => setCheckIn(e.target.value);
    const updateCheckOut = (e) => setCheckOut(e.target.value);

    let spotBookingsArray;
    let allDatesButtons;
    useEffect(() => {
        if (cleanUp) {
            if (!spotBookings) {
                return 'Spot Bookings Issue'
            }
        }
        dispatch(getBookingsCurrentUser())
        dispatch(getBookingsCurrentSpot(id))
        calendarDates()
        allDatesButtonsFxn()
        return setCleanUp(true)
    }, [dispatch, checkOut, showCalendar, calClick, checkInDate])

    if (!currentUserId) return <div>Log in to create a booking!</div>
    if (!userBookings) return <div>Log in to create a booking!</div>
    if (!spotBookings) return <div>Spot Bookings Issue</div>

    const userBookingsArray = Object.values(userBookings)
    const userBookingsSpot = userBookingsArray.filter(booking => booking?.spotId === Number(id))
    spotBookingsArray = Object.values(spotBookings)

    function calClicker() {
        setCalClick(!calClick)
        calendarDates()
    }

    function selectDates() {
        return 'hi'
    }

    function updateDate() {
        testvar = checkInDate
        onClicker()
    }

    function onClicker() {

        if (testvar) {
            console.log(testvar, 'testvar')
            let testEl = document.querySelector('input.date-input-checkin')

            let splitStrDate = String(testvar).split(' ')

            function monthReverseParse(str) {
                console.log(str)
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

            let month = monthReverseParse(splitStrDate[1])
            console.log('month', month)
            let day = splitStrDate[2]
            let year = splitStrDate[3]
            if (testEl) {
                testEl.value = `${year}-${month}-${day}`
            }
        }
    }

    function allDatesButtonsFxn() {
        allDatesButtons = document.querySelectorAll('button.react-calendar__tile.react-calendar__month-view__days__day')
        for (let i = 0; i < allDatesButtons.length; i++) {
            if (allDatesButtons[i]) {
                allDatesButtons[i].addEventListener('click', onClicker)
            }
        }
        // allDatesButtons = document.querySelector('div.react-calendar__month-view__days')
        // if (allDatesButtons) {
        //     allDatesButtons.addEventListener('click', onClicker)
        // }
    }


    function calendarDates() {
        if (!spotBookingsArray) {
            return null
        }
        let classStyler = spotBookingsArray.map((el) => {
            let startDateArr = (dateParser(el.startDate))
            let endDateArr = (dateParser(el.endDate))
            let startDate = el.startDate
            let startDay = startDateArr[2]
            let endDay = endDateArr[2]
            let totalDays = Number(endDay) - Number(startDay)

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let checkInDateUser = new Date(checkIn)
        let checkOutDateUser = new Date(checkOut)
        let bookingErrors = {}

        let today = new Date()
        for (let i = 0; i < spotBookingsArray.length; i++) {
            let existingStartDate = new Date(spotBookingsArray[i].startDate)
            let existingEndDate = new Date(spotBookingsArray[i].endDate)

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
        }

        const bookingInfo = {
            spotId: id,
            userId: currentUserId,
            startDate: checkIn,
            endDate: checkOut
        }

        if (errors.length === 0) {
            let createdBooking;
            createdBooking = await dispatch(createBooking(bookingInfo))
            await dispatch(getBookingsCurrentUser())
            await dispatch(getBookingsCurrentSpot(id))
        }
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
                                    <input type='date' className='date-input-checkin'
                                        //value={checkIn} onChange={updateCheckIn}
                                        >
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
                        <div className='booking-title'> This Spot's Bookings </div>
                        {spotBookingsArray.map((booking) =>
                            <div key={booking.id}>
                                <div>{`${dateParser(booking.startDate)[1]} ${dateParser(booking.startDate)[2]}, ${dateParser(booking.startDate)[0]} -
                        ${dateParser(booking.endDate)[1]} ${dateParser(booking.endDate)[2]}, ${dateParser(booking.endDate)[0]}`}
                                </div>
                            </div>
                        )}
                    </div>
                }

                <button onClick={() => setShowCalendar(!showCalendar)}>See this Spot's Bookings</button>
                {showCalendar &&
                    <div className='react-calendar' onClick={() => calClicker()}>
                        <Calendar
                            onChange={updateCheckInDate}
                        />
                    </div>
                }

                <div>hi{allDatesButtons}</div>
                {calendarDates()}
            </div>
        </>
    );
};

export default BookingsSpotId;
