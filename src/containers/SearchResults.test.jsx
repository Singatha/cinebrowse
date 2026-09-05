import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGetSearchMultiQuery } from '../services/media'
import SearchResults from './SearchResults'

vi.mock('../services/media', () => ({
  useGetSearchMultiQuery: vi.fn(),
}))

describe('SearchResults', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('links movie and TV results to the correct detail routes and ignores people', () => {
    useGetSearchMultiQuery.mockReturnValue({
      data: {
        total_pages: 5,
        results: [
          { id: 1, media_type: 'movie', title: 'A Movie', poster_path: '/movie.jpg', genre_ids: [28] },
          { id: 2, media_type: 'tv', name: 'A Series', poster_path: '/tv.jpg', genre_ids: [18] },
          { id: 3, media_type: 'person', name: 'An Actor', profile_path: '/person.jpg' },
        ],
      },
      error: undefined,
      isLoading: false,
    })

    render(
      <MemoryRouter initialEntries={['/search?q=star%20wars&page=3']}>
        <SearchResults />
      </MemoryRouter>,
    )

    expect(useGetSearchMultiQuery).toHaveBeenCalledWith({ keyword: 'star wars', page: 3 }, { skip: false })
    expect(screen.getByText('A Movie').closest('a')).toHaveAttribute('href', '/movies/1')
    expect(screen.getByText('A Series').closest('a')).toHaveAttribute('href', '/tv/2')
    expect(screen.queryByText('An Actor')).not.toBeInTheDocument()
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument()
  })

  it('shows an empty state when the query has no results', () => {
    useGetSearchMultiQuery.mockReturnValue({ data: { results: [] }, isLoading: false })

    render(
      <MemoryRouter initialEntries={['/search?q=unknown']}>
        <SearchResults />
      </MemoryRouter>,
    )

    expect(screen.getByText('No results found.')).toBeInTheDocument()
  })

  it('skips the request when no query is provided', () => {
    useGetSearchMultiQuery.mockReturnValue({})

    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchResults />
      </MemoryRouter>,
    )

    expect(useGetSearchMultiQuery).toHaveBeenCalledWith({ keyword: '', page: 1 }, { skip: true })
    expect(screen.getByText(/enter a movie or TV series/i)).toBeInTheDocument()
  })
})
