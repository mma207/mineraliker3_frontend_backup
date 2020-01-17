import React, { Component } from 'react'

export default class ProfilePost extends Component {

    renderComments = () => {
        return this.props.comments.map(comment => 
            comment.text
        )
    }

    render() {
        return (
            <div class="ui three stackable cards">
                <div class="card">
                    <div class="image">
                        <img src={this.props.img} onClick={() => {this.props.handleDeletePost(this.props.post)}}/>
                        <p>{this.props.caption}</p>
                        <p>{this.props.likes} ♥️</p>
                    </div>
                        <button onClick={this.renderComments}>Read Comments</button>
                </div>
            </div>
        )
    }
}


