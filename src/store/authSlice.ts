import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import IAuth from '../interfaces/IAuth';

interface AuthState {
  isAuth: boolean,
  error: boolean
}

const initialState: AuthState = {
  isAuth: false,
  error: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginHandler(state, action: PayloadAction<IAuth>) {
      if (action.payload.username === 'admin' && action.payload.password === '1234') {
        state.error = false
        state.isAuth = true
      } else {
        state.error = true
      }
    },
    logoutHandler(state) {
      state.isAuth = false
    }
  },
})

export const { loginHandler, logoutHandler } = authSlice.actions
export default authSlice.reducer