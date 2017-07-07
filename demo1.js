// load a module with require()..
// http is included with node

const http = require('http')
const port = process.env.PORT || 4000

// create a web server object.  using createServer() function.
// pass a request handler (callback function) to createServer().
// request handler is called EACH TIME A REQUEST COMES IN
//  when a HTTP request comes in, node will call the request handler funciton
// we can use object such as request and response to inspect the request,
// like what method or verb (GET, PUT, POST, PATCH, DELETE)
//   see what url was requested
//   see what request headers were provided.
//   see what parameters were provided.

const server = http.createServer(function(request, response) {
  const reqHeaders = request.headers
  const reqMethod = request.method
  const reqURL = request.url
  console.log('request', request)

  const responseBody = { headers: reqHeaders, method: reqMethod, url: reqURL }

  if (reqMethod === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.write(JSON.stringify(responseBody, null, 2))
    console.log(
      "here's what were sending back to the client (web browser):",
      JSON.stringify(responseBody, null, 2)
    )
  }
  response.end()
})

server.listen(port, function() {
  console.log('api server up!', server.address(), 'port: ', port)
})
