import React, { Component } from 'react'
import NewMessageForm from './NewMessageForm';
import './messagesarea.css'
export default class MessagesArea extends Component {
  
  orderedMessages = messages => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    return sortedMessages.map(message => {
      console.log(message.user_id, this.props.loggedInUserId)
      return message.user_id == this.props.loggedInUserId ? 
        <li className="chat__bubble chat__bubble--sent" key={message.id}>{message.text}</li> :
        <li className="chat__bubble chat__bubble--rcvd" key={message.id}>{message.text}</li>
      }
    );
  };

  render() {
    return (
      <div>
        <div className="messagesArea">
          <h2>{this.props.conversation.title}</h2>
          <ul className="chat">{this.orderedMessages(this.props.conversation.messages)}</ul>
          <NewMessageForm loggedInUserId={this.props.loggedInUserId} conversation_id={this.props.conversation.id} />
        </div>
      </div>
    )
  }
}


