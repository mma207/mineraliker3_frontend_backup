import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewConversationForm from './NewConversationForm';
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ConversationsList extends React.Component {
  state = {
    title: '',
    conversations: [],
    activeConversation: null
  };

  getTitle = (name) => {
    this.setState({ title: name });
  };

  componentDidMount = () => {
    fetch(`${API_ROOT}/conversations`)
      .then(res => res.json())
      .then(conversations => this.setState({ conversations }));
  };

  handleClick = id => {
    this.setState({ activeConversation: id });
  };

  handleReceivedConversation = response => {
    const { conversation } = response;
    this.setState({
      conversations: [...this.state.conversations, conversation]
    });
  };

  handleReceivedMessage = response => {
    const { message } = response;
    const conversations = [...this.state.conversations];
    const conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    this.setState({ conversations });
  };

  handleNewConversation = () => {
    fetch(`${API_ROOT}/conversations`, {
      method: 'POST',
      headers: { 
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    });
      this.setState({ title: '' });
  }

  render = () => {
    const { conversations, activeConversation } = this.state;
    return (
      <div className="conversationsList">
        <ActionCable
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.handleReceivedConversation}
        />
        {this.state.conversations.length ? (
          <Cable
            conversations={conversations}
            handleReceivedMessage={this.handleReceivedMessage}
          />
        ) : null}
        <h2>Conversations</h2>
        <ul>{mapConversations(conversations, this.handleClick)}</ul>
        <NewConversationForm handleNewConversation={this.handleNewConversation} getTitle={this.getTitle} conversations={this.state.conversations}/>
        {activeConversation ? (
          <MessagesArea
          loggedInUserId={this.props.loggedInUserId}
            conversation={findActiveConversation(
              conversations,
              activeConversation
            )}
          />
        ) : null}
      </div>
    );
  };
}

export default ConversationsList;

// helpers

const findActiveConversation = (conversations, activeConversation) => {
  return conversations.find(
    conversation => conversation.id === activeConversation
  );
};

const mapConversations = (conversations, handleClick) => {
  return conversations.map(conversation => {
    return (
      <div role="list" class="ui selection middle aligned list">
        <div role="listitem" class="item">
          <div class="content"><div class="header" key={conversation.id} onClick={() => handleClick(conversation.id)}>{conversation.title}</div></div>
        </div>
      </div>
    );
  });
};

