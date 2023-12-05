import { useEffect, useRef, useState } from 'react'
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
const AudioPlayerContainer = styled.div`
  height: 52px;
  width: 278px;
  background-color: grey;

  color: #fff;

  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;

  ${({ theme }) => theme.breakpoint.md} {
    width: 557px;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const SeekSlider = styled.input`
  width: 100%;
  margin: 0 10px;
`

export default function AudioPlayer({ listeningPodcast }) {
  const audioURL = listeningPodcast.enclosures[0].url

  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)
  const [duration, setDuration] = useState('0:00')
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0)
  const [formattedCurrentTime, setFormattedCurrentTime] = useState('0:00')

  useEffect(() => {
    const audio = audioRef.current

    const updateTime = () => {
      const currentSeconds = Math.floor(audio.currentTime)
      setCurrentTimeSeconds(currentSeconds)

      const minutes = Math.floor(currentSeconds / 60)
      const seconds = currentSeconds % 60
      setFormattedCurrentTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
    }

    const updateDuration = () => {
      const durationSeconds = Math.floor(audio.duration)
      const minutes = Math.floor(durationSeconds / 60)
      const seconds = durationSeconds % 60
      setDuration(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration) // Event to update duration

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [audioURL])

  useEffect(() => {
    // Reset play time and update duration when audio URL changes
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
      setCurrentTimeSeconds(0)
      setFormattedCurrentTime('0:00')
      setDuration('0:00')
      setIsPlaying(false)
      setSpeed(1)
    }
  }, [audioURL])

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const updateSpeed = () => {
    const audio = audioRef.current
    if (speed === 1) {
      audio.playbackRate = 1.5
      setSpeed(1.5)
    } else if (speed === 1.5) {
      audio.playbackRate = 2
      setSpeed(2)
    } else {
      audio.playbackRate = 1
      setSpeed(1)
    }
  }

  const onSeek = (e) => {
    const audio = audioRef.current
    const newTime = parseInt(e.target.value, 10) // Convert string to number
    audio.currentTime = newTime
    setCurrentTimeSeconds(newTime) // Update currentTime state with numeric value
  }

  return (
    <PlayerWrapper>
      {listeningPodcast && (
        <>
          <MarqueeContainer>
            <MarqueeContent>{listeningPodcast.title}</MarqueeContent>
          </MarqueeContainer>

          <AudioPlayerContainer key={audioURL}>
            <audio ref={audioRef} src={audioURL}></audio>
            <Controls>
              <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <span>{formattedCurrentTime}</span> / <span>{duration}</span>
              <SeekSlider
                type="range"
                min="0"
                step="1"
                value={currentTimeSeconds}
                onChange={onSeek}
              />
              <button onClick={updateSpeed}>{speed}X</button>
            </Controls>
          </AudioPlayerContainer>
        </>
      )}
    </PlayerWrapper>
  )
}
