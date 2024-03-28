import styled from 'styled-components'
import { useState } from 'react'
import UiMembershipButton from './ui/button/ui-membership-button'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import {
  loginEmail,
  loginPassword,
  loginActions,
  FormMode,
  FormState,
} from '../../slice/login-slice'
import {
  getAccessToken,
  loginPageOnAuthStateChangeAction,
  errorHandler,
} from '../../utils/membership'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import EmailInput from './email-input'
import RegistrationPasswordInput from './registration-password-input'

const Title = styled.p`
  font-size: 24px;
  font-weight: 500;
  line-height: 150%;
  margin-bottom: 16px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export default function MainFormRegistration() {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isDuplicateEmailMember, setIsDuplicateEmailMember] = useState(false)
  const email = useAppSelector(loginEmail)
  const password = useAppSelector(loginPassword)

  //TODO: better name
  const handleGoBack = () => {
    dispatch(loginActions.changeLoginFormMode(FormMode.Start))
    setIsDuplicateEmailMember(false)
    dispatch(loginActions.clearPassword())
  }
  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
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
        true,
        accessToken
      )
      dispatch(loginActions.changeState(result))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      if (
        e instanceof FirebaseError &&
        e?.code === 'auth/email-already-in-use'
      ) {
        setIsDuplicateEmailMember(true)
      } else {
        errorHandler(e)
        dispatch(loginActions.changeState(FormState.RegisterFail))
      }
    }
  }

  return (
    <>
      <Title>Email 註冊</Title>
      <InputGroup>
        <EmailInput />
        <RegistrationPasswordInput />
      </InputGroup>
      {isDuplicateEmailMember && <p>這個 Email 已經註冊過囉</p>}
      <UiMembershipButton buttonType="primary" handleOnClick={handleSubmit}>
        <p>{isLoading ? '載入中' : '註冊'}</p>
      </UiMembershipButton>
      <br></br>
      <UiMembershipButton buttonType="secondary" handleOnClick={handleGoBack}>
        <p>回上一步</p>
      </UiMembershipButton>
    </>
  )
}
