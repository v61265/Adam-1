import errors from '@twreporter/errors'
import client from '../../../apollo/apollo-client'
import Head from 'next/head'
import AmpHeader from '../../../components/amp/amp-header'
import AmpFooter from '../../../components/amp/amp-footer'
import AmpRelated from '../../../components/amp/amp-related'
import AmpMain from '../../../components/amp/amp-main'
import {
  sortArrayWithOtherArrayId,
  getCategoryOfWineSlug,
} from '../../../utils'
import { fetchPostBySlug } from '../../../apollo/query/posts'
import { GCP_PROJECT_ID } from '../../../config/index.mjs'
import styled from 'styled-components'
import AdultOnlyWarning from '../../../components/story/shared/adult-only-warning'
import WineWarning from '../../../components/story/shared/wine-warning'

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
    <div>
      <Head>
        <title>{title}</title>
      </Head>
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
    </div>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ params, req }) {
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

    //redirect to specific slug or external url
    // TODO: 抽成一個 utils function
    const redirect = postData?.redirect

    if (redirect && redirect.trim()) {
      const redirectHref = redirect.trim()
      if (
        redirectHref.startsWith('https://') ||
        redirectHref.startsWith('http://')
      ) {
        return {
          redirect: {
            destination: `${redirectHref} `,
            permanent: false,
          },
        }
      } else if (redirectHref.startsWith('www.')) {
        return {
          redirect: {
            destination: `https://${redirectHref}`,
            permanent: false,
          },
        }
      } else {
        return {
          redirect: {
            destination: `/story/${redirectHref} `,
            permanent: false,
          },
        }
      }
    }

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
    return { notFound: true }
  }
}

export default StoryAmpPage
