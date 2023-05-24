/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useRef } from 'react'
import styled, { css } from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import Credits from './potography-credits'

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

const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
}

const Slide = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;

  text-align: center;
  font-size: 18px;
  color: #000;

  /* Center slide content vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const ContentContainer = styled.div`
  width: 80%;
  margin: auto;

  // snap scrolling effect
  scroll-snap-align: start;
  height: 1000px;
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
  z-index: 100;

  &:hover {
    background-color: yellow;
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
  console.log(postData)

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

  return (
    <Main>
      <Page>
        <HeroImage
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
            <p className="brief">{brief.blocks[0].text}</p>
          </TitleBox>
        </HeroImage>
        <ArrowButton onClick={handleHeroButtonClick}>▼</ArrowButton>
      </Page>

      {photosArray.map((photo, index) => (
        <Page key={index} ref={(el) => (pageRefs.current[index] = el)}>
          <Slide>
            <img src={photo.data.resized.original} alt={photo.data.desc} />
          </Slide>
          <ArrowButton
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleSlidesButtonClick(index)}
          >
            ▼
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
