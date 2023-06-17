import { Fragment } from 'react'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import TopicListItem from './topic-list-item'
import { needInsertMicroAdAfter, getMicroAdUnitId } from '../../../utils/ad'
import { useDisplayAd } from '../../../hooks/useDisplayAd'

const StyledMicroAd = dynamic(
  () => import('../../../components/ads/micro-ad/micro-ad-with-label'),
  {
    ssr: false,
  }
)

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 320px;
  justify-content: center;
  row-gap: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(2, 320px);
    gap: 20px 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    grid-template-columns: repeat(4, 220px);
    gap: 36px 48px;
  }
`

/**
 * @typedef {import('./topic-list-item').Topic} Topic
 */

/**
 * @param {Object} props
 * @param {Topic[]} props.renderList
 * @returns {React.ReactElement}
 */
export default function TopicList({ renderList }) {
  const shouldShowAd = useDisplayAd()

  return (
    <ItemContainer>
      {renderList.map((item, index) => (
        <Fragment key={item.id}>
          <TopicListItem item={item} />
          {shouldShowAd && needInsertMicroAdAfter(index) && (
            <StyledMicroAd
              unitId={getMicroAdUnitId(index, 'LISTING', 'RWD')}
              microAdType="LISTING"
            />
          )}
        </Fragment>
      ))}
    </ItemContainer>
  )
}
