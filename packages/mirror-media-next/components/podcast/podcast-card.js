import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

const CardContainer = styled.li`
  width: 100%;
  background: #f4f5f6;

  ${({ theme }) => theme.breakpoint.md} {
    height: 499px;
    width: 244px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
`
const BlueBar = styled.div`
  height: 26px;
  background: #1d9fb8;
  ${({ theme }) => theme.breakpoint.md} {
    height: 20px;
  }
`
const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  ${({ theme }) => theme.breakpoint.md} {
    height: 244px;
  }
`

const LoadingSpinner = styled.img`
  margin: auto;
`

export default function PodcastCard({ podcast }) {
  const [isLoading, setIsLoading] = useState(true)
  return (
    <CardContainer>
      <BlueBar />
      {/* Display the loading spinner or placeholder when isLoading is true */}
      {isLoading && (
        <LoadingSpinner src="/images-next/loading.gif" alt="Loading" />
      )}
      <ImageWrapper>
        <Image
          priority
          src={podcast?.heroImage || '/images-next/default-og-img.png'}
          fill={true}
          alt="Picture of the author"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          onLoad={() => setIsLoading(false)}
          unoptimized={true}
        />
      </ImageWrapper>
      {podcast.title}
    </CardContainer>
  )
}
