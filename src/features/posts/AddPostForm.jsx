import { useFormik } from 'formik'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { schema } from '../../utils/schema'
import { addNewPost} from './postSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const [reqStatus, setReqStatus] = useState('idle')

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      userId: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      submitForm(values)
    },
  })

  const canSave =
    Boolean(formik.values.title) &&
    Boolean(formik.values.content) &&
    Boolean(formik.values.userId) &&
    reqStatus === 'idle'

  const submitForm = async (values) => {
    if (canSave) {
      try {
        setReqStatus('pending')
        await dispatch(
          addNewPost({ ...values, user: formik.values.userId })
        ).unwrap()
        formik.values.title = ''
        formik.values.content = ''
        formik.values.userId = ''
      } catch (err) {
        console.log('Failed to save post')
      } finally {
        setReqStatus('idle')
      }
    }
  }

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
          value={formik.values.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.content && formik.errors.content ? (
          <div style={{ color: 'red' }}>{formik.errors.content}</div>
        ) : (
          ''
        )}
        <label htmlFor="postAuthor">Author</label>
        <select name="userId" id="postAuthor" onChange={formik.handleChange}>
          <option value=""></option>
          {usersOptions}
        </select>
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
