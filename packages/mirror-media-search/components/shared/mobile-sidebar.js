import { useContext } from 'react'
import { RedirectUrlContext } from '../../context/redirectUrl'
import styled from 'styled-components'
import { minWidth } from '../../styles/breakpoint'
import closeButtonIcon from '../../public/images/close_white.png'
import { sectionColors } from '../../styles/sections-color'
import transparentPng from '../../public/images/transparent.png'
import socialMediaIcons from '../../public/images/social-media-white.png'

const SidebarWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  width: 100%;
  height: 100vh;
  z-index: 539;
  overflow-y: auto;
  color: #fff;
  padding: calc(36px + 2.5%) 5% 5% 5%;
  line-height: 1.15;
  @media ${minWidth.xl} {
    display: none;
  }
  a {
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
`
const CloseButton = styled.button`
  position: fixed;
  top: 16px;
  right: 16px;
  width: 20px;
  height: 20px;
  background-image: url(${closeButtonIcon.src});
  background-size: 20px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  user-select: none;
`
const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin-right: -8px;
  margin-left: -8px;
  margin-bottom: 16px;
`
const Topic = styled.a`
  border-right: 1px solid #fff;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  &:last-child {
    border-right: none;
  }
`

const Sections = styled.div`
  margin-bottom: 16px;
`
const Section = styled.div`
  border-left-width: 3px;
  border-left-style: solid;
  border-bottom: 1px solid #7e7e7e;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  font-weight: 300;
  ${({ color }) => color && `border-left-color: ${color};`}
  &.mirrorvoice {
    border-left-color: #ff521d;
  }
  &.mirrorfiction {
    border-left-color: #968375;
  }
  &.readr {
    border-left-color: #000;
    border-bottom: none;
  }
`
const SectionTitle = styled.a`
  font-size: 19.2px;
`
const SectionCategories = styled.div`
  display: flex;
  font-size: 17.6px;
  color: #969696;
  flex-wrap: wrap;
  margin-top: 16px;
  margin-bottom: -4px;
  a {
    margin-top: 4px;
    margin-bottom: 4px;
    margin-right: 18px;
  }
`

const PromotionLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-weight: 300;
  color: #969696;
  justify-content: space-between;
  margin-bottom: 16px;
  a {
    width: calc(50% - 4px);
    border: 1px solid #969696;
    margin-top: 8px;
    margin-bottom: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`

const SocialMedias = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  img {
    width: 20px;
    height: 20px;
    background-image: url(${socialMediaIcons.src});
    display: block;
    background-size: 126px 120px;
    &.line {
      background-position: -86px -80px;
    }
    &.weibo {
      background-position: -66px -60px;
    }
    &.facebook {
      background-position: -106px -100px;
    }
    &.instagram {
      background-position: -46px -40px;
    }
    &.rss {
      background-position: -26px -20px;
    }
    &.email {
      width: 26px;
      background-position: 0 0;
    }
  }
`

function getCategoryHref(sectionName, categoryName) {
  if (sectionName === 'videohub') {
    return `/video_category/${categoryName}`
  }
  if (categoryName === 'magazine') {
    return '/magazine/'
  }
  return `/category/${categoryName}`
}

export default function MobileSidebar({
  topics = [],
  sections = [],
  subBrands = [],
  promotions = [],
  socialMedias = [],
  closeSidebar = () => {},
}) {
  const redirectUrl = useContext(RedirectUrlContext)

  return (
    <SidebarWrapper>
      <CloseButton
        onClick={() => {
          closeSidebar()
        }}
      />
      <Topics>
        {topics.map((topic) => {
          console.log('topic', topic)
          return (
            <Topic key={topic._id} href={`${redirectUrl}/topic/${topic._id}`}>
              <h2>{topic.name}</h2>
            </Topic>
          )
        })}
        <Topic href={`${redirectUrl}/section/topic`}>
          <h2>更多</h2>
        </Topic>
      </Topics>
      <Sections>
        {sections.map((section) => (
          <Section key={section._id} color={sectionColors[section.name]}>
            <SectionTitle href={`${redirectUrl}/section/${section.name}`}>
              <h2>{section.title}</h2>
            </SectionTitle>
            {section.categories.length > 0 && (
              <SectionCategories>
                {section.categories.map((category) => (
                  <a
                    key={category._id}
                    href={`${redirectUrl}${getCategoryHref(
                      section.name,
                      category.name
                    )}`}
                  >
                    <h3>{category.title}</h3>
                  </a>
                ))}
              </SectionCategories>
            )}
          </Section>
        ))}
        {subBrands.map((subBrand) => (
          <Section key={subBrand.name} className={subBrand.name}>
            <SectionTitle
              href={subBrand.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {subBrand.title}
            </SectionTitle>
          </Section>
        ))}
      </Sections>
      <PromotionLinks>
        {promotions.map((promotion) => (
          <a
            key={promotion.name}
            href={promotion.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {promotion.title}
          </a>
        ))}
      </PromotionLinks>
      <SocialMedias>
        {socialMedias.map((media) => (
          <a
            key={media.name}
            href={media.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={transparentPng.src}
              alt={media.name}
              className={media.name}
            />
          </a>
        ))}
      </SocialMedias>
    </SidebarWrapper>
  )
}
