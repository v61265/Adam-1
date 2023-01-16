import errors from '@twreporter/errors'
import styled from 'styled-components'

import client from '../../apollo/apollo-client'
import { fetchPostsByCategory } from '../../apollo/query/posts'
import { fetchCategorySections } from '../../apollo/query/categroies'
import CategoryArticles from '../../components/category-articles'

const CategoryContainer = styled.main`
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0 48px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 0 auto;
    max-width: 1024px;
    padding: 0;
  }
`

const RENDER_PAGE_SIZE = 12

export default function Category({ postsCount, posts, category }) {
  console.log(postsCount, posts, category)

  return (
    <CategoryContainer>
      <h1>{category?.name}</h1>
      <CategoryArticles
        postsCount={postsCount}
        posts={posts}
        category={category?.name}
        renderPageSize={RENDER_PAGE_SIZE}
      />
    </CategoryContainer>
  )
}

export async function getServerSideProps({ query, req }) {
  const categorySlug = query.slug
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  const responses = await Promise.allSettled([
    client.query({
      query: fetchPostsByCategory,
      variables: {
        take: RENDER_PAGE_SIZE,
        skip: 0,
        orderBy: { publishedDate: 'desc' },
        filter: {
          state: { equals: 'published' },
          categories: { some: { slug: { equals: categorySlug } } },
        },
      },
    }),
    client.query({
      query: fetchCategorySections,
      variables: {
        categorySlug,
      },
    }),
  ])

  const handledResponses = responses.map((response) => {
    if (response.status === 'fulfilled') {
      return response.value.data
    } else if (response.status === 'rejected') {
      const { graphQLErrors, clientErrors, networkError } = response.reason
      const annotatingError = errors.helpers.wrap(
        response.reason,
        'UnhandledError',
        'Error occurs while getting index page data'
      )

      console.log(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            graphQLErrors,
            clientErrors,
            networkError,
          },
          ...globalLogFields,
        })
      )
      return
    }
  })

  const props = {
    postsCount: handledResponses[0]?.postsCount || 0,
    posts: handledResponses[0]?.posts || [],
    category: handledResponses[1]?.category || {},
  }

  return { props }
}
