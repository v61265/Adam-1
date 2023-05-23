// @ts-nocheck
import { useRef } from 'react'
import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import Credits from './potography-credits'
import PhotoSlider from './photo-slider'

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

const ContentContainer = styled.div`
  width: 80%;
  margin: auto;

  // snap scrolling effect
  scroll-snap-align: start;
  height: 1000px;
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

  const contentRef = useRef(null)

  return (
    <Main>
      <PhotoSlider
        photos={photosArray}
        title={title}
        heroCaption={heroCaption}
        brief={brief.blocks[0].text}
        heroImage={heroImage}
        contentRef={contentRef}
      />
      <ContentContainer ref={contentRef}>
        <section className="content">
          <DraftRenderBlock
            rawContentBlock={content}
            contentLayout="photography"
          />
        </section>
        <Credits credits={credits}></Credits>
      </ContentContainer>
    </Main>
  )
}
