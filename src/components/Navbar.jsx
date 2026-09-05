import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'

const Navbar = ({ className }) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') ?? ''
    const [inputValue, setInputValue] = useState(query)

    useEffect(() => {
        setInputValue(query)
    }, [query])

    const handleSubmit = (event) => {
        event.preventDefault()
        const trimmedSearch = inputValue.trim()

        if (trimmedSearch) {
            navigate(`/search?q=${encodeURIComponent(trimmedSearch)}`)
        }
    }
    
    return (
        <nav className={className ? `navbar navbar--${className}` : 'navbar'} aria-label="Main navigation">
            <div className="navbar__link-wrapper">
                <Link className="navbar__link navbar__link--hovered" to="/">Home</Link>
                <Link className="navbar__link navbar__link--hovered" to="/list/tv">TV Series</Link>
                <Link className="navbar__link navbar__link--hovered" to="/list/movies">Movies</Link>
            </div>
            <form className="navbar__form" onSubmit={handleSubmit}>
                <label className="visually-hidden" htmlFor="media-search">Search for a movie or TV series</label>
                <input id="media-search" className="navbar__input navbar__input--focused" type="search" placeholder="Search Movie or TV Series" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="navbar__btn navbar__btn--hovered" type="submit">Search</button>
            </form>
        </nav>
    )
}

Navbar.propTypes = {
    className: PropTypes.string,
}

export default Navbar
