import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 48px;
  width: 100%;

  ul {
    margin-top: 4px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
    font-weight: 400;
    padding-left: 28px;
  }
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

export default function Shipping({
  shouldCountFreight,
  setShouldCountFreight,
}) {
  const handleRadioChange = (event) => {
    setShouldCountFreight(event.target.value === 'registered')
  }

  return (
    <Wrapper>
      <Title>寄送方式</Title>
      <Note>
        因週刊派送屬一般投遞投遞非簽收件，如需簽收建議選擇以掛號寄送。
      </Note>
      <RadioInput>
        <input
          type="radio"
          value="regular"
          checked={!shouldCountFreight}
          onChange={handleRadioChange}
        ></input>
        <label>一般配送 NT$ 0 / 期</label>
      </RadioInput>
      <RadioInput>
        <input
          type="radio"
          value="registered"
          checked={shouldCountFreight}
          onChange={handleRadioChange}
        ></input>
        <label>郵寄掛號 NT$ 20 / 期</label>
      </RadioInput>
      <ul>
        <li>一年期加收 NT$ 1,040</li>
        <li>二年期加收 NT$ 2,080</li>
      </ul>
    </Wrapper>
  )
}
