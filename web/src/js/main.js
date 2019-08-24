import Parallax from 'scroll-parallax'
import scrollToElement from 'scroll-to-element'
import axios from 'axios'

// Add parallax effect to header image
const options = { intensity: 50 }
new Parallax('.parallax', options).init()

// Add scrolling effect to in-page links
const links = document.querySelectorAll('a[href^="#"]')
links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const hash = event.target.getAttribute('href')
    scrollToElement(hash, { ease: 'inOutSine' })
    window.location = hash
  })
})

// Show scroll hint on home page
const scrollHint = document.querySelector('.scroll-hint')
if (scrollHint && !window.scrollY) {
  const scrollHintDelay = setTimeout(() => {
    scrollHint.classList.remove('-hidden')
  }, 3000)
  // Disable hint on scroll if not already shown
  window.addEventListener('scroll', function callback(event) {
    clearTimeout(scrollHintDelay)
    event.target.removeEventListener('scroll', callback)
  })
}

// Handle contact form submission
const contactForm = document.querySelector('.contact-form')
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const data = {
      name: event.target.querySelector('[name="name"]').value,
      phone: event.target.querySelector('[name="phone"]').value,
      email: event.target.querySelector('[name="email"]').value,
      message: event.target.querySelector('[name="message"]').value,
    }
    axios({
      url: '/mailer',
      method: 'post',
      data,
      headers: { 'Content-type': 'application/json' },
    })
  })
}
