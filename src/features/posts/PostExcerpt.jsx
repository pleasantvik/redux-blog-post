import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButton } from './ReactionButton'
import { TimeAgo } from './TimeAgo'

export const PostExcerpt = ({ post }) => {
  return (
    <article key={post.id} className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButton post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}
