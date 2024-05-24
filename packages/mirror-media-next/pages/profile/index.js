import styled from 'styled-components'
import LayoutFull from '../../components/shared/layout-full'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'
import { useMembership } from '../../context/membership'
import { useEffect, useState } from 'react'
import client from '../../apollo/apollo-client'
import { fetchMemberProfileByFirebaseId } from '../../apollo/profile/query/fetch-member-profile'
import errors from '@twreporter/errors'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import { setPageCache } from '../../utils/cache-setting'
import useMembershipRequired from '../../hooks/use-membership-required'
import redirectToLoginWhileUnauthed from '../../utils/redirect-to-login-while-unauthed'
import { getLogTraceObject } from '../../utils'

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
 * @param {Object} props
 * @param {Object[] } props.sectionsData
 * @param {Object[]} props.topicsData
 * @returns {JSX.Element}
 */

export default function Profile({ sectionsData = [], topicsData = [] }) {
  useMembershipRequired()
  const { accessToken, firebaseId } = useMembership()

  const [profile, setProfile] = useState({})

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

  return (
    <LayoutFull
      head={{ title: `個人資料` }}
      header={{
        type: 'default',
        data: { sectionsData: sectionsData, topicsData },
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

/**
 * @type {import('next').GetServerSideProps}
 */
export const getServerSideProps = redirectToLoginWhileUnauthed()(
  async ({ req, res }) => {
    setPageCache(res, { cachePolicy: 'no-store' }, req.url)

    const globalLogFields = getLogTraceObject(req)

    let sectionsData = []
    let topicsData = []

    try {
      const headerData = await fetchHeaderDataInDefaultPageLayout()
      if (Array.isArray(headerData.sectionsData)) {
        sectionsData = headerData.sectionsData
      }
      if (Array.isArray(headerData.topicsData)) {
        topicsData = headerData.topicsData
      }
    } catch (err) {
      const annotatingAxiosError = errors.helpers.annotateAxiosError(err)
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(annotatingAxiosError, {
            withStack: true,
            withPayload: true,
          }),
          ...globalLogFields,
        })
      )
    }

    return {
      props: {
        sectionsData,
        topicsData,
      },
    }
  }
)
