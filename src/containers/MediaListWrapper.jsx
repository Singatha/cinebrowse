import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useParams } from "react-router-dom"
import ListSelector from "./ListSelector"

const MediaListWrapper = () => {
  const { mediaType } = useParams()

  return (
    <div className="media-list">
      <Navbar />
      <ListSelector listName={mediaType} />
      <Footer />
    </div>
  )
}
    
export default MediaListWrapper
