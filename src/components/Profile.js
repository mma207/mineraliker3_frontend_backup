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
                <h2 class="ui block header">
                    <img src={this.props.avatar} class="ui circular image"/>
                    {this.props.name}
                    <br></br>
                    <p>{this.props.bio}</p>
                </h2>
                <br></br>
                {/* <img class="ui small circular image" src={this.props.avatar} />
                <br></br>
                <h3>{this.props.name}</h3>
                <p>{this.props.bio}</p>
                <br></br> */}
                {this.renderUserPosts()}
            </div>
        )
    }
    
}

