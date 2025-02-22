//TODO: add component to add html head dynamically, not jus write head in every pag
import React, { useState, useEffect, useMemo } from 'react'

import client from '../../apollo/apollo-client'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import {
  ENV,
  // TEST_GPT_AD_FEATURE_TOGGLE,
} from '../../config/index.mjs'
import WineWarning from '../../components/shared/wine-warning'
import AdultOnlyWarning from '../../components/story/shared/adult-only-warning'
import { useMembership } from '../../context/membership'
import useSaveMemberArticleHistoryLocally from '../../hooks/member-article-history/use-save-member-article-history-locally'
import {
  fetchPostBySlug,
  fetchPostFullContentBySlug,
} from '../../apollo/query/posts'
import StoryNormalStyle from '../../components/story/normal'
import Layout from '../../components/shared/layout'
import UserBehaviorLogger from '../../components/shared/user-behavior-logger'
import StoryHead from '../../components/story/shared/story-head'
import {
  convertDraftToText,
  getResizedUrl,
  getCategoryOfWineSlug,
  getLogTraceObject,
} from '../../utils'
import { logAxiosError, logGqlError } from '../../utils/log/shared'
import { handleStoryPageRedirect } from '../../utils/story'
import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import { fetchHeaderDataInPremiumPageLayout } from '../../utils/api'
import { setPageCache } from '../../utils/cache-setting'

import JsonLdsScript from '../../components/story/shared/json-lds-script'
import FullScreenAds from '../../components/ads/full-screen-ads'
const { hasContentInRawContentBlock } = MirrorMedia

const StoryWideStyle = dynamic(() => import('../../components/story/wide'))
const StoryPhotographyStyle = dynamic(() =>
  import('../../components/story/photography')
)
const StoryPremiumStyle = dynamic(() =>
  import('../../components/story/premium')
)
import Image from 'next/image'
import Skeleton from '../../public/images-next/skeleton.png'
// import DevGptAd from '../../components/story/dev-gpt-ad'

/**
 * @typedef {import('../../components/story/normal').PostData} PostData
 * @typedef {import('../../components/story/normal').PostContent} PostContent
 * @typedef {'style-normal' | 'style-photography' | 'style-wide' | 'style-premium'} StoryLayoutType
 * @typedef {import('../../components/header/share-header').HeaderData} HeaderData
 */

const Loading = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: fixed;

  img {
    margin: 0 auto;
  }
