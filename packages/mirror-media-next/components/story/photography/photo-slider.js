// @ts-nocheck
/* eslint-disable @next/next/no-img-element */
import { useRef } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  /* height: auto;
  overflow: auto; */
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
`

const TitleBox = styled.div`
  color: white;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 120px;
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
  position: relative; /* Required for positioning the arrow button */
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
`

const ArrowButton = styled.button`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: aqua;
  border: none;
  outline: none;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: yellow;
  }
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
  contentRef = null,
}) {
  const HeroImageRef = useRef(null)
  const slideRefs = [useRef(null), useRef(null), useRef(null)]

  const scrollToNextSlide = (slideIndex) => {
    if (slideIndex === HeroImageRef) {
      // Scroll to HeroImageRef
      const heroImageSlider = HeroImageRef.current
      if (heroImageSlider) {
        heroImageSlider.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Scroll to other slides based on slide index
      const slider = slideRefs[slideIndex].current
      if (slider) {
        slider.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <Wrapper>
      <Slide ref={HeroImageRef}>
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
        <ArrowButton onClick={() => scrollToNextSlide(1)}>▼</ArrowButton>
      </Slide>
      <Slide ref={slideRefs[1]}>
        <p>Slide 2</p>
        <ArrowButton onClick={() => scrollToNextSlide(2)}>▼</ArrowButton>
      </Slide>
      <Slide ref={slideRefs[2]}>
        <p>Slide 3</p>
        <ArrowButton onClick={() => scrollToNextSlide(HeroImageRef)}>
          ▼
        </ArrowButton>
      </Slide>
      {/* {photos.map((photo, index) => (
        <Slide key={index}>
          <img src={photo.data.resized.original} alt={photo.data.desc} />
          <ArrowButton onClick={handleArrowButtonClick}>▼</ArrowButton>
        </Slide>
      ))} */}
    </Wrapper>
  )
}
