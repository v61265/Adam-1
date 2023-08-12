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
  }

  label {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 400;
  }
`

export default function Receipt() {
  return (
    <Wrapper>
      <Title>電子發票</Title>
      <Note>發票將於付款成功後 7 個工作天內寄達。</Note>
      <RadioInput>
        <input type="radio" value="regular"></input>
        <label>捐贈</label>
      </RadioInput>
      <RadioInput>
        <input type="radio" value="regular"></input>
        <label>二聯式發票（含載具）</label>
      </RadioInput>
      <RadioInput>
        <input type="radio" value="regular"></input>
        <label>二聯式發票（含載具）</label>
      </RadioInput>
    </Wrapper>
  )
}
