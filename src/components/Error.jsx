import Alert from 'react-bootstrap/Alert'
import PropTypes from 'prop-types'

const Error = ({ error }) => {
    const message = error?.data?.status_message
        ?? error?.error
        ?? 'Something went wrong while loading this content. Please try again.'

    return (
        <Alert className="error-alert" variant="danger">
            <Alert.Heading className="error-alert__title">Oh snap! You got an error!</Alert.Heading>
            <p className="error-alert__description">{message}</p>
        </Alert>
    )
}

Error.propTypes = {
    error: PropTypes.object,
}

export default Error
