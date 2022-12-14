import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { schema } from '../../utils/schema'
import { postActions } from './postSlice'
import uuid from 'react-uuid'

export const AddPostForm = () => {
  const dispatch = useDispatch()
  const submitForm = (values) => {
    // const addPost = { ...values, id: uuid() }
    // const addPost = { ...values }
    // dispatch(postActions.postAdded(addPost))
    // dispatch(postActions.postAdded({ title, content }))
    dispatch(postActions.postAdded(values))
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      submitForm(values)
    },
  })

  return (
    <section>
      <h2>Add a new Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="post">Post Title</label>
        <input
          type="text"
          name="title"
          id="post"
          placeholder="Post Title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
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
          //   onChange={formik.handleChange}
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
