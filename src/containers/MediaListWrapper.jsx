import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import ListSelector from "./ListSelector"
import { useUrlPage } from "../hooks/useUrlPage"

const MediaListWrapper = () => {
  const { mediaType } = useParams()
  const { page, setPage } = useUrlPage()

  return (
    <div className="media-list">
      <Navbar />
      <ListSelector listName={mediaType} page={page} onPageChange={setPage} />
      <Footer />
    </div>
  )
}
    
export default MediaListWrapper
