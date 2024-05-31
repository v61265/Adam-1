import styled from 'styled-components'
import Wrapper from '../shared/form-wrapper'

const FormWrapper = styled(Wrapper)`
  padding: 24px 20px;

  ${({ theme }) => theme.breakpoint.md} {
    width: 423px;
  }
`

export default FormWrapper
