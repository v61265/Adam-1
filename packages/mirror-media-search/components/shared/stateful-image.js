import styled from 'styled-components'
import { useState, useEffect } from 'react'
import loadingGif from '../../public/images/loading.gif'

const Img = styled.img`
  object-fit: ${({ isLoading }) => (isLoading ? 'contain' : 'cover')};
`

export default function StateuflImage({ className, altName = 'image', src }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setTimeout(() => setIsImageLoaded(true), 50)
    img.onError = (error) => {
      console.error('loading image with error', error)
    }

    img.src = src
  }, [src])

  const computedImageSrc = isImageLoaded ? src : loadingGif.src
  return (
    <Img
      src={computedImageSrc}
      isLoading={!isImageLoaded}
      className={className}
      alt={altName}
    />
  )
}
