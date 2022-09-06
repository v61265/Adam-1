import { useEffect, useRef } from 'react'
import useSearchArticles from '../../hooks/useSearchArticles'

export default function SearchResult({ searchResult }) {
  const loaderRef = useRef(null)
  const { articles, loadMore, hasMore } = useSearchArticles(searchResult)

  useEffect(() => {
    const option = {
      rootMargin: '20px',
      threshold: 0,
    }
    const handleObserver = (entries) => {
      const target = entries[0]
      if (target.isIntersecting) {
        console.log('showing!!!')
        loadMore()
      }
    }
    const observer = new IntersectionObserver(handleObserver, option)
    let loader
    if (loaderRef.current) {
      loader = loaderRef.current
      observer.observe(loader)
    }
    return () => {
      if (loader) observer.unobserve(loader)
    }
  }, [loadMore])

  return (
    <div>
      <h1>Search Result</h1>
      {articles.map((article, index) => {
        // console.log('index, articles.length', index, articles.length)
        return index === articles.length - 1 ? (
          <div key={article.title} ref={loaderRef}>
            <a
              href={article.link}
              alt={article.title}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                {article.title}
                <span style={{ color: 'blue' }}>
                  {article.pagemap.metatags[0]['article:section']}
                </span>
              </div>
              <img src={article.pagemap.cse_image[0].src} />
              <div>{article.snippet}</div>
            </a>
          </div>
        ) : (
          <div key={article.title}>
            <a
              href={article.link}
              alt={article.title}
              target="_blank"
              rel="noreferrer"
            >
              <div>
                {article.title}
                <span style={{ color: 'blue' }}>
                  {article.pagemap.metatags[0]['article:section']}
                </span>
              </div>
              <img src={article.pagemap.cse_image[0].src} />
              <div>{article.snippet}</div>
            </a>
          </div>
        )
      })}
      <button
        type="button"
        disabled={!hasMore}
        onClick={() => {
          loadMore()
        }}
      >
        More
      </button>
    </div>
  )
}
