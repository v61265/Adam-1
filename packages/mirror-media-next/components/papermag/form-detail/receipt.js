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

export default function Receipt() {
  const [selectedOption, setSelectedOption] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const handleRadioChange = (option) => {
    setSelectedOption(option)
    setShowDetails(true)
  }

  return (
    <Wrapper>
      <Title>電子發票</Title>
      <Note>發票將於付款成功後 7 個工作天內寄達。</Note>
      <RadioInput
        value="donate"
        checked={selectedOption === 'donate'}
        onChange={() => handleRadioChange('donate')}
      >
        捐贈
      </RadioInput>
      {showDetails && (
        <div>{selectedOption === 'donate' && <p>捐贈詳細資訊</p>}</div>
      )}
      <RadioInput
        value="invoiceWithCarrier"
        checked={selectedOption === 'invoiceWithCarrier'}
        onChange={() => handleRadioChange('invoiceWithCarrier')}
      >
        二聯式發票（含載具）
      </RadioInput>
      {showDetails && (
        <div>
          {selectedOption === 'invoiceWithCarrier' && <p>二聯式發票詳細資訊</p>}
        </div>
      )}
      <RadioInput
        value="tripleInvoice"
        checked={selectedOption === 'tripleInvoice'}
        onChange={() => handleRadioChange('tripleInvoice')}
      >
        三聯式發票
      </RadioInput>
      {showDetails && (
        <div>
          {selectedOption === 'tripleInvoice' && <p>三聯式發票詳細資訊</p>}
        </div>
      )}
    </Wrapper>
  )
}
