import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGetMovieQuery, useGetTVQuery } from '../services/media'
import MediaListWrapper from './MediaListWrapper'

vi.mock('../services/media', () => ({
  useGetMovieQuery: vi.fn(),
  useGetTVQuery: vi.fn(),
}))

vi.mock('../components/Navbar', () => ({ default: () => <nav>Navigation</nav> }))
vi.mock('../components/Footer', () => ({ default: () => <footer>Footer</footer> }))

const CurrentLocation = () => {
  const location = useLocation()
  return <output aria-label="current location">{`${location.pathname}${location.search}`}</output>
}

const renderListRoute = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route
        path="/list/:mediaType"
        element={<><MediaListWrapper /><CurrentLocation /></>}
      />
    </Routes>
  </MemoryRouter>,
)

describe('MediaListWrapper pagination', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    useGetMovieQuery.mockReturnValue({
      data: {
        total_pages: 5,
        results: [{ id: 1, title: 'Movie Result', poster_path: '/movie.jpg', genre_ids: [] }],
      },
      isLoading: false,
    })
    useGetTVQuery.mockReturnValue({
      data: {
        total_pages: 4,
        results: [{ id: 2, name: 'TV Result', poster_path: '/tv.jpg', genre_ids: [] }],
      },
      isLoading: false,
    })
  })

  it('reads and updates the movie page in the URL', async () => {
    const user = userEvent.setup()
    renderListRoute('/list/movies?page=3')

    expect(useGetMovieQuery).toHaveBeenCalledWith(3)
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next' }))

    await waitFor(() => expect(useGetMovieQuery).toHaveBeenCalledWith(4))
    expect(screen.getByLabelText('current location')).toHaveTextContent('/list/movies?page=4')
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
  })

  it('passes the URL page to the TV query', () => {
    renderListRoute('/list/tv?page=2')

    expect(useGetTVQuery).toHaveBeenCalledWith(2)
    expect(screen.getByText('Page 2 of 4')).toBeInTheDocument()
  })
})
