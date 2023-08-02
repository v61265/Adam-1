import styled from 'styled-components'
import MerchandiseItem from './form-detail/merchandise-item'
import PurchaseInfo from './form-detail/purchase-info'
import Orderer from './form-detail/orderer'
import Recipient from './form-detail/recipient'
import Shipping from './form-detail/shipping'
import Receipt from './form-detail/receipt'
import AcceptingTermsAndConditions from './form-detail/accepting-terms-and-conditions'
import OrderBtn from './form-detail/order-btn'

const Form = styled.form`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  ${({ theme }) => theme.breakpoint.md} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  background: lightcyan;
  width: 100%;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 500px;
    margin-right: 20px;
  }

  ${({ theme }) => theme.breakpoint.lg} {
    margin-right: 60px;
  }
`
const RightWrapper = styled.div`
  background: lightpink;
  width: 100%;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 400px;
  }
`

export default function SubscribePaperMagForm() {
  return (
    <Form>
      <LeftWrapper>
        <MerchandiseItem />
        <Orderer />
        <Recipient />
        <Shipping />
        <Receipt />
        <AcceptingTermsAndConditions />
        <OrderBtn />
      </LeftWrapper>
      <RightWrapper>
        <PurchaseInfo />
      </RightWrapper>
    </Form>
  )
}
