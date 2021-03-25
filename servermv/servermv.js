const SVessel = require('./model/SVessel.js')
const express = require('express')
const cors = require('cors');
const net = require('net');
const bodyParser = require('body-parser');

const server = express()

const parseRawBody = (req, res, next) => {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', (chunk) => {
    req.rawBody += chunk;
  });
  req.on('end', () => {
    next();
  });
}

server.use(cors())
server.use(parseRawBody);

const port = 5000
let dataVessels = new Map();

server.listen(port, () => {
  console.log(`Data server listening at http://localhost:${port}`)
})

server.get('/', (request, response) => {
  response.send('Server is up!')
})

/**
 * Receive data vessel.
 */
server.post('/api/send_data', (request, response) => {
  let dataReceived = JSON.parse(JSON.parse(request.rawBody));
  dataReceived.forEach(element => {
    if (!dataVessels.has(element.MMSI)) {
      const vessel = new SVessel();
      vessel.addMessage(element);
      dataVessels.set(element.MMSI, vessel);
    }else {
      dataVessels.get(element.MMSI).addMessage(element);
    }
  })
  response.sendStatus(200);
});

/**
 * Receive label vessel.
 */
server.post('/data/label', (request, response) => {

});

/**
 * Send data to front.
 */
server.get('/data', (request, response) => {
  console.log('--data get--');
  response.json(sendData())
});

function sendData () {
  let dataToSend = [];

  dataVessels.forEach(element => {
    dataToSend = dataToSend.concat(element.messages)
  })

  return dataToSend;
}



//FDIT servermv
const serverExFDIT = express()
const client = new net.Socket();

serverExFDIT.use(cors())
serverExFDIT.use(bodyParser.json());
const portFDIT = 3800
let vesselsData = '';

serverExFDIT.listen(portFDIT, () => {
  console.log(`FDIT client listening at http://localhost:${portFDIT}`)
})

serverExFDIT.get('/', (request, response) => {
  response.send('Server is up!')
})

serverExFDIT.post('/client/startClient', (request, response) => {
  console.log(`Starting client.`)
  const client = request.body
  startClient(client)
});

serverExFDIT.get('/client/getMessages', (request, response) => {
  console.log(`getMessages.`)

  let vesselsToSend = vesselsData
  response.json(vesselsToSend)
  vesselsData = diff(vesselsToSend, vesselsData)
})


function startClient(clientModel) {
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
