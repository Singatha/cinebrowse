import { useGetTVQuery } from "../../services/media"
import Error from "../../components/Error"
import Loading from "../../components/Loading"
import MediaList from "../MediaList"
import Pagination from "../../components/Pagination"
import PropTypes from 'prop-types'

const TVList = ({ page = 1, onPageChange }) => {
    const { data, error, isLoading } = useGetTVQuery(page);

    if (error){
        return <Error error={error} />
    } else if (isLoading){
        return <Loading/>
    } else {
        return (<>
            <MediaList data={data} isSlider={false} mediaType="tv" />
            {onPageChange && <Pagination currentPage={page} totalPages={data.total_pages} onPageChange={onPageChange} />}
        </>)
    }
}

TVList.propTypes = {
    page: PropTypes.number,
    onPageChange: PropTypes.func,
}

export default TVList
