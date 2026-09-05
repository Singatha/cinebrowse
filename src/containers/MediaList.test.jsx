import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import MediaList from './MediaList'

describe('MediaList', () => {
  it('renders media in slider mode', () => {
    render(
      <MemoryRouter>
        <MediaList
          data={{
            results: [
              { id: 1, title: 'Slider Movie', poster_path: '/poster.jpg', genre_ids: [28] },
            ],
          }}
          isSlider
          mediaType="movies"
        />
      </MemoryRouter>,
    )

    expect(screen.getAllByText('Slider Movie').length).toBeGreaterThan(0)
    expect(screen.getAllByRole('link', { name: /Slider Movie/i })[0]).toHaveAttribute('href', '/movies/1')
  })
})
