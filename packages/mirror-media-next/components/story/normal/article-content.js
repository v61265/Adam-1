import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import { copyAndSliceDraftBlock, getBlocksCount } from '../../../utils/story'
import dynamic from 'next/dynamic'
import useWindowDimensions from '../../../hooks/use-window-dimensions'
import { useDisplayAd } from '../../../hooks/useDisplayAd'
import { getSectionGPTPageKey } from '../../../utils/ad'

const GPTAd = dynamic(() => import('../../../components/ads/gpt/gpt-ad'), {
  ssr: false,
})

/**
 * @typedef {import('../../../type/draft-js').Draft} Content
 */

const Wrapper = styled.section`
  margin-top: 32px;
  display: grid;
  gap: 32px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 20px;
  }
`

const StyledGPTAd = styled(GPTAd)`
  width: 100%;
  height: auto;
  max-width: 336px;
  max-height: 280px;
  margin: auto;

  display: ${
    /**
     * @param {Object} props
     * @param {string | undefined} props.pageKey
     */
    (props) => (props.pageKey ? 'block' : 'none')
  };

  ${({ theme }) => theme.breakpoint.xl} {
    max-width: 640px;
    max-height: 390px;
  }
`

/**
 *
 * @param {Object} props
 * @param {Content} props.content
 * @param {string | undefined} props.sectionSlug
 * @returns {JSX.Element}
 */
export default function ArticleContent({
  content = { blocks: [], entityMap: {} },
  sectionSlug,
}) {
  const shouldShowAd = useDisplayAd()
  const windowDimensions = useWindowDimensions()

  const blocksLength = getBlocksCount(content)
  const GPTpageKey = getSectionGPTPageKey(sectionSlug)

  //The GPT advertisement for the `mobile` version includes `AT1` & `AT2`
  const MB_contentJsx = (
    <Wrapper>
      <DraftRenderBlock
        rawContentBlock={copyAndSliceDraftBlock(content, 0, 1)}
        contentLayout="normal"
      />

      {blocksLength > 1 && (
        <>
          {shouldShowAd && <StyledGPTAd pageKey={GPTpageKey} adKey="MB_AT1" />}

          <DraftRenderBlock
            rawContentBlock={copyAndSliceDraftBlock(content, 1, 5)}
            contentLayout="normal"
          />
        </>
      )}

      {blocksLength > 5 && (
        <>
          {shouldShowAd && <StyledGPTAd pageKey={GPTpageKey} adKey="MB_AT2" />}

          <DraftRenderBlock
            rawContentBlock={copyAndSliceDraftBlock(content, 5)}
            contentLayout="normal"
          />
        </>
      )}
    </Wrapper>
  )

  //The GPT advertisement for the `desktop` version only `AT1`
  const PC_contentJsx = (
    <Wrapper>
      <DraftRenderBlock
        rawContentBlock={copyAndSliceDraftBlock(content, 0, 3)}
        contentLayout="normal"
      />

      {blocksLength > 3 && (
        <>
          {shouldShowAd && <StyledGPTAd pageKey={GPTpageKey} adKey="PC_AT1" />}

          <DraftRenderBlock
            rawContentBlock={copyAndSliceDraftBlock(content, 3)}
            contentLayout="normal"
          />
        </>
      )}
    </Wrapper>
  )

  const contentJsx =
    windowDimensions.width > 1200 ? PC_contentJsx : MB_contentJsx

  return <>{contentJsx}</>
}
