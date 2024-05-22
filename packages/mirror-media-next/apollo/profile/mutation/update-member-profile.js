import { gql } from '@apollo/client'

export const updateMemberProfile = gql`
  mutation updateMemberProfile(
    $id: ID!
    $address: String
    $country: String
    $city: String
    $district: String
    $birthday: String
    $gender: memberGenderType
    $name: String
    $phone: String
  ) {
    updatemember(
      id: $id
      data: {
        address: $address
        country: $country
        city: $city
        district: $district
        birthday: $birthday
        gender: $gender
        name: $name
        phone: $phone
      }
    ) {
      address
      country
      city
      district
      birthday
      gender
      phone
    }
  }
`
