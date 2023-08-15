import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import RadioInput from './radio-input'
import CustomDropdown from './custom-dropdown'
import FormInput from './form-input'

const shakeAnimation = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-6px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(6px);
  }
`

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
  animation: ${shakeAnimation} 0.3s ease-in-out;
`

export default function Receipt({
  receiptOption,
  setReceiptOption,
  showWarning,
}) {
  const handleRadioChange = (option) => {
    if (option !== 'donate') {
      setSelectedDonateOption(null) // Reset selectedDonateOption when option is not "donate"
    }
    setReceiptOption(option)
    setShowDetails(true)
  }

  const donateOptions = [
    '財團法人台灣兒童暨家庭扶助基金會',
    '財團法人創世社會福利基金會',
    '財團法人台灣癌症基金會',
    '財團法人伊甸社會福利基金會',
    '財團法人門諾社會福利慈善事業基金會',
  ]

  const invoiceWithCarrierOptions = ['電子發票載具', '手機條碼', '自然人憑證']

  const [showDetails, setShowDetails] = useState(false)

  const [selectedDonateOption, setSelectedDonateOption] = useState(null)
  const [selectedInvoiceCarrierOption, setSelectedInvoiceCarrierOption] =
    useState(null)

  const [barcodeValue, setBarcodeValue] = useState('')
  const [certificateValue, setCertificateValue] = useState('')

  const handleDonateOptionSelect = (option) => {
    setSelectedDonateOption(option)
  }

  const handleInvoiceCarrierOptionSelect = (option) => {
    setSelectedInvoiceCarrierOption(option)
  }

  const handleBarcodeChange = (event) => {
    setBarcodeValue(event.target.value)
  }

  const handleCertificateChange = (event) => {
    setCertificateValue(event.target.value)
  }

  console.log(
    receiptOption,
    selectedDonateOption,
    selectedInvoiceCarrierOption,
    barcodeValue,
    certificateValue
  )

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
        <div>
          {receiptOption === 'donate' && (
            <CustomDropdown
              options={donateOptions}
              onSelect={handleDonateOptionSelect}
            />
          )}
        </div>
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
          {receiptOption === 'invoiceWithCarrier' && (
            <>
              <CustomDropdown
                options={invoiceWithCarrierOptions}
                onSelect={handleInvoiceCarrierOptionSelect}
              />
              {selectedInvoiceCarrierOption === '手機條碼' && (
                <FormInput
                  name="barcode"
                  type="text"
                  placeholder="斜線字元 /，後接 7 個大寫英數字或特殊符號"
                  value={barcodeValue}
                  onChange={handleBarcodeChange}
                  errorMessage="請輸入有效的手機條碼"
                  required
                  style={{ marginTop: '-16px' }}
                />
              )}
              {selectedInvoiceCarrierOption === '自然人憑證' && (
                <FormInput
                  name="certificate"
                  type="text"
                  placeholder="2 個大寫英文字元，後接 14 個數字"
                  value={certificateValue}
                  onChange={handleCertificateChange}
                  errorMessage="請輸入有效的自然人憑證"
                  required
                  style={{ marginTop: '-16px' }}
                />
              )}
            </>
          )}
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
