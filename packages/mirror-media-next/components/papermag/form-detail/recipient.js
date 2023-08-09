import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div`
  margin-top: 48px;
  width: 100%;

  p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
  }
`
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`

const FormInputsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px; /* Safari 12+ */
  grid-gap: 16px; /* Safari 10-11 */

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`
const PhoneExtInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 80px; /* Divide the space: phone - dash - phoneExt */
  align-items: center;

  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
  }

  span {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
    margin: 0 12px;
    padding-top: 24px;
  }
`
const CheckBoxWapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;

  input {
    width: 20px;
    height: 20px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
    font-weight: 400;
    margin-right: 8px;
  }

  label {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
  }
`

export default function Recipient({
  recipientValues,
  setRecipientValues,
  sameAsOrderer,
  setSameAsOrderer,
  ordererValues,
}) {
  const handleCheckboxChange = () => {
    if (sameAsOrderer) {
      setRecipientValues(ordererValues)
    } else {
      setRecipientValues({
        username: '',
        cellphone: '',
        phone: '',
        phoneExt: '',
        address: '',
      })
    }
    setSameAsOrderer(!sameAsOrderer)
  }

  const formValues = sameAsOrderer ? ordererValues : recipientValues

  const handleChange = (e) => {
    const { name, value } = e.target
    const newValues = { ...formValues, [name]: value }
    setRecipientValues(newValues)
  }

  return (
    <Wrapper>
      <Title>收件人</Title>
      <p>資料請務必正確填寫，以利雜誌寄送。</p>

      <CheckBoxWapper>
        <input
          type="checkbox"
          checked={sameAsOrderer}
          onChange={handleCheckboxChange}
        />
        <label>同訂購人資訊</label>
      </CheckBoxWapper>

      <FormInputsWrapper>
        <FormInput
          name="username"
          type="text"
          label="姓名"
          placeholder="收件人姓名"
          value={formValues.username}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
        <FormInput
          name="cellphone"
          type="text"
          label="手機"
          placeholder="0912345678"
          value={formValues.cellphone}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
      </FormInputsWrapper>
      <PhoneExtInputWrapper>
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={formValues.phone}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
        <span>-</span>
        <FormInput
          name="phoneExt"
          type="text"
          label="&nbsp;"
          placeholder="分機"
          value={formValues.phoneExt}
          onChange={handleChange}
          disabled={sameAsOrderer}
          style={{ width: '80px' }}
        />
      </PhoneExtInputWrapper>
      <FormInput
        name="address"
        type="text"
        label="收件地址"
        placeholder="收件人通訊地址"
        value={formValues.address}
        onChange={handleChange}
        disabled={sameAsOrderer}
      />
    </Wrapper>
  )
}
