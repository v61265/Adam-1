import { gql } from '@apollo/client'
import { external } from '../fragments/external'

const fetchExternalsByPartnerSlug = gql`
  ${external}
  query (
    $take: Int
    $skip: Int
    $orderBy: [ExternalOrderByInput!]!
    $filter: ExternalWhereInput!
  ) {
    externals(take: $take, skip: $skip, orderBy: $orderBy, where: $filter) {
      ...external
    }
  }
`

const fetchExternalCounts = gql`
  query ($filter: ExternalWhereInput!) {
    externalsCount(where: $filter)
  }
`

export { fetchExternalsByPartnerSlug, fetchExternalCounts }
