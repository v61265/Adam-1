import ListArticles from './list-articles'
import styled from 'styled-components'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { fetchTopic } from '../../../apollo/query/topics'
const ShowMoreButton = styled.button`
  width: 100%;
  height: 200px;
  background-color: pink;
  margin: 0 auto;
`
export default function ListArticlesAboveAd({
  posts = [],
  topicSlug = '',
  featuredPostsCount = 0,
  renderPageSize = 12,
}) {
  const [renderPosts, setRenderPosts] = useState(posts)

  /**
   * Two situation:
   * 1. `featurePostsCount` is greater than `renderPosts.length`, which means there are some featured post is not fetched and render yet.
   * 2.  `featurePostsCount` is equal to or lower than `renderPosts.length`, which means all featured post has rendered.
   */
  const hasMoreFeaturedPosts = featuredPostsCount > renderPosts.length
  const [getFeaturedPostsInTopic] = useLazyQuery(fetchTopic, {
    variables: {
      topicFilter: { slug: { equals: topicSlug } },
      postsFilter: {
        state: { equals: 'published' },
        isFeatured: { equals: true },
      },
      postsOrderBy: [{ isFeatured: 'desc' }, { publishedDate: 'desc' }],
      postsTake: renderPageSize,
      postsSkip: renderPosts.length,
    },
  })

  const handleLoadMore = async () => {
    const res = await getFeaturedPostsInTopic()

    if (res.called && !res.loading) {
      const newPosts = res.data?.topics?.[0].posts

      setRenderPosts((pre) => [...pre, ...newPosts])
    }
  }

  return (
    <>
      <div>上方文章區</div>
      <div>置頂文章共有 {featuredPostsCount} 篇</div>
      <div>
        目前上方文章顯示 {renderPosts.length} 篇，其中置頂文章有
        {renderPosts.filter((post) => post.isFeatured).length} 篇，一般文章中有
        {renderPosts.filter((post) => !post.isFeatured).length} 篇
      </div>
      <ListArticles renderList={renderPosts} />
      {hasMoreFeaturedPosts && (
        <ShowMoreButton onClick={handleLoadMore}>看更多</ShowMoreButton>
      )}
    </>
  )
}
