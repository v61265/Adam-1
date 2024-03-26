import { useAppSelector } from '../../hooks/useRedux'
import { loginFormMode, FormMode } from '../../slice/login-slice'
import ContainerLoginFormInitial from './container-login-form-initial'
import ContainerLoginFormRegisterWithEmailPassword from './container-login-form-register-with-email-password'
import ContainerLoginFormLoginWithPassword from './container-login-form-login-with-password'
/**
 * @template T
 * @typedef {[T, React.Dispatch<React.SetStateAction<T>>]} UseState
 */

export default function ContainerLoginForm() {
  const formMode = useAppSelector(loginFormMode)

  const getJsx = () => {
    switch (formMode) {
      case FormMode.Start:
        return <ContainerLoginFormInitial></ContainerLoginFormInitial>
      case FormMode.Registration:
        return (
          <ContainerLoginFormRegisterWithEmailPassword></ContainerLoginFormRegisterWithEmailPassword>
        )
      case FormMode.Login:
        return (
          <ContainerLoginFormLoginWithPassword></ContainerLoginFormLoginWithPassword>
        )
    }
  }
  const jsx = getJsx()
  return (
    <div>
      ContainerLoginForm
      {jsx}
    </div>
  )
}
