const express = require('express')
const cors = require('cors');
const net = require('net');
const client = new net.Socket();
const server = express()

server.use(cors())
const port = 3800
let vesselsData = '';

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.post('/client/startClient', (req, res) => {
  console.log(`Client started.`)
  const client = req.body.client
  startClient(client)
});

server.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})

server.get('/client/getmessages', (request, response) => {
  response.json(vesselsData)
})

client.connect(1024, "127.0.0.1", function() {
  console.log('Connected');
});

client.on('data', function(data) {
  vesselsData += data
  console.log('Received: ' + data + '\n---------\n');
  console.log(vesselsData);
});


function startClient(clientModel) {
  client.connect(clientModel.port, clientModel.ip, function() {
    console.log('Connected');
  });

  client.on('data', function(data) {
    vesselsData += data
    console.log('Received: ' + data + '\n---------\n');
    console.log(vesselsData);
  });
}
