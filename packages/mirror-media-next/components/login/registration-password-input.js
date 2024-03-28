import { useState } from 'react'
import { useAppSelector } from '../../hooks/useRedux'
import { useAppDispatch } from '../../hooks/useRedux'
import { loginPassword, loginActions } from '../../slice/login-slice'
import { isValidPassword } from '../../utils'
import GenericPasswordInput, {
  PasswordInputState,
} from '../shared/inputs/generic-password-input'

// following comments is required since these variables are used by comments but not codes.
/* eslint-disable-next-line no-unused-vars */
const { Start, Incomplete, Valid } = PasswordInputState

export default function RegistrationPasswordInput() {
  const hint = '密碼在 6 位數以上'
  const dispatch = useAppDispatch()
  const password = useAppSelector(loginPassword)

  /** @type {[Start | Incomplete | Valid, import('react').Dispatch<import('react').SetStateAction<Start | Incomplete | Valid>>]} */
  const [state, setState] = useState(PasswordInputState.Start)

  /** @type {import('react').ChangeEventHandler<HTMLInputElement>} */
  const handleOnChange = (e) => {
    const inputValue = e.target.value

    if (inputValue === '') {
      setState(PasswordInputState.Start)
    } else {
      if (isValidPassword(inputValue)) {
        setState(PasswordInputState.Valid)
      } else {
        setState(PasswordInputState.Incomplete)
      }
    }
    dispatch(loginActions.setPassword(inputValue))
  }

  return (
    <GenericPasswordInput
      value={password}
      placeholder="密碼須在 6 位數以上"
      validMessage={hint}
      state={state}
      onChange={handleOnChange}
    />
  )
}
