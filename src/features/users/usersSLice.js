import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'
const initialState = []

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const res = await client.get('/fakeApi/users')

  return res.data
})
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const selectAllUsers = (state) => state.users
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
export const userReducer = userSlice.reducer
