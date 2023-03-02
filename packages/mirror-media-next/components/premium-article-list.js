import styled from 'styled-components'
import PremiumArticleListItem from './premium-article-list-item'

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
    grid-template-columns: repeat(3, 320px);
    gap: 32px 32px;
  }
`

/**
 * @param {Object} props
 * @param {import('../type/shared/article').Article[]} props.renderList
 * @param {import('../type/category').CategorySection} [props.section]
 * @returns {React.ReactElement}
 */
export default function PremiumArticleList({ renderList, section }) {
  return (
    <ItemContainer>
      {renderList.map((item) => (
        <PremiumArticleListItem key={item.id} item={item} section={section} />
      ))}
    </ItemContainer>
  )
}
