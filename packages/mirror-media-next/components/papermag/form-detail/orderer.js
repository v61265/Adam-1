import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div`
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

export default function Orderer({ ordererValues, setOrdererValues }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    const newValues = { ...ordererValues, [name]: value }
    setOrdererValues(newValues)
  }

  return (
    <Wrapper>
      <Title>訂購人</Title>
      <p>目前無提供國外海外地區的紙本雜誌訂閱及寄送服務。</p>

      <FormInputsWrapper>
        <FormInput
          name="username"
          type="text"
          label="姓名"
          placeholder="訂購人姓名"
          value={ordererValues.username}
          onChange={handleChange}
        />
        <FormInput
          name="cellphone"
          type="text"
          label="手機"
          placeholder="0912345678"
          value={ordererValues.cellphone}
          onChange={handleChange}
        />
      </FormInputsWrapper>
      <PhoneExtInputWrapper>
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={ordererValues.phone}
          onChange={handleChange}
        />
        <span>-</span>
        <FormInput
          name="phoneExt"
          type="text"
          label="&nbsp;"
          placeholder="分機"
          value={ordererValues.phoneExt}
          onChange={handleChange}
          style={{ width: '80px' }}
        />
      </PhoneExtInputWrapper>
      <FormInput
        name="address"
        type="text"
        label="地址"
        placeholder="訂購人通訊地址"
        value={ordererValues.address}
        onChange={handleChange}
      />
      <FormInput
        name="email"
        type="text"
        label="電子信箱"
        placeholder="訂購人電子信箱"
        value={ordererValues.email}
        onChange={handleChange}
      />
    </Wrapper>
  )
}
