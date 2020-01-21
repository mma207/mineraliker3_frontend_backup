import React, { Component } from 'react'
import Comment from './Comment'

export default class ProfilePost extends Component {

    renderComments = () => {
        return this.props.comments.map(comment => 
            <Comment comment={comment}/>
        )
    }

    render() {
        return (
            <div className="ui three stackable cards">
                <div className="card">
                    <div className="image">
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


