import Parallax from 'scroll-parallax'
import scrollToElement from 'scroll-to-element'
import initForm from './form'

// Use initial viewport height for mobile browsers
const vh = window.innerHeight / 100
document.documentElement.style.setProperty('--vh', `${vh}px`)
/* FIXME: The header layout breaks when loaded on a landscape
   mobile device before switching to portrait. This can't be fixed
   using a resize event listener, as the event also fires when the
   mobile browser's navigation bar moves in and out of the viewport
   when you scroll. */

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

    if (!event.target.hasAttribute('data-no-url')) {
      window.location = hash
    }
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

// Show site header on home page after scroll
const setHeader = () => {
  const header = document.querySelector('.site-header')
  if (window.scrollY > window.innerHeight - 30) {
    header.classList.add('-active')
  } else {
    header.classList.remove('-active')
  }
}

if (document.querySelector('.homepage')) {
  window.addEventListener('scroll', () => {
    setHeader()
  })
}
setHeader(false)

// Handle contact form submission
const contactForm = document.querySelector('.contact-form')
if (contactForm) {
  initForm(contactForm)
}
