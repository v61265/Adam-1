import Link from 'next/link'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  display: flex;
  padding: 12px 0 24px 0;
  max-width: 100vw;
  min-width: 100vw;
  justify-content: center;
`

const HeaderLogo = styled(Link)`
  position: relative;
  width: 49px;
`

/**
 * @returns {JSX.Element}
 */
export default function AmpHeader() {
  return (
    <HeaderWrapper>
      <HeaderLogo href="/">
        {/* @ts-ignore */}
        <amp-img
          width="49"
          height="20.72"
          src="/images/mirror-media-logo.svg"
          alt="mirrormedia"
          layout="responsive"
        />
      </HeaderLogo>
    </HeaderWrapper>
  )
}
