import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useParams } from "react-router-dom"
import { useGetMovieByIDQuery, useGetTVByIDQuery } from "../services/media"
import Error from "../components/Error"
import Loading from "../components/Loading"
import { formatTime, formatGenresByName } from "../utils/utils"
import moment from "moment"
import SimilarTv from "./Tv/SimilarTv"
import SimilarMovies from "./Movies/SimilarMovies"

const MediaDetail = () => {
  const { mediaID, mediaType } = useParams()
  const isTV = mediaType === 'tv'
  const movieResult = useGetMovieByIDQuery(mediaID, { skip: isTV })
  const tvResult = useGetTVByIDQuery(mediaID, { skip: !isTV })
  const { data, error, isLoading } = isTV ? tvResult : movieResult

  const releaseDate = data?.first_air_date || data?.release_date
  const runtime = data?.runtime ?? data?.episode_run_time?.[0]
  const formattedDate = releaseDate && moment(releaseDate).isValid()
    ? moment(releaseDate).format('ll')
    : 'Not available'
  
  if (error){
    return <Error error={error} />
  } else if (isLoading){
    return <Loading/>
  } else {
    return (
      <div className="media-detail">
        <Navbar />
        <div className="media-detail__wrapper">
          <img className="media-detail__img" src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alt={`${data.title ?? data.name ?? 'Media'} poster`}/>
          <div className="media-detail__content">
            <p className="media-detail__text media-detail__title">{data.title ?? data.name ?? data.original_title ?? data.original_name}</p>
            <p className="media-detail__text media-detail__genre">{formatGenresByName(data.genres)}</p>
            <p className="media-detail__text media-detail__date"><span className="media-detail__text--bold">Date: </span>{formattedDate}</p>
            <p className="media-detail__text media-detail__duration"><span className="media-detail__text--bold">Duration: </span>{formatTime(runtime)}</p>
            <p className="media-detail__text media-detail__overview"><span className="media-detail__text--bold">Overview: </span>{data.overview}</p>
          </div>
        </div>

        <h3 className="media-detail__similar-title media-detail__similar-title--shift">You may also like</h3>
        {
          isTV ? <SimilarTv tvID={mediaID}/> : <SimilarMovies movieID={mediaID}/>
        }

        <Footer />
      </div>
    )
  }
}
  
export default MediaDetail
