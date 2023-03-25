import styled from 'styled-components'
import TopicListItem from './topic-list-item'

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
  return (
    <ItemContainer>
      {renderList.map((item) => (
        <TopicListItem key={item.id} item={item} />
      ))}
    </ItemContainer>
  )
}
