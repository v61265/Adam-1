import styled from 'styled-components'
import Nextink from 'next/link'

import { FOOTER_PROMOTION_LINKS } from '../constants/index'
import { FOOTER_SOCIAL_MEDIA_LISTS } from '../constants/footer'

const {
  PAPER_MAGAZINE_LINK,
  MAGAZINE_LINK,
  AUTH_LINK,
  CAMPAIGN_LINK,
  DOWNLOAD_APP_LINK,
  MEDIA_DISCIPLINE_LINK,
  AD_LINK,
} = FOOTER_PROMOTION_LINKS

const DESKTOP_PROMOTION_LISTS = [
  PAPER_MAGAZINE_LINK,
  MAGAZINE_LINK,
  AUTH_LINK,
  CAMPAIGN_LINK,
  DOWNLOAD_APP_LINK,
  MEDIA_DISCIPLINE_LINK,
]

const MOBILE_PROMOTION_LISTS = [
  PAPER_MAGAZINE_LINK,
  AD_LINK,
  CAMPAIGN_LINK,
  AUTH_LINK,
]

const FooterWrapper = styled.div`
  background: #f5f5f5;
  padding: 8px 62px;
  width: 100%;
  max-width: 1024px;
  margin: 24px auto 0px;

  .footer-desktop-promotion {
    display: none;
  }

  .footer-mobile-promotion {
    display: flex;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    border-top: 4px solid #000000;
    padding: 11px 0px 24px;
    background: none;
    margin: 32px auto 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .footer-desktop-promotion {
      display: flex;
    }

    .footer-mobile-promotion {
      display: none;
    }
  }
`

const PromotionLists = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px 20px;
  max-width: 270px;
  margin: auto;

  ${({ theme }) => theme.breakpoint.sm} {
    max-width: none;
  }

  ${({ theme }) => theme.breakpoint.xl} {
    justify-content: flex-start;
    gap: 0px 28px;
    margin: 0;
  }

  li {
    line-height: 1.5;
    color: #9d9d9d;
    cursor: pointer;

    ${({ theme }) => theme.breakpoint.xl} {
      color: #054f77;
      font-weight: 600;
    }
  }
`

const MediaLists = styled.ul`
  display: none;

  ${({ theme }) => theme.breakpoint.xl} {
    display: flex;
    gap: 0 25px;
    padding: 0px 5px;
  }
`

export default function ShareFooter() {
  const desktopPromotionLinks = DESKTOP_PROMOTION_LISTS.map((item) => {
    return (
      <li key={item.name} aria-label={item.title}>
        <Nextink
          href={item.href}
          target="_blank"
          rel="noopener noreferrer external nofollow"
        >
          {item.title}
        </Nextink>
      </li>
    )
  })

  const mobilePromotionLinks = MOBILE_PROMOTION_LISTS.map((item) => {
    return (
      <li key={item.name} aria-label={item.title}>
        <Nextink
          href={item.href}
          target="_blank"
          rel="noopener noreferrer external nofollow"
        >
          {item.title}
        </Nextink>
      </li>
    )
  })

  const socialMediaLinks = FOOTER_SOCIAL_MEDIA_LISTS.map((item) => {
    return (
      <li key={item.name} aria-label={item.name}>
        <Nextink
          href={item.href}
          target="_blank"
          rel="noopener noreferrer external nofollow"
        >
          <item.svgIcon />
        </Nextink>
      </li>
    )
  })

  const promotionListsJsx = (
    <>
      <PromotionLists className="footer-desktop-promotion">
        {desktopPromotionLinks}
      </PromotionLists>
      <PromotionLists className="footer-mobile-promotion">
        {mobilePromotionLinks}
      </PromotionLists>
    </>
  )

  return (
    <FooterWrapper>
      {promotionListsJsx}
      <MediaLists>{socialMediaLinks}</MediaLists>
    </FooterWrapper>
  )
}
