import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './usersSLice'
import { selectAllPosts, selectPostsByUser } from '../posts/postSlice'

export const UserPage = () => {
  const { userId } = useParams()

  const user = useSelector((state) => selectUserById(state, userId))

  // const postForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state)

  //   return allPosts.filter((post) => post.user === userId)
  // })
  const postForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
