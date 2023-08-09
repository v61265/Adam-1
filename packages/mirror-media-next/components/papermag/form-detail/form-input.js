import styled from 'styled-components'

const InputWrapper = styled.div`
  margin: 24px 0;
  input {
    display: flex;
    height: 48px;
    width: 100%;
    padding: 12px;
    align-items: center;
    margin: 8px 0;
    border-radius: 8px;
    border: 1px solid var(--black-30, rgba(0, 0, 0, 0.3));
    background: var(--white, #fff);

    ::placeholder {
      color: rgba(0, 0, 0, 0.3);
      font-size: 18px;
      font-weight: 400;
    }
  }

  label {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 500;
  }

  p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
    margin-top: 4px;
  }
`

export default function FormInput(props) {
  const { label, onChange, ...inputProps } = props

  return (
    <InputWrapper>
      <label>{label}</label>
      {label.includes('地址') && (
        <p>
          請填完整郵遞區號和地址，如：114066 台北市內湖區堤頂大道一段 365 號 1
          樓
        </p>
      )}
      <input {...inputProps} onChange={onChange} />
    </InputWrapper>
  )
}
