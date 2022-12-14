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
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      // Call back function that helps prepare random value
      prepare(value) {
        return {
          payload: {
            id: uuid(),
            title: value.title,
            content: value.content,
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
  },
})

// export const postReducer = postSlice.reducer
export const postActions = postSlice.actions
export const postReducer = postSlice.reducer
