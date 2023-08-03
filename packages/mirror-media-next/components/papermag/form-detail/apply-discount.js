import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 48px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-bottom: 60px;
  }

  h3 {
    color: rgba(0, 0, 0, 0.87);
    font-size: 18px;
    font-weight: 500;
  }

  h4 {
    color: #054f77;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 16px;
  }
`

const InputWrapper = styled.div`
  width: 100%;
  height: 51px;
  padding: 12px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  margin-right: 8px;

  ${({ theme }) => theme.breakpoint.md} {
    max-width: 200px;
  }
  label {
    padding-right: 8px;
  }

  input {
    width: 100%;
    :focus {
      outline: none;
    }
  }
`

const ConfirmButton = styled.button`
  min-width: 72px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 8px;
  background: #e3e3e3;
  color: rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`

const InputButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`
const TextBox = styled.p`
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 400;
`

export default function ApplyDiscount() {
  return (
    <Wrapper>
      <h3>續訂戶請輸入訂戶代號</h3>
      <h4>輸入後請點選「確認」以完成續訂計算</h4>
      <InputButtonWrapper>
        <InputWrapper>
          <label>MR</label>
          <input placeholder="12345678" />
        </InputWrapper>
        <ConfirmButton>確認</ConfirmButton>
      </InputButtonWrapper>
      <TextBox>
        續訂戶資格為實際訂閱紙本鏡週刊滿 1 年 (52 期)
        並已有訂戶代號，如不清楚訂戶代號或是否符合續訂戶資格，請來電02-6633-3882
        查詢。若您非續訂戶，服務人員將去電提醒告知，需請補足差額後方能完成訂閱。
      </TextBox>
    </Wrapper>
  )
}
