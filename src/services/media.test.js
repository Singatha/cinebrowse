import { configureStore } from '@reduxjs/toolkit'
import { HttpResponse, http } from 'msw'
import { afterEach, describe, expect, it } from 'vitest'
import { mediaApi } from './media'
import { server } from '../test/server'

const createTestStore = () => configureStore({
  reducer: {
    [mediaApi.reducerPath]: mediaApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mediaApi.middleware),
})

describe('mediaApi', () => {
  const stores = []

  afterEach(() => {
    stores.forEach((store) => store.dispatch(mediaApi.util.resetApiState()))
    stores.length = 0
  })

  it('sends an encoded multi-search query to TMDB', async () => {
    server.use(
      http.get('https://api.themoviedb.org/3/search/multi', ({ request }) => {
        const url = new URL(request.url)

        return HttpResponse.json({
          receivedQuery: url.searchParams.get('query'),
          receivedPage: url.searchParams.get('page'),
        })
      }),
    )
    const store = createTestStore()
    stores.push(store)

    const result = await store.dispatch(
      mediaApi.endpoints.getSearchMulti.initiate({ keyword: 'star wars & beyond', page: 3 }),
    ).unwrap()

    expect(result.receivedQuery).toBe('star wars & beyond')
    expect(result.receivedPage).toBe('3')
  })
})
