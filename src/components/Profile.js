import React, { Component } from 'react'
import ProfilePost from './ProfilePost'

export default class Profile extends Component {

    renderUserPosts = () => {
        return this.props.userPosts.map(post => 
            <ProfilePost post={post} img={post.img} caption={post.caption} likes={post.likes} handleDeletePost={this.props.handleDeletePost} comments={post.comments}/> 
        )
    }

    render(){
        return (
            <div>
                <img src={this.props.avatar} height="100" width="100"/>
                <br></br>
                <h3>{this.props.name}</h3>
                <p>{this.props.bio}</p>
                <br></br>
                {this.renderUserPosts()}
            </div>
        )
    }
    
}

