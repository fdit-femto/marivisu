const express = require('express')
const net = require('net');
const client = new net.Socket();

const server = express()
const port = 3800

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.post('/client/startClient', (req, res) => {
  const client = req.body.client
  startClient(client)
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

client.connect(1024, "127.0.0.1", function() {
  console.log('Connected');
});

client.on('data', function(data) {
  console.log('Received: ' + data);
});


function startClient(clientModel) {
  client.connect(clientModel.port, clientModel.ip, function() {
    console.log('Connected');
  });

  client.on('data', function(data) {
    console.log('Received: ' + data);
  });
}
