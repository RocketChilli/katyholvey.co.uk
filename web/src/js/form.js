import axios from 'axios'
import * as dragDrop from './drag-drop'

/**
 * Handle contact form submission
 * @param {Event} - The form submit event
 */
const submitHandler = async (event) => {
  event.preventDefault()
  const form = event.target
  form.classList.add('-sending')

  const data = new FormData(form)
  dragDrop.files.forEach((file) => {
    data.append('files', file)
  })

  const result = await axios({
    url: '/mailer',
    method: 'post',
    data,
  }).catch(error => error)

  // Get status and reset form
  form.classList.remove('-sending')
  let status = 'error'
  if (result.status === 200) {
    status = 'success'
    form.reset()
  }

  // Provide feedback after sending message
  const message = form.querySelector(`.status .${status}`)
  message.classList.add('-visible')
  setTimeout(() => {
    message.classList.remove('-visible')
  }, 3000)
}

/**
 * Add event listeners to contact form
 * @param {Element} - The form to initialise
 */
const initForm = (form) => {
  const fileUpload = form.querySelector('.file-upload')
  dragDrop.setup(fileUpload)
  form.addEventListener('submit', submitHandler)
}

export default initForm
