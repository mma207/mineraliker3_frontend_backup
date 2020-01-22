import React, { Component } from 'react'

export default class UserMessage extends Component {

    render() {
        return (
            <div role="list" class="ui list">
                <div role="listitem" class="item">
                    <img src={this.props.user.avatar} class="ui avatar image" onClick={this.props.handleNewConversation}/>
                    <div class="content" onClick={() => this.props.getTitle(this.props.user.username)}>
                        <a class="header">{this.props.user.username}</a>
                    </div>
                </div>
            </div>
        )
    }
}




    