// @ts-nocheck
import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
import Credits from './credits'

const Main = styled.main`
  height: auto;
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
  background-attachment: fixed;
  background-position: center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

const TitleBox = styled.div`
  color: white;
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 32px;
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
    line-height: 20px;
    color: #ffffff;
  }
`

const Container = styled.div`
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
  const imageArray = Object.values(content.entityMap).filter(
    (item) => item.type === 'image'
  )

  console.log(imageArray)

  return (
    <Main>
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
      <Container>
        <section className="content">
          <DraftRenderBlock
            rawContentBlock={content}
            contentLayout="photography"
          />
        </section>
        <Credits credits={credits}></Credits>
      </Container>
    </Main>
  )
}
