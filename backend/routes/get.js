const Router = require('express').Router()
const mongo = require('./../modules/db.js')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

Router.get('/projects', (req, res) => {
	const id = req.headers._id

	console.log(id)

	collection('users').findOne({_id: id})
	.then((user) => {
		if (user && user._id) {
			return collection('projects').find({creator: id}).toArray()
		} else {
			throw Error("USER_NOT_FOUND")
		}
	})
	.then((projects) => {
		res.json({projects, _id: req.headers._id})
	})
	.catch((err) => {
		console.error(err)
		res.status(500)

		if (err.message === "USER_NOT_FOUND") {
			res.status(404)
		}

		res.end()
	})
})

module.exports = Router