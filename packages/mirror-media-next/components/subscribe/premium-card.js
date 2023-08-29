import styled from 'styled-components'
import SubscribePlanBtn from '../subscribe-plan-btn'
import { PREMIUM_FEATURES, DISCOUNT_MESSAGE } from './subscribe-constants'

const PlanCard = styled.li`
  padding: 24px 16px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  box-shadow: 0px 4px 28px 0px rgba(0, 0, 0, 0.06),
    0px 2px 12px 0px rgba(0, 0, 0, 0.08);

  ${({ theme }) => theme.breakpoint.md} {
    padding: 24px 24px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    padding: 24px 24px;
    width: 468px;
  }
`
const PlanTitle = styled.h2`
  color: rgba(0, 0, 0, 0.87);
  font-size: 24px;
  font-weight: 500;

  ${({ theme }) => theme.breakpoint.md} {
    font-size: 32px;
  }
`
const Hr = styled.hr`
  margin: 16px 0;
`

export default function PremiumCard() {
  return (
    <PlanCard>
      <PlanTitle>Premium 會員</PlanTitle>
      <Hr />

      {PREMIUM_FEATURES.map((feature) => (
        <p key={feature}>{feature}</p>
      ))}

      <p>{DISCOUNT_MESSAGE}</p>

      <SubscribePlanBtn
        title="訂購年方案"
        subtitle="優惠 $499 元"
        bgColor="#054F77"
        hoverColor="#9CB7C6"
        hoverText="#000"
        href="/subscribe/info?plan=yearly"
      />
      <SubscribePlanBtn
        title="訂購月方案"
        subtitle="優惠 $49 元"
        bgColor="#1D9FB8"
        hoverColor="#054F77"
        hoverText="#fff"
        href="/subscribe/info?plan=monthly"
      />
    </PlanCard>
  )
}
