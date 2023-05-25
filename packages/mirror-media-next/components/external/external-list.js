import styled from 'styled-components'
import ExternalListItem from './external-list-item'

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
 * @typedef {import('../../apollo/fragments/external').External} External
 */

/**
 * @param {Object} props
 * @param {External[]} props.renderList
 * @returns {React.ReactElement}
 */
export default function ExternalList({ renderList }) {
  return (
    <ItemContainer>
      {renderList.map((item) => (
        <ExternalListItem key={item.id} item={item} />
      ))}
    </ItemContainer>
  )
}
