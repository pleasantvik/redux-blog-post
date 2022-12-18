import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { Navbar } from './app/Navbar'
import { NotificationList } from './features/notifications/NotificationList'
import { AddPostForm } from './features/posts/AddPostForm'
import { EditPostForm } from './features/posts/EditPostForm'
import { PostsList } from './features/posts/PostsList'
import { SinglePost } from './features/posts/SinglePost'
import { UserPage } from './features/users/UserPage'
import { UsersList } from './features/users/UsersList'

function App() {
  return (
    <Router>
      <Navbar />

      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Fragment>
                <AddPostForm />
                <PostsList />
              </Fragment>
            )}
          />
          <Route path="/posts/:postId" exact>
            <SinglePost />
          </Route>
          <Route path="/editPost/:postId" component={EditPostForm} />
          <Route path="/users" component={UsersList} />
          <Route path="/users/:userId" component={UserPage} />
          <Route path="/notifications" component={NotificationList} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
