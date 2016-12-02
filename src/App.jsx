
import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: {
          name: null
        },
        messages: [],
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000')
    console.log('Connected to server');

    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      console.log('message: ', message);
      let newMessages = this.state.messages.concat([message]);
      this.setState({messages: newMessages});
    }
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
    console.log('Message sent: ', content);
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>CHATTY</h1>
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
