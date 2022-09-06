import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { API_TIMEOUT } from '../config'

export default function useSearchArticles({ items: initialArticles, queries }) {
  const [searchTerms] = useState(queries.request[0].searchTerms)
  const [startIndex, setStartIndex] = useState(1)
  const [hasMore, setHasMore] = useState(!!queries.nextPage)
  const [articles, setArticles] = useState(initialArticles)

  useEffect(() => {
    async function search(searchTerms, startIndex) {
      console.log('searchTerms, startIndex', searchTerms, startIndex)
      try {
        const response = await axios({
          method: 'get',
          url: '/api/search',
          params: {
            query: searchTerms,
            start: startIndex,
          },
          timeout: API_TIMEOUT,
        })
        console.log('searchResult', response)
        if (response.data) {
          const hasMore = !!response.data.queries.nextPage
          setHasMore(hasMore)
          const newArticles = response.data.items
          setArticles((oldArticles) => [...oldArticles, ...newArticles])
        }
      } catch (error) {
        console.error(error)
      }
    }
    console.log(`hasMore = ${hasMore}, startIndex = ${startIndex}`)
    if (hasMore && startIndex !== 1) {
      search(searchTerms, startIndex)
    }
  }, [hasMore, searchTerms, startIndex])

  const loadMore = useCallback(() => {
    console.log('hasMore', hasMore)
    if (hasMore) {
      setStartIndex((startIndex) => startIndex + 10)
    } else {
      console.log('no more to load!')
    }
  }, [hasMore])

  return { articles, loadMore, hasMore }
}
