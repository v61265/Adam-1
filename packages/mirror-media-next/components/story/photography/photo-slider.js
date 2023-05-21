// @ts-nocheck
/* eslint-disable @next/next/no-img-element */
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: #333333;
`

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
  justify-content: flex-end;

  ${() =>
    !isIOS() &&
    css`
      background-attachment: fixed;
    `}

  // snap scrolling effect
  scroll-snap-align:start;
`

const TitleBox = styled.div`
  color: white;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 80px;
  font-family: var(--inter-font);
  font-style: normal;
  font-weight: 400;
  text-shadow: 0.9px 0px 0.5px rgba(0, 0, 0, 0.8);

  .title {
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
  }

  .hero-caption {
    font-size: 16px;
    line-height: 20px;
    color: #d1d1d1;
    margin: 32px 0;
  }

  .brief {
    font-size: 16px;
    line-height: 22px;
    color: #ffffff;
  }
`

const Slide = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;

  text-align: center;
  font-size: 18px;
  color: #000;

  // snap scrolling effect
  scroll-snap-align: start;
  scroll-snap-stop: always;

  /* Center slide content vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* img {
    width: 100%;
  } */
`

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

export default function PhotoSlider({
  photos = [],
  title = '',
  heroCaption = '',
  brief = '',
  heroImage = null,
}) {
  return (
    <Wrapper>
      <HeroImage
        // @ts-ignore
        imageUrl={
          heroImage?.resized?.original ||
          heroImage?.resized?.w2400 ||
          heroImage?.resized?.w1600 ||
          ''
        }
      >
        <TitleBox>
          <h1 className="title">{title}</h1>
          <p className="hero-caption">{heroCaption}</p>
          <p className="brief">{brief}</p>
        </TitleBox>
      </HeroImage>
      {photos.map((photo, index) => (
        <Slide key={index}>
          <img src={photo.data.resized.original} alt={photo.data.desc} />
        </Slide>
      ))}
    </Wrapper>
  )
}
