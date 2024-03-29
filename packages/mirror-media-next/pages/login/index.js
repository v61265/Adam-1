import styled from 'styled-components'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { useMembership } from '../../context/membership'
import {
  loginState,
  loginActions,
  FormState,
  AuthMethod,
} from '../../slice/login-slice'
import {
  errorHandler,
  loginPageOnAuthStateChangeAction,
} from '../../utils/membership'
import MainForm from '../../components/login/main-form'
import useRedirect from '../../hooks/use-redirect'
import { useRouter } from 'next/router'
import {
  getRedirectResult,
  getAdditionalUserInfo,
  fetchSignInMethodsForEmail,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { FirebaseError } from 'firebase/app'
import { setPageCache } from '../../utils/cache-setting'
import { GCP_PROJECT_ID } from '../../config/index.mjs'
import Layout from '../../components/shared/layout'
import { FirebaseAuthError } from '../../constants/firebase'

const Container = styled.div`
  background-color: #fff;
  ${({ theme }) => theme.breakpoint.md} {
    background-color: #f2f2f2;
  }
`

export default function Login() {
  const dispatch = useAppDispatch()
  const { accessToken, isLogInProcessFinished, isLoggedIn } = useMembership()
  const router = useRouter()
  const state = useAppSelector(loginState)
  const { redirect } = useRedirect()
  const handleFederatedRedirectResult = useCallback(async () => {
    function getPrevAuthMethod(prevAuthMethod) {
      switch (prevAuthMethod) {
        case 'google.com':
          return AuthMethod.Google
        case 'facebook.com':
          return AuthMethod.Facebook
        case 'apple.com':
          return AuthMethod.Apple
        case 'password':
          return AuthMethod.Email
        default:
          return prevAuthMethod
      }
    }

    try {
      const redirectResult = await getRedirectResult(auth)
      dispatch(loginActions.changeIsFederatedRedirectResultLoading(false))
      if (redirectResult && redirectResult?.user) {
        const firebaseAuthUser = redirectResult.user
        const isNewUser = getAdditionalUserInfo(redirectResult).isNewUser
        const result = await loginPageOnAuthStateChangeAction(
          firebaseAuthUser,
          isNewUser,
          accessToken
        )
        dispatch(loginActions.changeState(result))
      } else if (!redirectResult?.user && isLoggedIn) {
        switch (state) {
          case FormState.Form:
            router.push('/section/member')
            return
          case FormState.LoginSuccess:
          case FormState.RegisterSuccess:
            redirect()
            return
          default:
            break
        }
      }
    } catch (e) {
      dispatch(loginActions.changeIsFederatedRedirectResultLoading(false))
      if (
        e instanceof FirebaseError &&
        e.code === FirebaseAuthError.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL
      ) {
        const email =
          e?.customData?.email && typeof e?.customData?.email === 'string'
            ? e?.customData?.email
            : ''
        const responseArray = await fetchSignInMethodsForEmail(auth, email)
        const prevAuthMethod = getPrevAuthMethod(responseArray?.[0])

        dispatch(loginActions.changePrevAuthMethod(prevAuthMethod))
        dispatch(loginActions.changeShouldShowHint(true))
      } else {
        errorHandler(e)
        dispatch(loginActions.changeState(FormState.LoginFail))
      }
    }
  }, [router, isLoggedIn, state, dispatch, accessToken, redirect])

  useEffect(() => {
    if (!isLogInProcessFinished) {
      return
    }

    handleFederatedRedirectResult()
  }, [isLogInProcessFinished, dispatch, handleFederatedRedirectResult])
  // useRedirect()

  const getBodyByState = () => {
    switch (state) {
      case FormState.Form:
        return <MainForm></MainForm>
      case FormState.RegisterSuccess:
        return <>註冊成功</>
      case FormState.LoginSuccess:
        return <>登入成功</>
      case FormState.RegisterFail:
      case FormState.LoginFail:
        return <>登入註冊失敗</>
      default:
        return null
    }
  }

  const jsx = getBodyByState()

  return (
    <Layout header={{ type: 'default' }} footer={{ type: 'default' }}>
      <Container>{jsx}</Container>
    </Layout>
  )
}

/**
 * @type {import('next').GetServerSideProps}
 */
export async function getServerSideProps({ req, res }) {
  setPageCache(res, { cachePolicy: 'no-store' }, req.url)
  const traceHeader = req.headers?.['x-cloud-trace-context']
  let globalLogFields = {}
  if (traceHeader && !Array.isArray(traceHeader)) {
    const [trace] = traceHeader.split('/')
    globalLogFields[
      'logging.googleapis.com/trace'
    ] = `projects/${GCP_PROJECT_ID}/traces/${trace}`
  }

  return { props: {} }
}
