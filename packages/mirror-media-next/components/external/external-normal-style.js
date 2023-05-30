//TODO: adjust margin and padding of all margin and padding after implement advertisement.
//TODO: refactor jsx structure, make it more readable.

import { useCallback } from 'react'
import client from '../../apollo/apollo-client'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import axios from 'axios'
import MockAdvertisement from '../../components/mock-advertisement'
import ExternalArticleInfo from '../../components/external/external-article-info'
import ArticleBrief from '../../components/story/shared/brief'
import AsideArticleList from '../../components/story/normal/aside-article-list'
import FbPagePlugin from '../../components/story/normal/fb-page-plugin'
import SocialNetworkService from '../../components/story/normal/social-network-service'
import SubscribeInviteBanner from '../../components/story/normal/subscribe-invite-banner'
import DonateBanner from '../../components/story/shared/donate-banner'
import MagazineInviteBanner from '../../components/story/shared/magazine-invite-banner'
// import ArticleContent from '../../components/story/normal/article-content'
import ExternalHeroImage from '../../components/external/external-hero-image'
import Divider from '../../components/story/shared/divider'
import { transformTimeDataIntoDotFormat } from '../../utils'
import { fetchAsidePosts } from '../../apollo/query/posts'
import { URL_STATIC_POPULAR_NEWS, API_TIMEOUT } from '../../config/index.mjs'
import {
  transformStringToDraft,
  getExternalSectionTitle,
} from '../../utils/external'

/**
 * @typedef {import('../../type/theme').Theme} Theme
 */
/**
 * @typedef {import('../../components/story/normal/aside-article-list').ArticleData} AsideArticleData
 */
/**
 * @typedef {import('../../apollo/fragments/external').External} External
 */

const sectionColor = css`
  ${
    /**
     * @param {Object} props
     * @param {String} [props.sectionSlug]
     * @param {Theme} [props.theme]
     */
    ({ sectionSlug, theme }) =>
      sectionSlug && theme.color.sectionsColor[sectionSlug]
        ? theme.color.sectionsColor[sectionSlug]
        : 'black'
  };
`

const PC_HD_Advertisement = styled(MockAdvertisement)`
  display: none;
  margin: 24px auto;
  text-align: center;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
  }
`
const PC_R1_Advertisement = styled(MockAdvertisement)`
  display: none;
  margin: 0 auto;
  text-align: center;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
  }
`
const PC_R2_Advertisement = styled(MockAdvertisement)`
  display: none;
  margin: 20px auto;
  text-align: center;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
  }
`
const M_AT3_Advertisement = styled(MockAdvertisement)`
  margin: 0 -20px;
  width: 100vw;
  max-width: 336px;
  @media (min-width: 336px) {
    margin: 0 auto;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

const Title = styled.h1`
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-weight: 400;
  font-size: 24px;
  line-height: 34px;
  ${({ theme }) => theme.breakpoint.md} {
    font-weight: 500;
    font-size: 32px;
    line-height: 1.25;
    text-align: left;
  }
`
const Main = styled.main`
  margin: 20px auto 0;
  width: 100%;
  height: auto;
  max-width: 1200px;
  padding: 0 20px;
  ${({ theme }) => theme.breakpoint.md} {
    padding: 0 64px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 24px auto 0;
    display: flex;
    flex-direction: row;
    align-items: start;
    justify-content: space-between;
    padding: 0 40px 0 77px;
  }
`
const Article = styled.article`
  max-width: 640px;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoint.xl} {
    margin: 35px 0 0 0;
  }
`

const ExternalSection = styled.div`
  color: ${
    /**
     * @param {Object} props
     * @param {Boolean} [props.shouldShowSectionColor]
     */
    ({ shouldShowSectionColor }) => shouldShowSectionColor && sectionColor
  };

  margin-left: 4px;
  padding-left: 8px;
  position: relative;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  ${({ theme }) => theme.breakpoint.md} {
    font-size: 18px;
    line-height: 25px;
    text-align: left;
  }
  &::before {
    display: none;

    ${({ theme }) => theme.breakpoint.md} {
      display: block;
      position: absolute;
      content: '';
      background-color: ${
        /**
         * @param {Object} props
         * @param {Boolean} [props.shouldShowSectionColor]
         */
        ({ shouldShowSectionColor }) => shouldShowSectionColor && sectionColor
      };

      left: -4px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 20px;
    }
  }
