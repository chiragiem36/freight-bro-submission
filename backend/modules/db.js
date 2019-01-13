const mongo = require('mongodb').MongoClient;

const _db = {}
let pending = 1

mongo.connect("mongodb://signzy:signzy00@ds161410.mlab.com:61410/signzy", { useNewUrlParser: true }).then((client) => {

			if (client) { // if false, it is client's DB server
				console.log('\x1b[33m%s\x1b[0m', 'Connected to database')
				_db.signzy = client.db('signzy')
				--pending

			}
		}).catch((err) => {
			if (err) {
				console.error("Error connecting to " + " database", err)

				// code to reconnect to db

				if (options.init) {

					// if connection to our main server failed, try again

					connectDB(defDB, {
						init: true
					})
				}
			}

		})


module.exports.pending = () => {
	if (pending > 0) {
		return true
	} else {
		return false
	}
}

module.exports.db = function () {
	return _db
}

module.exports.collection = function (col) {

	let o

	try {
		o = _db['signzy'].collection(col)
	} catch (error) {
		console.error(error)
		console.log("Reconnecting to Databases")
		initiateConnection() // reinitiating connection
		return null
	}
	// console.log(_db[domain].collection('studentIds'))
	return o
}