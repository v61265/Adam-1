/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
  background-color: #333333;
`
const Slide = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;

  text-align: center;
  font-size: 18px;
  color: #000;

  // snap scrolling effect
  scroll-snap-align: start;
  scroll-snap-stop: always;

  /* Center slide content vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  /* img {
    width: 100%;
  } */
`

export default function PhotoSlider({ photos = [] }) {
  return (
    <Wrapper>
      {photos.map((photo, index) => (
        <Slide key={index}>
          <img src={photo.data.resized.original} alt={photo.data.desc} />
        </Slide>
      ))}
    </Wrapper>
  )
}
