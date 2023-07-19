import Link from 'next/link'
import styled from 'styled-components'
import AmpPopIn from './amp-ads/amp-popin-ad'
import AmpGptAd from './amp-ads/amp-gpt-ad'

const RelatedWrapper = styled.section`
  width: 100%;
  padding: 0 20px;
`

const RelatedTitle = styled.h2`
  font-weight: 600;
  font-size: 21px;
  line-height: 150%;
  color: ${({ theme }) => theme.color.brandColor.gray};
  margin: 24px 0;
  text-align: center;
`

const RelatedItem = styled(Link)`
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: ${({ theme }) => theme.color.brandColor.darkBlue};
  &:hover {
    color: #ffa011;
  }
  & + & {
    margin-top: 20px;
  }
`

const StyledAmpGptAd = styled(AmpGptAd)`
  margin-top: 20px;
`

/**
 * @typedef {(import('../../apollo/fragments/post').Related)[]} Relateds
 */
/**
 *
 * @param {Object} props
 * @param {Relateds} props.relateds
 * @param {string} props.section
 * @returns {JSX.Element}
 */

export default function AmpHeader({ relateds, section }) {
  console.log(relateds.length, section)

  return (
    <RelatedWrapper>
      <RelatedTitle>相關文章</RelatedTitle>
      {relateds.map((relatedItem, index) => {
        return (
          <RelatedItem
            href={`/story/${relatedItem.slug}`}
            target="_blank"
            key={index}
            rel="noreferrer"
          >
            {relatedItem.title}
          </RelatedItem>
        )
      })}
      <StyledAmpGptAd section={section} position="E1" />
      <AmpPopIn />
    </RelatedWrapper>
  )
}
