import React, { Component } from 'react'
import ProfilePost from './ProfilePost'

export default class Profile extends Component {

    renderUserPosts = () => {
        return this.props.userPosts.map(post => 
            <ProfilePost post={post} img={post.img} caption={post.caption} /> 
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

