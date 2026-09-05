import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

const CurrentLocation = () => {
  const location = useLocation()
  return <output aria-label="current location">{`${location.pathname}${location.search}`}</output>
}

describe('Navbar search', () => {
  it('navigates to a shareable search URL', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
        <CurrentLocation />
      </MemoryRouter>,
    )

    await act(async () => {
      await user.type(screen.getByRole('searchbox', { name: /search for/i }), 'star wars')
      await user.click(screen.getByRole('button', { name: 'Search' }))
    })

    expect(screen.getByLabelText('current location')).toHaveTextContent('/search?q=star%20wars')
  })

  it('does not navigate for a blank search', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/list/movies']}>
        <Navbar />
        <CurrentLocation />
      </MemoryRouter>,
    )

    await act(async () => {
      await user.type(screen.getByRole('searchbox', { name: /search for/i }), '   ')
      await user.click(screen.getByRole('button', { name: 'Search' }))
    })

    expect(screen.getByLabelText('current location')).toHaveTextContent('/list/movies')
  })
})
