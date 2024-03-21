import { createSlice } from '@reduxjs/toolkit'

/**
 * @template T
 * @typedef {import('@reduxjs/toolkit').PayloadAction<T>} PayloadAction
 */

/**
 * @typedef {import('../store').AppThunk} AppThunk
 * @typedef {import('../store').AppState } AppState
 */

const Start = 'start'
const Registration = 'registration'
const Login = 'login'
const PasswordRecovery = 'password-recovery'
/**
 * @typedef {Object} FormModeEnum
 * @property {Start} Start
 * @property {Registration} Registration
 * @property {Login} Login
 * @property {PasswordRecovery} PasswordRecovery
 *
 * @readonly
 * @type {FormModeEnum}
 */
const FormMode = {
  Start,
  Registration,
  Login,
  PasswordRecovery,
}

const Form = 'form'
const LoginSuccess = 'login-success'
const LoginFail = 'login-fail'
const RegisterSuccess = 'register-success'
const RegisterFail = 'register-fail'
/**
 * @typedef {Object} FormStateEnum
 * @property {Form} Form
 * @property {LoginSuccess} LoginSuccess
 * @property {LoginFail} LoginFail
 * @property {RegisterSuccess} RegisterSuccess
 * @property {RegisterFail} RegisterFail
 *
 * @readonly
 * @type {FormStateEnum}
 */
const FormState = {
  Form,
  LoginSuccess,
  LoginFail,
  RegisterSuccess,
  RegisterFail,
}

/**
 * Type for state
 * @typedef {Form | LoginSuccess | LoginFail | RegisterSuccess | RegisterFail} FormStateList
 * @typedef {Start | Registration | Login | PasswordRecovery} FormModeList
 * @typedef { 'Google' | 'Facebook' | 'Apple' | 'email' | ''} PrevAuthMethod
 * @typedef {boolean} ShouldShowHint
 * @typedef {string} Email
 * @typedef {string} Password
 * @typedef {Boolean} IsFederatedRedirectResultLoading
 */

/**
 * @typedef {Object} InitialState
 * @property {FormStateList} state
 * @property {PrevAuthMethod} prevAuthMethod
 * @property {ShouldShowHint} shouldShowHint
 * @property {Email} email
 * @property {Password} password
 * @property {FormModeList} loginFormMode
 * @property {IsFederatedRedirectResultLoading} isFederatedRedirectResultLoading
 */

/**@type {InitialState} */
const initialState = {
  state: FormState.Form,
  prevAuthMethod: '',
  shouldShowHint: false,
  email: '',
  password: '',
  loginFormMode: FormMode.Start,
  isFederatedRedirectResultLoading: true,
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

const loginState = (
  /**
   * @type {AppState}
   */
  state
) => state.login.state
const loginPrevAuthMethod = (
  /**
   * @type {AppState}
   */
  state
) => state.login.prevAuthMethod
const loginShouldShowHint = (
  /**
   * @type {AppState}
   */
  state
) => state.login.shouldShowHint
const loginEmail = (
  /**
   * @type {AppState}
   */
  state
) => state.login.email
const loginPassword = (
  /**
   * @type {AppState}
   */
  state
) => state.login.password
const loginFormMode = (
  /**
   * @type {AppState}
   */
  state
) => state.login.loginFormMode

const loginIsFederatedRedirectResultLoading = (
  /**
   * @type {AppState}
   */
  state
) => state.login.isFederatedRedirectResultLoading

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeState: (
      state,
      /**
       * @type {PayloadAction<FormStateList>}
       */
      action
    ) => {
      state.state = action.payload
    },
    setEmail: (
      state,
      /**
       * @type {PayloadAction<Email>}
       */
      action
    ) => {
      state.email = action.payload
    },
    setPassword: (
      state,
      /**
       * @type {PayloadAction<Password>}
       */
      action
    ) => {
      state.password = action.payload
    },

    changeLoginFormMode: (
      state,
      /**
       * @type {PayloadAction<FormModeList>}
       */
      action
    ) => {
      state.loginFormMode = action.payload
    },
    clearPassword: (state) => {
      state.password = ''
    },
    changePrevAuthMethod: (
      state,
      /**
       * @type {PayloadAction<PrevAuthMethod>}
       */
      action
    ) => {
      state.prevAuthMethod = action.payload
    },
    changeShouldShowHint: (
      state,
      /**
       * @type {PayloadAction<ShouldShowHint>}
       */
      action
    ) => {
      state.shouldShowHint = action.payload
    },
    changeIsFederatedRedirectResultLoading: (
      state,
      /**
       * @type {import('@reduxjs/toolkit').PayloadAction<IsFederatedRedirectResultLoading>}
       */
      action
    ) => {
      state.isFederatedRedirectResultLoading = action.payload
    },
    resetLoginState: (state) => {
      state.state = FormState.Form
      state.prevAuthMethod = ''
      state.shouldShowHint = false
      state.email = ''
      state.password = ''
      state.loginFormMode = FormMode.Start
    },
  },
})

export {
  loginState,
  loginPrevAuthMethod,
  loginShouldShowHint,
  loginEmail,
  loginPassword,
  loginFormMode,
  loginIsFederatedRedirectResultLoading,
  FormMode,
  FormState,
}
export const loginActions = loginSlice.actions

export default loginSlice.reducer
