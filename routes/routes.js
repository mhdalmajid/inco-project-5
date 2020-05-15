const router = require('express').Router()

router.get('/', (req, res) => {
  res.send('Hello index')
})

module.exports = router
