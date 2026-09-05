import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Error from './Error'

describe('Error', () => {
  it('shows the API status message when available', () => {
    render(<Error error={{ data: { status_message: 'Movie not found' } }} />)

    expect(screen.getByText('Movie not found')).toBeInTheDocument()
  })

  it('falls back safely for a network error', () => {
    render(<Error error={{ error: 'Network request failed' }} />)

    expect(screen.getByText('Network request failed')).toBeInTheDocument()
  })

  it('shows a generic message for an unknown error shape', () => {
    render(<Error error={{}} />)

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })
})
