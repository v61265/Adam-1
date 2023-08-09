import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div``

const FormInputsWrapper = styled.div``

export default function OrdererRecipientForm({
  includeEmail,
  values,
  onChange,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target
    const newValues = { ...values, [name]: value }
    onChange(newValues)
  }

  return (
    <Wrapper>
      <FormInputsWrapper>
        <FormInput
          name="username"
          type="text"
          label="姓名"
          placeholder={`${includeEmail ? '訂購人' : '收件人'}姓名`}
          value={values.username}
          onChange={handleChange}
        />
        <FormInput
          name="cellphone"
          type="text"
          label="手機"
          placeholder="0912345678"
          value={values.cellphone}
          onChange={handleChange}
        />
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={values.phone}
          onChange={handleChange}
        />
        <FormInput
          name="phoneExt"
          type="text"
          label=""
          placeholder="EXT"
          value={values.phoneExt}
          onChange={handleChange}
        />
        <FormInput
          name="address"
          type="text"
          label="地址"
          placeholder={`${includeEmail ? '訂購人' : '收件人收件'}地址`}
          value={values.address}
          onChange={handleChange}
        />
        {includeEmail && ( // Show email field only for Orderer
          <FormInput
            name="email"
            type="text"
            label="電子信箱"
            placeholder="訂購人電子信箱"
            value={values.email}
            onChange={handleChange}
          />
        )}
      </FormInputsWrapper>
    </Wrapper>
  )
}
