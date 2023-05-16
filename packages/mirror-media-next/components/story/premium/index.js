import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import ArticleBrief from '../shared/brief'
/**
 * @typedef {import('../../../apollo/fragments/post').Post} PostData
 */

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
  const { content, brief } = postData
  return (
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
  )
}
