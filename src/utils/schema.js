import * as Yup from 'yup'

// const phoneRegExp = /^([0]{1})[0-9]{10}$/

export const schema = Yup.object({
  title: Yup.string().trim().required('The title field cannot be empty'),
  content: Yup.string().trim().required('The content field cannot be empty'),
})
