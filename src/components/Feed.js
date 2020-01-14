import React, { Component } from 'react'
import Post from './Post'

export default class Feed extends Component {

    renderPosts = () => {
        return this.props.posts.map(post => 
            <Post post={post} img={post.img} comment={post.comment} /> 
        )
    }

    // add like feature 

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        )
    }
}
