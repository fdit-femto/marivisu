const express = require('express')
const cors = require('cors');
const net = require('net');
const bodyParser = require('body-parser');


const client = new net.Socket();
const server = express()

server.use(cors())
server.use(bodyParser.json());
const port = 3800
let vesselsData = '';

server.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.post('/client/startClient', (request, response) => {
  console.log(`Starting client.`)
  const client = request.body
  startClient(client)
});

server.get('/client/getMessages', (request, response) => {
  console.log(`getMessages.`)

  let vesselsToSend = vesselsData
  response.json(vesselsToSend)
  vesselsData = diff(vesselsToSend, vesselsData)
})


function startClient(clientModel) {
  console.log('coucou')
  client.connect(clientModel.port, clientModel.ip, function () {
    console.log('Connected to ' + clientModel.ip + ':' + clientModel.port)
  });

  client.on('data', function (data) {
    vesselsData += data;
    console.log('Received: ' + data);
    console.log(vesselsData);
  });
}

function diff(strToRemove, str) {
  return str.split(strToRemove).join('')
}
