import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { API_TIMEOUT } from '../config'

export default function useSearchArticles({ items: initialArticles, queries }) {
  const [searchTerms] = useState(queries.request[0].searchTerms)
  const [startIndex, setStartIndex] = useState(1)
  const [hasMore, setHasMore] = useState(!!queries.nextPage)
  const [articles, setArticles] = useState(initialArticles)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function search(searchTerms, startIndex) {
      setIsLoading(true)
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
        if (response.data) {
          const hasMore = !!response.data.queries.nextPage && startIndex !== 91
          setHasMore(hasMore)

          setArticles((oldArticles) => {
            const newArticles = response.data.items.filter(
              (article) =>
                !oldArticles.find(
                  (oldArticle) => oldArticle.title === article.title
                )
            )
            return [...oldArticles, ...newArticles]
          })
        }
      } catch (error) {
        if (startIndex === 91) {
          setHasMore(false)
        }
        console.error(error)
      }
      setIsLoading(false)
    }
    if (hasMore && startIndex !== 1) {
      search(searchTerms, startIndex)
    }
  }, [hasMore, searchTerms, startIndex])

  const loadMore = useCallback(() => {
    if (hasMore) setStartIndex((startIndex) => startIndex + 10)
  }, [hasMore])

  return { articles, loadMore, isLoading, hasMore }
}
