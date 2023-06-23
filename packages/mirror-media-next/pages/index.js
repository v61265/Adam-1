//TODO: will fetch topic data twice (once in header, once in index),
//should fetch only once by using Redux.
//TODO: add typedef of editor choice data
//TODO: add component to add html head dynamically, not jus write head in every pag
//TODO: add jsDoc of `props.sectionsData`
import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import errors from '@twreporter/errors'
import dynamic from 'next/dynamic'

import {
  ENV,
  API_TIMEOUT,
  URL_STATIC_POST_FLASH_NEWS,
  URL_STATIC_POST_EXTERNAL,
  GCP_PROJECT_ID,
} from '../config/index.mjs'

import {
  fetchHeaderDataInDefaultPageLayout,
  fetchHeaderDataInDefaultPageLayoutNoSections,
  fetchHeaderDataInDefaultPageLayoutNoTopics,
  fetchHeaderDataInDefaultPageLayoutNoAllHeaderData,
} from '../utils/api'
import { getSectionNameGql, getSectionTitleGql, getArticleHref } from '../utils'

import EditorChoice from '../components/editor-choice'
import LatestNews from '../components/latest-news'
import Layout from '../components/shared/layout'
import { useDisplayAd } from '../hooks/useDisplayAd'

const GPTAd = dynamic(() => import('../components/ads/gpt/gpt-ad'), {
  ssr: false,
})

/**
 * @typedef {import('../components/shared/share-header').HeaderData['flashNewsData']} FlashNewsData
 */
/**
 * @typedef {import('../components/shared/share-header').HeaderData['sectionsData']} SectionsData
 */
/**
 * @typedef {import('../components/shared/share-header').HeaderData['topicsData']} TopicsData
 */

const IndexContainer = styled.main`
  background-color: rgba(255, 255, 255, 1);
  max-width: 596px;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 1024px;
    height: 500vh;
  }
  margin: 0 auto;
`

const StyledGPTAd_HD = styled(GPTAd)`
  width: 100%;
  height: auto;
  max-width: 336px;
  max-height: 280px;
  margin: 20px auto 0px;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 970px;
    max-height: 250px;
  }
`

const StyledGPTAd_PC_B1 = styled(GPTAd)`
  width: 100%;
  height: auto;
  margin: 20px auto 0px;
  display: none;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 728px;
    max-height: 90px;
    display: block;
  }
`

