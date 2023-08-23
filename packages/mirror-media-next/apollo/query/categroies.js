import { gql } from '@apollo/client'
import { category, categoryWithSection } from '../fragments/category'

const fetchCategorySections = gql`
  ${categoryWithSection}
  query ($categorySlug: String) {
    category(where: { slug: $categorySlug, state: { equals: "active" } }) {
      ...categoryWithSection
    }
  }
`

const fetchCategory = gql`
  ${category}
  query ($categorySlug: String) {
    category(where: { slug: $categorySlug, state: { equals: "active" } }) {
      ...category
    }
  }
`

export { fetchCategorySections, fetchCategory }
