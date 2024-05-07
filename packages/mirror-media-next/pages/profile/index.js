import styled from 'styled-components'
import LayoutFull from '../../components/shared/layout-full'
import UserProfileForm from '../../components/profile/user-profile-form'
import UserDeletionForm from '../../components/profile/user-deletion-form'

const Page = styled.main`
  padding: 40px 20px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.md} {
    width: 596px;
    padding: 60px 0;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 680px;
  }
`

/**
 * @param {Object} props
 * @returns {JSX.Element}
 */

export default function page() {
  return (
    <LayoutFull
      head={{ title: `個人資料` }}
      header={{
        type: 'default',
      }}
      footer={{ type: 'default' }}
    >
      <Page>
        <UserProfileForm />
        <UserDeletionForm />
      </Page>
    </LayoutFull>
  )
}
