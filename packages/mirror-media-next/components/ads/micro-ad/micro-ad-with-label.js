import styled from 'styled-components'
import MicroAd from './micro-ad'

const StyledMicroAd = styled(MicroAd)`
  .popListVert-list__item > a::before,
  figure::before {
    content: '特企';
    display: inline;
    z-index: 2;
    padding: 4px;
    background: rgba(188, 188, 188, 1);
    color: #ffffff;
    font-weight: 300;
    font-size: 12px;
    line-height: 12px;
    position: absolute;
    transform: translate(0, -100%);
    @include media-breakpoint-up(md) {
      font-size: 14px;
      line-height: 14px;
    }
  }
`

export default function MicroAdWithLabel({ unitId }) {
  return <StyledMicroAd unitId={unitId} />
}
