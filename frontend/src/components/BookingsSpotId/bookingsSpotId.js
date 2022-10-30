import { useParams, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getBookingsCurrentUser } from '../../store/bookingsReducer';
import { getBookingsCurrentSpot } from '../../store/spotbookingsReducer';
import { createBooking } from '../../store/bookingsReducer';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

import './bookings.css'


const BookingsSpotId = ({ rating, price, id, showCalendar, setShowCalendar }) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector((state) => state?.session?.user?.id)
    const userBookings = useSelector((state) => (state?.bookings?.Bookings));
    const spotBookings = useSelector((state) => (state?.spotBookings?.Bookings));

    const [currentSelectedDate, setCurrentSelectedDate] = useState(new Date())
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [totalDays, setTotalDays] = useState(0)
    const [totalPrice, setTotalPrice] = useState('')
    const [checkInSelected, setCheckInSelected] = useState(false)
    const [checkOutSelected, setCheckOutSelected] = useState(false)
    const [calClick, setCalClick] = useState(false)
    // const [showCalendar, setShowCalendar] = useState(false)
    const [cleanUp, setCleanUp] = useState(false)
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [errors, setErrors] = useState('')


    // let buttonSelected = document.querySelectorAll('button.react-calendar__tile--active')
    // let testvar;
    // updateDate()
    // checkOutSetter()

    const updateSelectedDate = async (e) => { setCurrentSelectedDate(e) };
    const updateCheckInDate = (e) => setCheckInDate(e.target.value);
    const updateCheckOutDate = (e) => setCheckOutDate(e.target.value);

    let buttonSelected;
    let bothDatesSelected;
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
        if (checkInDate && checkOutDate) {
            selectCheckOutDate()
        }
        return setCleanUp(true)
    }, [dispatch, checkOut, showCalendar, calClick, currentSelectedDate, checkOutDate])

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

    // function updateDate() {
    //     testvar = currentSelectedDate
    //     onClicker()
    // }

    function updateButtonSelected() {
        buttonSelected = document.querySelectorAll('button.react-calendar__tile--active')
    }

    function onClicker() {
        let buttonSelected = document.querySelectorAll('button.react-calendar__tile--active')
        let checkedInElement = document.querySelector('input.date-input-checkin')
        let checkedOutElement = document.querySelector('input.date-input-checkout')
        updateButtonSelected()

        // if (bothDatesSelected === true) {
        //     // clear out checkout date
        //     console.log('both dates selected')
        //     let splitStrDate = String(currentSelectedDate).split(' ')
        //     let month = monthReverseParse(splitStrDate[1])
        //     let day = splitStrDate[2]
        //     let year = splitStrDate[3]
        //     if (checkedInElement) {
        //         checkedInElement.value = `${year}-${month}-${day}`
        //     }
        //     checkedOutElement.value = ''
        //     bothDatesSelected = false
        //     return
        // }

        //check in date
        // if (currentSelectedDate && buttonSelected.length === 0) {
        //     let splitStrDate = String(currentSelectedDate).split(' ')
        //     let month = monthReverseParse(splitStrDate[1])
        //     let day = splitStrDate[2]
        //     let year = splitStrDate[3]
        //     if (checkedInElement) {
        //         checkedInElement.value = `${year}-${month}-${day}`
        //     }
        // }

        // if (currentSelectedDate && buttonSelected && buttonSelected.length === 1) {
        //     let splitStrDate = String(currentSelectedDate).split(' ')
        //     let month = monthReverseParse(splitStrDate[1])
        //     let day = splitStrDate[2]
        //     let year = splitStrDate[3]
        //     if (checkedOutElement) {
        //         checkedOutElement.value = `${year}-${month}-${day}`
        //     }
        // }

        // if (checkedInElement && checkedOutElement && checkedInElement.value && checkedOutElement.value) {
        //     bothDatesSelected = true
        // }
    }

    function allDatesButtonsFxn() {
        allDatesButtons = document.querySelectorAll('button.react-calendar__tile.react-calendar__month-view__days__day')
        for (let i = 0; i < allDatesButtons.length; i++) {
            if (allDatesButtons[i]) {
                allDatesButtons[i].addEventListener('click', onClicker)
            }
        }
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

        console.log('inside checkout conditional')
        let totalDays = ((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / 86400000)
        console.log(totalDays, checkInDate, checkOutDate)
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

            // let existingStartDateErrors = String(existingStartDate).split(' ')
            // let monthStartDateError = existingStartDateErrors[1]
            // let dayStartDateError = existingStartDateErrors[2]
            // let yearStartDateError = existingStartDateErrors[3]

            // let existingEndDateErrors = String(existingEndDate).split(' ')
            // let monthEndDateError = existingEndDateErrors[1]
            // let dayEndDateError = existingEndDateErrors[2]
            // let yearEndDateError = existingEndDateErrors[3]

            if (!checkInDate) bookingErrors.checkIn = 'Select a check-in date'
            if (!checkOutDate) bookingErrors.checkOut = 'Select a check-out date'
            // start is in the past
            if (checkInDateUser.getTime() < today.getTime()) bookingErrors.past = ('You cannot select a date in the past')
            // end is before start
            if (checkInDateUser.getTime() > checkOutDateUser.getTime()) bookingErrors.future = ('Check-out must be after check-in')
            // start date inside of an existing booking
            if (checkInDateUser.getTime() >= existingStartDate.getTime() &&
                checkInDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.conflict = ("This start date conflicts with an existing booking")
            }
            // end date inside of existing booking
            if (checkOutDateUser.getTime() >= existingStartDate.getTime() &&
                checkOutDateUser.getTime() <= existingEndDate.getTime()) {
                bookingErrors.conflict = ("This end date conflicts with an existing booking")
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
            startDate: checkInDate,
            endDate: checkOutDate
        }

        if (bookingErrors.length === 0) {
            console.log('entering error length conditional')
            let createdBooking;
            createdBooking = await dispatch(createBooking(bookingInfo))
            await dispatch(getBookingsCurrentUser())
            await dispatch(getBookingsCurrentSpot(id))
            clearSelections()
        }
    }


    if (!userBookingsArray) return <div>Loading Bookings</div>
    return (
        <>
            <div>

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
                        <div className='booking-title'></div>
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
                            <div>${price} x {totalDays} nights</div>
                            {/* <div>{totalPrice}$</div> */}
                        </div>
                        <div className='total'>Total: ${totalPrice}</div>
                        <button type='submit' className='reserve'>Reserve</button>
                    </form>
                }

                <button onClick={() => setShowCalendar(!showCalendar)}>See this Spot's Bookings</button>
                {showCalendar &&
                    <>
                        <div className='react-calendar' onClick={() => calClicker()}>
                            <Calendar
                                onChange={updateSelectedDate}
                                value={currentSelectedDate}
                            />
                        </div>
                        <p>Current selected date is <b>{moment(currentSelectedDate).format('MMMM Do YYYY')}</b></p>
                        <button onClick={selectCheckInDate}>Set as Check-in Date</button>
                        <button onClick={selectCheckOutDate}>Set as Check-out Date</button>
                        <button onClick={clearSelections}>Clear Selections</button>
                    </>
                }
                {calendarDates()}
            </div>
        </>
    );
};

export default BookingsSpotId;
