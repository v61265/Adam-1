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
/**
 * @readonly
 */
const FormMode = /** @type {const} */ ({
  Start,
  Registration,
  Login,
})

// `@type {const} (...)` is equivalent to `as const` in TypeScript
// ref: https://stackoverflow.com/a/64687300

const Form = 'form'
const LoginSuccess = 'login-success'
const LoginFail = 'login-fail'
const RegisterSuccess = 'register-success'
const RegisterFail = 'register-fail'
/**
 * @readonly
 */
const FormState = /** @type {const} */ ({
  Form,
  LoginSuccess,
  LoginFail,
  RegisterSuccess,
  RegisterFail,
})

const Google = 'Google'
const Facebook = 'Facebook'
const Apple = 'Apple'
const Email = 'email'
const Default = ''
/**
 * @readonly
 */
const AuthMethod = /** @type {const} */ ({
  Google,
  Facebook,
  Apple,
  Email,
  Default,
})

/**
 * Type for state
 * @typedef {Form | LoginSuccess | LoginFail | RegisterSuccess | RegisterFail} LoginFormState
 * @typedef {Start | Registration | Login} LoginFormMode
 * @typedef {Google | Facebook | Apple | Email | Default} PrevAuthMethod
 * @typedef {boolean} ShouldShowHint
 * @typedef {Boolean} IsFederatedRedirectResultLoading
 */

/**
 * @typedef {Object} InitialState
 * @property {LoginFormState} state
 * @property {PrevAuthMethod} prevAuthMethod
 * @property {ShouldShowHint} shouldShowHint
 * @property {string} email
 * @property {string} password
 * @property {LoginFormMode} loginFormMode
 * @property {IsFederatedRedirectResultLoading} isFederatedRedirectResultLoading
 */

/**@type {InitialState} */
const initialState = {
  state: FormState.Form,
  prevAuthMethod: AuthMethod.Default,
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
       * @type {PayloadAction<LoginFormState>}
       */
      action
    ) => {
      state.state = action.payload
    },
    setEmail: (
      state,
      /**
       * @type {PayloadAction<string>}
       */
      action
    ) => {
      state.email = action.payload
    },
    setPassword: (
      state,
      /**
       * @type {PayloadAction<string>}
       */
      action
    ) => {
      state.password = action.payload
    },

    changeLoginFormMode: (
      state,
      /**
       * @type {PayloadAction<LoginFormMode>}
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
      state.prevAuthMethod = AuthMethod.Default
      state.shouldShowHint = false
      state.email = ''
      state.password = ''
      state.loginFormMode = FormMode.Start
    },
    goToStart: (state) => {
      state.loginFormMode = FormMode.Start
      state.password = ''
      state.shouldShowHint = false
    },
    goToLoginForm: (state) => {
      state.loginFormMode = FormMode.Login
      state.prevAuthMethod = AuthMethod.Email
      state.shouldShowHint = true
    },
    goToRegistrationForm: (state) => {
      state.loginFormMode = FormMode.Registration
    },
    setSignInWithGoogle: (state) => {
      state.prevAuthMethod = AuthMethod.Google
      state.shouldShowHint = true
    },
    setSignInWithFacebook: (state) => {
      state.prevAuthMethod = AuthMethod.Facebook
      state.shouldShowHint = true
    },
    setSignInWithApple: (state) => {
      state.prevAuthMethod = AuthMethod.Apple
      state.shouldShowHint = true
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
  AuthMethod,
}
export const loginActions = loginSlice.actions

export default loginSlice.reducer
