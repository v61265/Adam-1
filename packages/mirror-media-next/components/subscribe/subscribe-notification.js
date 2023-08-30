import styled from 'styled-components'
import { NOTIFICATIONS } from '../../constants/subscribe-constants'

const NoticeWrapper = styled.section`
  line-height: 150%;
  margin: 24px auto;
  width: 90%;
  min-height: 100px;
  background-color: #fff;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 48px auto;
    width: 85%;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 960px;
  }
`

const Title = styled.h2`
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-weight: 500;
`

const Ul = styled.ul`
  padding-left: 18px;
  list-style: disc;
`
const Li = styled.li`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
`

export default function Notification() {
  return (
    <NoticeWrapper>
      <Title>注意事項</Title>
      <Ul>
        {NOTIFICATIONS.map((notification) => (
          <Li
            key={notification.id}
            className={notification.style === 'warning' ? 'warning-style' : ''}
            dangerouslySetInnerHTML={{ __html: notification.text }}
          />
        ))}
      </Ul>
    </NoticeWrapper>
  )
}
