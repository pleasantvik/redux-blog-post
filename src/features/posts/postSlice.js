import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const initialState = [
  {
    id: uuid(),
    title: 'First post',
    content: 'Hello world',
  },
  {
    id: uuid(),
    title: 'Second post',
    content: 'Getting started with Reduc',
  },
]

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
})

export const postReducer = postSlice.reducer
