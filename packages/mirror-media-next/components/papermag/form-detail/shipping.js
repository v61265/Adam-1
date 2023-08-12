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

    /* Hide the default radio appearance */
    appearance: none;
    -webkit-appearance: none;

    /* Custom radio styles */
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    background-color: transparent;
    cursor: pointer;
    transition: border 0.3s, box-shadow 0.3s;

    :hover {
      border: 2px solid rgba(0, 0, 0, 0.87);
      box-shadow: 0px 0px 0px 10px rgba(80, 80, 115, 0.05); /* Halo effect */
    }

    &:checked::before {
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      background-image: url('/images/radio-active.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: -4px;
      left: -4px;
      /* Change the fill color when checked and hovered */
      filter: brightness(1.1);
    }
    /* Change the fill color when hovered */
    &:hover::before {
      filter: brightness(1.5);
    }
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
