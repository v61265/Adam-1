import styled from 'styled-components'
import DraftRenderBlock from '../shared/draft-renderer-block'
// import { MirrorMedia } from '@mirrormedia/lilith-draft-renderer'
import Credits from '../wide/credits'

const Main = styled.main`
  margin: auto;
  width: 100%;
  background-color: darkgray;
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
    // title = '',
    // heroImage = null,
    // heroCaption = '',
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

  return (
    <Main>
      <div>這是photography版型</div>
      <section className="content">
        <DraftRenderBlock rawContentBlock={brief} contentLayout="photography" />
        <DraftRenderBlock
          rawContentBlock={content}
          contentLayout="photography"
        />
      </section>
      <Credits credits={credits}></Credits>
    </Main>
  )
}
