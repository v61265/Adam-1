import { useState, useMemo } from 'react'
import { auth } from '../../firebase'
import {
  OAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
} from 'firebase/auth'

import { useAppSelector } from '../../hooks/useRedux'
import {
  loginIsFederatedRedirectResultLoading,
  AuthMethod,
} from '../../slice/login-slice'

// following comments is required since these variables are used by comments but not codes.
/* eslint-disable-next-line no-unused-vars */
const { Google, Facebook, Apple } = AuthMethod
/** @typedef {Google | Facebook | Apple} ThirdPartyName */

/**
 *
 * @param {React.ComponentProps<'button'> & {thirdPartyName: ThirdPartyName}} props
 * @returns
 */
export default function MainFormLoginWithThirdParty({ thirdPartyName }) {
  const isFederatedRedirectResultLoading = useAppSelector(
    loginIsFederatedRedirectResultLoading
  )
  const provider = useMemo(() => {
    let provider = null
    switch (thirdPartyName) {
      case AuthMethod.Google:
        provider = new GoogleAuthProvider()
        break
      case AuthMethod.Facebook:
        provider = new FacebookAuthProvider()
        break
      case AuthMethod.Apple:
        provider = new OAuthProvider('apple.com')
        break
    }
    provider.addScope('email')
    return provider
  }, [thirdPartyName])

  const [isLoading, setIsLoading] = useState(false)
  const handleThirdPartyFirebaseLogin = async () => {
    setIsLoading(true)
    await signInWithRedirect(auth, provider)
  }
  const shouldShowLoadingIcon = isLoading || isFederatedRedirectResultLoading
  return (
    <button onClick={handleThirdPartyFirebaseLogin}>
      {shouldShowLoadingIcon ? (
        <span>載入中...</span>
      ) : (
        <span>第三方{thirdPartyName}登入</span>
      )}
    </button>
  )
}
