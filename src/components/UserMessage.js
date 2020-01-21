import React, { Component } from 'react'

export default class UserMessage extends Component {

    render() {
        return (
            <div>
                <div onClick={this.props.handleNewConversation}>
                    <img src={this.props.user.avatar}/>
                </div>
                <div onClick={() => this.props.getTitle(this.props.user.username)}>
                    <p>{this.props.user.username}</p>
                </div>
            </div>
        )
    }
}
