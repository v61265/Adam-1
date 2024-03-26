import { useAppSelector } from '../../hooks/useRedux'
import { loginFormMode, FormMode } from '../../slice/login-slice'
import MainFormStart from './main-form-start'
import MainFormRegistration from './main-form-registration'
import MainFormLoginWithPassword from './main-form-login-with-password'
/**
 * @template T
 * @typedef {[T, React.Dispatch<React.SetStateAction<T>>]} UseState
 */

export default function MainForm() {
  const formMode = useAppSelector(loginFormMode)

  const getJsx = () => {
    switch (formMode) {
      case FormMode.Start:
        return <MainFormStart></MainFormStart>
      case FormMode.Registration:
        return <MainFormRegistration></MainFormRegistration>
      case FormMode.Login:
        return <MainFormLoginWithPassword></MainFormLoginWithPassword>
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
