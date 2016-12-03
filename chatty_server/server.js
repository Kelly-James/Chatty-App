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

  // let clientsOnline = {
  //                     type       : 'clientCount',
  //                     clientCount: wss.clients.length
  //                   };

  // console.log('Clients Online: ', wss.clients.length);
  //
  // wss.broadcast(clientsOnline);

  // let clientsOnlineString = JSON.stringify(clientsOnline);

  // wss.clients.forEach((client) => {
  //   client.send(clientsOnlineString);
  // });


  ws.on('message', ((msg) => {
    let message = JSON.parse(msg);
    console.log('Incoming: ', message);
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
      console.log('Made it there! ');
      newMessage = {
                    type   : 'clientCount',
                    content: wss.clients.length
                  };
    }

    // newMessage = JSON.stringify(newMessage);

    // wss.clients.forEach((client) => {
    //   client.send(newMessage);
    // });

    wss.broadcast(newMessage);

  }));

  ws.on('close', () => {
    console.log('Client disconnected');
    // console.log('Clients Online: ', clientCounter);
    // wss.broadcast(clientsOnline);
  });

});
