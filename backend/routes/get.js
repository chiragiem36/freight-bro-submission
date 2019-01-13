const Router = require('express').Router()
const mongo = require('./../modules/db.js')
const cookie = require('cookie')
const jwt = require('jsonwebtoken')

Router.get('/projects', (req, res) => {
	const id = req.headers._id

	console.log(id)

	collection('projects').find({creator: id}).toArray()
	.then((projects) => {
		res.json({projects, _id: req.headers._id})
	})
	.catch((err) => {
		console.error(err)
		res.status(500)
		res.end()
	})
})

module.exports = Router