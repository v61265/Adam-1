import styled from 'styled-components'
import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
const { DraftRenderer } = MirrorMedia
/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

const BriefContainer = styled.div`
  background-color: ${
    /**
     * @param {Object} props
     * @param {String} props.sectionSlug
     * @param {Theme} [props.theme]
     */
    ({ theme, sectionSlug }) =>
      sectionSlug && theme.color.sectionsColor[sectionSlug]
        ? theme.color.sectionsColor[sectionSlug]
        : theme.color.brandColor.darkBlue
  };
  padding: 16px 24px;
  font-weight: 500;
  font-size: 18px;
  line-height: 36px;
  ${({ theme }) => theme.breakpoint.md} {
    font-weight: 400;
    font-size: 19.2px;
    padding: 19.2px 48.6px 20.8px 28.4px;
  }
  *,
  *::before,
  *::after {
    color: white;
  }
  .DraftEditor-editorContainer {
    background-color: ${
      /**
       * @param {Object} props
       * @param {String} props.sectionSlug
       * @param {Theme} [props.theme]
       */
      ({ theme, sectionSlug }) =>
        sectionSlug && theme.color.sectionsColor[sectionSlug]
          ? theme.color.sectionsColor[sectionSlug]
          : theme.color.brandColor.darkBlue
    };
  }
`
/**
 *
 * @param {Object} props
 * @param {Object} props.brief
 * @param {String} [props.sectionSlug]
 * @returns {JSX.Element}
 */
export default function ArticleBrief({
  brief = { blocks: [], entityMap: {} },
  sectionSlug = '',
}) {
  return (
    <BriefContainer sectionSlug={sectionSlug}>
      <DraftRenderer rawContentBlock={brief}></DraftRenderer>
    </BriefContainer>
  )
}
