import styled from 'styled-components'
import MerchandiseItem from './form-detail/merchandise-item'
import PurchaseInfo from './form-detail/purchase-info'
import Orderer from './form-detail/orderer'
import Recipient from './form-detail/recipient'
import Shipping from './form-detail/shipping'
import Receipt from './form-detail/receipt'
import AcceptingTermsAndConditions from './form-detail/accepting-terms-and-conditions'
import OrderBtn from './form-detail/order-btn'

const Form = styled.form``

export default function SubscribePaperMagForm() {
  return (
    <Form>
      <MerchandiseItem />
      <PurchaseInfo />
      <Orderer />
      <Recipient />
      <Shipping />
      <Receipt />
      <AcceptingTermsAndConditions />
      <OrderBtn />
    </Form>
  )
}
