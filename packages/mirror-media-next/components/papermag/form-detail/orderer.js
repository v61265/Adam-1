// import { useState } from 'react'
import styled from 'styled-components'
import OrdererRecipientForm from './orderer-recipient-form-base'

const Wrapper = styled.div``
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

export default function Orderer({ ordererValues, setOrdererValues }) {
  return (
    <Wrapper>
      <Title>訂購人</Title>
      <OrdererRecipientForm
        includeEmail={true}
        values={ordererValues}
        onChange={setOrdererValues}
      />
    </Wrapper>
  )
}
