import Link from 'next/link'
import styled from 'styled-components'

const RelatedWrapper = styled.section`
  max-width: 100vw;
  min-width: 100vw;
  padding: 0 20px;
`

const RelatedTitle = styled.h2`
  font-weight: 600;
  font-size: 21px;
  line-height: 150%;
  color: #888888;
  margin: 24px 0;
  text-align: center;
`

const RelatedItem = styled(Link)`
  display: block;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #054f77;
  &:hover {
    color: #ffa011;
  }
  & + & {
    margin-top: 20px;
  }
`

/**
 * @typedef {(import('../../apollo/fragments/post').Related)[]} Relateds
 */
/**
 *
 * @param {Object} props
 * @param {Relateds} props.relateds
 * @returns {JSX.Element}
 */
export default function AmpHeader({ relateds }) {
  return (
    <RelatedWrapper>
      <RelatedTitle>相關文章</RelatedTitle>
      {relateds.map((relatedItem, index) => {
        return (
          <RelatedItem
            className="i-amp-related__item"
            href={`/story/${relatedItem.slug}`}
            target="_blank"
            key={index}
            rel="noreferrer"
          >
            {relatedItem.title}
          </RelatedItem>
        )
      })}
    </RelatedWrapper>
  )
}
