import React, { Component } from 'react'
import Nav from './Nav'
import {BrowserRouter, Route} from 'react-router-dom'
import Search from './Search'
import Home from './Home'
import Upload from './Upload'
import Profile from './Profile'
import Notification from './Notification'
import Message from './Message'
import { storage } from '../firebase'
import swal from 'sweetalert'
import Feed from './Feed'

export default class MainContainer extends Component {

    state = {
        image: {}, 
        img: "",
        comment: "",
        posts: [],
        // userUpload: 
        userPosts: []
    }

    getPosts = () => {
            const { loggedInUserId, token } = this.props
        
            fetch("http://localhost:3000/posts", {
              headers: {
                "Authorization": token
              }
            })
              .then(res => res.json())
              .then(postArray => this.setState({
                posts: postArray
              }))
        
            if (loggedInUserId) {
              fetch(`http://localhost:3000/users/${ loggedInUserId }`, {
                headers: {
                  "Authorization": token
                }
              })
              .then(res => res.json())
              .then(user => console.log(user) || this.setState({
                userPosts: user.posts
              }))
          }
    }

    componentDidMount(){
        this.getPosts()
    }

    handleChange = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    handleCaption = (event) => {
        this.setState({
            comment: event.target.value
        })
    }

    handleUpload = (event) => {
        event.preventDefault()
        swal("Success", "", "success")

        let image = this.state.image
        let profile_id = this.state.userUpload
        let uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed', 
            (snapshot) => {

            },
            (error) => {

            },
            () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    this.setState({
                        img: url
                    })
                    fetch(`http://localhost:3000/posts`, {
                        method:'POST',
                        headers: { 
                            'content-type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify({
                        img: this.state.img,
                        comment: this.state.comment,
                        likes: 0, 
                        profile_id: profile_id
                        })
                    })
                    .then(r => r.json())
                    .then(newPost => {
                        let posts = [...this.state.posts, newPost]
                        this.setState({
                            posts: posts
                        })
                    })
                })
                
            }
        )
        event.target.reset()
    }

    handleDeletePost = (post) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("This post has been deleted from your profile", {
                icon: "success",
              })
        fetch(`http://localhost:3000/posts/${post.id}`, {
          method:'DELETE'
        })
          .then(r => r.json())
          .then(post => {
            let safePosts = this.state.posts.filter(obj => {
                return post.id !== obj.id 
            })
            this.setState({
                posts: safePosts
            })
          })
        } else {
            swal("This post will remian in your library");
        }
      })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                  <Nav />
                  <Route exact path='/' component={Home} /> 
                  <Route exact path='/feed' render={(props) => (<Feed posts={this.state.posts} />)} /> 
                  <Route path='/search' component={Search} /> 
                  <Route path='/upload' render={(props) => (<Upload handleChange={this.handleChange} handleCaption={this.handleCaption} handleUpload={this.handleUpload}/>)} /> 
                  <Route path='/notification' component={Notification}/>
                  <Route path='/profile' render={(props) => (<Profile userPosts={this.state.userPosts} handleDeletePost={this.handleDeletePost} handleChangeBio={this.handleChangeBio} handleSubmitBio={this.handleSubmitBio} bio={this.state.bio}/>)}/>
                  <Route path='/message' component={Message}/>
                </div>
            </BrowserRouter>
        )
    }
}