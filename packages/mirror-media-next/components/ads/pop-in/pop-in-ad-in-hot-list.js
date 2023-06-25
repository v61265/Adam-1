import PopInAd from './pop-in-ad'
import styled from 'styled-components'

const StyledPopInAd = styled(PopInAd)`
  #_popIn_hot {
    ._popIn_recommend_article {
      flex-direction: row;
    }

    ._popIn_label {
      padding: 0 8px !important;
      line-height: 25px;
    }

    ._popIn_recommend_art_title a {
      margin-top: 8px !important;
    }
  }
`
/**
 * Show Pop In ad as hot post.
 * Before use this component, make sure the page include the hook `usePopInAd` to insert the Pop In script.
 * In mirror-media-nuxt the style was set in the Pop In script.
 * Since there will be new style in 3.0, write style like ~/components/ads/pop-in/pop-in-in-related-list.js
 * or ask the ad publisher to change the style in script.
 * Check [document](https://paper.dropbox.com/doc/--B5HoYJJCDi3wuLktiME_oi2YAg-UtXMJmDEubtFfxcoB3zZ9#:h2=%E7%AE%A1%E7%90%86%E6%96%B9%E5%BC%8F) for more detail.
 *
 * @param {Object} props
 * @param {string} props.popInId
 * @param {string} [props.className]
 * @returns {React.ReactElement}
 */
export default function PopInAdInHotList({
  popInId,
  className = 'pop-in-hot-ad',
}) {
  return <StyledPopInAd popInId={popInId} className={className} />
}
