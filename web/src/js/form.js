import axios from 'axios'

/**
 * Handle contact form submission
 * @param {Event} - The form submit event
 */
const submitHandler = async (event) => {
  event.preventDefault()
  const form = event.target
  form.classList.add('-sending')

  const data = {
    name: form.querySelector('[name="name"]').value,
    phone: form.querySelector('[name="phone"]').value,
    email: form.querySelector('[name="email"]').value,
    message: form.querySelector('[name="message"]').value,
  }

  const result = await axios({
    url: '/mailer',
    method: 'post',
    data,
    headers: { 'Content-type': 'application/json' },
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
 * Check if drag events should allow drops
 * @param {Event} - The drag or drop event
 */
const dragValidator = (event) => {
  const { types } = event.dataTransfer
  if (types.length === 1 && types[0] === 'Files') {
    event.preventDefault()
    return true
  }

  return false
}

/**
 * Display feedback when dragging valid files
 * @param {Event} - The dragover or dragenter event
 */
const dragHandler = (event) => {
  if (dragValidator(event)) {
    event.target.classList.add('-dragover')
  }
}

/**
 * Handle dropped files
 * @param {Event} - The drop event
 */
const dropHandler = (event) => {
  if (dragValidator(event)) {
    event.target.classList.remove('-dragover')
    const { files } = event.dataTransfer
    console.log(files)
  }
}

/**
 * Set up drag and drop for the file uploader
 * @param {Element} The file uploader element
 */
const initDragDrop = (target) => {
  // Display feedback when dragging in
  target.addEventListener('dragover', dragHandler)
  target.addEventListener('dragenter', dragHandler)

  // Display feedback when dragging out
  target.addEventListener('dragleave', () => {
    target.classList.remove('-dragover')
  })

  // Handle dropped files
  target.addEventListener('drop', dropHandler)
}

/**
 * Add event listeners to contact form
 * @param {Element} - The form to initialise
 */
const initForm = (form) => {
  form.addEventListener('submit', submitHandler)
  const fileUpload = form.querySelector('.file-upload')
  initDragDrop(fileUpload)
}

export default initForm
