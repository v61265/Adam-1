import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  padding-top: 20px;
  iframe {
    width: 100%;
    min-height: 550px;
    ${({ theme }) => theme.breakpoint.xl} {
      min-height: 600px;
    }
  }
`
export default function Election2024Homepage() {
  return (
    <Wrapper>
      <iframe src="https://dev.mirrormedia.mg/projects/dev-election2024-homepage-0110-3/index.html"></iframe>
    </Wrapper>
  )
}
