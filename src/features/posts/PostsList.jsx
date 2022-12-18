import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectAllPosts, selectPostIds } from './postSlice'
import { Spinner } from '../../components/Spinner'
import { PostExcerpt } from './PostExcerpt'

export const PostsList = () => {
  // const posts = useSelector(selectAllPosts)
  const dispatch = useDispatch()

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const orderedPostIds = useSelector(selectPostIds)
  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    return (content = <Spinner text="loading" />)
  } else if (postStatus === 'success') {
    // const orderedPost = posts
    //   .slice()
    //   .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPostIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId} />
    ))
  } else if (postStatus === 'failed') {
    return (content = <div>{error}</div>)
  }
  // console.log(posts)

  //HELPER FUNCTION

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}
