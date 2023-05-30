/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import Credits from './potography-credits'
import HeroSection from './hero-section'
import Header from './photography-header'
import { ArrowDown } from './icons'

const Main = styled.main`
  margin: auto;
  padding-bottom: 40px;
  width: 100%;
  background-color: #333333;

  .content {
    margin-top: 40px;
    // Only render contents besides the images and captions via draft renderer.
    figure {
      display: none;
    }
  }

  p {
    color: white;
  }

  // Snap scrolling effect
  height: 100vh;
  scroll-snap-type: y mandatory;
  overflow: auto;

  // Hide the scroll bar
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`

const Page = styled.div`
  position: relative; /* Required for positioning the arrow button */
  height: 100vh;
  overflow: auto;
  // snap scrolling effect
  scroll-snap-align: start;
  scroll-snap-stop: always;
`

const Slide = styled.div`
  width: 100%;
  height: 100vh;
  object-fit: cover;

  text-align: center;
  font-size: 18px;
  color: #000;

  /* Center slide content vertically */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding-top: 52px;

  ${({ theme }) => theme.breakpoint.md} {
    padding-top: 74px;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: center;
    padding-top: 0px;
  }
`

const ContentContainer = styled.div`
  width: 80%;
  margin: auto;
`

const ArrowButton = styled.button`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  outline: none;
  cursor: pointer;
  width: 24px;
  height: 12px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in;

  &:focus {
    outline: 0;
  }

  svg {
    line {
      stroke: rgba(255, 255, 255, 0.7);
    }
  }

  &:hover {
    transform: translateX(-50%) translateY(6px);
    svg {
      line {
        stroke: white;
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    bottom: 24px;
    width: 52px;
    height: 26px;
  }
`
const CaptionBoxPC = styled.div`
  display: none;
  position: relative;
  position: absolute;
  bottom: 130px;
  left: 67px;

  cursor: pointer;

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
  }
`
const CaptionPC = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  color: #ffffff;
  width: 682px;
  height: auto;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.6);
  border: 0.5px solid #ffffff;
  pointer-events: none;
  user-select: none;
  transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
  ${({
    // @ts-ignore
    transparent,
  }) =>
    transparent
      ? `
      border: transparent;
      background: transparent;
      color: transparent;
    `
      : ''}
`
const ShowCaptionIcon = styled.div`
  height: auto;
  width: 4px;
  background-color: #ffffff;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 12px);
    left: -24px;
    width: 24px;
    height: 24px;
    background-image: url(/images/caption-icon.svg);
  }
`

const CaptionMB = styled.div`
  padding: 20px;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  text-align: justify;

  color: #ffffff;

  ${({ theme }) => theme.breakpoint.xl} {
    display: none;
  }
`

/**
 * @typedef {import('../../../apollo/fragments/post').Post} PostData
 */

/**
 *
 * @param {Object} param
 * @param {PostData} param.postData
 * @returns
 */

export default function StoryPhotographyStyle({ postData }) {
  const {
    title = '',
    heroImage = null,
    heroCaption = '',
    // updatedAt = '',
    // publishedDate = '',
    writers = [],
    manualOrderOfWriters = [],
    photographers = [],
    camera_man = [],
    designers = [],
    engineers = [],
    vocals = [],
    extend_byline = '',
    // relateds = [],
    // manualOrderOfRelateds = [],
    // slug = '',
    content = null,
    brief = null,
  } = postData

  const credits = [
    { writers: manualOrderOfWriters ? manualOrderOfWriters : writers },
    { photographers: photographers },
    { camera_man: camera_man },
    { designers: designers },
    { engineers: engineers },
    { vocals: vocals },
    { extend_byline: extend_byline },
  ]

  // Get images array from content.entityMap
  const photosArray = Object.values(content.entityMap).filter(
    (item) => item.type === 'image'
  )

  console.log(photosArray)

  // Page ArrowDown button click handler
  const pageRefs = useRef([])
  const buttonRefs = useRef([])
  const lastContentRef = useRef(null)

  const handleHeroButtonClick = () => {
    if (pageRefs.current[0]) {
      pageRefs.current[0].scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSlidesButtonClick = (buttonIndex) => {
    if (buttonIndex < photosArray.length - 1) {
      pageRefs.current[buttonIndex + 1].scrollIntoView({ behavior: 'smooth' })
    } else if (buttonIndex === photosArray.length - 1) {
      if (lastContentRef.current) {
        lastContentRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      const currentIndex = buttonRefs.current.findIndex(
        (ref) => ref && ref === document.activeElement
      )
      if (currentIndex >= 0 && currentIndex < buttonRefs.current.length - 1) {
        buttonRefs.current[currentIndex + 1].focus()
      }
    } else if (event.key === 'ArrowUp') {
      const currentIndex = buttonRefs.current.findIndex(
        (ref) => ref && ref === document.activeElement
      )
      if (currentIndex > 0) {
        buttonRefs.current[currentIndex - 1].focus()
      }
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const [isTransparent, setIsTransparent] = useState(true)
  const handleCaptionClick = () => {
    setIsTransparent((prevState) => !prevState)
  }

  return (
    <Main>
      <Header />
      <Page>
        <HeroSection
          title={title}
          heroCaption={heroCaption}
          brief={brief.blocks[0].text}
          heroImage={heroImage}
        />

        <ArrowButton onClick={handleHeroButtonClick}>
          <ArrowDown />
        </ArrowButton>
      </Page>

      {photosArray.map((photo, index) => (
        <Page key={index} ref={(el) => (pageRefs.current[index] = el)}>
          <Slide>
            <img
              src={
                photo?.data.resized?.original ||
                photo?.data.resized?.w2400 ||
                photo?.data.resized?.w1600 ||
                '/images/default-og-img.png'
              }
              alt={photo.data.desc}
            />
            <CaptionBoxPC onClick={handleCaptionClick}>
              <ShowCaptionIcon />
              <CaptionPC
                // @ts-ignore
                transparent={isTransparent}
              >
                {photo?.data?.desc}
              </CaptionPC>
            </CaptionBoxPC>
            <CaptionMB>{photo?.data?.desc}</CaptionMB>
          </Slide>
          <ArrowButton
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleSlidesButtonClick(index)}
          >
            <ArrowDown />
          </ArrowButton>
        </Page>
      ))}

      <Page ref={lastContentRef}>
        <ContentContainer>
          <section className="content">
            <DraftRenderBlock
              rawContentBlock={content}
              contentLayout="photography"
            />
          </section>
          <Credits credits={credits}></Credits>
        </ContentContainer>
      </Page>
    </Main>
  )
}
