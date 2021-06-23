const SVessel = require('./model/SVessel.js')
const SLabel = require('./model/SLabel.js')
const express = require('express')
const cors = require('cors');
const net = require('net');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const server = express()

const labelType = {
  NONE: 0,
  ASD: 1
}

const elasticsearchClient = new elasticsearch.Client({
  node: 'https://localhost:9200'
})

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
let newDataVessels = new Map();
let labels = new Map();

async function esDelete() {
  await elasticsearchClient.indices.delete({index: 'ais'})
}

async function esCreateIndices() {
  await elasticsearchClient.indices.create({index: 'ais'})
}

async function esInit() {
  await elasticsearchClient.indices.exists({index: 'ais'}, (err, res, status) => {
    if (res) {
      esDelete()
        .then(res => {
          console.log("[ES] delete");
        })
        .catch(err => console.log('[ERROR] : ' + err))
    }
    esCreateIndices().then(_ => {
      console.log('[ES] create index')
      esPutMapping()
        .then(_ => {
          console.log('[ES] create mapping')
        })
        .catch(err => console.log('[ERROR] : ' + err))
    })
  })
}

function createPositionField(data) {
  data.position = {
    lat: data["LAT"],
    lon: data["LON"]
  }

  return data
}

async function esPutMapping() {
  await elasticsearchClient.indices.putMapping({
    index: 'ais',
    body: {
      properties: {
        "MMSI": {"type": "integer"},
        "timestamp": {"type": "date"},
        "position": {"type": "geo_point"},
        "SOG": {"type": "integer"},
        "label": {"type": "text"}
      }
    }
  });
}

async function bulk(data) {
  const body = data.flatMap(doc => [{index: {_index: 'ais', _id: doc.MMSI}}, createPositionField(doc)])
  await elasticsearchClient.bulk({refresh: true, body}, function (err, resp) {
    if (resp.errors) {
      const erroredDocuments = []
      resp.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      console.log(erroredDocuments)
    }
  })

}


server.listen(port, () => {
  esInit().then(res => console.log(res)).catch(err => console.log(err))
  console.log(`Data server listening at http://localhost:${port}`)
})

server.get('/', (request, response) => {
  response.send('Server is up!')
})

/**
 * ElasticSearch
 */
server.post('/api/send_data', (request, response) => {
  let dataReceived = JSON.parse(JSON.parse(request.rawBody));
  bulk(dataReceived).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
  response.sendStatus(200);
});

/**
 * Receive data vessel.
 */
// server.post('/api/send_data', (request, response) => {
//   let dataReceived = JSON.parse(JSON.parse(request.rawBody));
//   dataReceived.forEach(element => {
//     if (!dataVessels.has(element.MMSI)) {
//       const vessel = new SVessel();
//       vessel.addMessage(element);
//       dataVessels.set(element.MMSI, vessel);
//     } else {
//       dataVessels.get(element.MMSI).addMessage(element);
//     }
//     if (!newDataVessels.has(element.MMSI)) {
//       const vessel = new SVessel();
//       vessel.addMessage(element);
//       newDataVessels.set(element.MMSI, vessel);
//     } else {
//       newDataVessels.get(element.MMSI).addMessage(element);
//     }
//   })
//   response.sendStatus(200);
// });

/**
 * Receive label vessel.
 */
server.post('/data/label', (request, response) => {
  let dataReceived = JSON.parse(JSON.parse(request.rawBody));
  dataReceived.forEach(element => {
    labels.set(element.MMSI, new SLabel(element.MMSI, element.timestamp, element.LAT, element.LON, labelType.ASD))
  })
  response.sendStatus(200);
});

/**
 * Send data to front.
 */
server.get('/data', (request, response) => {
  console.log('--data get--');
  response.json(sendDataMessages())
  newDataVessels.clear()
});

/**
 * send label to front.
 */
server.get('/label', (request, response) => {
  console.log('--label get--');
  response.json(sendDataLabel())
});

function sendDataMessages() {
  let dataToSend = [];

  dataVessels.forEach(element => {
    dataToSend = dataToSend.concat(element.data.messages[element.data.messages.length - 1])
  })
  console.log('data sent : \n', dataToSend.length, '\n')
  return dataToSend;
}

function sendDataLabel() {
  let dataToSend = [];

  labels.forEach(element => {
    dataToSend = dataToSend.concat(element)
  })
  console.log('data sent : \n', dataToSend, '\n')
  return dataToSend;
}


//FDIT servermv
const serverExFDIT = express()
const client = new net.Socket();

serverExFDIT.use(cors());
serverExFDIT.use(bodyParser.json());
const portFDIT = 3800
let vesselsData = '';

serverExFDIT.listen(portFDIT, () => {
  console.log(`FDIT client listening at http://localhost:${portFDIT}`)
})

serverExFDIT.get('/', (request, response) => {
  response.send('Server is up!')
})

serverExFDIT.get('/client/getMessages', (request, response) => {
  response.json(vesselsData)
})

serverExFDIT.post('/client/startClient', (request, response) => {
  console.log(`Starting client.`)
  startClient(request.body)
});


function diff(strToRemove, str) {
  return str.split(strToRemove).join('')
}

function startClient(clientModel) {
  client.connect(clientModel.port, clientModel.ip, function () {
    console.log('Connected to ' + clientModel.ip + ':' + clientModel.port)
  });

  client.on('data', function (data) {
    vesselsData += data;
    console.log(vesselsData);
    console.log('Received: ' + data);
  });
}
