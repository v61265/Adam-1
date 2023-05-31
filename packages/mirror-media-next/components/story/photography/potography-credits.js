import styled from 'styled-components'
import Link from 'next/link'

/**
 * @typedef {import('../../../type/theme').Theme} Theme
 */

const Wrapper = styled.section`
  margin: 32px 0;
`

const CreditsWrapper = styled.section`
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
  width: 100%;
  line-height: 1.5;
`

const CreditTitle = styled.figcaption`
  display: block;
  color: white;

  position: relative;

  width: 40px;
  text-align: left;
  margin-right: 18px;

  &::after {
    position: absolute;
    content: ' | ';
    right: -7px;
    transform: translate(50%, 1px);
    top: 0;
    color: white;
  }
`

const CreditList = styled.figure`
  display: flex;
  margin: 0 auto;
  justify-content: flex-start;
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    justify-content: flex-start;

    &.no-link-list {
      display: block;
    }
    li {
      width: auto;
      display: block;
      line-height: 1.5;
      margin-right: 16px;
      &.link {
        position: relative;
        color: white;
      }

      &.no-link {
        text-align: left;
        color: white;
      }
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
 * @param {Credit[]} props.credits
 * @returns {JSX.Element}
 */
export default function Credits({ credits }) {
  const shouldShowCredits = credits.some((credit) => {
    const [people] = Object.values(credit)
    return people.length !== 0 || (typeof people === 'string' && people.trim())
  })

  const creditsJsx = shouldShowCredits ? (
    <CreditsWrapper>
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
            <ul
              className={Array.isArray(people) ? 'link-list' : 'no-link-list'}
            >
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
    </CreditsWrapper>
  ) : null

  return <Wrapper>{creditsJsx}</Wrapper>
}
