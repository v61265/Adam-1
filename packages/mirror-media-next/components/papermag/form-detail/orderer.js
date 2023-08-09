import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div``
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`
const FormInputsWrapper = styled.div``

export default function Orderer({ ordererValues, setOrdererValues }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    const newValues = { ...ordererValues, [name]: value }
    setOrdererValues(newValues)
  }

  return (
    <Wrapper>
      <Title>訂購人</Title>
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
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={ordererValues.phone}
          onChange={handleChange}
        />
        <FormInput
          name="phoneExt"
          type="text"
          label=""
          placeholder="分機"
          value={ordererValues.phoneExt}
          onChange={handleChange}
        />
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
      </FormInputsWrapper>
    </Wrapper>
  )
}
