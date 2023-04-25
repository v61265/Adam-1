import styled from 'styled-components'
import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
const { DraftRenderer, hasContentInRawContentBlock } = MirrorMedia

/**
 * @typedef {import('../../../type/draft-js').Draft} Content
 */

const Wrapper = styled.section`
  margin-top: 32px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 20px;
  }
`

/**
 *
 * @param {Object} props
 * @param {Content} props.content
 * @returns {JSX.Element}
 */
export default function ArticleContent({
  content = { blocks: [], entityMap: {} },
}) {
  const shouldRenderContent = hasContentInRawContentBlock(content)
  return (
    shouldRenderContent && (
      <Wrapper>
        <DraftRenderer rawContentBlock={content} />
      </Wrapper>
    )
  )
}
