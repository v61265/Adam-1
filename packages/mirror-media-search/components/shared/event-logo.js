import styled from 'styled-components'
import { minWidth } from '../../styles/breakpoint'

const EventLogoWrapper = styled.a`
  cursor: pointer;
  user-select: none;
`

const EventLogoIcon = styled.img`
  width: 74px;
  @media ${minWidth.xl} {
    width: auto;
    height: 50px;
  }
`

export default function EventLogo({ eventLogo }) {
  const eventLogoLink = eventLogo?.link ?? '/'
  const eventLogoImage =
    eventLogo?.image?.image?.resizedTargets?.mobile?.url ?? ''
  const eventLogoName = eventLogo?.name ?? ''
  return (
    <EventLogoWrapper
      href={eventLogoLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <EventLogoIcon src={eventLogoImage} alt={eventLogoName} />
    </EventLogoWrapper>
  )
}
