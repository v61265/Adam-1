//TODO: add jsDoc

/**
 * @typedef {import('../store').AppThunk} AppThunk
 * @typedef { 'Google' | 'Facebook' | 'Apple' | 'email' } PrevAuthMethod
 */

import { createSlice } from '@reduxjs/toolkit'

/**
 * @typedef {import('../context/membership').Membership['accessToken']} AccessToken
 */
const initialState = {
  state: 'form',
  status: 'idle',
  prevAuthMethod: '',
  shouldShowHint: false,
  email: '',
  password: '',
  loginFormMode: 'initial',
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

const loginState = (state) => state.login.state
const loginPrevAuthMethod = (state) => state.login.prevAuthMethod
const loginShouldShowHint = (state) => state.login.shouldShowHint
const loginEmail = (state) => state.login.email
const loginPassword = (state) => state.login.password
const loginFormMode = (state) => state.login.loginFormMode

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeState: (state, action) => {
      state.state = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },

    changeLoginFormMode: (
      state,
      /**
       * @type {import('@reduxjs/toolkit').PayloadAction<'initial'| 'register' | 'login' | 'recoverPassword'>}
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
       * @type {import('@reduxjs/toolkit').PayloadAction<PrevAuthMethod>}
       */
      action
    ) => {
      state.prevAuthMethod = action.payload
    },
    changeShouldShowHint: (
      state,
      /**
       * @type {import('@reduxjs/toolkit').PayloadAction<Boolean>}
       */
      action
    ) => {
      state.shouldShowHint = action.payload
    },
    resetLoginState: (state) => {
      state.state = 'form'
      state.status = 'idle'
      state.prevAuthMethod = ''
      state.shouldShowHint = false
      state.email = ''
      state.password = ''
      state.loginFormMode = 'initial'
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
}
export const {
  changeState,
  setEmail,
  setPassword,
  clearPassword,
  changeLoginFormMode,
  changePrevAuthMethod,
  changeShouldShowHint,
  resetLoginState,
} = loginSlice.actions

export default loginSlice.reducer
