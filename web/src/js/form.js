import axios from 'axios'

/* Handle contact form submission
 * @param {Event} - The form submit event
 */
const formHandler = (event) => {
  event.preventDefault()
  const contactForm = event.target
  contactForm.classList.add('-sending')

  const data = {
    name: contactForm.querySelector('[name="name"]').value,
    phone: contactForm.querySelector('[name="phone"]').value,
    email: contactForm.querySelector('[name="email"]').value,
    message: contactForm.querySelector('[name="message"]').value,
  }
  axios({
    url: '/mailer',
    method: 'post',
    data,
    headers: { 'Content-type': 'application/json' },
  })
    .catch(error => error)
    .then((result) => {
      // Get status and reset form
      contactForm.classList.remove('-sending')
      let status = 'error'
      if (result.status === 200) {
        status = 'success'
        contactForm.reset()
      }

      // Provide feedback after sending message
      const message = contactForm.querySelector(`.message .${status}`)
      message.classList.add('-visible')
      setTimeout(() => {
        message.classList.remove('-visible')
      }, 3000)
    })
}

export default formHandler
