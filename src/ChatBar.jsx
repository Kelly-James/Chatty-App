import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: '',
      username: '',
      content: ''
    };
  }

  handleSubmit(event) {
    const keycode = event.keycode || event.which;
    if(keycode == 13) {
      let userForMessage = this.state.username || this.props.currentUser;
      this.props.addMessage(userForMessage, this.state.content);
      this.setState({content: ''});
    } else {
      this.setState({
        type: 'postMessage',
        content: event.target.value
      });
    }
  }

  handleNameInput(event) {
    this.setState({
      type: 'postNotification',
      username: event.target.value
      // content: this.state.username + ' changed their name'
    });
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          autoFocus={true}
          onChange={this.handleNameInput.bind(this)}
          onBlur={this.handleNameInput.bind(this)}
          placeholder="Enter Username (Optional)"
        />
        <input
          id="content"
          type="text"
          value={this.state.content}
          onChange={this.handleSubmit.bind(this)}
          onKeyDown={this.handleSubmit.bind(this)}
          placeholder="Type a Message"
        />
      </footer>
    );
  }
}
export default ChatBar;
