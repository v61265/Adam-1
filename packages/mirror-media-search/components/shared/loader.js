import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Spinner = styled.svg`
  transition: opacity 0.15s ease;
  animation: rotator 1.4s linear infinite;
  animation-play-state: running;

  @keyframes rotator {
    0% {
      transform: scale(0.5) rotate(0deg);
    }
    100% {
      transform: scale(0.5) rotate(270deg);
    }
  }
`

const Path = styled.circle`
  stroke: #ff6600;
  stroke-dasharray: 126;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash 1.4s ease-in-out infinite;

  @keyframes dash {
    0% {
      stroke-dashoffset: 126;
    }
    50% {
      stroke-dashoffset: 63;
      transform: rotate(135deg);
    }
    100% {
      stroke-dashoffset: 126;
      transform: rotate(450deg);
    }
  }
`

export default function Loader() {
  return (
    <Wrapper>
      <Spinner width="44px" height="44px" viewBox="0 0 44 44">
        <Path
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          cx="22"
          cy="22"
          r="20"
        />
      </Spinner>
    </Wrapper>
  )
}
