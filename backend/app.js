const express=require('express')
const app = express()
const bp = require('body-parser')
const fs = require('fs')
const path = require('path')
const port = 80
const Accounts = require('./routes/Accounts.js') // module that handle login and 'new user' stuff
const Handler = require('./routes/Api.js') // module that handle login and 'new user' stuff
const Authenticate = require('./routes/Authenticate.js') // module that handle login and 'new user' stuff
const Project = require('./routes/project.js') // module that handle login and 'new user' stuff
const Get = require('./routes/get.js') // module that handle login and 'new user' stuff

const mongo = require('./modules/db.js')

let collection


// below code checks if connected to database. If connected execute main function

const dbCheck = setInterval(() => {
  const x = mongo.db()
  const pending = mongo.pending()
  if (!pending && x && x !== undefined && x !== null) {

    console.log('\x1b[32m%s\x1b[0m', "Connected to DATABASES")

    collection = mongo.collection

    clearInterval(dbCheck)
    main()
  }
}, 1)


//main function
function main () {
  app.use(bp.text())
  app.use(bp.urlencoded({extended: true}))
  app.use(bp.json())
  
  app.use('/api/', Handler)
  app.use('/accounts', Accounts)
  app.use('/', Authenticate)
  app.use('/list', Get)
  app.use('/project', Project)

  app.use('/dist', express.static("./../frontend/dist/spa-mat",{
    'maxAge': '604800'
  }))
}

app.listen(process.env.PORT || port,function(){
  console.log('\x1b[44m%s\x1b[0m', "listening on port " + port)
})