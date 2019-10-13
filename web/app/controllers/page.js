const controller = (req, res, next) => {
  if (req.params.slug === 'about') {
    res.render('about', { type: 'page about' })
  } else {
    next()
  }
}

module.exports = controller
