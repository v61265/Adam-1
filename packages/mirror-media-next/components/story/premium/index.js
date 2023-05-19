import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ShareHeader from '../../shared/share-header'
import DraftRenderBlock from '../shared/draft-renderer-block'
import ArticleBrief from '../shared/brief'
import { fetchHeaderDataInPremiumPageLayout } from '../../../utils/api'
import { sortArrayWithOtherArrayId } from '../../../utils'
import errors from '@twreporter/errors'
import TitleAndInfoAndHero from './title-and-info-and-hero'

/**
 * @typedef {import('../../../apollo/fragments/post').Post} PostData
 */
/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

const HeaderPlaceHolder = styled.header`
  background-color: transparent;
  height: 101px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoint.md} {
    height: 115px;
  }
`

const Main = styled.main`
  width: 100%;
  margin: auto;
`

const ContentWrapper = styled.section`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 20px 20px;
  border: none;
  position: relative;
  .content {
    width: 100%;
    margin: 20px auto 0;
    max-width: 640px;
  }

  ${({ theme }) => theme.breakpoint.md} {
    padding: 0 0 32px;

    border-bottom: 1px black solid;
    .content {
      margin: 40px auto 0;
    }
  }
`

/**
 * In premium article, we have to select one element in array `sections` and render it's name.
 * The logic of select title for render is :
 * 1. If the first element's slug is `member`, and second element is existed,
 * then show second element's name.
 * 2. If the first element's slug is `member`, but second element is not existed,
 * then show first element's name, which is `會員專區`.
 * 3. If the first element's slug is not `member`,
 * then show first element's name, which name is definitely not `member`.
 * @param {import('../../../apollo/fragments/section').Section[]} sections
 * @returns {string | undefined}
 */
function getSectionLabelFirst(sections) {
  if (!sections || !sections.length) {
    return undefined
  }
  if (sections?.[0]?.slug === 'member' && sections?.[1]) {
    return sections?.[1]?.name
  } else {
    return sections?.[0]?.name
  }
}

/**
 *
 * @param {Object} props
 * @param {PostData} props.postData
 * @returns {JSX.Element}
 */
export default function StoryPremiumStyle({ postData }) {
  const [headerData, setHeaderData] = useState({
    sectionsData: [],
  })
  const [isHeaderDataLoaded, setIsHeaderDataLoaded] = useState(false)
  const {
    title,
    brief = { blocks: [], entityMap: {} },
    content = { blocks: [], entityMap: {} },
    sections = [],
    manualOrderOfSections = [],
    writers = [],
    manualOrderOfWriters = [],
    photographers = [],
    camera_man = [],
    designers = [],
    engineers = [],
    vocals = [],
    extend_byline = '',
    updatedAt = '',
    publishedDate = '',
    tags = [],
    heroImage,
    heroVideo,
    heroCaption,
  } = postData

  const sectionsWithOrdered =
    manualOrderOfSections && manualOrderOfSections.length
      ? sortArrayWithOtherArrayId(sections, manualOrderOfSections)
      : sections
  const sectionLabelFirst = getSectionLabelFirst(sectionsWithOrdered)
  const writersWithOrdered =
    manualOrderOfWriters && manualOrderOfWriters.length
      ? sortArrayWithOtherArrayId(writers, manualOrderOfWriters)
      : writers

  const credits = [
    { writers: writersWithOrdered },
    { photographers: photographers },
    { camera_man: camera_man },
    { designers: designers },
    { engineers: engineers },
    { vocals: vocals },
    { extend_byline: extend_byline },
  ]

  useEffect(() => {
    let ignore = false
    fetchHeaderDataInPremiumPageLayout()
      .then((res) => {
        if (!ignore && !isHeaderDataLoaded) {
          const { sectionsData } = res
          setHeaderData({ sectionsData })
          setIsHeaderDataLoaded(true)
        }
      })
      .catch((error) => {
        if (!ignore && !isHeaderDataLoaded) {
          console.log(
            errors.helpers.printAll(
              error,
              {
                withStack: true,
                withPayload: true,
              },
              0,
              0
            )
          )
          setIsHeaderDataLoaded(true)
        }
      })

    return () => {
      ignore = true
    }
  }, [isHeaderDataLoaded])

  return (
    <>
      {isHeaderDataLoaded ? (
        <ShareHeader
          pageLayoutType="premium"
          headerData={{
            sectionsData: headerData.sectionsData,
          }}
        ></ShareHeader>
      ) : (
        <HeaderPlaceHolder />
      )}

      <Main>
        <article>
          <TitleAndInfoAndHero
            sectionLabelFirst={sectionLabelFirst}
            title={title}
            heroImage={heroImage}
            heroVideo={heroVideo}
            heroCaption={heroCaption}
            credits={credits}
            publishedDate={publishedDate}
            updatedAt={updatedAt}
            tags={tags}
          />

          <ContentWrapper>
            <section className="content">
              <ArticleBrief
                sectionSlug="member"
                brief={brief}
                contentLayout="premium"
              ></ArticleBrief>
              <DraftRenderBlock
                contentLayout="premium"
                rawContentBlock={content}
              ></DraftRenderBlock>
            </section>
          </ContentWrapper>
        </article>
      </Main>
    </>
  )
}
