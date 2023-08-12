import { useState } from 'react'
import styled from 'styled-components'

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

const RadioInput = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;

  input {
    width: 20px;
    height: 20px;
    margin-right: 8px;

    /* Hide the default radio appearance */
    appearance: none;
    -webkit-appearance: none;

    /* Custom radio styles */
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    transition: border 0.3s, box-shadow 0.3s;

    :hover {
      border: 2px solid rgba(0, 0, 0, 0.87);
      box-shadow: 0px 0px 0px 10px rgba(80, 80, 115, 0.05); /* Halo effect */
    }

    &:checked::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url('/images/radio-active.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: -4px;
      left: -4px;
      /* Change the fill color when checked and hovered */
      filter: brightness(1.1);
    }
    /* Change the fill color when hovered */
    &:hover::before {
      filter: brightness(1.5);
    }
  }

  label {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
  }
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
      <RadioInput>
        <input
          type="radio"
          value="donate"
          checked={selectedOption === 'donate'}
          onChange={() => handleRadioChange('donate')}
        />
        <label>捐贈</label>
      </RadioInput>
      {showDetails && (
        <div>{selectedOption === 'donate' && <p>捐贈詳細資訊</p>}</div>
      )}
      <RadioInput>
        <input
          type="radio"
          value="invoiceWithCarrier"
          checked={selectedOption === 'invoiceWithCarrier'}
          onChange={() => handleRadioChange('invoiceWithCarrier')}
        />
        <label>二聯式發票（含載具）</label>
      </RadioInput>
      {showDetails && (
        <div>
          {selectedOption === 'invoiceWithCarrier' && <p>二聯式發票詳細資訊</p>}
        </div>
      )}
      <RadioInput>
        <input
          type="radio"
          value="tripleInvoice"
          checked={selectedOption === 'tripleInvoice'}
          onChange={() => handleRadioChange('tripleInvoice')}
        />
        <label>三聯式發票</label>
      </RadioInput>
      {showDetails && (
        <div>
          {selectedOption === 'tripleInvoice' && <p>三聯式發票詳細資訊</p>}
        </div>
      )}
    </Wrapper>
  )
}
