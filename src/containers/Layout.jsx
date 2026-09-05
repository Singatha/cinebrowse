import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Series from "./Tv/Series"
import UpcomingMovies from "./Movies/UpcomingMovies"
import PopularMovies from "./Movies/PopularMovies"
import Loading from "../components/Loading"
import Error from "../components/Error"
import Carousel from 'react-bootstrap/Carousel'
import { useGetTopRatedMoviesQuery } from "../services/media"
import { formatGenresByID } from "../utils/utils"

const Layout = () => {
    const { data, error, isLoading } = useGetTopRatedMoviesQuery()

    if (error){
        return <Error error={error} />
    } else if (isLoading){
        return <Loading />
    } else {
        return (
            <div className="home-layout">
                <Navbar className="overlay" />
                <Carousel>
                    {
                        data.results.map((movie) => {
                            return (
                                <Carousel.Item className="home-layout__carousel-item" key={movie.id}>
                                    <img
                                        className="d-block w-100"
                                        src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                                        alt={`${movie.title ?? movie.original_title} backdrop`}
                                    />
                                    <Carousel.Caption className="home-layout__carousel-caption">
                                        <h1 className="home-layout__movie-title">{movie.title ?? movie.original_title}</h1>
                                        <p className="home-layout__sub-title">{formatGenresByID(movie.genre_ids)}</p>
                                        <h3 className="home-layout__text">{movie.overview}</h3>             
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>

                <h3 className="home-layout__title">Upcoming</h3>
                <UpcomingMovies />

                <h3 className="home-layout__title">Popular</h3>
                <PopularMovies />

                <h3 className="home-layout__title">TV Series</h3>
                <Series />

                <Footer />
            </div>
        )
    }
}
    
export default Layout
