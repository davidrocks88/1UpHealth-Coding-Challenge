import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  access_token: "",
  didCallback: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken(state, {payload}) {
      state.access_token = payload;
    },
    setDidCallback(state) {
      state.didCallback = true;
    }
  }
})

export const {
  setAuthToken,
  setDidCallback
} = authSlice.actions;

export default authSlice.reducer;