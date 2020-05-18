const express = require('express')
const axios = require('axios')
const { getUserByEmailAndPass } = require('../model/model')
// const { routeProtector } = require('../helpers/auth')
const { signup } = require('../model/model')

const router = express.Router()

const indexGet = async (req, res) => {
  await axios
    .get('https://yts.mx/api/v2/list_movies.json?limit=6')
    .then((data) => {
      const result = data.data
      if (result.status === 'ok')
        return res.render('index', {
          movies: result.data.movies,
          userId: req.session.user.id,
        })
      return res.render('index')
    })
    .catch((error) => res.render('error', { error }))
}

const loginGet = (req, res) => {
  if (req.session.user) return res.redirect('/')
  return res.render('login', { data: '' })
}
const loginPost = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmailAndPass(email, password)
    req.session.user = { email, id: user[0].id }
    res.redirect('/')
  } catch (error) {
    res.render('login', { error })
  }
}

const logoutGet = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err)
    }
    return res.redirect('/login')
  })
}

const signupGet = async (req, res) => {
  res.render('signup')
}
const signupPost = async (req, res) => {
  try {
    await signup(req.body)
    res.redirect('/login')
  } catch (error) {
    res.render('signup', { error })
  }
}

const rateMovie = async (req, res) => {
  // { movieId: null, userId: null, ratingValue: '1 to 5' }
  try {
    let result
    const { movieId, userId, ratingValue } = req.body
    const userIdIfRated = await query('SELECT id FROM movie WHERE movie_id=? AND user_id=?', [
      movieId,
      userId,
    ])
    if (userIdIfRated.length > 0)
      result = await query('UPDATE movie SET rate=? WHERE id=?', [ratingValue, userIdIfRated[0].id])
    else
      result = await query('INSERT INTO movie (movie_id, user_id, rate) value(?, ?, ?)', [
        movieId,
        userId,
        ratingValue,
      ])

    res.json({ requested: result })
  } catch (error) {
    console.log(error)
  }
}

router.get('/', indexGet)

router.get('/login', loginGet)
router.post('/login', loginPost)

router.get('/signup', signupGet)
router.post('/signup', signupPost)

router.get('/logout', logoutGet)

router.post('/rate', rateMovie)

module.exports = router
