const express       = require('express');
const SocketServer  = require('ws').Server;
const uuid          = require('node-uuid');

const PORT          = 4000;

const server        = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({server});

let clientCounter = 0;

wss.on('connection', (ws) => {
  clientCounter += 1;

  console.log('Client connected');
  console.log('Clients Online: ', clientCounter);

  ws.on('message', function incoming(msg) {
    let message = JSON.parse(msg);
    console.log(message);
    let newMessage = {};
    if(message.type === 'postMessage') {
      newMessage = {
                    id: uuid.v1(),
                    type: 'incomingMessage',
                    username: message.username,
                    content: message.content
                  };
    }

    if(message.type === 'postNotification') {
      newMessage = {
                    type: 'incomingNotification',
                    username: '',
                    content: message.content
                  }
    }

    newMessage = JSON.stringify(newMessage);

    wss.clients.forEach((client) => {
      client.send(newMessage);
    });

  });

  ws.on('close', () => {
    clientCounter -= 1;
    console.log('Client disconnected');
    console.log('Clients Online: ', clientCounter);
  });

  clientsOnline = JSON.stringify(clientCounter);

  wss.clients.forEach((client) => {
    client.send(clientsOnline);
  });

});
