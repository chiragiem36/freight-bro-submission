const Router = require('express').Router()
const mongo = require('./../modules/db.js')
const path = require('path')
const crypto = require('crypto')

Router.get('/id=:id', (req, res) => {
	const id = req.headers._id

	let project

	collection('projects').findOne({_id: req.params.id})
	.then((item) => {
		project = item
		return collection('apis').find({creator: req.headers._id, project: req.params.id}, {_id: 1, path: 1}).toArray()
	})
	.then((apis) => {
		project.apis = apis
		res.json({project, _id: req.headers._id})
	})
	.catch((err) => {
		console.error(err)
		res.status(500)
		res.end()
	})
})

Router.post('/new', (req, res) => {
	const id = req.headers._id

	const o = {
		_id: crypto.randomBytes(3).toString('hex'),
		name: req.body.name,
		creator: id,
		time: new Date()
	}

	collection('projects').insertOne(o)
	.then((item) => {
		res.status(201)
		res.json(o)
	})
	.catch((err) => {
		console.error(err)
		res.status(500)
		res.end()
	})
})

Router.put('/id=:id/new-api', (req, res) => {
	
	const id = decodeURIComponent(req.params.path)
	const o = req.body

	o._id = req.headers._id + path.resolve('/' + req.params.id + '/' + o.method + '/' + o.path)
	o.project = req.params.id
	o.creator = req.headers._id

	collection('apis').findOne({_id: o._id})
	.then((item) => {
		if (item && item._id) {
			throw Error("API_EXIST")
		} else {
			return collection('apis').insertOne(o)
		}
	})
	.then(() => {
		res.status(201)
		res.end()
	})
	.catch((err) => {
		console.error(err)

		if (err.message === 'API_EXIST') {
			res.status(403)
			res.json({code: 'API_EXIST'})
		} else {
			res.status(500)
		}

		res.end()
	})
})

Router.get('/id=:id/api/method=:method&path=:path', (req, res) => {
	
	const id = decodeURIComponent(req.params.path)
	const o = req.body

	collection('apis').findOne({path: id, project: req.params.id, creator: req.headers._id, method: req.params.method})
	.then((item) => {
		if (item && item._id) {
			res.json({api: item, _id: req.headers._id})
		} else {
			throw Error("API_NOT_FOUND")
		}
	})
	.catch((err) => {
		console.error(err)

		if (err.message === 'API_NOT_FOUND') {
			res.status(404)
			res.json({code: 'API_NOT_FOUND'})
		} else {
			res.status(500)
		}

		res.end()
	})
})

module.exports = Router