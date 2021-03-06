import React, { Component } from 'react'
import Post from './Post'

export default class Feed extends Component {

    renderPosts = () => {
        return this.props.posts.map(post => 
            <Post post={post} img={post.img} caption={post.caption} likes={post.likes} handleLike={this.props.handleLike} username={this.props.username} avatar={this.props.avatar}/> 
        )
    }

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        )
    }
}
