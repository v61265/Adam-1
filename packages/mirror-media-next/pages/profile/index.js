import styled from 'styled-components'
import Layout from '../../components/shared/layout'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'

const Page = styled.main`
  padding: 40px 20px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 60px 84px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 60px 260px;
  }
`

/**
 * @param {Object} props
 * @param {Object[]} props.sectionsData
 * @param {Object[]} props.topicsData
 * @return {JSX.Element}
 */

export default function page({ sectionsData = [], topicsData = [] }) {
  return (
    <Layout
      head={{ title: `個人資料` }}
      header={{
        type: 'default',
        data: { sectionsData: sectionsData, topicsData },
      }}
      footer={{ type: 'default' }}
    >
      <Page>
        <UserProfileForm />
        <UserDeletionForm />
      </Page>
    </Layout>
  )
}
