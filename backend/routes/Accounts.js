const Router = require('express').Router()
const mongo = require('./../modules/db.js')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')
const passKey = "A4G+G5SG4Q=AF15_VLALSt+F2SDG51321C2ZFVVEAOFMFA+ALDAFAMSKFSA"

const dbCheck = setInterval(() => {
  const x = mongo.db()
  const pending = mongo.pending()
  if (!pending && x && x !== undefined && x !== null) {

    console.log('\x1b[32m%s\x1b[0m', "Connected to DATABASES")

    collection = mongo.collection

    clearInterval(dbCheck)
  }
}, 1)

Router.post('/login', (req, res) => {
	collection('users').findOne({_id: req.body._id})
	.then((item) => {
		if (item && item._id) {
			if (req.body._id === item._id && req.body.hash === item.hash) {
				return null
			} else {
				throw Error("INVALID_CREDENTIALS")
			}
		} else {
			throw Error("USER_NOT_FOUND")
		}
	})
	.then(() => {
		const c = cookie.serialize('user', jwt.sign({name: req.body._id, type: 'admin'}, passKey))
		res.setHeader('Set-Cookie',c,{maxAge: '60*60*60*60',httpOnly:true,path: '/'})
		res.status(200)
		res.json({cookie: c})
		res.end()		
	})
	.catch((err) => {
		console.error(err)
		if (err.message === 'INVALID_CREDENTIALS') {
			res.status(401)
			res.end()
		} else if (err.message === 'USER_NOT_FOUND') {
			res.status(404)
			res.end()
		} else {
			res.status(500)
			res.end()
		}
	})
})

Router.post('/new-user', (req, res) => {
	collection('users').findOne({_id: req.body._id})
	.then((item) => {
		if (item && item._id) {
			throw Error("USER_EXIST")
		} else {
			collection('users').insertOne(req.body)
		}
	})
	.then(() => {
		console.log("New user created - " + req.body._id)
		res.status(200)
		res.end()
	})
	.catch((err) => {
		console.error(err)
		if (err.message === 'USER_EXIST') {
			res.status(401)
			res.end()
		} else {
			res.status(500)
			res.end()
		}
	})
})

module.exports = Router