import React, { Component } from 'react'

export default class UserMessage extends Component {

    render() {
        return (
            <div role="list" class="ui list">
                <div role="listitem" class="item" onClick={() => this.props.getTitle(this.props.user.username)}>
                    <img src={this.props.user.avatar} class="ui avatar image"/>
                    <div class="content">
                        <a class="header">{this.props.user.username}</a>
                    </div>
                </div>
            </div>
        )
    }
}




    