import { useGetSearchMultiQuery } from "../services/media"
import Error from "../components/Error"
import Loading from "../components/Loading"
import MediaList from "./MediaList"
import NoResults from "../components/NoResults"
import Pagination from "../components/Pagination"
import { useUrlPage } from "../hooks/useUrlPage"

const SearchResults = () => {
    const { page, searchParams, setPage } = useUrlPage()
    const searchString = (searchParams.get('q') ?? '').trim()
    const { data, error, isLoading } = useGetSearchMultiQuery({ keyword: searchString, page }, {
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
        return (<>
            <MediaList data={data} isSlider={false} />
            <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={setPage} />
        </>)
    }
}

export default SearchResults
