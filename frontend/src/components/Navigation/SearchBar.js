import { useState } from "react"
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import './Navigation.css'

const SearchBar = ({ setSearchBar, filterSpots, setFilterSpots }) => {

    const history = useHistory()
    const spots = useSelector(state => state?.spots)

    const [searchable, setSearchable] = useState('')

    useEffect(() => {
        if (!searchable) return;

        const closeMenu = () => {
          clearInput();
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [searchable, filterSpots]);


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
                <div className="search-input-div">
                    <input
                        type='text'
                        value={searchable}
                        onChange={handleSpotFilter}
                        placeholder='Search Spots by City, State, or Title'
                    />
                    <div className="icon"><ion-icon name="search"></ion-icon></div>
                </div>
            </form>
            {filterSpots.length > 0 &&
                <span className='searchClear'>
                    <button className="buttonClear"
                        onClick={searchable.length ? clearInput : () => setSearchBar(false)}
                    > <ion-icon name="close"></ion-icon> </button>
                </span>
            }

            <div className='bookResultsDiv'>
                {filterSpots && (
                    filterSpots.slice(0, 3).map((spot, idx) => (
                        <NavLink onClick={() => clearInput()} to={`/spots/${spot.id}`} className="bookSearchList">
                            <div className='searchBookBarResult'
                                key={idx}
                                onClick={() => setSearchBar(false)}>
                                <div className="search-city-state">
                                    <div className="searchBarTitle">{spot.name}<br></br></div>
                                    <div className='searchBarAuthor'> {spot.city}, {spot.state}</div>
                                    <div className="srch-stars">
                                        <svg viewBox='0 0 32 32'>
                                            <path
                                                d='M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.852a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.997a1 1 0 0 0 1.482-1.06l-1.965-9.853 7.293-6.565a1 1 0 0 0-.541-1.735l-9.86-1.271-4.127-8.885a1 1 0 0 0-1.814 0z'
                                                fillRule='evenodd'
                                            ></path>
                                        </svg>
                                        <div className='searchBarAuthor'> {spot.avgRating}</div>
                                    </div>
                                    <div className='searchBarAuthor'> ${spot.price}/night</div>
                                </div>
                                <div className="img-div">
                                    <img className="srch-img" src={spot.previewImage}></img>
                                </div>
                            </div>
                        </NavLink>
                    ))
                )}
            </div>
        </div>
    )
}

export default SearchBar
