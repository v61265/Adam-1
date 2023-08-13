import { useState } from 'react'
import styled from 'styled-components'
import RadioInput from './radio-input'

const Wrapper = styled.div`
  margin-top: 48px;
  width: 100%;
`
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`
const Note = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
`

const Warning = styled.p`
  color: #e51731;
  font-size: 14px;
  font-weight: 400;
`

export default function Receipt({
  receiptOption,
  setReceiptOption,
  showWarning,
}) {
  const [showDetails, setShowDetails] = useState(false)

  const handleRadioChange = (option) => {
    setReceiptOption(option)
    setShowDetails(true)
  }

  return (
    <Wrapper>
      <Title>電子發票</Title>
      {showWarning && <Warning>尚未選擇發票</Warning>}
      <Note>發票將於付款成功後 7 個工作天內寄達。</Note>
      <RadioInput
        value="donate"
        checked={receiptOption === 'donate'}
        onChange={() => handleRadioChange('donate')}
      >
        捐贈
      </RadioInput>
      {showDetails && (
        <div>{receiptOption === 'donate' && <p>捐贈詳細資訊</p>}</div>
      )}
      <RadioInput
        value="invoiceWithCarrier"
        checked={receiptOption === 'invoiceWithCarrier'}
        onChange={() => handleRadioChange('invoiceWithCarrier')}
      >
        二聯式發票（含載具）
      </RadioInput>
      {showDetails && (
        <div>
          {receiptOption === 'invoiceWithCarrier' && <p>二聯式發票詳細資訊</p>}
        </div>
      )}
      <RadioInput
        value="tripleInvoice"
        checked={receiptOption === 'tripleInvoice'}
        onChange={() => handleRadioChange('tripleInvoice')}
      >
        三聯式發票
      </RadioInput>
      {showDetails && (
        <div>
          {receiptOption === 'tripleInvoice' && <p>三聯式發票詳細資訊</p>}
        </div>
      )}
    </Wrapper>
  )
}
