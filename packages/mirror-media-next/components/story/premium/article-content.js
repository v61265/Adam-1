import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import dynamic from 'next/dynamic'
import { copyAndSliceDraftBlock, getBlocksCount } from '../../../utils/story'
import useWindowDimensions from '../../../hooks/use-window-dimensions'
import { useDisplayAd } from '../../../hooks/useDisplayAd'
import { SECTION_IDS } from '../../../constants'

const GPTAd = dynamic(() => import('../../../components/ads/gpt/gpt-ad'), {
  ssr: false,
})

/**
 * @typedef {import('../../../type/draft-js').Draft} Content
 */

const Wrapper = styled.section`
  display: grid;
  gap: 32px;
`

const StyledGPTAd = styled(GPTAd)`
  width: 100%;
  height: auto;
  max-width: 336px;
  max-height: 280px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 640px;
    max-height: 390px;
  }
`

/**
 *
 * @param {Object} props
 * @param {Content} props.content
 * @param {string} [props.className]
 * @param {boolean} [props.hiddenAdvertised] - CMS Posts「google廣告違規」
 * @returns {JSX.Element}
 */
export default function PremiumArticleContent({
  content = { blocks: [], entityMap: {} },
  className = '',
  hiddenAdvertised = false,
}) {
  const shouldShowAd = useDisplayAd(hiddenAdvertised)
  const windowDimensions = useWindowDimensions()
  const blocksLength = getBlocksCount(content)

  //The GPT advertisement for the `mobile` version includes `AT1`
  const MB_contentJsx = (
    <Wrapper className={className}>
      <DraftRenderBlock
        rawContentBlock={copyAndSliceDraftBlock(content, 0, 1)}
        contentLayout="premium"
      />

      {blocksLength > 1 && (
        <>
          {shouldShowAd && (
            <StyledGPTAd pageKey={SECTION_IDS['member']} adKey="MB_AT1" />
          )}

          <DraftRenderBlock
            rawContentBlock={copyAndSliceDraftBlock(content, 1)}
            contentLayout="premium"
          />
        </>
      )}
    </Wrapper>
  )

  const PC_contentJsx = (
    <Wrapper className={className}>
      <DraftRenderBlock rawContentBlock={content} contentLayout="premium" />
    </Wrapper>
  )

  const contentJsx =
    windowDimensions.width > 1200 ? PC_contentJsx : MB_contentJsx

  return <>{contentJsx}</>
}
