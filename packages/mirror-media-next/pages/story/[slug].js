//TODO: add component to add html head dynamically, not jus write head in every pag
import { useState, useEffect } from 'react'
import client from '../../apollo/apollo-client'
import errors from '@twreporter/errors'
import styled from 'styled-components'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import WineWarning from '../../components/story/shared/wine-warning'
import AdultOnlyWarning from '../../components/story/shared/adult-only-warning'

import { fetchPostBySlug } from '../../apollo/query/posts'
import StoryNormalStyle from '../../components/story/normal'
import Layout from '../../components/shared/layout'
const StoryWideStyle = dynamic(() => import('../../components/story/wide'))
const StoryPhotographyStyle = dynamic(() =>
  import('../../components/story/photography')
)
const StoryPremiumStyle = dynamic(() =>
  import('../../components/story/premium')
)

/**
 * @typedef {import('../../components/story/normal').PostData} PostData
 */

//Todo: adjust height, make it not to scroll when loading
const MockLoading = styled.div`
  width: 100%;
  height: 100vh;
  background-color: pink;
  text-align: center;
  font-size: 32px;
`
/**
 *
 * @param {'article'| 'wide' | 'projects' | 'photography' | 'script' | 'campaign' | 'readr'} articleType
 * @param {boolean} isMemberArticle
 * @param { 'yearly' | 'monthly' | 'basic' | undefined} [memberType]
 * @return {'style-normal' | 'style-wide' | 'style-photography' | 'style-premium'}
 */
const getStoryLayout = (
  articleType,
  isMemberArticle = false,
  memberType = undefined
) => {
  switch (articleType) {
    case 'wide':
      return 'style-wide'

    case 'photography':
      return 'style-photography'

    case 'article':
      if (
        isMemberArticle ||
        memberType === 'monthly' ||
        memberType === 'yearly'
      ) {
        return 'style-premium'
      }
      return 'style-normal'

    default:
      return 'style-normal'
  }
}

const mockMemberSystem = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve('basic')
    }, 1000)
  )
}

/**
 *
 * @param {Object} props
 * @param {PostData} props.postData
 * @returns {JSX.Element}
 */
export default function Story({ postData }) {
  const {
    title = '',
    style = 'article',
    isMember = false,
    isAdult = false,
    categories = [],
  } = postData

  const [storyLayout, setStoryLayout] = useState(null)

  const renderStoryLayout = () => {
    switch (storyLayout) {
      case 'style-normal':
        return <StoryNormalStyle postData={postData} />
      case 'style-wide':
        return <StoryWideStyle postData={postData} />
      case 'style-photography':
        return <StoryPhotographyStyle />
      case 'style-premium':
        return <StoryPremiumStyle postData={postData} />
      default:
        return <StoryNormalStyle postData={postData} />
    }
  }
  const jsx = renderStoryLayout()

  //mock for process of changing article type
  useEffect(() => {
    async function getMemberType() {
      const memberType = await mockMemberSystem()
      return memberType
    }

    getMemberType()
      .then((res) => {
        const storyLayout = getStoryLayout(style, isMember, res)
        setStoryLayout(storyLayout)
      })
      .catch(() => {
        const storyLayout = getStoryLayout(style, isMember, undefined)
        setStoryLayout(storyLayout)
      })
  }, [style, isMember])

  const headJsx = (
    <Head>
      <title>{title}</title>
    </Head>
  )

  return (
    <Layout header={{ type: 'empty' }}>
      <>
        {headJsx}
        {!storyLayout && <MockLoading>Loading...</MockLoading>}
        <div style={{ display: `${storyLayout ? 'block' : 'none'}` }}>
          {jsx}
        </div>
        <WineWarning categories={categories} />
        <AdultOnlyWarning isAdult={isAdult} />
      </>
    </Layout>
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
