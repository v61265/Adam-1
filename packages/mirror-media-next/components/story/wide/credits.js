import styled from 'styled-components'
import Link from 'next/link'

/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

const Wrapper = styled.section`
  width: 100%;
  max-width: 640px;
  margin: 24px auto;
`

const Credits = styled.section`
  font-size: 16px;
  line-height: 1;
  font-weight: 400;

  /* ${({ theme }) => theme.breakpoint.md} {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 20px;
    margin-top: 12px;
  } */
  text-align: center;
`

const CreditTitle = styled.figcaption`
  display: block;
  color: rgba(0, 0, 0, 0.5);

  position: relative;
  width: fit-content;
  min-width: 32px;
  text-align: left;
  margin-right: 14px;

  color: rgba(52, 73, 94, 1);

  &::after {
    position: absolute;
    content: ' | ';
    right: -7px;
    transform: translate(50%, 1px);
    top: 0;
    color: rgba(0, 0, 0, 0.5);
  }
`

const CreditList = styled.figure`
  width: 100%;
  display: flex;
  justify-content: center;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      margin-right: 8px;
      margin-bottom: 8px;
      &.link {
        position: relative;

        color: ${
          /** @param {{theme:Theme}} param */
          ({ theme }) => theme.color.brandColor.darkBlue
        };
      }

      &.no-link {
        text-align: left;
        line-height: 1.5;
        color: rgba(52, 73, 94, 1);
      }
    }
  }

  ${({ theme }) => theme.breakpoint.md} {
    margin: 0 auto;
    ul {
      width: auto;
      justify-content: center;
    }
  }
`

const CREDIT_TITLE_NAME_MAP = {
  writers: '記者',
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
export default function CreditsWra({ credits }) {
  const shouldShowCredits = credits.some((credit) => {
    const [people] = Object.values(credit)
    return people.length !== 0 || (typeof people === 'string' && people.trim())
  })

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
            <CreditTitle>{titleName}</CreditTitle>
            <ul>
              {Array.isArray(people) ? (
                people.map((person) => (
                  <li key={person.id} className="link">
                    <Link
                      target="_blank"
                      rel="noreferrer noopenner"
                      href={`/author/${person.id}`}
                    >
                      {person.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="no-link">
                  <span>{people}</span>
                </li>
              )}
            </ul>
          </CreditList>
        )
      })}
    </Credits>
  ) : null

  return <Wrapper>{creditsJsx}</Wrapper>
}
