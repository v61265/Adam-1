import styled from 'styled-components'
import LayoutFull from '../components/shared/layout-full'
import GenericFailed from '../components/login/generic-failed'
import { useRouter } from 'next/router'

const Container = styled.div`
  flex-grow: 1;

  background-color: #fff;
  ${({ theme }) => theme.breakpoint.md} {
    background-color: #f2f2f2;
  }
`

export default function PasswordChangeFail() {
  const router = useRouter()

  /** @type {import('react').MouseEventHandler<HTMLButtonElement>} */
  const onBack = () => {
    router.replace({
      pathname: '/recover-password',
    })
  }

  return (
    <LayoutFull header={{ type: 'default' }} footer={{ type: 'default' }}>
      <Container>
        <GenericFailed primaryText="請回上一頁重試" onBack={onBack} />
      </Container>
    </LayoutFull>
  )
}
