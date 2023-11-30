import styled from 'styled-components'
import PodcastCard from './podcast-card'

const CardsWrapper = styled.ul`
  display: grid;
  row-gap: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    grid-template-columns: 1fr 1fr;
    grid-gap: 28px;
    gap: 28px;
  }
  ${({ theme }) => theme.breakpoint.xl} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 28px;
    column-gap: 16px;
  }
`

export default function PodcastList({
  selectedPodcasts,
  allPodcasts,
  selectedAuthor,
}) {
  console.log({ selectedPodcasts, allPodcasts })

  let podcastsToDisplay =
    selectedPodcasts.length > 0 ? selectedPodcasts : allPodcasts

  // Check if there are no podcasts for the selected author
  const noPodcastsForSelectedAuthor =
    selectedPodcasts.length === 0 &&
    selectedAuthor !== '' &&
    Object.keys(allPodcasts).every((author) => author !== selectedAuthor)

  return (
    <div>
      {noPodcastsForSelectedAuthor ? (
        <p>There are no podcasts for the selected author, {selectedAuthor}.</p>
      ) : podcastsToDisplay.length > 0 ? (
        <CardsWrapper>
          {podcastsToDisplay.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} />
          ))}
        </CardsWrapper>
      ) : (
        <p>There are no podcasts available.</p>
      )}
    </div>
  )
}
