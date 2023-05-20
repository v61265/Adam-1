import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
`
const Slide = styled.div`
  display: block;
  width: 100%;
  height: 100vh;
  object-fit: cover;

  text-align: center;
  font-size: 18px;
  background: #fff;
  color: #000;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid #000;
`

export default function PhotoSlider(
  {
    // heroImage = null,
    // heroCaption = '',
    // title = '',
  }
) {
  return (
    <Wrapper>
      <Slide>Slide 1</Slide>
      <Slide>Slide 2</Slide>
      <Slide>Slide 3</Slide>
      <Slide>Slide 4</Slide>
      <Slide>Slide 5</Slide>
      <Slide>Slide 6</Slide>
      <Slide>Slide 7</Slide>
      <Slide>Slide 8</Slide>
      <Slide>Slide 9</Slide>
    </Wrapper>
  )
}