`

const Date = styled.div`
  width: fit-content;
  height: auto;
  font-size: 14px;
  line-height: 1.5;
  color: #a1a1a1;
  display: none;
  ${({ theme }) => theme.breakpoint.md} {
    display: block;
  }
`
const DateUnderContent = styled(Date)`
  color: ${({ theme }) => theme.color.brandColor.darkBlue};
  font-size: 16px;
  line-height: 1.15;
  margin-top: 32px;
  .time {
    color: ${({ theme }) => theme.color.brandColor.lightBlue};
  }
`
const SectionAndDate = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
  ${({ theme }) => theme.breakpoint.md} {
    justify-content: space-between;
    margin-bottom: 10px;
  }
`

const StyledExternalHeroImage = styled(ExternalHeroImage)``
const InfoAndHero = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.breakpoint.md} {
    ${StyledExternalHeroImage} {
      order: 10;
    }
  }
`
const SocialNetworkServiceSmall = styled(SocialNetworkService)`
  display: none;
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    margin-top: 20px;
  }
`
const SocialNetworkServiceLarge = styled(SocialNetworkService)`
  display: flex;
  margin-top: 20px;
  margin-bottom: 24px;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
const StoryMoreInfo = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: black;
  margin: 0 auto;
  text-align: center;
  a {
    color: ${({ theme }) => theme.color.brandColor.lightBlue};
    border-bottom: 1px solid ${({ theme }) => theme.color.brandColor.lightBlue};
  }
`

const StoryEnd = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: 60px auto 0;
  padding: 0 23.5px;
  ${({ theme }) => theme.breakpoint.md} {
    width: 640px;

    margin-top: 24px auto 0;
    gap: 16px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    gap: 36px;
    padding: 0;
  }
`
const StoryEndMobileTablet = styled(StoryEnd)`
  display: flex;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
const StoryEndDesktop = styled(StoryEnd)`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
  }
`
const Aside = styled.aside`
  width: 100%;
  ${({ theme }) => theme.breakpoint.xl} {
    width: 365px;
  }
`

const AsideFbPagePlugin = styled(FbPagePlugin)`
  display: none;
  text-align: center;
  height: 500px;
  margin: 20px 0;
  ${
    /**
     * @param {Object} param
     * @param {Theme} param.theme
     */
    ({ theme }) => theme.breakpoint.md
  } {
    display: block;
  }
`
const AdvertisementDable = styled.div`
  text-align: center;
  background-color: #eeeeee;
`
const AdvertisementDableDesktop = styled(AdvertisementDable)`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
    width: 640px;
    margin: 0 auto;
  }
`
const AdvertisementDableMobile = styled(AdvertisementDable)`
  display: block;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
    width: 640px;
  }
