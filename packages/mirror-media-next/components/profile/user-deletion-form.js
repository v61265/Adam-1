import Link from 'next/link'
import styled from 'styled-components'

const UserDeletionFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;

  ${({ theme }) => theme.breakpoint.md} {
    margin: 48px auto 0;
  }

  a {
    color: #e51731;
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
    text-decoration: underline;
  }
`
const DeletionPara = styled.p`
  margin-top: 12px;
  color: #00000080;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
`

export default function UserDeletionForm() {
  return (
    <UserDeletionFormWrapper>
      <Link href={`/cancelMembership`}>刪除會員</Link>
      <DeletionPara>
        提醒您，若您有訂閱會員專區單篇文章，刪除帳號可能導致無法閱讀文章。
      </DeletionPara>
    </UserDeletionFormWrapper>
  )
}
