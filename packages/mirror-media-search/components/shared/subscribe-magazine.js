import { useContext } from 'react'
import styled from 'styled-components'
import { RedirectUrlContext } from '../../context/redirectUrl'
import { minWidth } from '../../styles/breakpoint'

const SubscribeMagazineWrapper = styled.div`
  padding: 4px 9px;
  font-weight: 500;
  font-size: 12px;
  line-height: 17px;
  background: #000000;
  color: #fff;
  margin: 0 5vw 0 0;
  text-align: center;
  cursor: pointer;
  margin-left: 20px;
  @media ${minWidth.md} {
    font-size: 16px;
    line-height: 23px;
    margin: 0 48px 0 0;
  }
  @media ${minWidth.xl} {
    margin: 0 0 0 12px;
  }
`
const Break = styled.br`
  display: inline;
  @media ${minWidth.md} {
    display: none;
  }
`

export default function SubscribeMagazine() {
  const redirectUrl = useContext(RedirectUrlContext)
  return (
    <SubscribeMagazineWrapper
      onClick={() => {
        location.assign(`${redirectUrl}/papermag`)
      }}
    >
      訂閱
      <Break />
      紙本雜誌
    </SubscribeMagazineWrapper>
  )
}
