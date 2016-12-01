import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        currentUser: {
          name: this.props.username ? this.props.username : "Anonymous"
        },
        messages: [],
        notes: [],
    };
  }

  addMessage(username, content) {
    this.sendText(username, content);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:4000')
    console.log('Connected to server');

    this.socket.onmessage = (event) => {
      let message = JSON.parse(event.data);
      let newMessages = this.state.messages.concat([message]);
      this.setState({messages: newMessages});
    }
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

        <div className="message system">
          CatLife changed their name to Astronaut.
        </div>

        <MessageList messages={this.state.messages}/>

        <ChatBar addMessage  ={this.addMessage.bind(this)}
                 currentUser ={this.state.currentUser.name}/>

      </div>
    );
  }
}
export default App;
