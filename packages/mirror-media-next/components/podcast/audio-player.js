import styled, { keyframes } from 'styled-components'
import { Z_INDEX } from '../../constants'

const marquee = keyframes`
   0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const PlayerWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  cursor: default;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 116px;
  background: rgba(0, 0, 0, 0.87);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_INDEX.header};

  ${({ theme }) => theme.breakpoint.md} {
    height: 88px;
  }
`

const MarqueeContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 278px;
  height: 52px;
  ${({ theme }) => theme.breakpoint.md} {
    width: 557px;
    height: 44px;
  }
`

const MarqueeContent = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-top: 14px;

  display: inline-block;
  white-space: nowrap;
  animation: ${marquee} 18s linear infinite;
  position: absolute;
  top: 0;
  left: 0;

  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 10px;
  }

  &:hover {
    animation-play-state: paused; /* Pause the animation on hover */
  }
`

export default function AudioPlayer({ listeningPodcast }) {
  const resetPodcast = listeningPodcast
    ? listeningPodcast.enclosures[0].url
    : null

  return (
    <PlayerWrapper>
      {listeningPodcast && (
        <>
          <MarqueeContainer>
            <MarqueeContent>{listeningPodcast.title}</MarqueeContent>
          </MarqueeContainer>
          <audio controls key={resetPodcast}>
            <source
              src={listeningPodcast.enclosures[0].url}
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </PlayerWrapper>
  )
}
