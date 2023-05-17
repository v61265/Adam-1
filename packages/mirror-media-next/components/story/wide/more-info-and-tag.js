import styled from 'styled-components'
import Link from 'next/link'
import Tags from '../shared/tags'
/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

/**
 * @typedef {import('../../../apollo/fragments/tag').Tag[]}Tags
 */

const Wrapper = styled.section`
  margin-top: 32px;
  .copyright-warning {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    line-height: 1.8;
  }
  .more-info {
    display: none;
    ${
      /**
       * @param {{theme: Theme}} param
       */
      ({ theme }) => theme.breakpoint.md
    } {
      display: block;
      margin-top: 8px;
      color: rgba(0, 0, 0, 0.5);
      font-size: 14px;
      line-height: 1.8;
    }
    .link {
      color: ${({ theme }) => theme.color.brandColor.darkBlue};
    }
  }
`
const StyledTags = styled(Tags)`
  margin-top: 32px;
`
/**
 *
 * @param {Object} props
 * @param {Tags} props.tags
 * @returns {JSX.Element}
 */
export default function MoreInfoAndTag({ tags }) {
  return (
    <Wrapper>
      <p className="copyright-warning">
        本新聞文字、照片、影片專供鏡週刊會員閱覽，未經鏡週刊授權，任何媒體、社群網站、論壇等均不得引用、改寫、轉貼，以免訟累。
      </p>
      <p className="more-info">
        更多內容，歡迎
        <Link className="link" href="/papermag">
          訂閱鏡週刊
        </Link>
        、
        <Link className="link" href="/story/webauthorize">
          了解內容授權資訊
        </Link>
        。
      </p>
      <StyledTags tags={tags}></StyledTags>
    </Wrapper>
  )
}
