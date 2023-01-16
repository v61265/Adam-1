import styled from 'styled-components'
import client from '../apollo/apollo-client'

import InfiniteScrollList from './InifiniteScrollList'
import Image from 'next/image'
import LoadingPage from '../public/images/loading_page.gif'
import ArticleListItems from './article-list-items'
import { fetchPostsByCategory } from '../apollo/query/posts'

const Loading = styled.div`
  margin: 20px auto 0;
  padding: 0 0 20px;
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 64px auto 0;
    padding: 0 0 64px;
  }
`

export default function ArticleList({
  postsCount,
  posts,
  category,
  renderPageSize,
}) {
  async function fetchPostsFromPage(page) {
    try {
      const response = await client.query({
        query: fetchPostsByCategory,
        variables: {
          take: renderPageSize,
          skip: page * renderPageSize,
          orderBy: { publishedDate: 'desc' },
          filter: {
            state: { equals: 'published' },
            categories: { some: { slug: { equals: category.slug } } },
          },
        },
      })
      return response.value.data.posts
    } catch (error) {}
    return
  }

  const loader = (
    <Loading key={0}>
      <Image src={LoadingPage} alt="loading page"></Image>
    </Loading>
  )

  return (
    <InfiniteScrollList
      propsIS={{
        threshold: 150,
        loader,
      }}
      initialList={posts}
      renderPageSize={renderPageSize}
      pageCount={Math.ceil(postsCount / renderPageSize)}
      fetchListInPage={fetchPostsFromPage}
    >
      {(renderList) => <ArticleListItems renderList={renderList} />}
    </InfiniteScrollList>
  )
}
