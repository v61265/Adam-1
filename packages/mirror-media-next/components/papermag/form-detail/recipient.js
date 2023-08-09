import styled from 'styled-components'
import FormInput from './form-input'

const Wrapper = styled.div``
const Title = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;
`
const FormInputsWrapper = styled.div``

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

      <input
        type="checkbox"
        checked={sameAsOrderer}
        onChange={handleCheckboxChange}
      />
      <label>同訂購人資訊？</label>

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
        <FormInput
          name="phone"
          type="text"
          label="市話（非必填）"
          placeholder="023456789"
          value={formValues.phone}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
        <FormInput
          name="phoneExt"
          type="text"
          label=""
          placeholder="分機"
          value={formValues.phoneExt}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
        <FormInput
          name="address"
          type="text"
          label="地址"
          placeholder="收件人通訊地址"
          value={formValues.address}
          onChange={handleChange}
          disabled={sameAsOrderer}
        />
      </FormInputsWrapper>
    </Wrapper>
  )
}
