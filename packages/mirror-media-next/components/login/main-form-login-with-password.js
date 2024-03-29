import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux'
import {
  loginPassword,
  loginEmail,
  loginActions,
  FormMode,
  FormState,
} from '../../slice/login-slice'
import { auth } from '../../firebase'
import {
  getAccessToken,
  errorHandler,
  loginPageOnAuthStateChangeAction,
} from '../../utils/membership'
import { signInWithEmailAndPassword } from 'firebase/auth'
import FormTitle from './form-title'
import GenericPasswordInput from '../shared/inputs/generic-password-input'
import UiMembershipButton from './ui/button/ui-membership-button'
import { FirebaseError } from 'firebase/app'
import { InputState } from '../../constants/component'

// following comments is required since these variables are used by comments but not codes.
/* eslint-disable-next-line no-unused-vars */
const { Start, Invalid } = InputState

/** @typedef {Start | Invalid } PasswordInputState */

export default function MainFormLoginWithPassword() {
  const dispatch = useAppDispatch()
  const password = useAppSelector(loginPassword)
  const email = useAppSelector(loginEmail)

  /** @type {[PasswordInputState, import('react').Dispatch<import('react').SetStateAction<PasswordInputState>>]} */
  const [passwordInputState, setPasswordInputState] = useState(InputState.Start)
  // const shouldShowErrorHint = useAppSelector(loginShouldShowErrorHint)

  /** @type {import('react').ChangeEventHandler<HTMLInputElement>} */
  const handlePasswordOnChange = (e) => {
    dispatch(loginActions.setPassword(e.target.value))
  }
  const [isLoading, setIsLoading] = useState(false)

  //TODO: better name
  const handleGoBack = () => {
    dispatch(loginActions.changeLoginFormMode(FormMode.Start))
    dispatch(loginActions.clearPassword())
    setPasswordInputState(InputState.Start)
  }
  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      if (!user) {
        throw new Error('Unable to get Firebase User')
      }
      const idToken = await user.getIdToken()
      if (!idToken) {
        throw new Error('Unexpected Error when getting firebase Id token.')
      }
      const accessToken = await getAccessToken(idToken)
      const result = await loginPageOnAuthStateChangeAction(
        user,
        false,
        accessToken
      )
      dispatch(loginActions.changeState(result))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)

      if (e instanceof FirebaseError && e.code === 'auth/wrong-password') {
        setPasswordInputState(InputState.Invalid)
      } else {
        errorHandler(e)
        dispatch(loginActions.changeState(FormState.LoginFail))
      }
    }
  }
  return (
    <>
      <FormTitle>輸入密碼</FormTitle>
      <GenericPasswordInput
        value={password}
        placeholder="密碼大於 N 位數"
        invalidMessage="密碼錯誤，請重新再試"
        state={passwordInputState}
        onChange={handlePasswordOnChange}
      />
      <br></br>
      <UiMembershipButton buttonType="primary" handleOnClick={handleSubmit}>
        <p>{isLoading ? '載入中' : '登入'}</p>
      </UiMembershipButton>
      <br></br>
      <UiMembershipButton buttonType="secondary" handleOnClick={handleGoBack}>
        <p>回上一步</p>
      </UiMembershipButton>
    </>
  )
}
