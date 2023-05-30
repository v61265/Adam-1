import styled from 'styled-components'
import Image from 'next/image'
import ShareIcons from './share-button'
import { Z_INDEX } from '../../../constants'

const Nav = styled.nav`
  position: fixed;
  z-index: ${Z_INDEX.header};
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  height: 52px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    :focus {
      outline: 0;
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    height: 70px;
    padding: 16px 24px;
  }
`
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;

  .logo {
    width: 67.5px;
    height: 28px;

    ${({ theme }) => theme.breakpoint.md} {
      width: 90px;
      height: 38px;
    }
  }
`

const IconsWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* gap: 20px; */

  .share-button {
    width: 22px;
    height: 22px;
    margin-left: 20px;

    ${({ theme }) => theme.breakpoint.md} {
      width: 34px;
      height: 32px;
    }
  }
`

const PhotosIndexButton = styled.button`
  .photos-index-icon {
    width: 22px;
    height: 22px;
    margin-left: 20px;

    ${({ theme }) => theme.breakpoint.md} {
      width: 32px;
      height: 32px;
    }
  }
`

export default function Header() {
  return (
    <Nav>
      <LogoWrapper>
        <a
          href="https://www.mirrormedia.mg/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          <Image
            src="/images/weekly-logo-white.svg"
            alt="mirror media logo"
            className="logo"
            width={90}
            height={38}
          />
        </a>
      </LogoWrapper>
      <IconsWrapper>
        <a
          href="https://mirrormedia.oen.tw/"
          target="_blank"
          rel="noreferrer noopenner"
        >
          <Image
            src="/images/sponsor-button.svg"
            alt="sponsor this article"
            className="sponsor-button"
            width={100}
            height={32}
          />
        </a>
        <PhotosIndexButton>
          <Image
            src="/images/photos-index-icon.svg"
            alt="photos index icon"
            className="photos-index-icon"
            width={32}
            height={32}
          />
        </PhotosIndexButton>
        <ShareIcons />
      </IconsWrapper>
    </Nav>
  )
}
