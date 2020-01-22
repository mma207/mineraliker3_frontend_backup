import React, { Component } from 'react'
import ConversationsList from './ConversationsList';

export default class Message extends Component {
    render() {
        return (
            <div>
                  <ConversationsList loggedInUserId={this.props.loggedInUserId}/>
            </div>
        )
    }
}
