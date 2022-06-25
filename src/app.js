const express = require('express')
const path = require('path')
const cors = require('cors')

const usersRouter = require('./routers/users')
require('./mongoose/db/mongoose') //link for cloude.db

//setting up the express server
const app = express()
app.options('/api/courses/get', cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE')
    return res.status(200).json({})
  }
  next()
})

app.use(express.json())
app.use(usersRouter)
const publicPath = path.resolve(__dirname, '..', 'ReactJS', 'dist')

const port = process.env.PORT || 8001

app.listen(port, () => {
  console.log('Backend is running on port ' + port)
})
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(publicPath))
}
app.get('*', (req, res) => {
  res.sendFile(path.resolve(publicPath, 'index.html'))
})

module.exports = app
