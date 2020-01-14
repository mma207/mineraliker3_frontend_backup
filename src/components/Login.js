import React, { Component } from 'react'
import { storage } from '../firebase'


export default class Login extends Component {

    state = {
        logIn: true,
        username: "",
        password: "",
        email: "",
        errors: [],
        users: [],
        avatar: "",
        bio: "",
        name: "",
        image: {}
      }
    
      onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleAvatarChange = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

      handleAvatarUpload = (event) => {
          event.preventDefault()

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
                          avatar: url
                      })
                    })
              }
          )
        }

    
      logInSubmitted = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        }).then(res => res.json())
          .then(data => {
              this.props.setToken(data.token, data.user.id)
          })
      }

      componentDidMount(){
        fetch(`http://localhost:3000/users`)
        .then(r => r.json())
        .then(userArray => {
            this.setState({
                users: userArray
            })
        })
      }
        
      signUpSubmitted = (event) => {
        event.preventDefault()
      
        fetch(`http://localhost:3000/users`, {
          method:'POST',
          headers: { 
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
          username:this.state.username,
          password: this.state.password,
          email: this.state.email, 
          avatar: this.state.avatar,
          bio: this.state.bio
          })
        })
        .then(r => r.json())
        .then(user=> {
            localStorage.setItem("token", user.token)
        })
      }

      render(){
        return <section>
          <ul className="errors">
            {
              this.state.errors.map(error => <li>{ error }</li>)
            }
          </ul>
          {
            this.state.logIn 
            ? <>
              <h2>Log In</h2>
              <button onClick={ () => this.setState({ logIn: false }) }>I need to register!!!</button>
              <form onSubmit={ this.logInSubmitted }>
                <label  htmlFor="log_in_username">Username</label>
                <input  id="log_in_username" 
                        type="text" 
                        onChange={ this.onChange /* for controlled form input status */ } 
                        name="username" 
                        value={ this.state.username /* for controlled form input status */ } />
                <label  htmlFor="log_in_password">Password</label>
                <input  id="log_in_password" 
                        type="password" 
                        onChange={ this.onChange } 
                        name="password" 
                        value={ this.state.password } />
                <input type="submit" />
              </form>
            </>
            : <>
              <h2>Sign up</h2>
              <button onClick={ () => this.setState({ logIn: true }) }>I already signed up!!!</button>
              <form onSubmit={ this.signUpSubmitted }>
                <label  htmlFor="sign_up_username">Username</label>
                <input  id="sign_up_username" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="username" 
                        value={ this.state.username } />
                <label  htmlFor="sign_up_password">Password</label>
                <input  id="sign_up_password" 
                        type="password" 
                        onChange={ this.onChange } 
                        name="password" 
                        value={ this.state.password } />
                <label  htmlFor="sign_up_password">Email</label>
                <input  id="sign_up_email" 
                        type="email" 
                        onChange={ this.onChange } 
                        name="email" 
                        value={ this.state.email } />
                <label  htmlFor="sign_up_bio">Bio</label>
                <input  id="sign_up_bio" 
                        type="bio" 
                        onChange={ this.onChange } 
                        name="bio" 
                        value={ this.state.bio } />
                <label  htmlFor="sign_up_name">Name</label>
                <input  id="sign_up_name" 
                        type="name" 
                        onChange={ this.onChange } 
                        name="name" 
                        value={ this.state.name } />
                <input type="submit" />
              </form>
              <br></br>
              <form onSubmit={this.handleAvatarUpload}>
                    <label htmlFor="sign_up_avatar">Avatar</label>
                    <input id="sign_up_avatar" type="file" accept="image/*" capture="camera" onChange={this.handleAvatarChange}/>
                    <button>Upload</button>
              </form>
            </>
          }
        </section>
    }
    
}
    