import styled from 'styled-components'
import VideoListItem from '../shared/video-list-item'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 288px;
  justify-content: center;
  row-gap: 16px;
  margin-top: 16px;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: repeat(3, 186px);
    gap: 24px 19px;
    margin-top: 28px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    grid-template-columns: repeat(4, 238px);
    gap: 48px 23px;
    margin-top: 36px;
  }
`

/**
 * @param {Object} props
 * @param {import('../../type/youtube').YoutubeVideo[]} props.videos
 * @returns {React.ReactElement}
 */
export default function VideoList({ videos }) {
  return (
    <Wrapper>
      {videos.map((video) => (
        <VideoListItem key={video.id} video={video} />
      ))}
    </Wrapper>
  )
}
