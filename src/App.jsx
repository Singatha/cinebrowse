import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./containers/Layout"
import MediaDetail from "./containers/MediaDetail"
import MediaListWrapper from "./containers/MediaListWrapper"
import PageNotFound from "./containers/PageNotFound"
import SearchPage from "./containers/SearchPage"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Layout />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/:mediaType/:mediaID" element={<MediaDetail />} />
        <Route path="/list/:mediaType" element={<MediaListWrapper />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
