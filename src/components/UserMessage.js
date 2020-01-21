import React, { Component } from 'react'

export default class UserMessage extends Component {

    render() {
        return (
            <div>
                <div onClick={this.props.handleNewConversation}>
                    <img src={this.props.user.avatar} alt="image not available"/>
                </div>
                <div onClick={() => this.props.getTitle(this.props.user.username)}>
                    <h1>{this.props.user.username}</h1>
                </div>
            </div>
        )
    }
}
