import styled from 'styled-components'

const Page = styled.section`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 24px 0;
`

const PlansWrapper = styled.ul`
  display: grid;
  width: 90%;
  margin: 0 auto;
  grid-row-gap: 12px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 24px 0;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 24px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    width: 960px;
  }
`

export default function PlanNonMember() {
  return (
    <Page>
      <PlansWrapper></PlansWrapper>
    </Page>
  )
}
