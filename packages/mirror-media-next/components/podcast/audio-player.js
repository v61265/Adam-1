import styled from 'styled-components'
import { Z_INDEX } from '../../constants'

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

  p {
    color: #fff;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: normal;
  }

  ${({ theme }) => theme.breakpoint.md} {
    height: 88px;
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
          <p>{listeningPodcast.title}</p>
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
