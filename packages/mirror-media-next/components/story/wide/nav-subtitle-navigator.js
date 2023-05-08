import styled from 'styled-components'

const NavWrapper = styled.section`
  position: absolute;
  top: 0;
  left: calc((100vw - 100%) / 2 * -1);
  width: calc((100vw - 100%) / 2);
  height: 100%;
`
const Nav = styled.nav`
  display: none;
  ${({ theme }) => theme.breakpoint.xl} {
    display: block;
    position: sticky;
    top: 15%;

    margin: 20px auto;
    width: 168px;
    height: auto;
  }
  li {
    margin-bottom: 8px;
    color: rgba(0, 0, 0, 0.87);
    font-weight: 500;

    &.h2 {
      font-size: 18px;
      line-height: 1.5;
    }
    &.h3 {
      font-size: 14px;
      line-height: 2;
    }
    &.active {
      color: ${({ theme }) => theme.color.brandColor.darkBlue};
      text-decoration: underline;
    }
  }
`
/**
 * TODO: add feature for scroll into certain subtitle
 * @returns {JSX.Element}
 */
export default function NavSubtitleNavigator() {
  return (
    <NavWrapper>
      <Nav>
        <ul>
          <li className="h2">
            <p>堅持非營利　評價中肯鄉民擁戴</p>
          </li>
          <li className="h3 active">
            <p>突然變殺人凶手　滿腹委屈</p>
          </li>
          <li className="h3">
            <p>沈大俠有話直說　遭人誤解</p>
          </li>
          <li className="h3">
            <p>工作中投射缺憾　渴望父愛</p>
          </li>
          <li className="h3">
            <p>不再蹚司法渾水　專注醫療</p>
          </li>
        </ul>
      </Nav>
    </NavWrapper>
  )
}
