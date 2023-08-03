import styled from 'styled-components'

const Wrapper = styled.div`
  margin: auto;
  margin-bottom: 48px;
  margin-top: 24px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 60px;
    margin-top: 0px;
  }
`
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

const Table = styled.table`
  margin-top: 16px;
  width: 100%;
`
const Td = styled.td`
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 400;
  padding-right: 24px;
`
const Tr = styled.tr`
  color: rgba(0, 0, 0, 0.87);
  font-size: 18px;
  font-weight: 400;

  :not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  }
  .item-name {
    color: rgba(0, 0, 0, 0.5);
    max-width: 194px;
  }
  .quantity {
    width: 128px;
    text-align: center;
  }
  .price {
    min-width: 110px;
  }
`
const CountButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #054f77;
  color: #054f77;
  font-size: 24px;
  font-weight: 300;
  position: relative;

  span {
    position: absolute;
    top: -5px;
    left: 8px;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function MerchandiseItem() {
  return (
    <Wrapper>
      <Title>訂購項目</Title>
      <Table>
        <tbody>
          <Tr>
            <Td>品名</Td>
            <Td className="quantity">數量</Td>
            <Td className="price">單價</Td>
          </Tr>
          <Tr style={{ height: '72px' }}>
            <Td className="item-name">一年鏡週刊 52 期</Td>
            <Td className="quantity buttons-wrapper">
              <ButtonsWrapper>
                <CountButton>
                  <span>-</span>
                </CountButton>
                <p>99</p>
                <CountButton>
                  <span>+</span>
                </CountButton>
              </ButtonsWrapper>
            </Td>
            <Td className="price">NT$ 5280</Td>
          </Tr>
        </tbody>
      </Table>
    </Wrapper>
  )
}