const StyledGPTAd_MB_L1 = styled(GPTAd)`
  width: 100%;
  height: auto;
  max-width: 336px;
  max-height: 280px;
  margin: 20px auto 0px;

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

/**
 *
 * @param {Object} props
 * @param {import('../type').Topic[]} props.topicsData
 * @param {FlashNewsData} props.flashNewsData
 * @param {import('../type/raw-data.typedef').RawData[] } [props.editorChoicesData=[]]
 * @param {import('../type/raw-data.typedef').RawData[] } [props.latestNewsData=[]]
 * @param {Object[] } props.sectionsData
 * @returns {React.ReactElement}
 */
export default function Home({
  topicsData = [],
  flashNewsData = [],
  editorChoicesData = [],
  latestNewsData = [],
  sectionsData = [],
}) {
  const editorChoice = editorChoicesData.map((item) => {
    const sectionName = getSectionNameGql(item.sections, undefined)
    const sectionTitle = getSectionTitleGql(item.sections, undefined)
    const articleHref = getArticleHref(item.slug, item.style, undefined)
    return { sectionName, sectionTitle, articleHref, ...item }
  })

  const shouldShowAd = useDisplayAd()

  return (
    <Layout
      header={{
        type: 'default-with-flash-news',
        data: { sectionsData, topicsData, flashNewsData },
      }}
      footer={{
        type: 'default',
      }}
    >
      <IndexContainer>
        {shouldShowAd && <StyledGPTAd_HD pageKey="home" adKey="HD" />}
        <EditorChoice editorChoice={editorChoice}></EditorChoice>
        {shouldShowAd && <StyledGPTAd_PC_B1 pageKey="home" adKey="PC_B1" />}
        {shouldShowAd && <StyledGPTAd_MB_L1 pageKey="home" adKey="MB_L1" />}
        <LatestNews latestNewsData={latestNewsData} />
      </IndexContainer>
    </Layout>
  )
}

/**
 * @typedef {Object[]} Items
 */

/**
 * @typedef {Object} DataRes
 * @property {FlashNewsData} [posts]
 * @property {TopicsData} [topics]
 * @property {SectionsData} [sections]
 */

//TODO: rename typedef, make it more clear
/**
 * @typedef {Object} PostRes
 * @property {string} timestamp
 * @property {Array} choices
 * @property {Array} latest
 */

/** @typedef {import('axios').AxiosResponse<DataRes>} AxiosResponse */

//TODO: rename typedef, make it more clear
/** @typedef {import('axios').AxiosResponse<PostRes>} AxiosPostResponse */

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ res, req, query }) {
  if (ENV === 'dev' || ENV === 'staging' || ENV === 'prod') {
    res.setHeader('Cache-Control', 'public, max-age=180')
  }
  let post_external_url = URL_STATIC_POST_EXTERNAL
  let flash_news_url = URL_STATIC_POST_FLASH_NEWS
  let queryHeaderDataFunction = fetchHeaderDataInDefaultPageLayout
  //mock error situation, should delete after testing
  const mockError500 = query.error === '500'
  const mockErrorNoFirstJSON = query.error === 'noFirstJson'
  const mockErrorNoFlashNews = query.error === 'noFlashNews'
  const mockErrorNoHeaderSections = query.error === 'noHeaderSections'
  const mockErrorNoHeaderTopics = query.error === 'noHeaderTopics'
  const mockErrorNoHeaderSectionsAndTopics =
    query.error === 'noHeaderSectionsAndTopics'
  const mockErrorNoHeaderAllData = query.error === 'noHeaderAllData'
  if (mockError500) {
    throw new Error()
  } else if (mockErrorNoFirstJSON) {
    post_external_url = `${URL_STATIC_POST_EXTERNAL}fake`
  } else if (mockErrorNoFlashNews) {
    flash_news_url = `${URL_STATIC_POST_FLASH_NEWS}fake`
  } else if (mockErrorNoHeaderSections) {
    queryHeaderDataFunction = fetchHeaderDataInDefaultPageLayoutNoSections
  } else if (mockErrorNoHeaderTopics) {
    queryHeaderDataFunction = fetchHeaderDataInDefaultPageLayoutNoTopics
  } else if (mockErrorNoHeaderSectionsAndTopics) {
    queryHeaderDataFunction = fetchHeaderDataInDefaultPageLayoutNoAllHeaderData
  } else if (mockErrorNoHeaderAllData) {
    queryHeaderDataFunction = fetchHeaderDataInDefaultPageLayoutNoAllHeaderData
    flash_news_url = `${URL_STATIC_POST_FLASH_NEWS}fake`
  }
  const headers = req?.headers
  const traceHeader = headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  let topicsData = []
  let flashNewsData = []
  let editorChoicesData = []
  let latestNewsData = []
  let sectionsData = []
  try {
    const postResponse = await axios({
      method: 'get',
      url: `${post_external_url}01.json`,
      timeout: API_TIMEOUT,
    })
    editorChoicesData = Array.isArray(postResponse?.data?.choices)
      ? postResponse?.data?.choices
      : []

    latestNewsData = Array.isArray(postResponse?.data?.latest)
      ? postResponse?.data?.latest
      : []

    const responses = await Promise.allSettled([
      axios({
        method: 'get',
        url: flash_news_url,
        timeout: API_TIMEOUT,
      }),
      queryHeaderDataFunction(),
    ])

    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        //TODO: because `fetchHeaderDataInDefaultPageLayout` will not return `value` which contain `request?.res?.responseUrl`,
        //so we temporarily comment the console to prevent error.
        // console.log(
        //   JSON.stringify({
        //     severity: 'INFO',
        //     message: `Successfully fetch data on ${response.value?.request?.res?.responseUrl}`,
        //   })
        // )
      } else {
        const rejectedReason = response.reason
        const annotatingAxiosError =
          errors.helpers.annotateAxiosError(rejectedReason)
        const errorMessage = errors.helpers.printAll(
          annotatingAxiosError,
          {
            withStack: true,
            withPayload: false,
          },
          0,
          0
        )
        console.error(
          JSON.stringify({
            severity: 'ERROR',
            message: errorMessage,
            ...globalLogFields,
          })
        )
      }
    })

    /** @type {PromiseFulfilledResult<AxiosResponse>} */
    const flashNewsResponse =
      responses[0].status === 'fulfilled' && responses[0]

    const headerDataResponse =
      responses[1].status === 'fulfilled' && responses[1]

    flashNewsData = Array.isArray(flashNewsResponse.value?.data?.posts)
      ? flashNewsResponse.value?.data?.posts
      : []

    sectionsData = Array.isArray(headerDataResponse.value?.sectionsData)
      ? headerDataResponse.value?.sectionsData
      : []
    topicsData = Array.isArray(headerDataResponse.value?.topicsData)
      ? headerDataResponse.value?.topicsData
      : []

    return {
      props: {
        topicsData,
        flashNewsData,
        editorChoicesData,
        latestNewsData,
        sectionsData,
      },
    }
  } catch (err) {
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while getting index page data'
    )
    const errorMessage = errors.helpers.printAll(
      annotatingError,
      {
        withStack: true,
        withPayload: false,
      },
      0,
      0
    )
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errorMessage,
        ...globalLogFields,
      })
    )
    throw new Error(errorMessage)
  }
}
