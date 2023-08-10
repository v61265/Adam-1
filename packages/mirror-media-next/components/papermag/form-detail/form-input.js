import styled from 'styled-components'

const InputWrapper = styled.div`
  margin-top: 24px;
  input {
    display: flex;
    height: 48px;
    width: 100%;
    padding: 12px;
    align-items: center;
    margin-top: 8px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background: #fff;
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;

    :focus {
      outline: none;
      border: 1px solid rgba(0, 0, 0, 0.87);
    }

    ::placeholder {
      color: rgba(0, 0, 0, 0.3);
      font-size: 18px;
      font-weight: 400;
    }

    &[disabled] {
      background: #e3e3e3;
      border: 1px solid rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.3);
      ::placeholder {
        color: #e3e3e3;
      }
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
