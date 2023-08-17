import styled from 'styled-components'

const GrayBox = styled.div`
  border-radius: 12px;
  background: #f2f2f2;
  padding: 16px;
  margin-top: 8px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 48px;
  }
`

export default function Failed() {
  return <GrayBox>Failed</GrayBox>
}
