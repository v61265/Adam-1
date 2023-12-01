import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Z_INDEX } from '../../constants'

const ModalWrapper = styled.div`
  position: fixed;
  cursor: default;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${Z_INDEX.header};
`

const ModalContent = styled.div`
  position: relative;
  background: #fff;
  border-radius: 8px;
  padding: 28px 20px;
  max-height: 458px;
  width: 280px;
  overflow-y: scroll;
  word-wrap: break-word;
  cursor: default;

  ${({ theme }) => theme.breakpoint.md} {
    height: 499px;
    width: 244px;
    padding: 28px 40px;
    max-height: 472px;
    width: 480px;
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background-image: url('/images-next/close-circle.svg');
  background-size: cover;

  ${({ theme }) => theme.breakpoint.md} {
    top: 10px;
    right: 10px;
  }
`

const PodcastModal = ({ podcast, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      handleOutsideClick(event)
    }

    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <ModalWrapper>
      <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <h2>{podcast.title}</h2>
        <p>Description: {podcast.description}</p>
      </ModalContent>
    </ModalWrapper>
  )
}

export default PodcastModal
