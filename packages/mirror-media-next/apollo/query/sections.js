import { gql } from '@apollo/client'
import { section } from '../fragments/section'

const fetchSection = gql`
  ${section}
  query ($where: SectionWhereUniqueInput!) {
    section(where: $where) {
      ...section
    }
  }
`

export { fetchSection }
