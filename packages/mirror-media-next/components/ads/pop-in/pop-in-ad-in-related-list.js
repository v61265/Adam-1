import styled from 'styled-components'
import PopInAd from './pop-in-ad'
import { POP_IN_IDS } from '../../../constants/ads'

const StyledPopInAd = styled(PopInAd)`
  // copy from mirror-media-nuxt, need to be changed
  position: relative;
  ._popIn_recommend_container {
    padding-bottom: 0;
  }

  ._popIn_recommend_article {
    &::before {
      flex-shrink: 0;
      position: static;
      height: auto;
    }
  }

  ._popIn_recommend_art_title {
    flex-grow: 1;
    margin-left: 0;
    white-space: normal;
    @include media-breakpoint-up(md) {
      padding-left: 32px;
      padding-right: 32px;
    }

    a {
      display: block;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  ._popIn_recommend_art_img {
    flex-shrink: 0;
    width: 33%;
    padding-top: calc(33% * 0.75);
    @include media-breakpoint-up(md) {
      width: 25%;
      padding-top: calc(25% * 0.75);
    }
    @include media-breakpoint-up(xl) {
      width: 20%;
      padding-top: calc(20% * 0.75);
    }
    &::after {
      content: '特企';
      z-index: 2;
      padding: 4px;
      background: rgba(188, 188, 188, 1);
      color: #ffffff;
      font-weight: 300;
      font-size: 12px;
      line-height: 12px;
      position: absolute;
      transform: translate(0, -100%);
      @include media-breakpoint-up(md) {
        font-size: 14px;
        line-height: 14px;
      }
    }
  }
`

/**
 * Show Pop In ad as related post.
 * Style of the related post will be set by the styled-component.
 * Before use this component, make sure the page include the hook `usePopInAd` to insert the Pop In script.
 * @returns {React.ReactElement}
 */
export default function PopInAdInRelatedList() {
  return (
    <>
      {POP_IN_IDS.RELATED.map((popInId) => (
        <StyledPopInAd key={popInId} popInId={popInId} />
      ))}
    </>
  )
}