`

/**
 *
 * @param {import('../../components/story/normal').PostData['style']} articleStyle
 * @param {import('../../components/story/normal').PostData['isMember']} isMemberOnlyArticle
 * @returns {StoryLayoutType }
 */
const getStoryLayoutType = (articleStyle, isMemberOnlyArticle) => {
  if (articleStyle === 'wide') {
    return 'style-wide'
  } else if (articleStyle === 'photography') {
    return 'style-photography'
  } else if (articleStyle === 'article' && isMemberOnlyArticle === true) {
    return 'style-premium'
  }
  return 'style-normal'
}

/**
 *
 * @param {Object} props
 * @param {PostData} props.postData
 * @param {HeaderData} props.headerData
 * @param {StoryLayoutType} props.storyLayoutType
 * @returns {React.ReactNode}
 */
export default function Story({ postData, headerData, storyLayoutType }) {
  const {
    title = '',
    slug = '',
    isAdult = false,
    categories = [],
    isMember = false,
    content = null,
    trimmedContent = null,
    hiddenAdvertised = false,
    writers = [],
  } = postData
  /**
   * The logic for rendering the article content:
   * We use the state `postContent` to manage the content should render in the story page.
   * In most cases, the story page can retrieve the full content of the article.
   * However, if the article is exclusive to members, it is required to get full content by using user's access token, but it is impossible to acquire it at server side.
   * Before the full content is obtained, the truncated content `trimmedContent` will be used as the displayed data.
   * If it didn't obtain the full content, and the user is logged in, story page will try to get the full content again by using the user's access token as the request payload.
   * If successful, the full content will be displayed; if not, the truncated content will still be shown.
   */

  const { isLoggedIn, accessToken, isLogInProcessFinished } = useMembership()
  /** @type { [PostContent, React.Dispatch<React.SetStateAction<PostContent>> ]} */

  const [postContent, setPostContent] = useState(
    content
      ? { type: 'fullContent', data: content, isLoaded: true }
      : { type: 'trimmedContent', data: trimmedContent, isLoaded: false }
  )
  useSaveMemberArticleHistoryLocally(slug)
  const writersInString = useMemo(() => {
    return writers
      .map((writer) => {
        return writer.name
      })
      .join(',')
  }, [writers])

  useEffect(() => {
    const fetchPostFullContent = async () => {
      try {
        const result = await client.query({
          query: fetchPostFullContentBySlug,
          variables: { slug },
          context: {
            headers: {
              authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          },
        })
        const fullContent = result?.data?.post?.content ?? null
        return fullContent
      } catch (err) {
        //TODO: send error log to our GCP log viewer
        console.error(err)
        return null
      }
    }
    const updatePostContent = async () => {
      const fullContent = await fetchPostFullContent()
      setPostContent((preState) => {
        return {
          type: fullContent ? 'fullContent' : preState.type,
          data: fullContent ?? preState.data,
          isLoaded: true,
        }
      })
    }

    if (!isLogInProcessFinished) {
      return
    }
    if (isLoggedIn && !postContent.isLoaded) {
      updatePostContent()
    } else if (
      storyLayoutType === 'style-wide' ||
      storyLayoutType === 'style-premium'
    ) {
      /**
       * Why we need to setPostContent, even if state is all based on previous state ?
       * Because in premium and wide layout, we use component `NavSubtitleNavigator` to select `<h2>` and `<h3>` in story content.
       * However, if we not setPostContent to trigger re-render, `NavSubtitleNavigator` would select h2 and h3 which is not append to html yet.
       *
       * This is a work-around solution and might have better solution.
       */
      setPostContent((preState) => {
        return {
          ...preState,
        }
      })
    }
  }, [
    isLogInProcessFinished,
    isLoggedIn,
    accessToken,
    slug,
    postContent.isLoaded,
    storyLayoutType,
  ])

  const renderStoryLayout = () => {
    /**
     * Because GA is currently unable to send custom event, we use gtm className to collect custom page-view.
     */
    const classNameForGTM = isMember
      ? 'GTM-premium-page-view'
      : 'GTM-story-page-view'
    switch (storyLayoutType) {
      case 'style-normal':
        return (
          <StoryNormalStyle
            postData={postData}
            postContent={postContent}
            headerData={headerData}
            classNameForGTM={classNameForGTM}
          />
        )
      case 'style-premium':
        return (
          <StoryPremiumStyle
            postData={postData}
            postContent={postContent}
            headerData={headerData}
            classNameForGTM={classNameForGTM}
          />
        )
      case 'style-wide':
        return (
          <StoryWideStyle
            postData={postData}
            postContent={postContent}
            classNameForGTM={classNameForGTM}
          />
        )
      case 'style-photography':
        return (
          <StoryPhotographyStyle
            postData={postData}
            postContent={postContent}
            classNameForGTM={classNameForGTM}
          />
        )
      default:
        return (
          <StoryNormalStyle
            postData={postData}
            postContent={postContent}
            headerData={headerData}
            classNameForGTM={classNameForGTM}
          />
        )
    }
  }
  const storyLayoutJsx = renderStoryLayout()
  //If no wine category, then should show gpt ST ad, otherwise, then should not show gpt ST ad.
  const noCategoryOfWineSlug = getCategoryOfWineSlug(categories).length === 0

  return (
    <>
      <StoryHead postData={postData} />
      <JsonLdsScript postData={postData} currentPage="/story/"></JsonLdsScript>
      <Layout
        head={{
          title: `${title}`,
          description:
            convertDraftToText(postData.brief) ||
            convertDraftToText(postData.content),
          imageUrl:
            getResizedUrl(postData.og_image?.resized) ||
            getResizedUrl(postData.heroImage?.resized),
          skipCanonical: true,
          pageType: 'story',
          pageSlug: slug,
        }}
        header={{ type: 'empty' }}
        footer={{ type: 'empty' }}
      >
        <UserBehaviorLogger
          isMemberArticle={isMember}
          writers={writersInString}
        />
        {!storyLayoutJsx && (
          <Loading>
            <Image src={Skeleton} alt="loading..."></Image>
          </Loading>
        )}
        {storyLayoutJsx}
        <WineWarning categories={categories} />
        <AdultOnlyWarning isAdult={isAdult} />
        {noCategoryOfWineSlug && (
          <FullScreenAds hiddenAdvertised={hiddenAdvertised} />
        )}
        {/* {TEST_GPT_AD_FEATURE_TOGGLE === 'on' && <DevGptAd />} */}
      </Layout>
    </>
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
  const globalLogFields = getLogTraceObject(req)

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

    const redirect = postData?.redirect
    if (redirect) {
      return handleStoryPageRedirect(redirect)
    }
    const storyLayoutType = getStoryLayoutType(
      postData?.style,
      postData?.isMember
    )
    let headerData = null
    const shouldFetchDefaultHeaderData = storyLayoutType === 'style-normal'
    const shouldFetchPremiumHeaderData = storyLayoutType === 'style-premium'
    if (shouldFetchDefaultHeaderData) {
      try {
        headerData = await fetchHeaderDataInDefaultPageLayout()
      } catch (err) {
        headerData = { sectionsData: [], topicsData: [] }
        logAxiosError(
          err,
          `Error occurs while getting header data in story page (slug: ${slug})`,
          globalLogFields
        )
      }
    } else if (shouldFetchPremiumHeaderData) {
      try {
        headerData = await fetchHeaderDataInPremiumPageLayout()
      } catch (err) {
        headerData = { sectionsData: [] }
        logAxiosError(
          err,
          `Error occurs while getting premium header data in story page (slug: ${slug})`,
          globalLogFields
        )
      }
    }

    return {
      props: {
        postData,
        headerData,
        storyLayoutType,
      },
    }
  } catch (err) {
    logGqlError(
      err,
      `Error occurs while getting data in story page (slug: ${slug})`,
      globalLogFields
    )
    throw new Error(
      `Error occurs while getting data in story page (slug: ${slug})`
    )
  }
}
