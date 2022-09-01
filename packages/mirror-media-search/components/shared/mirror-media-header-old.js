import styled from 'styled-components'

import EventLogo from './event-logo'
import SearchBar from './search-bar'

import { maxWidth, minWidth } from '../../styles/breakpoint'
import {
  HeaderTopLayerWidth,
  LogoWrapperMarginX,
  MenuIconWidth,
  SearchIconWidth,
} from '../../styles/header-style-const'
import hamburgerWhite from '../../public/images/hamburger-white.png'
import SubscribeMagazine from './subscribe-magazine'
import MoreLinks from './more-links'
import NavSections from './nav-sections'
import { SUB_BRAND_LINKS, PROMOTION_LINKS } from '../../constants'
import NavTopics from './nav-topics'

const HeaderWrapper = styled.header`
  background-color: #204f74;
  @media ${minWidth.xl} {
    height: 160px;
  }
`

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${HeaderTopLayerWidth};
  max-width: 1024px;
  height: 71px;
  margin-left: auto;
  margin-right: auto;
  padding-top: 33px;
  padding-bottom: 13px;
  @media ${minWidth.md} {
    padding-top: 0px;
    padding-bottom: 0;
  }
  @media ${minWidth.xl} {
    height: 70px;
  }
`

const MenuIcon = styled.button`
  flex-shrink: 0;
  width: ${MenuIconWidth};
  height: 10px;
  background-image: url(${hamburgerWhite.src});
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  user-select: none;
  @media ${minWidth.xl} {
    display: none;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(
    100% - (${MenuIconWidth} + ${SearchIconWidth} + ${LogoWrapperMarginX} * 2)
  );
  @media ${minWidth.xl} {
    justify-content: flex-start;
    width: auto;
  }
`
const Logo = styled.a`
  cursor: pointer;
  user-select: none;
`
const LogoIcon = styled.img`
  width: 74px;
  @media ${minWidth.xl} {
    width: auto;
    height: 50px;
  }
`
const GpqAd = styled.div``

const ActionWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  @media ${maxWidth.xl} {
    flex-direction: row-reverse;
  }
`

const HeaderNav = styled.nav``

export default function OldHeader() {
  return (
    <HeaderWrapper>
      <HeaderTop>
        <MenuIcon />
        <LogoWrapper>
          <Logo href="/">
            <LogoIcon src="/images/mirror-media-logo.svg" />
          </Logo>
          <EventLogo />
          <GpqAd />
        </LogoWrapper>
        <ActionWrapper>
          <SearchBar />
          <SubscribeMagazine />
          <MoreLinks links={PROMOTION_LINKS} />
        </ActionWrapper>
      </HeaderTop>
      <HeaderNav>
        <NavSections />
        <NavTopics subBrands={SUB_BRAND_LINKS} />
      </HeaderNav>
    </HeaderWrapper>
  )
}
