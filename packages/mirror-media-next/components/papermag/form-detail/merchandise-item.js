import styled from 'styled-components'

const Wrapper = styled.div`
  width: 95%;
  margin: auto;

  ${({ theme }) => theme.breakpoint.md} {
    width: 100%;
  }
`
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

export default function MerchandiseItem() {
  return (
    <Wrapper>
      <Title>訂購項目</Title>
    </Wrapper>
  )
}
