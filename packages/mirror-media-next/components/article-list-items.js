import styled from 'styled-components'
import ArticleListItem from './article-list-item'

const ItemContainer = styled.div`
  ${({ theme }) => theme.breakpoint.md} {
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, 244px);
    justify-content: center;
  }
`

export default function ArticleListItems({ renderList }) {
  return (
    <ItemContainer>
      {renderList.map((item) => (
        <ArticleListItem key={item.id} item={item} />
      ))}
    </ItemContainer>
  )
}
