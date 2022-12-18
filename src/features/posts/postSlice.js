import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

// Use createEntityAdapter to sort the order by using the date in post
const postAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

// getInitialState() returns an empty {ids:[], entities:{}} normalized state object
// This keep our post as lookup table in state.entities
const initialState = postAdapter.getInitialState({
  // posts: [],
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk('posts/fetchposts', async () => {
  const response = await client.get('/fakeApi/posts')

  return response.data
})

export const addNewPost = createAsyncThunk(
  'post/addNewPost',
  async (initialPost) => {
    const response = await client.post('/fakeApi/posts', initialPost)

    return response.data
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload)
    //   },
    //   // Call back function that helps prepare random value
    //   prepare(value) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title: value.title,
    //         content: value.content,
    //         user: value.userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           hooray: 0,
    //           heart: 0,
    //           rocket: 0,
    //           eyes: 0,
    //         },
    //       },
    //     }
    //   },
    // },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      // const existingPost = state.posts.find((post) => post.id === id)
      // We can look up the right pos by directly with their Ids instead of looping over each one
      const existingPost = state.entities[id]

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      // const existingPost = state.posts.find((post) => post.id === postId)
      const existingPost = state.entities[postId]

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success'
        // state.posts = state.posts.concat(action.payload)
        //upsertMany helps to add incoming posts to state
        postAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // .addCase(addNewPost.fulfilled, (state, action) => {
      //   state.posts.push(action.payload)
      // })

      // addOne function add a single post
      .addCase(addNewPost.fulfilled, postAdapter.addOne)
  },
})

// The adapter returns selectAll, selectById, selectIds selectors geneeratted automaticlaly
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postAdapter.getSelectors((state) => state.posts)

// export const selectAllPosts = (state) => state.posts.posts
// export const selectPostById = (state, postId) =>
//   state.posts.posts.find((post) => post.id === postId)

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
)
export const postActions = postSlice.actions
export const postReducer = postSlice.reducer
