import styled from 'styled-components'
import Wrapper from './form-wrapper'

const SaveStausWrapper = styled(Wrapper)`
  ${({ theme }) => theme.breakpoint.md} {
    width: 423px;
  }
`

export default SaveStausWrapper
