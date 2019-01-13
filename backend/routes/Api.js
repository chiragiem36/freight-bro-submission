const Router = require('express').Router()
const mongo = require('./../modules/db.js')
const path = require('path')
const crypto = require('crypto')

function hashID () {
  return crypto.randomBytes(30).toString('hex')
}

Router.get('/*', (req, res) => {
	const path = req.path.slice(1, req.path.length)
	const P = path.split('/')
	P.splice(2,0, 'get')
	const _id = P.join('/')

	if (!req.headers.authkey) {
		throw Error("NO_AUTH_KEY")
	}

	if (!req.headers.username) {
		throw Error("NO_USER_NAME")
	}

	collection('credits').findOne({_id: P[0]})
	.then((credits) => {
		if (!credits || credits.credits.get <= 0) {
			throw Error("LIMIT_EXCEEDED")
		} else {
			return collection('apis').findOne({_id: _id})
		}
	})
	.then((item) => {
		if (item && item._id) {
			if (item.headers.authkey.indexOf(req.headers.authkey) === -1 && item.headers.authkey.indexOf('*') === -1) {
				throw Error("UNAUTHORIZED")
			} else {
				return item
			}
		} else {
			throw Error("CANNOT_GET")
		}
	})
	.then((item) => {
		res.setHeader('Content-type', item.response.type)
		res.send('\n' + item.response.value + '\n\n')
		res.status(200)
		res.end()
	})
	.then(() => {
		return collection('credits').updateOne({_id: P[0]}, {$inc: {'credits.get': -1}})
	})
	.catch((err) => {
		console.error(err)

		res.status(403)
		res.setHeader('Content-type', 'text/plain')

		if (err.message === 'CANNOT_GET') {
			res.status(404)
			res.send("\nINVALID PATH\n\n")
		} else if (err.message === 'NO_AUTH_KEY') {
			res.send("\nAUTH KEY NOT PROSENT IN HEADERS\n\n")
		} else if (err.message === 'NO_USER_NAME') {
			res.send("\nUSERNAME IS NOT PRESENT IN HEADERS\n\n")
		} else if (err.message === 'LIMIT_EXCEEDED') {
			res.send("\nFREE_TIER LIMIT EXCEEDED\n\n")
		} else if (err.message === 'UNAUTHORIZED') {
			res.send("\nUNAUTHORIZED REQUEST\n\n")
		} else {
			res.send("\nINTERNAL SERVER ERROR\n\n")
			res.status(500)
		}

		res.end()
	})
})

Router.post('/*', (req, res) => {
	const path = req.path.slice(1, req.path.length)
	const P = path.split('/')
	P.splice(2,0, 'post')
	const _id = P.join('/')

	if (!req.headers.authkey) {
		throw Error("NO_AUTH_KEY")
	}

	if (!req.headers.username) {
		throw Error("NO_USER_NAME")
	}

	const data = {
		_id: hashID(),
		body: req.body,
		time: new Date(),
		type: req.headers['content-type']
	}

	let response

	collection('credits').findOne({_id: P[0]})
	.then((credits) => {
		if (!credits || credits.credits.post <= 0) {
			throw Error("LIMIT_EXCEEDED")
		} else {
			return collection('apis').findOne({_id: _id})
		}
	})
	.then((item) => {
		if (item && item._id) {
			if (item.headers.authkey.indexOf(req.headers.authkey) === -1 && item.headers.authkey.indexOf('*') === -1) {
				throw Error("UNAUTHORIZED")
			} else {
				return collection('store').insertOne(data)
			}
		} else {
			throw Error("CANNOT_GET")
		}
	})
	.then(() => {
		res.setHeader('Content-type', 'text/plain')
		res.send('\nData store Object ID - ' + data._id + '\n\n')
		res.status(200)
		res.end()
	})
	.then(() => {
		return collection('credits').update({_id: P[0]}, {$inc: {'credits.post': -1}})
	})
	.catch((err) => {
		console.error(err)

		res.status(403)
		res.setHeader('Content-type', 'text/plain')

		if (err.message === 'CANNOT_GET') {
			res.status(404)
			res.send("\nINVALID PATH\n\n")
		} else if (err.message === 'NO_AUTH_KEY') {
			res.send("\nAUTH KEY NOT PROSENT IN HEADERS\n\n")
		} else if (err.message === 'NO_USER_NAME') {
			res.send("\nUSERNAME IS NOT PRESENT IN HEADERS\n\n")
		} else if (err.message === 'LIMIT_EXCEEDED') {
			res.send("\nFREE_TIER LIMIT EXCEEDED\n\n")
		} else if (err.message === 'UNAUTHORIZED') {
			res.send("\nUNAUTHORIZED REQUEST\n\n")
		} else {
			res.send("\nINTERNAL SERVER ERROR\n\n")
			res.status(500)
		}

		res.end()
	})
})

