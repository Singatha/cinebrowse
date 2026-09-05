import { useGetSearchMultiQuery } from "../services/media"
import { useSearchParams } from "react-router-dom"
import Error from "../components/Error"
import Loading from "../components/Loading"
import MediaList from "./MediaList"
import NoResults from "../components/NoResults"

const SearchResults = () => {
    const [searchParams] = useSearchParams()
    const searchString = (searchParams.get('q') ?? '').trim()
    const { data, error, isLoading } = useGetSearchMultiQuery(searchString, {
        skip: !searchString,
    })

    if (!searchString) {
        return <NoResults message="Enter a movie or TV series to begin searching." />
    }
    
    if (error){
        return <Error error={error} />
    } else if (isLoading){
        return <Loading />
    } else {
        return (
            <MediaList data={data} isSlider={false} />
        )
    }
}

export default SearchResults
