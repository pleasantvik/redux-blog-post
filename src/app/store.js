import { configureStore } from '@reduxjs/toolkit'
import { notificationReducer } from '../features/notifications/notificationSlice'
import { postReducer } from '../features/posts/postSlice'
import { userReducer } from '../features/users/usersSLice'

export default configureStore({
  reducer: {
    posts: postReducer,
    users: userReducer,
    notifications: notificationReducer,
  },
})
