const express = require('express')
const cors = require('cors');
const net = require('net');
const bodyParser = require('body-parser');
const elasticsearch = require('elasticsearch');
const server = express()

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
let newDataVessels = new Map();

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
        "timestamp": {"type": "date", "format": "epoch_millis"},
        "position": {"type": "geo_point"},
        "SOG": {"type": "integer"},
        "label": {"type": "text"}
      }
    }
  });
}

async function bulk(data) {
  const body = data.flatMap(doc => [{index: {_index: 'ais'}}, createPositionField(doc)])
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

async function esGetLabel() {
  return await elasticsearchClient.search({
    index: 'ais',
    body: {
      query: {
        exists: {
          field: 'label'
        }
      }
    }
  })
}

async function esPostUpdateLabel(label) {
  await elasticsearchClient.updateByQuery({
    index: 'ais',
    refresh: true,
    body: {
      query: {
        bool: {
          must: [
            {match: {MMSI: label.MMSI}},
          ]
        }
      },
      script: {
        source: 'ctx._source.label = params.label',
        lang: 'painless',
        params: {
          label: 'AIS-S'
        }
      }
    }
  })
}

//TODO: use search after to retrieve all the result
async function esGetLastMessage() {
  return await elasticsearchClient.search({
    index: 'ais',
    body: {
      size: 10000,
      query: {
        match_all: {}
      },
      collapse: {
        field: "MMSI",
        inner_hits: {
          name: "most_recent",
          size: 1,
          sort: [
            {
              timestamp: "desc"
            }
          ]
        }
      }
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
  // let dataReceived = JSON.parse(JSON.parse(request.rawBody));
  let dataReceived = JSON.parse(request.rawBody);
  bulk(dataReceived).then(res => {
    console.log(res)
  }).catch(err => console.log(err))
  response.sendStatus(200);
});

/**
 * Receive label vessel.
 */
server.post('/data/label', (request, response) => {
  // let dataReceived = JSON.parse(JSON.parse(request.rawBody));
  let dataReceived = JSON.parse(request.rawBody);
  dataReceived.forEach(element => {
    esPostUpdateLabel(element).then(res => {
      console.log(res)
      response.sendStatus(200);
    }).catch(err => {
      console.log(err)
      response.status(500)
    })
  })

});

/**
 * Send data to front.
 */
server.get('/data', (request, response) => {
  console.log('--data get--');

  esGetLastMessage().then(res => {
    let dataToSend = []
    res.hits.hits.forEach(element => {
      dataToSend.push(element.inner_hits.most_recent.hits.hits[0]._source)
    })
    response.json(dataToSend)
  }).catch(err => console.log(err))
});

/**
 * send label to front.
 */
server.get('/label', (request, response) => {
  console.log('--label get--');
  esGetLabel().then(res => {
    if (res.hits.hits.length !== 0) {
      response.json(res.hits.hits[0]._source)
    } else {
      response.json([])
    }
  }).catch(err => console.log(err))
});

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
