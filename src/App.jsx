
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: {
          name: ''
        },
        messages: [],
        clientsOnline: ''
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000');

    console.log('Connected to server');

    this.socket.onopen = (event) => {
      this.clientAction();

      this.socket.onmessage = (event) => {
        let data = JSON.parse(event.data);
        if(data.type === 'clientCount') {
          let usersOnline = data.usersOnline;
          this.setState({clientsOnline: usersOnline});
        } else {
          let newMessages = this.state.messages.concat([data]);
          this.setState({messages: newMessages});
        }
      }
    }
    this.socket.onclose = (event) => {
      this.clientAction();
    }
  }

  clientAction() {
    this.sendText('clientConnect', null, null);
  }

  addMessage(content) {
    this.sendText('postMessage', this.state.currentUser.name, content);
  }

  addNote(content) {
    this.sendText('postNotification', null, content);
  }

  changeUsername(username) {
    let oldUsername = this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous';
    let newUsername = username ? username : 'Anonymous';
    this.setState({currentUser: {name: newUsername}});
    this.addNote(`${oldUsername} changed their name to ${newUsername}`)
  }

  sendText(type, username, content) {
    let msg = {
        type,
        username,
        content
      }
    this.socket.send(JSON.stringify(msg));
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>CHATTY</h1>
          <p>{this.state.clientsOnline} Users Online</p>
        </nav>

        <MessageList messages    ={this.state.messages}/>

        <ChatBar addMessage      ={this.addMessage.bind(this)}
                 addNote         ={this.addNote.bind(this)}
                 changeUsername  ={this.changeUsername.bind(this)}
                 currentUserName ={this.state.currentUser.name}/>

      </div>
    );
  }
}
export default App;
