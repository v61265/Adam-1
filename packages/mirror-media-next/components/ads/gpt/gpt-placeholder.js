import { useEffect, useState } from 'react'
import styled from 'styled-components'

/**
 * @typedef {string} Width
 * @typedef {string} Height
 * @typedef {string} Margin
 *
 *
 * @typedef {Object} Rwd
 * @property {{width: Width, height: Height, margin: Margin}} rwd.mobile
 * @property {{width: Width, height: Height, margin: Margin}} rwd.tablet
 * @property {{width: Width, height: Height, margin: Margin}} rwd.desktop
 */

const Container = styled.div`
  position: relative;
  min-width: ${
    /**
     *
     * @param {Object} props
     * @param {Rwd} props.rwd
     * @param {boolean} [props.shouldTranslate]
     */
    ({ rwd }) => rwd.mobile.width
  };
  min-height: ${({ rwd, shouldTranslate }) =>
    shouldTranslate ? rwd.mobile.height : '0px'};
  margin: ${({ rwd }) => rwd.mobile.margin};

  ${({ theme }) => theme.breakpoint.md} {
    min-width: ${({ rwd }) => rwd.tablet.width};
    min-height: ${({ rwd, shouldTranslate }) =>
      shouldTranslate ? rwd.tablet.height : '0px'};
    margin: ${({ rwd }) => rwd.tablet.margin};
  }

  ${({ theme }) => theme.breakpoint.xl} {
    min-width: ${({ rwd }) => rwd.desktop.width};
    min-height: ${({ rwd, shouldTranslate }) => {
      return shouldTranslate ? rwd.desktop.height : '0px'
    }};
    margin: ${({ rwd }) => rwd.desktop.margin};
  }
`
const ContainerMobileAndTablet = styled(Container)`
  display: block;
  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`
const ContainerDesktop = styled(Container)`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
  }
`

const DEFAULT_SIZES = {
  mobile: {
    width: '300px',
    height: '250px',
    margin: '20px auto 0px',
  },
  tablet: {
    width: '300px',
    height: '250px',
    margin: '20px auto 0px',
  },
  desktop: {
    width: '970px',
    height: '250px',
    margin: '20px auto 0px',
  },
}

/**
 *
 * @param {Object} props
 * @param {Rwd} [props.rwd]
 * @param {JSX.Element} props.children
 * @param {boolean} [props.shouldShowAd]
 * @param {boolean} [props.isHDAdEmpty]
 * @returns {JSX.Element}
 */
export default function GPT_Placeholder({
  rwd = DEFAULT_SIZES,
  children,
  isHDAdEmpty = false,
  shouldShowAd = true,
}) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    // 為了讓 mounted 前一律撐開
    // 原因可參見該描述：https://app.asana.com/0/1181156545719626/1206976463067891/f
    setIsMounted(true)
  }, [])

  return (
    <Container rwd={rwd} shouldTranslate={!isMounted || shouldShowAd}>
      {children}
    </Container>
  )
}
/**
 *
 * @param {Object} props
 * @param {Rwd} [props.rwd]
 * @param {JSX.Element} props.children
 * @returns
 */
const GPT_Placeholder_MobileAndTablet = ({ rwd = DEFAULT_SIZES, children }) => {
  return (
    <ContainerMobileAndTablet rwd={rwd}>{children}</ContainerMobileAndTablet>
  )
}
const GPT_Placeholder_Desktop = ({ rwd = DEFAULT_SIZES, children }) => {
  return <ContainerDesktop rwd={rwd}>{children}</ContainerDesktop>
}

export { GPT_Placeholder_MobileAndTablet, GPT_Placeholder_Desktop }
