import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGetMovieByIDQuery, useGetTVByIDQuery } from '../services/media'
import MediaDetail from './MediaDetail'

vi.mock('../services/media', () => ({
  useGetMovieByIDQuery: vi.fn(),
  useGetTVByIDQuery: vi.fn(),
}))

vi.mock('../components/Navbar', () => ({ default: () => <nav>Navigation</nav> }))
vi.mock('../components/Footer', () => ({ default: () => <footer>Footer</footer> }))
vi.mock('./Movies/SimilarMovies', () => ({ default: () => <div>Similar movies</div> }))
vi.mock('./Tv/SimilarTv', () => ({ default: () => <div>Similar TV series</div> }))

const renderDetail = (path) => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/:mediaType/:mediaID" element={<MediaDetail />} />
    </Routes>
  </MemoryRouter>,
)

describe('MediaDetail', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    useGetMovieByIDQuery.mockReturnValue({ isLoading: true })
    useGetTVByIDQuery.mockReturnValue({ isLoading: true })
  })

  it('loads and displays movie details', () => {
    useGetMovieByIDQuery.mockReturnValue({
      data: {
        title: 'Arrival',
        poster_path: '/arrival.jpg',
        genres: [{ name: 'Science Fiction' }],
        release_date: '2016-11-11',
        runtime: 116,
        overview: 'A linguist meets mysterious visitors.',
      },
      isLoading: false,
    })

    renderDetail('/movies/10')

    expect(useGetMovieByIDQuery).toHaveBeenCalledWith('10', { skip: false })
    expect(useGetTVByIDQuery).toHaveBeenCalledWith('10', { skip: true })
    expect(screen.getByText('Arrival')).toBeInTheDocument()
    expect(screen.getByText(/Nov 11, 2016/)).toBeInTheDocument()
    expect(screen.getByText(/1h 56min/)).toBeInTheDocument()
    expect(screen.getByText('Similar movies')).toBeInTheDocument()
  })

  it('uses the TV endpoint and episode runtime for a TV detail page', () => {
    useGetTVByIDQuery.mockReturnValue({
      data: {
        name: 'Dark',
        poster_path: '/dark.jpg',
        genres: [{ name: 'Drama' }],
        first_air_date: '2017-12-01',
        episode_run_time: [60],
        overview: 'A mystery spans several generations.',
      },
      isLoading: false,
    })

    renderDetail('/tv/20')

    expect(useGetMovieByIDQuery).toHaveBeenCalledWith('20', { skip: true })
    expect(useGetTVByIDQuery).toHaveBeenCalledWith('20', { skip: false })
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText(/Dec 1, 2017/)).toBeInTheDocument()
    expect(screen.getByText(/1h/)).toBeInTheDocument()
    expect(screen.getByText('Similar TV series')).toBeInTheDocument()
  })

  it('shows fallbacks when date and runtime are unavailable', () => {
    useGetMovieByIDQuery.mockReturnValue({
      data: {
        title: 'Untimed Movie',
        poster_path: '/untimed.jpg',
        genres: [],
        overview: 'No timing metadata.',
      },
      isLoading: false,
    })

    renderDetail('/movies/30')

    expect(screen.getAllByText('Not available')).toHaveLength(2)
  })
})
