import styled from 'styled-components'
const CardContainer = styled.li`
  height: 558px;
  width: 100%;
  background: #f4f5f6;

  ${({ theme }) => theme.breakpoint.md} {
    height: 499px;
    width: 244px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`
export default function PodcastCard({ podcast }) {
  console.log(podcast)

  return <CardContainer>{podcast.title}</CardContainer>
}
