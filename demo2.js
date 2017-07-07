const http = require('http')
const port = process.env.PORT || 4000

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })

  res.write('<html>')
  res.write('<body>')
  res.write('<h2>Request Info</h2>')
  res.write('<h3>Method</h3>')
  res.write('<p>' + req.method + '</p>')
  res.write('<h3>Browser Info (user agent)</h3>')
  res.write('<p>' + req.headers['user-agent'] + '</p>')
  res.write('<h3>URL</h3>')
  res.write('<p>' + req.url + '</p>')
  res.write('</body>')
  res.write('</html>')
  res.end()
})

server.listen(port, () => console.log('API IS UP, holla! ', port))
