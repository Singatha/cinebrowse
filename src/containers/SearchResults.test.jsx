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
      <MemoryRouter initialEntries={['/search?q=star%20wars']}>
        <SearchResults />
      </MemoryRouter>,
    )

    expect(useGetSearchMultiQuery).toHaveBeenCalledWith('star wars', { skip: false })
    expect(screen.getByText('A Movie').closest('a')).toHaveAttribute('href', '/movies/1')
    expect(screen.getByText('A Series').closest('a')).toHaveAttribute('href', '/tv/2')
    expect(screen.queryByText('An Actor')).not.toBeInTheDocument()
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

    expect(useGetSearchMultiQuery).toHaveBeenCalledWith('', { skip: true })
    expect(screen.getByText(/enter a movie or TV series/i)).toBeInTheDocument()
  })
})
