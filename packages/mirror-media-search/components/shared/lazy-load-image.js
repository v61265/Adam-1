import { useRef } from 'react'
import styled from 'styled-components'
import useOnScreen from '../../hooks/useOnScreen'
import StatefulImage from './stateful-image'

const LazyWrapper = styled.div``
const LazyImage = styled(StatefulImage)`
  width: 100%;
  height: 100%;
`

export default function LazyLoadImage({ className, src }) {
  const lazyWrapperRef = useRef()
  const onceShowed = useRef(false)
  const lazyWrapperOnScreen = useOnScreen(lazyWrapperRef)

  if (lazyWrapperOnScreen) {
    onceShowed.current = true
  }

  return (
    <LazyWrapper className={className} ref={lazyWrapperRef}>
      {onceShowed.current && <LazyImage src={src} />}
    </LazyWrapper>
  )
}
