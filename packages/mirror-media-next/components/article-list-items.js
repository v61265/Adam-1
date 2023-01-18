import styled from 'styled-components'
import ArticleListItem from './article-list-item'

const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 320px;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(2, 320px);
    gap: 20px 32px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    grid-template-columns: repeat(4, 220px);
    gap: 36px 48px;
  }
`

export default function ArticleListItems({ renderList, sections }) {
  return (
    <ItemContainer>
      {renderList.map((item) => (
        <ArticleListItem key={item.id} item={item} sections={sections} />
      ))}
    </ItemContainer>
  )
}
