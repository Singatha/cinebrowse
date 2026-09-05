import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import SearchResults from "./SearchResults"

const SearchPage = () => {
  return (
    <div className="media-list">
      <Navbar />
      <main>
        <SearchResults />
      </main>
      <Footer />
    </div>
  )
}

export default SearchPage
