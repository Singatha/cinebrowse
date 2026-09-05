import PropTypes from 'prop-types'

const NoResults = ({ message = 'No results found.' }) => {
    return (
        <div className="no-results">
            <p className="no-results__text">{message}</p>
        </div>
    )
}

NoResults.propTypes = {
    message: PropTypes.string,
}

export default NoResults
