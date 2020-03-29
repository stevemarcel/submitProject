const http = require('http')
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 8080;

let messageForm = `
<html>
  <body>
    <form method='POST' action='/message'>
      <div>
        <label for='message'>Message: </label><br>
        <input type='text' name='message' placeholder="Input message here">
      </div>

      <div>
        <input type='submit'>
      </div>

   </form>
  </body>
</html>`

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', data => {
      body += `${data} \n`
    });
    req.on('end', () => {
      fs.writeFile('message.txt', body, (err) => {
        if (err) throw err;
      });
      res.write(messageForm);
      res.end()
    });
  } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(messageForm);
      res.end();
    }
});

server.listen(port, hostname, () => {
  console.log('Server running at http://'+ hostname + ':' + port + '/');
});