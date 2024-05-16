import styled from 'styled-components'
import LayoutFull from '../../components/shared/layout-full'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'
import { useMembership } from '../../context/membership'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import client from '../../apollo/apollo-client'
import { fetchMemberProfileByFirebaseId } from '../../apollo/query/profile'

const Page = styled.main`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: min(596px, 100vw);
  overflow-x: hidden;

  ${({ theme }) => theme.breakpoint.md} {
    width: 600px;
    max-width: unset;
    padding: 60px 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 680px;
  }
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  line-height: 36px;
  margin-bottom: 24px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 12px;
  }
`

/**
 * @returns {JSX.Element}
 */

export default function Profile() {
  const router = useRouter()

  const { isLoggedIn, isLogInProcessFinished, accessToken, firebaseId } =
    useMembership()

  const [profile, setProfile] = useState({})

  useEffect(() => {
    if (isLogInProcessFinished && !isLoggedIn) {
      const destination = encodeURIComponent('/profile')
      router.push(`/login?destination=${destination}`)
    }
  }, [isLogInProcessFinished, isLoggedIn, router])

  useEffect(() => {
    const fetchMemberProfile = async () => {
      try {
        const response = await client.query({
          query: fetchMemberProfileByFirebaseId,
          variables: { firebaseId: firebaseId },
          context: {
            uri: '/member/graphql',
            header: {
              authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          },
        })

        /**
         * @typedef {import('../../type/profile.js').Member} Member
         */

        /**
         * @type {Member | null}
         */
        const memberProfileInfo = response?.data?.member ?? null
        setProfile(memberProfileInfo)
      } catch (error) {
        console.error(error)
      }
    }
    if (firebaseId && accessToken) {
      fetchMemberProfile()
    }
  }, [firebaseId, accessToken])

  if (!isLoggedIn) return null

  return (
    <LayoutFull
      head={{ title: `個人資料` }}
      header={{
        type: 'default',
      }}
      footer={{ type: 'default' }}
    >
      <Page>
        <Title>個人資料</Title>
        <UserProfileForm profile={profile} />
        <UserDeletionForm />
      </Page>
    </LayoutFull>
  )
}
