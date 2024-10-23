import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loggedInUser: null,
  users: [], // To store the list of users fetched from the API
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUser: state => {
      state.loggedInUser = null;
      state.users = [];
    },
  },
});

export const {setUser, setUsers, clearUser} = userSlice.actions;

export default userSlice.reducer;
