import { Link } from "react-router-dom"
import MediaCard from "../components/MediaCard"
import NoResults from "../components/NoResults"
import PropTypes from 'prop-types'
import Slider from "react-slick"
import { SLIDER_SETTINGS } from "../utils/constants"

const MediaList = ({ data, isSlider, mediaType }) => {
    const results = (data?.results ?? []).filter((media) => {
        const resultType = mediaType ?? media.media_type
        return resultType === 'movies' || resultType === 'movie' || resultType === 'tv'
    })

    const renderMedia = (media) => {
        const resultType = mediaType ?? media.media_type
        const routeType = resultType === 'movie' ? 'movies' : resultType

        return (
            <div className="media-list__item" key={`${resultType}-${media.id}`}>
                <Link className="media-list__link" to={`/${routeType}/${media.id}`}>
                    <MediaCard media={media} />
                </Link>
            </div>
        )
    }

    if (results.length === 0) {
        return <NoResults />
    }

    return (
        <>
            {
                !isSlider ? (
                    <div className="media-list__content">
                        {
                            results.map(renderMedia)
                        }
                    </div>
                ):
                (
                    <div className="media-list__slider">
                        <Slider {...SLIDER_SETTINGS}>
                            {
                                results.map(renderMedia)
                            }
                        </Slider>
                    </div>
                )
            }
        </>
    )
}

MediaList.propTypes = {
    data: PropTypes.shape({
        results: PropTypes.array,
    }),
    isSlider: PropTypes.bool,
    mediaType: PropTypes.string,
}

export default MediaList
