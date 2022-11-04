import { useState } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './Navigation.css'

const SearchBar = ({ setSearchBar, filterSpots, setFilterSpots }) => {

    const history = useHistory()
    const spots = useSelector(state => state?.spots)
    
    const [searchable, setSearchable] = useState('')

    const handleSpotFilter = (keyword) => {
        const findSpot = keyword.target.value
        setSearchable(findSpot)
        const findTitle = Object.values(spots).filter(spot => {
            return ((spot.city.toLowerCase().includes(findSpot.toLowerCase())) || spot.state.toLowerCase().includes(findSpot.toLowerCase()) || spot.name.toLowerCase().includes(findSpot.toLowerCase()))
        })
        if (findSpot === '') {
            setFilterSpots([])
        }
        else {
            setFilterSpots(findTitle)
        }
    }

    const handleSubmit = () => {
        history.push(`/books/${searchable}`)
        setFilterSpots([])
        setSearchable('')
        setSearchBar(false)
    }

    const clearInput = () => {
        setFilterSpots([])
        setSearchable('')
    }

    return (
        <div className='searchBarDiv'>
            <form className='searchBarInput'
                onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={searchable}
                    onChange={handleSpotFilter}
                    placeholder='Search Spots by City, State, or Title'
                />
            </form>
            {filterSpots.length > 0 &&
                <span className='searchClear'>
                    <button className="buttonClear"
                        onClick={searchable.length ? clearInput : () => setSearchBar(false)}
                    > X </button>
                </span>
            }

            <div className='bookResultsDiv'>
                {filterSpots && (
                    filterSpots.slice(0, 5).map((spot, idx) => (
                        <NavLink onClick={() => clearInput()} to={`/spots/${spot.id}`} className="bookSearchList">
                            <div className='searchBookBarResult'
                                key={idx}
                                onClick={() => setSearchBar(false)}>
                                <div className="searchBarTitle">{spot.name}<br></br></div>
                                <div className='searchBarAuthor'> {spot.city}, {spot.state}</div>
                            </div>
                        </NavLink>
                    ))
                )}
            </div>
        </div>
    )
}

export default SearchBar
