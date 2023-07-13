import styled from 'styled-components'

const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
`
const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
`

/**
 *
 * @param {Object} props
 * @param {string} props.videoId
 * @returns
 */
export default function YoutubeIframe({ videoId }) {
  return (
    <IframeWrapper>
      <Iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        loading="lazy"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </IframeWrapper>
  )
}
