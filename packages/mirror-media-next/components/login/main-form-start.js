import styled from 'styled-components'
import { fetchSignInMethodsForEmail } from 'firebase/auth'
import ButtonLoginWithThirdParty from './button-login-with-third-party'
import UiMembershipInputEmailInvalidation from './ui-membership-input-email-invalidation'
import UiMembershipButton from './ui/button/ui-membership-button'
import { auth } from '../../firebase'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux'
import {
  loginEmail,
  loginPrevAuthMethod,
  loginShouldShowHint,
  loginActions,
  FormMode,
  AuthMethod,
} from '../../slice/login-slice'

/**
 * @typedef {import('./button-login-with-third-party').ThirdPartyName} ThirdPartyName
 */

/**
 * @type { {name: ThirdPartyName}[]}
 */
const THIRD_PARTY_LIST = [
  { name: AuthMethod.Facebook },
  { name: AuthMethod.Google },
  { name: AuthMethod.Apple },
]

const ThirdPartyButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 100%;

  > p {
    color: #e51731;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
  }
`

const Seperator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 16px;
  color: rgba(0, 0, 0, 0.3);
  font-size: 13px;
  font-weight: 400;
  line-height: 18px;

  > span {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:before,
  &:after {
    content: '';
    display: flex;
    flex-grow: 1;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`

export default function MainFormStart() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const email = useAppSelector(loginEmail)
  const prevAuthMethod = useAppSelector(loginPrevAuthMethod)
  const shouldShowHint = useAppSelector(loginShouldShowHint)
  const hint = `由於您曾以 ${prevAuthMethod} 帳號登入，請點擊上方「使用 ${prevAuthMethod} 帳號繼續」重試。`
  const handleOnClick = async () => {
    setIsLoading(true)
    try {
      const responseArray = await fetchSignInMethodsForEmail(auth, email)

      const isEmailExistWithEmailPasswordSignInMethod =
        responseArray &&
        responseArray.find((signInMethod) => signInMethod === 'password')

      const isEmailHasBeenUsedByGoogleAuth =
        responseArray &&
        responseArray.find((signInMethod) => signInMethod === 'google.com')

      const isEmailHasBeenUsedByFacebookAuth =
        responseArray &&
        responseArray.find((signInMethod) => signInMethod === 'facebook.com')

      const isEmailHasBeenUsedByAppleAuth =
        responseArray &&
        responseArray.find((signInMethod) => signInMethod === 'apple.com')
      if (isEmailExistWithEmailPasswordSignInMethod) {
        dispatch(loginActions.changeLoginFormMode(FormMode.Login))
        dispatch(loginActions.changePrevAuthMethod(AuthMethod.Email))
        dispatch(loginActions.changeShouldShowHint(true))
      } else if (isEmailHasBeenUsedByGoogleAuth) {
        dispatch(loginActions.changePrevAuthMethod(AuthMethod.Google))
        dispatch(loginActions.changeShouldShowHint(true))
      } else if (isEmailHasBeenUsedByFacebookAuth) {
        dispatch(loginActions.changePrevAuthMethod(AuthMethod.Facebook))
        dispatch(loginActions.changeShouldShowHint(true))
      } else if (isEmailHasBeenUsedByAppleAuth) {
        dispatch(loginActions.changePrevAuthMethod(AuthMethod.Apple))
        dispatch(loginActions.changeShouldShowHint(true))
      } else {
        dispatch(loginActions.changeLoginFormMode(FormMode.Registration))
      }

      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
    }
  }
  return (
    <>
      <ThirdPartyButtonGroup>
        {THIRD_PARTY_LIST.map((item) => (
          <ButtonLoginWithThirdParty
            key={item.name}
            thirdPartyName={item.name}
          />
        ))}
        {shouldShowHint && <p>{hint}</p>}
      </ThirdPartyButtonGroup>
      <Seperator>
        <span>或</span>
      </Seperator>
      <UiMembershipInputEmailInvalidation></UiMembershipInputEmailInvalidation>
      <UiMembershipButton buttonType={'primary'} handleOnClick={handleOnClick}>
        {isLoading ? '載入中...' : '下一步'}
      </UiMembershipButton>
    </>
  )
}
