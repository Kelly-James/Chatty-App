import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: props.currentUserName,
      content: ''
    };
  }

  handleSubmit(event) {
    const keycode = event.keycode || event.which;
    if(keycode == 13) {
      this.props.addMessage(this.state.content);
      this.setState({
        content: ''
      });
    } else {
      this.setState({
        content: event.target.value
      });
    }
  }

  handleNameInput(event) {
    const keycode = event.keycode || event.which;
    if(keycode == 13) {
      this.handleNameSubmit(event);
      this.props.addNote(this.state.content);
      this.contentInput.focus();
    };
  }

  handleNameSubmit(event) {
    if(this.props.currentUserName !== event.target.value) {
      this.props.changeUsername(this.state.username);
    }
  }

  handleUsernameBox(event) {
    this.setState({username: event.target.value})
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          autoFocus={true}
          value={this.state.username}
          onChange={this.handleUsernameBox.bind(this)}
          onBlur={this.handleNameSubmit.bind(this)}
          onKeyDown={this.handleNameInput.bind(this)}
          placeholder="Enter Username (Optional)"
        />
        <input
          id="content"
          type="text"
          ref={(input) => { this.contentInput = input; }}
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
