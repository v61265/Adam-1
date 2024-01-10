import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  padding-top: 20px;
  iframe {
    width: 100%;
    min-height: 600px;
  }
`
export default function Election2024Homepage({ className = '' }) {
  return (
    <Wrapper className={className}>
      <iframe src="https://dev.mirrormedia.mg/projects/dev-election2024-homepage-0110-7/index.html"></iframe>
      {/* <iframe src="http://localhost:3001"></iframe> */}
    </Wrapper>
  )
}
