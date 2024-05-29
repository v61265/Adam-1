import styled from 'styled-components'
import LayoutFull from '../../components/shared/layout-full'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'
import { useState } from 'react'
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
  const [savedStatus, setSavedStatus] = useState('normal')

  const handleSaved = (/** @type {string} */ status) => {
    setSavedStatus(status)
  }

  const resetStatus = () => {
    setSavedStatus('normal')
  }

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
          <UserProfileForm onSaved={handleSaved} />
          <UserDeletionForm />
        </Page>
      )}
      {savedStatus === 'success' && <SaveSuccess onReset={resetStatus} />}
      {savedStatus === 'error' && <SaveFailed onReset={resetStatus} />}
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
