import { gql } from '@apollo/client'

/**
 * @typedef {Object} Member
 * @property {string} id
 * @property {string} firebaseId
 * @property {string} email
 * @property {string} name
 * @property {string} gender
 * @property {string} birthday
 * @property {string} phone
 * @property {string} country
 * @property {string} city
 * @property {string} district
 * @property {string} address
 */

export const fetchMemberProfile = gql`
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
