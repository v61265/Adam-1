import styled from 'styled-components'
import {
  MEDIA_SIZE,
  PROMOTION_LINKS,
  SOCIAL_MEDIA_LINKS,
} from '../../constants'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import { minWidth } from '../../styles/breakpoint'

const FooterWrapper = styled.footer`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  @media ${minWidth.xl} {
    box-shadow: none;
    max-width: 1060px;
    padding: 15px 15px 50px 15px;
    margin: 0 auto;
    border-top: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`
const PromotionLinks = styled.nav`
  font-size: 18px;
  color: rgb(0, 0, 0, 0.4);
  display: flex;
  gap: 34px;
  justify-content: center;
  flex-wrap: wrap;
`
const PromotionLink = styled.a`
  display: flex;
  &.magazine,
  &.auth,
  &.download,
  &.discipline {
    display: none;
  }
  @media ${minWidth.xl} {
    color: #34495e;
    font-size: 16px;
    font-weight: 700;
    &.magazine,
    &.auth,
    &.download,
    &.discipline {
      display: initial;
    }
    &.webauthorize,
    &.ad {
      display: none;
    }
  }
`
const SocialMediaLinks = styled.nav`
  display: flex;
  gap: 26px;
  img {
    height: 100%;
  }
`
const SocialMediaLink = styled.a`
  display: inline-block;
  height: 20px;
`
const SocialMediaIcon = styled.img`
  height: 100%;
`

export default function Footer() {
  const { width } = useWindowDimensions()

  const showScocialMedia = width >= MEDIA_SIZE.xl

  return (
    <FooterWrapper>
      <PromotionLinks>
        {PROMOTION_LINKS.map((promotion) => (
          <PromotionLink
            key={promotion.name}
            href={promotion.href}
            className={promotion.name}
            target="_blank"
            rel="noopener noreferrer"
          >
            {promotion.title}
          </PromotionLink>
        ))}
      </PromotionLinks>
      {showScocialMedia && (
        <SocialMediaLinks>
          {SOCIAL_MEDIA_LINKS.map((media) => (
            <SocialMediaLink
              key={media.name}
              href={media.href}
              className={media.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialMediaIcon
                src={`/images/${media.name}.png`}
                alt={media.name}
              />
            </SocialMediaLink>
          ))}
        </SocialMediaLinks>
      )}
    </FooterWrapper>
  )
}
