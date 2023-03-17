import { gql } from '@apollo/client'
import { categroyWithSection } from '../fragments/category'

const fetchCategorySections = gql`
  ${categroyWithSection}
  query ($categorySlug: String) {
    category(where: { slug: $categorySlug }) {
      ...categroyWithSection
    }
  }
`

export { fetchCategorySections }
