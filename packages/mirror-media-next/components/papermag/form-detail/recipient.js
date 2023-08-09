import styled from 'styled-components'
import OrdererRecipientForm from './orderer-recipient-form-base'

const Wrapper = styled.div``
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

export default function Recipient({ recipientValues, setRecipientValues }) {
  return (
    <Wrapper>
      <Title>收件人</Title>
      <OrdererRecipientForm
        includeEmail={false}
        values={recipientValues}
        onChange={setRecipientValues}
      />
    </Wrapper>
  )
}
