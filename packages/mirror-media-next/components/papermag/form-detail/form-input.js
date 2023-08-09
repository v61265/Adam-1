import styled from 'styled-components'

const InputWrapper = styled.div`
  margin: 24px 0;
  input {
    display: flex;
    width: 280px;
    height: 48px;
    padding: 12px;
    align-items: center;
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid var(--black-30, rgba(0, 0, 0, 0.3));
    background: var(--white, #fff);
  }
`

export default function FormInput(props) {
  const { label, onChange, ...inputProps } = props

  return (
    <InputWrapper>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </InputWrapper>
  )
}
