const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const HTTPError = require('node-http-error')
const { pathOr } = require('ramda')

app.get('/justintimberlake', (req, res, next) => {
  res.send({ jtSays: 'Bring it on down to omletteville.' })
  next
})

app.get('/justintimberlake/awful', (req, res, next) => {
  const jtError = new HTTPError(400, 'impossible', {
    developerMessage: 'How dare you call this endpoint.  JT is the best.',
    userMessage:
      "You've attempted to retrieve impossible information. Try another address.",
    errorCode: 123,
    moreInfo: 'http://dev.everythingjt.com/errors/123'
  })

  return next(jtError)
})

// ERROR handling middleware goes just above the listen() AFTER ALL OTHER
//   middlewares

app.use(function(err, req, res, next) {
  // err parameter passed in :

  const queryString = pathOr('No Query String', ['query'], req)

  console.log(
    ' method: ',
    req.method,
    ' path: ',
    req.path,
    ' query: ',
    queryString,
    ' err: ',
    err
  )

  res.status(err.status || 500)
  res.send(err)
})

app.listen(port, () => console.log('API started on port: ', port))
