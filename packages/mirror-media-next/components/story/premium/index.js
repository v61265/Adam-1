import { useState, useEffect } from 'react'
import styled from 'styled-components'
import ShareHeader from '../../shared/share-header'
import DraftRenderBlock from '../shared/draft-renderer-block'
import ArticleBrief from '../shared/brief'
import { fetchHeaderDataInPremiumPageLayout } from '../../../utils/api'
import errors from '@twreporter/errors'
/**
 * @typedef {import('../../../apollo/fragments/post').Post} PostData
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

  const { content, brief } = postData
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
