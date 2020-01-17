import React, { Component } from 'react'
import Nav from './Nav'
import {BrowserRouter, Route} from 'react-router-dom'
import Search from './Search'
import Upload from './Upload'
import Profile from './Profile'
import Notification from './Notification'
import Message from './Message'
import { storage } from '../firebase'
import swal from 'sweetalert'
import Feed from './Feed'
import Header from './Header'

export default class MainContainer extends Component {

    state = {
        image: {}, 
        img: "",
        caption: "",
        posts: [],
        userPosts: [],
        name: "",
        avatar: "",
        bio: "",
        likes: []
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
              fetch(`http://localhost:3000/users/${loggedInUserId}`, {
                headers: {
                  "Authorization": token
                }
              })
              .then(res => res.json())
              .then(user => {
                this.setState({
                  userPosts: user.posts,
                  avatar: user.avatar,
                  bio: user.bio,
                  name: user.name
                })
              })
          }
    }

    componentDidMount(){
        this.getPosts()
        // this.getLikes()
    }

    handleChange = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    handleCaption = (event) => {
        this.setState({
            caption: event.target.value
        })
    }

    handleUpload = (event) => {
        event.preventDefault()
        swal("Success", "", "success")

        let image = this.state.image
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
                        caption: this.state.caption,
                        likes: 0, 
                        user_id: this.props.loggedInUserId
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
            let safePosts = this.state.userPosts.filter(obj => {
                return post.id !== obj.id 
            })
            let allSafePosts = this.state.posts.filter(obj => {
              return post.id !== obj.id 
            })
            this.setState({
                userPosts: safePosts,
                posts: allSafePosts
            })
          })
        } else {
            swal("This post will remian in your library");
        }
      })
    }

    // getLikes = () => {
    //   fetch(`http://localhost:3000/users/${this.props.loggedInUserId}`)
    //     .then(r => r.json())
    //     .then(user => {
    //       this.setState({
    //         likes: user.likes
    //       })
    //     })
    // }

    // handleLike = (post) => {
    //   let userLikes = [...this.state.likes]
    //   userLikes.filter(like => {
    //     return like.post_id === post.id ? like.isClicked : !like.isClicked
    //   })

    // }

    // handlePostLike = (post) => {
    //   fetch(`http://localhost:3000/likes`, {
    //     method:'POST',
    //     headers: { 
    //       'content-type': 'application/json',
    //       'accept': 'application/json'
    //     },
    //     body: JSON.stringify({
    //     user_id: this.props.loggedInUserId,
    //     post_id: post.id,
    //     isClicked: true 
    //     })
    //   })
    //   .then(r => r.json())
    //   .then(newLike => {
    //     let likes = [...this.state.likes, newLike]
    //     this.setState({
    //       likes: likes 
    //     })
    //   })
    // }
 
    // handleLikeCounter = (post) => {
    //   let postLikes = post.likes + 1
    //     fetch(`http://localhost:3000/posts/${post.id}`, {
    //       method:'PATCH',
    //       headers: { 
    //         'content-type': 'application/json',
    //         'accept': 'application/json'
    //       },
    //       body: JSON.stringify({
    //       likes: postLikes 
    //       })
    //     })
    //     .then(r => r.json())
    //     .then(updateLike => {
    //       let newPostArray = this.state.posts.map(obj => {
    //         return obj.id === post.id ? updateLike : obj
    //       })
    //       this.setState({
    //         posts: newPostArray
    //       })
    //     })
    // }

    // handleCompleteLike = (post) => {
    //   // if (!this.state.currentLike.isClicked){
    //   this.handleLike(post)
    //   // this.handleLikeCounter(post)
    //   // } else {
    //   //   return 
    //   // }
    // }

    render() {
        return (
            <BrowserRouter>
                <div>
                  <Header />
                  <br></br>
                  <Route exact path='/' render={(props) => (<Feed handleCompleteLike={this.handleCompleteLike} posts={this.state.posts} />)} /> 
                  <Route path='/search' component={Search} /> 
                  <Route path='/upload' render={(props) => (<Upload handleChange={this.handleChange} handleCaption={this.handleCaption} handleUpload={this.handleUpload}/>)} /> 
                  <Route path='/notification' component={Notification}/>
                  <Route path='/profile' render={(props) => (<Profile name={this.state.name} bio={this.state.bio} avatar={this.state.avatar} userPosts={this.state.userPosts} handleDeletePost={this.handleDeletePost} />)}/>
                  <Route path='/message' component={Message}/>
                  <Nav />
                </div>
            </BrowserRouter>
        )
    }
}