`

/**
 *
 * @param {Object} props
 * @param {External} props.external
 * @returns {JSX.Element}
 */
export default function ExternalNormalStyle({ external }) {
  const {
    id = '',
    slug = '',
    title = '',
    thumb = '',
    brief = '',
    // content = '',
    partner = {},
    publishedDate = '',
    updatedAt = '',
    extend_byline = '',
  } = external

  //Note: Although the `externals` post does not have `section` field, the default value for the external page is "news".
  const EXTERNAL_DEFAULT_SECTION = { name: '時事', slug: 'news' }

  //Note: The `heroImage` data in the `externals` post does not have `resized` property, only a single URL link. Here rewrite it into the format of "resized" for the "heroImage".
  const EXTERNAL_IMAGES_URL = {
    original: thumb,
    w480: '',
    w800: '',
    w1200: '',
    w1600: '',
    w2400: '',
  }

  const publishedTaipeiTime = transformTimeDataIntoDotFormat(publishedDate)
  const updatedTaipeiTime = transformTimeDataIntoDotFormat(updatedAt)

  const externalSectionTitle = getExternalSectionTitle(partner)
  const externalBrief = transformStringToDraft(id, brief)

  //Note: Since the `external` page has a default `section` value, the section color will be determined based on the value of sectionTitle.
  const shouldShowSectionColor = Boolean(
    EXTERNAL_DEFAULT_SECTION.slug && externalSectionTitle
  )

  /**
   * @returns {Promise<AsideArticleData[] | []>}
   */
  const handleFetchLatestNews = useCallback(async () => {
    try {
      /**
       * @type {import('@apollo/client').ApolloQueryResult<{posts: AsideArticleData[]}>}
       */
      const res = await client.query({
        query: fetchAsidePosts,
        variables: {
          take: 6,
          sectionSlug: EXTERNAL_DEFAULT_SECTION.slug,
          storySlug: slug,
        },
      })
      return res.data?.posts
    } catch (err) {
      console.error(err)
      return []
    }
  }, [slug, EXTERNAL_DEFAULT_SECTION.slug])

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
      return data.filter((data) => data).slice(0.6)
    } catch (err) {
      return []
    }
  }

  return (
    <>
      <PC_HD_Advertisement
        width="970px"
        height="250px"
        text="PC_HD 970*250"
      ></PC_HD_Advertisement>
      <Main>
        <Article>
          <SectionAndDate>
            <ExternalSection
              sectionSlug={EXTERNAL_DEFAULT_SECTION.slug}
              shouldShowSectionColor={shouldShowSectionColor}
            >
              {externalSectionTitle}
            </ExternalSection>
            <Date>{publishedTaipeiTime} 臺北時間</Date>
          </SectionAndDate>
          <Title>{title}</Title>
          <InfoAndHero>
            <StyledExternalHeroImage
              images={EXTERNAL_IMAGES_URL}
              title={title}
            />
            <ExternalArticleInfo
              updatedDate={updatedTaipeiTime}
              publishedDate={publishedTaipeiTime}
              credits={extend_byline}
            />
          </InfoAndHero>

          <ArticleBrief brief={externalBrief} />

          {/* <ArticleContent content={content} /> */}

          <DateUnderContent>
            <span>更新時間｜</span>
            <span className="time">{updatedTaipeiTime} 臺北時間</span>
          </DateUnderContent>
          <DonateBanner />
          <SocialNetworkServiceSmall />
          <SubscribeInviteBanner />

          <M_AT3_Advertisement
            text="M_AT3 336*280"
            width="336px"
            height="280px"
            className="ad"
          />
          <SocialNetworkServiceLarge
            shouldShowLargePagePlugin={true}
            flexDirection="column"
          />
          <M_AT3_Advertisement
            text="M_E1 336*280"
            width="336px"
            height="280px"
            className="ad"
          />
          <AdvertisementDableMobile>
            dable廣告(手機版)施工中......
          </AdvertisementDableMobile>

          <StoryEndDesktop>
            <StoryMoreInfo>
              更多內容，歡迎&nbsp;
              <Link href="/papermag" target="_blank">
                鏡週刊紙本雜誌
              </Link>
              、
              <Link href="/subscribe" target="_blank">
                鏡週刊數位訂閱
              </Link>
              、
              <Link href="/story/webauthorize/" target="_blank">
                了解內容授權資訊
              </Link>
              。
            </StoryMoreInfo>
            <MagazineInviteBanner />
            <AdvertisementDableDesktop>
              dable廣告 (桌機版) 施工中......
            </AdvertisementDableDesktop>
          </StoryEndDesktop>
        </Article>
        <Aside>
          <PC_R1_Advertisement
            text="PC_R1 300*600"
            width="300px"
            height="600px"
            className="ad"
          ></PC_R1_Advertisement>
          <AsideArticleList
            heading="最新文章"
            fetchArticle={handleFetchLatestNews}
            shouldReverseOrder={false}
            renderAmount={6}
          ></AsideArticleList>

          <PC_R2_Advertisement
            text="PC_R2 300*600"
            width="300px"
            height="600px"
            className="ad"
          ></PC_R2_Advertisement>
          <Divider />
          <AsideArticleList
            heading="熱門文章"
            fetchArticle={handleFetchPopularNews}
            shouldReverseOrder={false}
            renderAmount={6}
          ></AsideArticleList>
          <AsideFbPagePlugin></AsideFbPagePlugin>
        </Aside>
      </Main>
      <StoryEndMobileTablet>
        <StoryMoreInfo>
          更多內容，歡迎&nbsp;
          <Link href="/papermag" target="_blank">
            鏡週刊紙本雜誌
          </Link>
          、
          <Link href="/subscribe" target="_blank">
            鏡週刊數位訂閱
          </Link>
          、
          <Link href="/story/webauthorize/" target="_blank">
            了解內容授權資訊
          </Link>
          。
        </StoryMoreInfo>
        <MagazineInviteBanner />
        <AdvertisementDableDesktop>
          dable廣告 (桌機版) 施工中......
        </AdvertisementDableDesktop>
      </StoryEndMobileTablet>
    </>
  )
}
