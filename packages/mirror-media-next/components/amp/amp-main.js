import Link from 'next/link'
import styled from 'styled-components'
import { sortArrayWithOtherArrayId } from '../../utils'
import ButtonCopyLink from '../story/shared/button-copy-link'
import ButtonSocialNetworkShare from '../story/shared/button-social-network-share'
import AmpCredits from '../story/shared/credits'
import AmpHero from './amp-hero'
import AmpInfo from './amp-info'

const MainWrapper = styled.div`
  margin-top: 24px;

  .i-amp-credits {
    display: flex;
    margin: 20px 20px 0 20px;
    width: 100%;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
    line-height: 16px;
    color: #4a4a4a;
    figcaption {
      padding-right: 8px;
      margin-right: 8px;
      border-right: 1px solid #4a4a4a;
      color: #4a4a4a;
      min-width: fit-content;
      max-width: 72px;
      &:after {
        display: none;
      }
    }
    figure {
      & + figure {
        margin-top: 8px;
      }
      li {
        color: #4a4a4a;
      }
      li + li {
        display: flex;
        position: relative;
        &:before {
          content: '';
          display: block;
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c4c4c4;
          top: 50%;
          left: 0;
          transform: translate(calc(-8px - 50%), -50%);
        }
      }
    }
  }
`

const SharesWrapper = styled.ul`
  display: flex;
  padding-top: 24px;
  justify-content: center;
  gap: 16px;
`

const TagsWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 28px;
`

const TagItem = styled(Link)`
  font-size: 14px;
  line-height: 20px;
  color: #054f77;
  padding: 4px 8px;
  border: 1px solid #054f77;
  border-radius: 2px;
  margin-top: 8px;
  & + & {
    margin-left: 8px;
  }
`

/**
 * @typedef {import('../../apollo/fragments/post').Post} PostData
 */

/**
 *
 * @param {Object} props
 * @param {PostData} props.postData
 * @returns {JSX.Element}
 */
export default function AmpMain({ postData }) {
  const {
    title = '',
    sections = [],
    manualOrderOfSections = [],
    heroImage = null,
    heroVideo = null,
    heroCaption = '',
    publishedDate = '',
    updatedAt = '',
    writers = [],
    manualOrderOfWriters = [],
    photographers = [],
    camera_man = [],
    designers = [],
    engineers = [],
    vocals = [],
    extend_byline = '',
    tags = [],
    // brief = { blocks: [], entityMap: {} },
    // content = { blocks: [], entityMap: {} },
  } = postData

  const writersWithOrdered =
    manualOrderOfWriters && manualOrderOfWriters.length
      ? sortArrayWithOtherArrayId(writers, manualOrderOfWriters)
      : writers

  const credits = [
    { writers: writersWithOrdered },
    { photographers: photographers },
    { camera_man: camera_man },
    { designers: designers },
    { engineers: engineers },
    { vocals: vocals },
    { extend_byline: extend_byline },
  ]

  return (
    <MainWrapper>
      <AmpInfo
        title={title}
        sections={sections}
        publishedDate={publishedDate}
        updatedAt={updatedAt}
        manualOrderOfSections={manualOrderOfSections}
      />
      <SharesWrapper>
        <ButtonSocialNetworkShare type="facebook" />
        <ButtonSocialNetworkShare type="line" />
        <ButtonCopyLink />
      </SharesWrapper>
      <AmpHero
        heroCaption={heroCaption}
        heroImage={heroImage}
        heroVideo={heroVideo}
        title={title}
      />
      <AmpCredits credits={credits} className="i-amp-credits" />
      <TagsWrapper>
        {tags.map((tagItem) => {
          return (
            <TagItem
              key={tagItem.id}
              target="_blank"
              rel="noreferrer"
              href={`/tag/${tagItem.slug}`}
            >
              {tagItem.name}
            </TagItem>
          )
        })}
      </TagsWrapper>
    </MainWrapper>
  )
}
