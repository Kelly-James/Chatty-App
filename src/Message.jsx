import React, {Component} from 'react';

class Message extends Component {
  render() {
    if(this.props.type === "incomingNotification") {
      return (
        <div className="message system">
          <span className="content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="username">{this.props.username}</span>
          <span className="content">{this.props.content}</span>
        </div>
      );
    }
  }
}
export default Message;
