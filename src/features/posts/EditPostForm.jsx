import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { schema } from '../../utils/schema'
import { postActions } from './postSlice'

export const EditPostForm = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )
  console.log(post)
  //   console.log(postId, 'POSTID')
  const submitForm = (values) => {
    console.log(values)
    // const id = postId
    dispatch(postActions.postUpdated({ ...values }))
    history.push(`/posts/${postId}`)
  }

  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      submitForm(values)
    },
  })
  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          placeholder="What's on your mind"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <div style={{ color: 'red' }}>{formik.errors.title}</div>
        ) : (
          ''
        )}

        <label htmlFor="postContent">Content</label>
        <textarea
          id="postContent"
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content ? (
          <div style={{ color: 'red' }}>{formik.errors.content}</div>
        ) : (
          ''
        )}
        <button type="submit">Save Post</button>
      </form>
    </section>
  )
}
