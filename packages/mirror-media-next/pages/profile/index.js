import styled from 'styled-components'
import LayoutFull from '../../components/shared/layout-full'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'
import { useMembership } from '../../context/membership'
import { useEffect, useState } from 'react'
import client from '../../apollo/apollo-client'
import { fetchMemberProfileByFirebaseId } from '../../apollo/profile/query/fetch-member-profile'
import { fetchHeaderDataInDefaultPageLayout } from '../../utils/api'
import { setPageCache } from '../../utils/cache-setting'
import useMembershipRequired from '../../hooks/use-membership-required'
import redirectToLoginWhileUnauthed from '../../utils/redirect-to-login-while-unauthed'
import { getLogTraceObject } from '../../utils'
import { handleAxiosResponse } from '../../utils/response-handle'
import { getSectionAndTopicFromDefaultHeaderData } from '../../utils/data-process'
import SaveSuccess from '../../components/profile/save-success'
import SaveFailed from '../../components/profile/save-failed'

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
 * @typedef {Object} PageProps
 * @property {Object} headerData
 * @property {import('../../utils/api').HeadersData} headerData.sectionsData
 * @property {import('../../utils/api').Topics} headerData.topicsData
 */

/**
 * @param {PageProps} props
 * @returns {JSX.Element}
 */

export default function Profile({ headerData }) {
  useMembershipRequired()
  const { accessToken, firebaseId } = useMembership()

  const [profile, setProfile] = useState(null)
  const [savedStatus, setSavedStatus] = useState('normal')

  const handleSaved = (/** @type {string} */ status) => {
    setSavedStatus(status)
  }

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
        const memberProfileInfo = response?.data?.member
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
        data: headerData,
      }}
      footer={{ type: 'default' }}
    >
      {savedStatus === 'normal' && (
        <Page>
          <Title>個人資料</Title>
          <UserProfileForm profile={profile} onSaved={handleSaved} />
          <UserDeletionForm />
        </Page>
      )}
      {savedStatus === 'success' && <SaveSuccess />}
      {savedStatus === 'error' && <SaveFailed />}
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

    const responses = await Promise.allSettled([
      fetchHeaderDataInDefaultPageLayout(),
    ])

    // handle header data
    const [sectionsData, topicsData] = handleAxiosResponse(
      responses[0],
      getSectionAndTopicFromDefaultHeaderData,
      'Error occurs while getting header data in profile page',
      globalLogFields
    )

    return {
      props: {
        headerData: { sectionsData, topicsData },
      },
    }
  }
)
