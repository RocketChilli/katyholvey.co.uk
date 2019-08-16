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
    const href = event.target.getAttribute('href')
    scrollToElement(href, { ease: 'inOutSine' })
  })
})
