const controller = (req, res) => {
  if (req.params.slug === 'about') {
    res.render('about', { type: 'page about' })
  } else {
    res.render('errors/not-found', { type: 'error' })
  }
}

module.exports = controller
