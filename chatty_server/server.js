const express       = require('express');
const SocketServer  = require('ws').Server;
const uuid          = require('node-uuid');

const PORT          = 4000;

const server        = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({server});

wss.broadcast = ((data) => {
  let stringData = JSON.stringify(data);
  wss.clients.forEach((client) => {
    client.send(stringData);
  });
});

wss.on('connection', (ws) => {

  console.log('Client connected');

  ws.on('message', ((msg) => {
    let message = JSON.parse(msg);
    let newMessage = {};
    if(message.type === 'postMessage') {
      newMessage = {
                    id      : uuid.v1(),
                    type    : 'incomingMessage',
                    username: message.username,
                    content : message.content
                  };
    }
    if(message.type === 'postNotification') {
      newMessage = {
                    type    : 'incomingNotification',
                    username: '',
                    content : message.content
                  };
    }
    if(message.type === 'clientConnect') {
      newMessage = {
                    type       : 'clientCount',
                    usersOnline: wss.clients.length
                  };
    }

    wss.broadcast(newMessage);

  }));

  ws.on('close', () => {
    console.log('Client disconnected');
    let clientsOnline = {
                         type       : 'clientConnect',
                         usersOnline: wss.clients.length
                       };
    wss.broadcast(clientsOnline);
  });

});
