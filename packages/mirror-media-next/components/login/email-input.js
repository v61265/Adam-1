import GenericTextInput, {
  InputState,
} from '../shared/inputs/generic-text-input'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { loginEmail, loginActions } from '../../slice/login-slice'
import { isValidEmail } from '../../utils'

// following comments is required since these variables are used by comments but not codes.
/* eslint-disable-next-line no-unused-vars */
const { Start, Invalid, Valid } = InputState

export default function EmailInput() {
  /** @type {[Start | Invalid | Valid, import('react').Dispatch<import('react').SetStateAction<Start | Invalid | Valid>>]} */
  const [isValid, setIsValid] = useState(InputState.Start)
  const dispatch = useAppDispatch()
  const email = useAppSelector(loginEmail)

  /** @type {import('react').ChangeEventHandler<HTMLInputElement>} */
  const handleInputChange = (e) => {
    const inputValue = e.target.value

    if (inputValue === '') {
      setIsValid(InputState.Start)
    } else {
      if (isValidEmail(inputValue)) {
        setIsValid(InputState.Valid)
      } else {
        setIsValid(InputState.Invalid)
      }
    }
    dispatch(loginActions.setEmail(inputValue))
  }

  return (
    <GenericTextInput
      placeholder="name@example.com"
      errorMessage="請輸入有效的 Email 地址"
      validMessage="Email 格式正確"
      value={email}
      isValid={isValid}
      onChange={handleInputChange}
    />
  )
}
