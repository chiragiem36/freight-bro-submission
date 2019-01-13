//importing modules//
var Router = require('express').Router()
var cookie = require('cookie')
var jwt = require('jsonwebtoken')
const passKey = "A4G+G5SG4Q=AF15_VLALSt+F2SDG51321C2ZFVVEAOFMFA+ALDAFAMSKFSA"

let authenticate = (req, res, next) => { 
  const cookies = cookie.parse(req.headers.cookie || '')

  if (cookies && cookies.hasOwnProperty('user')) {
    let level
    jwt.verify(cookies.user,passKey, (err,decoded) => { //JWT is verified. If verified and true, then its decoded
      if (err) {
        console.error(err)
        res.status(500)
        res.end()
        return
      }
      if (decoded && decoded.name) {
        collection('users').findOne({_id: decoded.name})
        .then((item) => {
          if (item && item._id) {
            req.headers._id = item._id
            next()
          }
        })
        .catch((err) => {
          console.error(err)
          res.status(500)
          res.end()
        })
      } else {
        res.status(401)
        res.end()
      }
    })
  // } else {
  } else {
        res.status(401)
        res.end()
      }
}

Router.use((req, res, next) => {

  // if (req.origin === 'http://testseriesforjee.com') {}

  authenticate(req, res, next)
})

module.exports = Router