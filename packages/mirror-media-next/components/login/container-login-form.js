import { useState } from 'react'
import ContainerLoginFormInitial from './container-login-form-initial'
import ContainerLoginFormRecoverPassword from './container-login-form-recover-password'
import ContainerLoginFormRegisterWithEmailPassword from './container-login-form-register-with-email-password'
import ContainerLoginFormLoginWithPassword from './container-login-form-login-with-password'
/**
 * @template T
 * @typedef {[T, React.Dispatch<React.SetStateAction<T>>]} UseState
 */

/** @typedef {'initial' | 'recoverPassword' |  'register'  | 'login'}  State*/

export default function ContainerLoginForm() {
  /**
   * @type {UseState<State>}
   */
  const [state, setState] = useState(/** @type {State}*/ ('initial'))

  const getJsx = () => {
    switch (state) {
      case 'initial':
        return <ContainerLoginFormInitial></ContainerLoginFormInitial>
      case 'register':
        return (
          <ContainerLoginFormRegisterWithEmailPassword></ContainerLoginFormRegisterWithEmailPassword>
        )
      case 'login':
        return (
          <ContainerLoginFormLoginWithPassword></ContainerLoginFormLoginWithPassword>
        )
      case 'recoverPassword':
        return (
          <ContainerLoginFormRecoverPassword></ContainerLoginFormRecoverPassword>
        )
    }
  }
  const jsx = getJsx()
  return (
    <div>
      ContainerLoginForm
      {jsx}
      <button onClick={() => setState('initial')}>initial</button>
      <button onClick={() => setState('register')}>register</button>
      <button onClick={() => setState('login')}>login</button>
      <button onClick={() => setState('recoverPassword')}>
        recoverPassword
      </button>
    </div>
  )
}
