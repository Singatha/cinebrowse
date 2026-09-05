import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const parsePage = (value) => {
  const page = Number(value)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

export const useUrlPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = parsePage(searchParams.get('page'))

  const setPage = useCallback((nextPage) => {
    const normalizedPage = parsePage(nextPage)

    setSearchParams((currentParams) => {
      const updatedParams = new URLSearchParams(currentParams)

      if (normalizedPage === 1) {
        updatedParams.delete('page')
      } else {
        updatedParams.set('page', String(normalizedPage))
      }

      return updatedParams
    })

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [setSearchParams])

  return { page, searchParams, setPage }
}
