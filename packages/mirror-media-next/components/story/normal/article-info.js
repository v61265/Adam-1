import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import ButtonCopyLink from '../shared/button-copy-link'
import DonateLink from '../shared/donate-link'
import ButtonSocialNetworkShare from '../shared/button-social-network-share'
/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

const Date = styled.div`
  width: fit-content;
  height: auto;
  font-size: 14px;
  line-height: 1;
  color: #a1a1a1;
  margin-bottom: 8px;
  ${({ theme }) => theme.breakpoint.md} {
    display: none;
  }
`

const Credits = styled.div`
  font-size: 16px;
  line-height: 1.5;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
    margin-top: 12px;
  }
`

const CreditTitle = styled.span`
  color: rgba(0, 0, 0, 0.5);
  width: fit-content;
  ${({ theme }) => theme.breakpoint.md} {
    color: rgba(52, 73, 94, 1);
  }
`

const CreditList = styled.span`
  display: flex;
  gap: 0px 6px;
  flex-wrap: wrap;
  .link {
    color: ${
      /** @param {{theme:Theme}} param */
      ({ theme }) => theme.color.brandColor.darkBlue
    };
  }

  .no-link {
    color: rgba(52, 73, 94, 1);
  }
`

const Tag = styled.a`
  font-size: 14px;
  line-height: 20px;
  padding: 4px 8px;
  border-radius: 2px;
  background-color: ${
    /**
     * @param {{theme:Theme}} param
     */
    ({ theme }) => theme.color.brandColor.darkBlue
  };
  color: white;
  font-weight: 400;
`
const Tags = styled.div`
  display: flex;
  gap: 12px 8px;
  flex-wrap: wrap;
  margin-top: 20px;
  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 25.5px;
  }
`

const SocialMedia = styled.div`
  display: flex;
  gap: 10px;
  padding: 0;
  position: relative;
  margin-bottom: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    padding: 0 40px;
    margin-bottom: 0px;
    &::before,
    &::after {
      position: absolute;
      content: '';
      background-color: #a1a1a1;
      width: 1px;
      height: 16px;
      transform: translateY(-50%);
      top: 50%;
    }
    &::before {
      left: 20px;
    }
    &::after {
      right: 20px;
    }
  }
`

const SocialMediaAndDonateLink = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;

  ${({ theme }) => theme.breakpoint.md} {
    margin-top: 40px;
    flex-direction: row;
    align-items: center;
  }
  .link-to-index {
    display: none;
    ${({ theme }) => theme.breakpoint.md} {
      display: block;
    }
  }
`

const ArticleInfoContainer = styled.div`
  border-left: 2px ${({ theme }) => theme.color.brandColor.darkBlue} solid;
  padding-left: 24px;
  margin: 32px 0;
  ${({ theme }) => theme.breakpoint.md} {
    border: none;
    padding-left: 0px;
    margin: 0 0 24px;
  }
`
const CREDIT_TITLE_NAME_MAP = {
  writers: '文',
  photographers: '攝影',
  camera_man: '影音',
  designers: '設計',
  engineers: '工程',
  vocals: '主播',
  extend_byline: '特約記者',
}

/**
 * @typedef {import('../../../apollo/fragments/contact').Contact[]} Contacts
 */

/**
 * @typedef {import('../../../apollo/fragments/tag').Tag[]} Tags
 */

/**
 * @typedef {Object} Credit
 * @property {Contacts} [writers]
 * @property {Contacts} [photographers]
 * @property {Contacts} [camera_man]
 * @property {Contacts} [designers]
 * @property {Contacts} [engineers]
 * @property {Contacts} [vocals]
 * @property {string} [extend_byline]
 */

/**
 * @param {Object} props
 * @param {string} props.updatedDate
 * @param {string} props.publishedDate
 * @param {Credit[]} props.credits
 * @param {Tags} props.tags
 * @returns {JSX.Element}
 */
export default function ArticleInfo({
  updatedDate,
  publishedDate,
  credits,
  tags,
}) {
  const shouldShowCredits = credits.some((credit) => {
    const [people] = Object.values(credit)
    return people.length !== 0 || (typeof people === 'string' && people.trim())
  })

  const shouldShowTags = tags && tags.length
  const creditsJsx = shouldShowCredits ? (
    <Credits>
      {credits.map((credit, index) => {
        const title = Object.keys(credit)
        const titleName = CREDIT_TITLE_NAME_MAP[title]
        const [people] = Object.values(credit)
        if (
          !titleName ||
          people.length === 0 ||
          (typeof people === 'string' && !people.trim())
        ) {
          return null
        }
        return (
          <CreditList key={index}>
            <CreditTitle>{titleName} | </CreditTitle>
            {Array.isArray(people) ? (
              people.map((person) => (
                <Link
                  target="_blank"
                  rel="noreferrer noopenner"
                  href={`/author/${person.id}`}
                  key={person.id}
                  className="link"
                >
                  {person.name}
                </Link>
              ))
            ) : (
              <p className="no-link">{people}</p>
            )}
          </CreditList>
        )
      })}
    </Credits>
  ) : null

  const tagsJsx = shouldShowTags ? (
    <Tags>
      {tags.map((tag) => (
        <Tag key={tag.id} href={`/tag/${tag.slug}`} target="_blank">
          {tag.name}
        </Tag>
      ))}
    </Tags>
  ) : null
  return (
    <ArticleInfoContainer>
      <Date>發布時間：{publishedDate} 臺北時間</Date>
      <Date>更新時間：{updatedDate} 臺北時間</Date>

      {creditsJsx}
      <SocialMediaAndDonateLink>
        <Link className="link-to-index" href="/">
          <Image
            width={35}
            height={35}
            alt="go-to-index-page"
            src="/images/logo-circle@2x.png"
          ></Image>
        </Link>
        <SocialMedia>
          <ButtonSocialNetworkShare type="facebook" />
          <ButtonSocialNetworkShare type="line" />
          <ButtonCopyLink />
        </SocialMedia>
        <DonateLink />
      </SocialMediaAndDonateLink>
      {tagsJsx}
    </ArticleInfoContainer>
  )
}
