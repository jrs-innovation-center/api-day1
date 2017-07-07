const http = require('http')
const fs = require('fs')
const port = process.env.PORT || 4000
const path = require('path')

const server = http.createServer(function(request, response) {
  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write('<html>')
    response.write('<body>')
    response.write('<h2>Welcome to our API</h2>')
    response.write('<p>try a GET /octocat</p>')
    response.write('<body>')
    response.write('</html>')
    response.end()
  } else if (request.method === 'GET' && request.url === '/octocat') {
    const img = fs.readFileSync(
      path.join(__dirname, './assets/img/octocat.png')
    )
    response.writeHead(200, { 'Content-Type': 'image/png' })
    response.end(img, 'binary')
  } else {
    response.statusCode = 404
    response.end()
  }
})

server.listen(port, () => console.log('API is ready:', port, server.address()))
