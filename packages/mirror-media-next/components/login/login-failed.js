import { useAppDispatch } from '../../hooks/useRedux'
import { loginActions } from '../../slice/login-slice'
import GenericFailed from './generic-failed'

export default function LoginFailed() {
  const dispatch = useAppDispatch()
  return <GenericFailed onBack={() => dispatch(loginActions.goToLoginForm())} />
}
