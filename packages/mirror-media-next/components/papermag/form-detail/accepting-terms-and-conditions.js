import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 24px;
`

const CheckBoxWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  margin-bottom: -8px;

  input {
    width: 20px;
    height: 20px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
    font-weight: 400;
    margin-right: 8px;

    /* Hide the default checkbox appearance */
    appearance: none;
    -webkit-appearance: none;

    /* Custom checkbox styles */
    position: relative;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background-color: transparent;
    cursor: pointer;
    transition: border 0.3s, box-shadow 0.3s;

    :hover {
      border: 2px solid rgba(0, 0, 0, 0.87);
      box-shadow: 0px 0px 0px 10px rgba(80, 80, 200, 0.07); /* Halo effect */
    }

    &:checked::before {
      content: '';
      display: inline-block;
      width: 26px;
      height: 26px;
      background-image: url('/images/checkbox-active.svg');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: absolute;
      top: -5px;
      left: -5px;
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
const TermsAndConditions = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
  margin-top: 12px;
  padding-left: 28px;
`
const Notes = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
  margin: 48px 0 24px;
`

export default function AcceptingTermsAndConditions({
  isAcceptedConditions,
  setIsAcceptedConditions,
}) {
  const handleAcceptingConditions = () => {
    setIsAcceptedConditions(!isAcceptedConditions)
    console.log('Accepted terms and conditions:', !isAcceptedConditions)
  }

  return (
    <Wrapper>
      <CheckBoxWrapper>
        <input
          type="checkbox"
          checked={isAcceptedConditions}
          onChange={handleAcceptingConditions}
        />
        <label>我已閱讀並同意：</label>
      </CheckBoxWrapper>
      <TermsAndConditions>
        鏡週刊於行銷目的範圍內得永久彙集。處理及利用本人填寫之訂單資料，並得利用前述資料而為本公司在台灣地區對本人發送活動、服務訊息。本公司對所彙集資料依法保密。本人如有請求停止彙集、處理、利用之需要可書面或致電訂戶組處理
        (02) 6636-6800。
      </TermsAndConditions>
      <Notes>
        按下開始結帳後，頁面將會跳離，抵達由藍新金流 NewebPay
        所提供的線上結帳頁面，完成後將會再跳回到鏡週刊
      </Notes>
    </Wrapper>
  )
}
