import React, { Component } from 'react'
import ProfilePost from './ProfilePost'

export default class Profile extends Component {

    renderUserPosts = () => {
        return this.props.userPosts.map(post => 
            <ProfilePost post={post} img={post.img} comment={post.comment} /> 
        )
    }

    render(){
        return (
            <div>
                {this.renderUserPosts()}
            </div>
        )
    }
    
}

