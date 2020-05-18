let express = require('express')

let router = express.Router()
let mysql = require('mysql')
let db = require('../util/database')

router.post('/new', function (req, res, next) {
  let { Username } = req.body
  let { Day_of_the_Week } = req.body
  let { Start_Time } = req.body
  let { End_Time } = req.body
  let sql = `INSERT INTO Schedule (Username, Day_of_the_Week, Start_Time, End_Time ) VALUES ('${username}', '${weekday}', '${starttime}', ${endtime} )`
  db.query(sql, function (err, result) {
    if (err) throw err
    console.log('Records Inserted')
    res.render('new', { title: 'Mr. Coffee Database' })
  })
  res.redirect('/')
})
module.exports = router
