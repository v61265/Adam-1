import styled from 'styled-components'
import {
  transformTimeDataIntoDotFormat,
  sortArrayWithOtherArrayId,
} from '../../utils'
import { color } from '../../styles/theme/color'

const Wrapper = styled.section``

const Section = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
`

const Title = styled.h1`
  margin: 4px 0 12px 0;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  color: rgba(0, 0, 0, 0.87);
`

const DateRow = styled.div`
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  color: rgba(0, 0, 0, 0.5);
  padding-top: 8px;
  span + span {
    margin-left: 8px;
  }
`

/**
 * @param {Object} props
 * @property {Section[]} sections
 * @property {Section[]} manualOrderOfSections
 * @property {string} title - post title
 * @property {string} publishedDate - post published date
 * @property {string} updatedAt - post updated date
 * @returns {JSX.Element}
 */
export default function AmpInfo({
  title = '',
  sections = [],
  manualOrderOfSections = [],
  publishedDate = '',
  updatedAt = '',
}) {
  const publishedTaipeiTime = transformTimeDataIntoDotFormat(publishedDate)
  const updatedTaipeiTime = transformTimeDataIntoDotFormat(updatedAt)

  const sectionsWithOrdered =
    manualOrderOfSections && manualOrderOfSections.length
      ? sortArrayWithOtherArrayId(sections, manualOrderOfSections)
      : sections
  const [section] = sectionsWithOrdered
  const sectionColor = color.sectionsColor[section.slug]

  return (
    <Wrapper>
      <Section style={{ color: sectionColor || '#000' }}>
        {section?.name || ''}
      </Section>
      <Title>{title}</Title>
      <DateRow>
        <span>發佈時間</span>
        <span>{publishedTaipeiTime}</span>
      </DateRow>
      <DateRow>
        <span>發佈時間</span>
        <span>{updatedTaipeiTime}</span>
      </DateRow>
    </Wrapper>
  )
}