Router.put('/*', (req, res) => {
	const path = req.path.slice(1, req.path.length)
	const P = path.split('/')
	P.splice(2,0, 'put')
	const _id = P.join('/')

	if (!req.headers.authkey) {
		throw Error("NO_AUTH_KEY")
	}

	if (!req.headers.username) {
		throw Error("NO_USER_NAME")
	}

	const data = {
		_id: hashID(),
		body: req.body,
		time: new Date(),
		type: req.headers['content-type']
	}

	let response

	collection('credits').findOne({_id: P[0]})
	.then((credits) => {
		if (!credits || credits.credits.put <= 0) {
			throw Error("LIMIT_EXCEEDED")
		} else {
			return collection('apis').findOne({_id: _id})
		}
	})
	.then((item) => {
		if (item && item._id) {
			if (item.headers.authkey.indexOf(req.headers.authkey) === -1 && item.headers.authkey.indexOf('*') === -1) {
				throw Error("UNAUTHORIZED")
			} else {
				return collection('store').insertOne(data)
			}
		} else {
			throw Error("CANNOT_GET")
		}
	})
	.then(() => {
		res.setHeader('Content-type', 'text/plain')
		res.send('\nData store Object ID - ' + data._id + '\n\n')
		res.status(200)
		res.end()
	})
	.then(() => {
		return collection('credits').update({_id: P[0]}, {$inc: {'credits.put': -1}})
	})
	.catch((err) => {
		console.error(err)

		res.status(403)
		res.setHeader('Content-type', 'text/plain')

		if (err.message === 'CANNOT_GET') {
			res.status(404)
			res.send("\nINVALID PATH\n\n")
		} else if (err.message === 'NO_AUTH_KEY') {
			res.send("\nAUTH KEY NOT PROSENT IN HEADERS\n\n")
		} else if (err.message === 'NO_USER_NAME') {
			res.send("\nUSERNAME IS NOT PRESENT IN HEADERS\n\n")
		} else if (err.message === 'LIMIT_EXCEEDED') {
			res.send("\nFREE_TIER LIMIT EXCEEDED\n\n")
		} else if (err.message === 'UNAUTHORIZED') {
			res.send("\nUNAUTHORIZED REQUEST\n\n")
		} else {
			res.send("\nINTERNAL SERVER ERROR\n\n")
			res.status(500)
		}

		res.end()
	})
})

Router.delete('/*', (req, res) => {
	const path = req.path.slice(1, req.path.length)
	const P = path.split('/')
	P.splice(2,0, 'delete')
	const _id = P.join('/')

	if (!req.headers.authkey) {
		res.status(403)
		res.send("\nauth_key NOT PROSENT IN HEADERS\n\n")
		res.end()
		return
	}

	if (!req.headers.username) {
		res.status(403)
		res.send("\nusername NOT PROSENT IN HEADERS\n\n")
		res.end()
		return
	}

	if (!req.headers.document_id) {
		res.status(403)
		res.send("\ndocument_id NOT PROSENT IN HEADERS\n\n")
		res.end()
		return
	}

	let response

	collection('credits').findOne({_id: P[0]})
	.then((credits) => {
		if (!credits || credits.credits.delete <= 0) {
			throw Error("LIMIT_EXCEEDED")
		} else {
			return collection('apis').findOne({_id: _id})
		}
	})
	.then((item) => {
		if (item && item._id) {
			if (item.headers.authkey.indexOf(req.headers.authkey) === -1 && item.headers.authkey.indexOf('*') === -1) {
				throw Error("UNAUTHORIZED")
			} else {
				return collection('store').removeOne({_id: req.headers.document_id})
			}
		} else {
			throw Error("CANNOT_GET")
		}
	})
	.then(() => {
		res.setHeader('Content-type', 'text/plain')
		res.send('\nDocument deleted ....  ID - ' + req.headers.document_id + '\n\n')
		res.status(200)
		res.end()
	})
	.then(() => {
		return collection('credits').update({_id: P[0]}, {$inc: {'credits.delete': -1}})
	})
	.catch((err) => {
		console.error(err)

		res.status(403)
		res.setHeader('Content-type', 'text/plain')

		if (err.message === 'CANNOT_GET') {
			res.status(404)
			res.send("\nINVALID PATH\n\n")
		} else if (err.message === 'NO_AUTH_KEY') {
			res.send("\nauth_key NOT PROSENT IN HEADERS\n\n")
		} else if (err.message === 'NO_USER_NAME') {
			res.send("\nusername IS NOT PRESENT IN HEADERS\n\n")
		} else if (err.message === 'NO_DOCUMENT_ID') {
			res.send("\ndocument_id IS NOT PRESENT IN HEADERS\n\n")
		} else if (err.message === 'LIMIT_EXCEEDED') {
			res.send("\nFREE_TIER LIMIT EXCEEDED\n\n")
		} else if (err.message === 'UNAUTHORIZED') {
			res.send("\nUNAUTHORIZED REQUEST\n\n")
		} else {
			res.send("\nINTERNAL SERVER ERROR\n\n")
			res.status(500)
		}

		res.end()
	})
})

module.exports = Router