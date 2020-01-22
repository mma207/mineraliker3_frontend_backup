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
import MessageArea from './MessagesArea'
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
        username: ""
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
                  name: user.name,
                  username: user.username
                })
              })
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
                      user_id: this.props.loggedInUserId,
                      // avatar: this.state.avatar,
                      // username: this.state.username
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
 
    handleLike = (post) => {
      let postLikes = post.likes + 1
        fetch(`http://localhost:3000/posts/${post.id}`, {
          method:'PATCH',
          headers: { 
            'content-type': 'application/json',
            'accept': 'application/json'
          },
          body: JSON.stringify({
          likes: postLikes 
          })
        })
        .then(r => r.json())
        .then(updateLike => {
          let newPostArray = this.state.posts.map(obj => {
            return obj.id === post.id ? updateLike : obj
          })
          this.setState({
            posts: newPostArray
          })
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                  <Header />
                  <br></br>
                  <Route exact path='/' render={(props) => (<Feed avatar={this.state.avatar} username={this.state.username} handleLike={this.handleLike} posts={this.state.posts} />)} /> 
                  <Route path='/search' component={Search} /> 
                  <Route path='/upload' render={(props) => (<Upload handleChange={this.handleChange} handleCaption={this.handleCaption} handleUpload={this.handleUpload}/>)} /> 
                  <Route path='/notification' component={Notification}/>
                  <Route path='/profile' render={(props) => (<Profile name={this.state.name} bio={this.state.bio} avatar={this.state.avatar} userPosts={this.state.userPosts} handleDeletePost={this.handleDeletePost} />)}/>
                  <Route path='/message' render={(props) => (<Message loggedInUserId={this.props.loggedInUserId}/>)}/>
                  <Nav />
                </div>
            </BrowserRouter>
        )
    }
}



