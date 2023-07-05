import errors from '@twreporter/errors'
import client from '../../../apollo/apollo-client'
import Layout from '../../../components/shared/layout'
import AmpHeader from '../../../components/amp/amp-header'
import AmpFooter from '../../../components/amp/amp-footer'
import AmpRelated from '../../../components/amp/amp-related'
import AmpMain from '../../../components/amp/amp-main'
import {
  sortArrayWithOtherArrayId,
  getCategoryOfWineSlug,
  convertDraftToText,
  getResizedUrl,
} from '../../../utils'

import { handleStoryPageRedirect } from '../../../utils/story'
import { setPageCache } from '../../../utils/cache-setting'
import { fetchPostBySlug } from '../../../apollo/query/posts'
import {
  GCP_PROJECT_ID,
  ENV,
  GA_MEASUREMENT_ID,
} from '../../../config/index.mjs'
import styled from 'styled-components'
import AdultOnlyWarning from '../../../components/story/shared/adult-only-warning'
import WineWarning from '../../../components/story/shared/wine-warning'
import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
const { hasContentInRawContentBlock } = MirrorMedia

export const config = { amp: true }

const AmpBody = styled.body`
  background: #f5f5f5;
  #amp-page.disable-scroll {
    height: 100vh;
    overflow: hidden;
  }
  #amp-page.is-wine {
    margin-bottom: 5vh;
    ${({ theme }) => theme.breakpoint.sm} {
      margin-bottom: 10vh;
    }
  }
`

/**
 * @typedef {import('../../../apollo/fragments/post').Post} PostData
 */

/**
 *
 * @param {Object} props
 * @param {PostData} props.postData
 * @returns {JSX.Element}
 */

function StoryAmpPage({ postData }) {
  const {
    title = '',
    relateds = [],
    manualOrderOfRelateds = [],
    isMember = false,
    isAdult = false,
    categories = [],
  } = postData

  const categoryOfWineSlug = getCategoryOfWineSlug(categories)

  const relatedsWithOrdered =
    manualOrderOfRelateds && manualOrderOfRelateds.length
      ? sortArrayWithOtherArrayId(relateds, manualOrderOfRelateds)
      : relateds
  return (
    <Layout
      head={{
        title: `${title}`,
        description:
          convertDraftToText(postData.brief) ||
          convertDraftToText(postData.content),
        imageUrl:
          getResizedUrl(postData.og_image?.resized) ||
          getResizedUrl(postData.heroImage?.resized),
      }}
      header={{ type: 'empty' }}
      footer={{ type: 'empty' }}
    >
      <>
        {/* @ts-ignore */}
        <amp-analytics
          type="googleanalytics"
          config="https://amp.analytics-debugger.com/ga4.json"
          data-credentials="include"
        >
          <script
            type="application/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                vars: {
                  GA4_MEASUREMENT_ID: GA_MEASUREMENT_ID,
                  GA4_ENDPOINT_HOSTNAME: 'www.google-analytics.com',
                  GOOGLE_CONSENT_ENABLED: false,
                  WEBVITALS_TRACKING: false,
                  PERFORMANCE_TIMING_TRACKING: false,
                  DEFAULT_PAGEVIEW_ENABLED: true,
                  SEND_DOUBLECLICK_BEACON: false,
                  DISABLE_REGIONAL_DATA_COLLECTION: false,
                  ENHANCED_MEASUREMENT_SCROLL: false,
                },
              }),
            }}
          />
          {/* @ts-ignore */}
        </amp-analytics>
        <AmpBody>
          <section
            id="amp-page"
            className={`${!!categoryOfWineSlug.length && 'is-wine'} ${
              isAdult && 'disable-scroll'
            }`}
          >
            <AmpHeader />
            <AmpMain postData={postData} isMember={isMember} />
            <AmpRelated relateds={relatedsWithOrdered} />
            <AmpFooter />
          </section>
          <AdultOnlyWarning isAdult={isAdult} />
          <WineWarning categories={categories} />
        </AmpBody>
      </>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ params, req, res }) {
  if (ENV === 'prod') {
    setPageCache(res, { cachePolicy: 'max-age', cacheTime: 300 }, req.url)
  } else {
    setPageCache(res, { cachePolicy: 'no-store' }, req.url)
  }
  const { slug } = params
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  try {
    const result = await client.query({
      query: fetchPostBySlug,
      variables: { slug },
    })
    /**
     * @type {PostData}
     */
    const postData = result?.data?.post
    if (!postData) {
      return { notFound: true }
    }
    const { style } = postData
    /**
     * If post style is 'projects' or 'campaign', redirect to certain route.
     *
     * There is no `/projects` or `/campaign` pages in mirror-media-next, when user enter path `/projects/_slug` or `/campaign`,
     * Load balancer hosted by Google Cloud Platform will help us to get page content of project or campaign page.
     * The content of certain page is placed at Google Cloud Storage.
     */
    if (style === 'projects' || style === 'campaign') {
      return {
        redirect: {
          destination: `/${style}/${slug} `,
          permanent: false,
        },
      }
    }

    // Check if the post data has content in the brief, trimmedContent, or content fields
    const shouldCheckHasContent =
      style === 'article' || style === 'wide' || style === 'photography'

    if (shouldCheckHasContent) {
      const hasBrief = hasContentInRawContentBlock(postData.brief)

      const hasTrimmedContent = hasContentInRawContentBlock(
        postData.trimmedContent
      )
      const hasFullContent = hasContentInRawContentBlock(postData.content)

      // If none of the fields have content, return notFound as true
      if (!hasBrief && !hasTrimmedContent && !hasFullContent) {
        return { notFound: true }
      }
    }

    //redirect to specific slug or external url
    const redirect = postData?.redirect
    handleStoryPageRedirect(redirect)

    return {
      props: {
        postData,
      },
    }
  } catch (err) {
    const { graphQLErrors, clientErrors, networkError } = err
    const annotatingError = errors.helpers.wrap(
      err,
      'UnhandledError',
      'Error occurs while getting story page data'
    )
    const errorMessage = errors.helpers.printAll(
      annotatingError,
      {
        withStack: true,
        withPayload: true,
      },
      0,
      0
    )
    console.log(
      JSON.stringify({
        severity: 'ERROR',
        message: errorMessage,
        debugPayload: {
          graphQLErrors,
          clientErrors,
          networkError,
        },
        ...globalLogFields,
      })
    )
    throw new Error(errorMessage)
  }
}

export default StoryAmpPage
