import React from 'react';
import { API_ROOT, HEADERS } from '../constants';
import UserMessage from './UserMessage';

class NewConversationForm extends React.Component {
  state = {
    users: []
  };

  componentDidMount(){
    fetch(`http://localhost:3000/users`)
    .then(r => r.json())
    .then(userArray => {
        this.setState({
            users: userArray
        })
    })
  }

  renderUsers = () => {
    return this.state.users.map(user => 
      <UserMessage user={user} getTitle={this.props.getTitle} />
    )
  }

  render = () => {
    return (
      <div className="newConversationForm">
        <h1>Available Users</h1>
        {this.renderUsers()}
      </div>
    );
  };
}

export default NewConversationForm;