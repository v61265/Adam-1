import { gql } from '@apollo/client'

export const fetchMemberProfileByFirebaseId = gql`
  query fetchMemberProfile($firebaseId: String!) {
    member(where: { firebaseId: $firebaseId }) {
      id
      firebaseId
      email
      name
      gender
      birthday
      phone
      country
      city
      district
      address
    }
  }
`
