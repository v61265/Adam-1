import { gql } from '@apollo/client'
import { partner } from '../fragments/partner'

const fetchPartnerBySlug = gql`
  ${partner}
  query fetchPartnerBySlug($slug: String) {
    partner(where: { slug: $slug }) {
      ...partner
    }
  }
`

export { fetchPartnerBySlug }
