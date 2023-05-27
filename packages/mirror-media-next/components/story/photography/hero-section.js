// @ts-nocheck
import styled, { css } from 'styled-components'

const HeroImage = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(0, 0, 0, 0.4)
    ),
    url(${(props) => props.imageUrl});

  height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${() =>
    !isIOS() &&
    css`
      background-attachment: fixed;
    `}
`

const TitleBox = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 120px;
  font-family: var(--notosansTC-font);

  margin-top: 52px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 70px;
  }

  .title {
    color: #ffffff;
    font-weight: 900;
    font-size: 20px;
    line-height: 150%;
    text-shadow: 2px 8px 8px rgba(0, 0, 0, 0.5);

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 40px;
    }
  }

  .title-wrapper {
    margin: auto;
    width: 100%;
    ${({ theme }) => theme.breakpoint.md} {
      width: 85%;
    }
  }

  .hero-caption {
    font-weight: 700;
    font-size: 10px;
    line-height: 18px;
    color: #f0dddd;
    text-shadow: 0px 3px 3px rgba(0, 0, 0, 0.8);
    background: rgba(0, 0, 0, 0.4);
    width: fit-content;
    text-align: center;
    padding: 2px;
    margin: 20px auto;

    ${({ theme }) => theme.breakpoint.md} {
      font-size: 12px;
      margin: 29px auto;
    }
    ${({ theme }) => theme.breakpoint.xl} {
      margin: 32px auto;
      line-height: 21px;
      font-size: 14px;
    }
  }

  .brief {
    padding-top: 16px;

    font-weight: 400;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
    color: #ffffff;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.5);

    ${({ theme }) => theme.breakpoint.md} {
      font-weight: 500;
      font-size: 16px;
    }
  }
`

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

export default function HeroSection({
  title = '',
  heroCaption = '',
  brief = '',
  heroImage = null,
}) {
  return (
    <HeroImage
      imageUrl={
        heroImage?.resized?.original ||
        heroImage?.resized?.w2400 ||
        heroImage?.resized?.w1600 ||
        '/images/default-og-img.png'
      }
    >
      <TitleBox>
        <div className="title-wrapper">
          <h1 className="title">{title}</h1>
          {heroCaption && <p className="hero-caption">{heroCaption}</p>}
        </div>
        <p className="brief">{brief}</p>
      </TitleBox>
    </HeroImage>
  )
}
