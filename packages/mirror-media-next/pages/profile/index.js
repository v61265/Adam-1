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
        <Title>個人資料</Title>
        <UserProfileForm />
        <UserDeletionForm />
      </Page>
    </LayoutFull>
  )
}
