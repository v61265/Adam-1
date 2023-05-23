import styled from 'styled-components'
import RelatedArticleList from '../wide/related-article-list'
import AsideArticleList from './aside-article-list'
import Divider from './divider'
import axios from 'axios'
import client from '../../../apollo/apollo-client'
import { URL_STATIC_POPULAR_NEWS, API_TIMEOUT } from '../../../config/index.mjs'
import { fetchAsidePosts } from '../../../apollo/query/posts'

/**
 * @typedef {import('../wide/related-article-list').Relateds} Relateds
 */
/**
 * @typedef {import('./aside-article-list').ArticleData} AsideArticleData
 */

/**
 * @typedef {import('../../../apollo/fragments/section').Section} Section
 */

const AsideWrapper = styled.aside`
  width: 100%;
  max-width: 640px;
  margin: 20px auto;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin-top: 64px;
  }
`
/**
 * Component for rendering aside of story page, which contain related posts, latest news, popular news.
 * Currently used at wide layout and premium layout of story page.
 * @param {Object} props
 * @param {Relateds} props.relateds - The related post.
 * @param {string} props.sectionSlug - The slug of section, this props will decide which section of latest news belongs to.
 * @param {string} props.storySlug - The slug of story, the function of fetching latest news will skip the post with this slug.
 * @returns {JSX.Element}
 */
export default function Aside({
  relateds = [],
  sectionSlug = '',
  storySlug = '',
}) {
  /**
   * @returns {Promise<AsideArticleData[] | []>}
   */
  const handleFetchLatestNews = async () => {
    try {
      /**
       * @type {import('@apollo/client').ApolloQueryResult<{posts: AsideArticleData[]}>}
       */
      const res = await client.query({
        query: fetchAsidePosts,
        variables: {
          take: 6,
          sectionSlug: sectionSlug,
          storySlug: storySlug,
        },
      })
      return res.data?.posts
    } catch (err) {
      console.error(err)
      return []
    }
  }

  /**
   * @returns {Promise<AsideArticleData[] | []>}
   */
  const handleFetchPopularNews = async () => {
    try {
      /**
       * @type {import('axios').AxiosResponse<AsideArticleData[] | []>}>}
       */
      const { data } = await axios({
        method: 'get',
        url: URL_STATIC_POPULAR_NEWS,
        timeout: API_TIMEOUT,
      })
      return data.filter((data) => data).slice(0, 6)
    } catch (err) {
      return []
    }
  }

  return (
    <AsideWrapper>
      <RelatedArticleList relateds={relateds}></RelatedArticleList>
      <AsideArticleList
        heading="最新文章"
        fetchArticle={handleFetchLatestNews}
        renderAmount={6}
      />
      <Divider />
      <AsideArticleList
        heading="熱門文章"
        fetchArticle={handleFetchPopularNews}
        renderAmount={6}
      />
    </AsideWrapper>
  )
}
