// This component is for wrapping form in password modification pages
import styled from 'styled-components'
import Wrapper from '../shared/form-wrapper'

const FormWrapper = styled(Wrapper)`
  ${({ theme }) => theme.breakpoint.md} {
    width: 423px;
    margin-top: 48px;
    margin-bottom: 48px;
  }

  ${({ theme }) => theme.breakpoint.xxl} {
    margin-top: 60px;
    margin-bottom: 60px;
  }
`

export default FormWrapper
