import Parallax from 'scroll-parallax'
import scrollToElement from 'scroll-to-element'

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
