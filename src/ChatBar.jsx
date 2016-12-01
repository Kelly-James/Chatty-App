import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
        content: event.target.value
      });
    }
  }

  handleNameInput(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <footer>
        <input
          id="username"
          type="text"
          onChange={this.handleNameInput.bind(this)}
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
