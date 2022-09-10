import { useContext } from 'react'
import styled from 'styled-components'
import { RedirectUrlContext } from '../../context/redirectUrl'
import { minWidth } from '../../styles/breakpoint'

const TopicsWrapper = styled.section`
  display: none;
  @media ${minWidth.xl} {
    display: block;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
  }
`
const Wrapper = styled.div`
  max-width: 1024px;
  height: 45px;
  overflow: hidden;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
`
const Topics = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 582px;
`
const Topic = styled.a`
  min-width: 90px;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  line-height: 42px;
  cursor: pointer;
  border-bottom: 3px solid #000;
  position: relative;
  &.normal {
    flex: 0 0 auto;
    &:hover {
      color: #fff;
      background-color: #004dbc;
    }
  }
  &.more {
    &::before {
      content: '';
      height: 3px;
      width: 100px;
      background-color: #000;
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translate(-100%, 100%);
    }
  }
`
const SubBrands = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`
const SubBrand = styled.a`
  padding-left: 10px;
  padding-right: 10px;
  flex: 0 0 auto;
  cursor: pointer;
`
const SubBrandIcon = styled.img`
  height: 30px;
  width: auto;
`

export default function NavTopics({ topics, subBrands }) {
  const redirectUrl = useContext(RedirectUrlContext)
  return (
    <TopicsWrapper>
      <Wrapper>
        <Topics>
          {topics.map((topic) => (
            <Topic
              key={topic._id}
              href={`${redirectUrl}/topic/${topic._id}`}
              className="normal"
            >
              <h2>{topic.name}</h2>
            </Topic>
          ))}
        </Topics>
        <Topic href={`${redirectUrl}/section/topic`} className="more">
          <h2>更多</h2>
        </Topic>
        <SubBrands>
          {subBrands.map((subBrand) => (
            <SubBrand
              key={subBrand.name}
              href={subBrand.href}
              target="_blank"
              rel="noopener noreferer"
            >
              <SubBrandIcon
                src={`/images/${subBrand.name}.png`}
                alt={subBrand.title}
              />
            </SubBrand>
          ))}
        </SubBrands>
      </Wrapper>
    </TopicsWrapper>
  )
}
