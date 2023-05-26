/* eslint-disable @next/next/no-img-element */

import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import Credits from './potography-credits'
import HeroSection from './hero-section'
import ArrowButton from './arrow-down-button'

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

  return (
    <Main>
      <Page>
        <HeroSection
          title={title}
          heroCaption={heroCaption}
          brief={brief.blocks[0].text}
          heroImage={heroImage}
        />

        <ArrowButton onClick={handleHeroButtonClick} />
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
          </Slide>
          <ArrowButton
            ref={(el) => (buttonRefs.current[index] = el)}
            onClick={() => handleSlidesButtonClick(index)}
          />
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
