import React, { Component } from 'react'
import { storage } from '../firebase'
import './login.css'


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
              <div id="wrapper">
                    <div className="container">
                      <div className="phone-app-demo"></div>
                      <div className="form-data">
                        <form onSubmit={ this.logInSubmitted }>
                          <div className="logo">
                            <h1>Mineraliker3</h1>
                            {/* <link href="https://fonts.googleapis.com/css?family=Pacifico&display=swap" rel="stylesheet"></link> */}
                          </div>
                          <input type="text" placeholder="Username" value={this.state.username} id="log_in_username" onChange={ this.onChange } name="username" />
                          <input placeholder="Password" value={this.state.password} id="log_in_password" onChange={ this.onChange } type="password" name="password"/>
                          <button className="form-btn" type="submit">Log in</button>
                          <span className="has-separator">Or</span>
                        </form>
                        <div className="sign-up">
                          Don't an account? <button onClick={ () => this.setState({ logIn: false })}> Sign up</button>
                        </div>
                        <div className="get-the-app">
                          <span>Get the app</span>
                            <div className="badge">
                              <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="android App"/>
                              <br></br>
                              <img height="80" width="80" src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="ios app"/>
                            </div>
                      </div>
                      </div>
                    </div>

                    <footer>
                      <div className="container">
                        <nav className="footer-nav">
                          <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Support</a></li>
                            <li><a href="#">Jobs</a></li>
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                          </ul>
                        </nav>
                        <div className="copyright-notice">
                          &copy; 2020 Mineraliker3
                        </div>
                      </div>
                    </footer>
                  </div>
            </>
            : <>
              <div className="signup-container">
                <h1>Mineraliker3</h1>
                  <strong><p className="greeting">Sign up to see photos and videos from your friends.</p></strong>
                  <form onSubmit={ this.signUpSubmitted } className="container__form">
                    <input className="input" type="email" placeholder="Email" id="sign_up_email" onChange={ this.onChange } name="email"/>
                    <input className="input" type="name" placeholder="Name" id="sign_up_name" onChange={ this.onChange } name="name"/>
                    <input className="input" type="text" placeholder="Username" id="sign_up_username" onChange={ this.onChange } name="username"/>
                    <input className="input" type="password" placeholder="Password" id="sign_up_password" onChange={ this.onChange } name="password"/>
                    <input className="input" type="text" placeholder="Bio" id="sign_up_bio" onChange={ this.onChange } name="bio"/>
                    <input type="submit" className="button"/>
                  </form>
                    <br></br>
                    <form onSubmit={this.handleAvatarUpload}>
                        <label htmlFor="sign_up_avatar">Avatar</label>
                        <input id="sign_up_avatar" type="file" accept="image/*" capture="camera" onChange={this.handleAvatarChange}/>
                        <button>Upload</button>
                    </form>
                  <p className="container__terms">By signin up, you agree to our <br></br> <strong>Terms & Privacy Policy.</strong></p>
              </div>

              <div className="account">
                <p>Have an account? <button className="account-button" onClick={ () => this.setState({ logIn: true }) }>Log in</button></p>
              </div> 
            </>
          }
        </section>
    }
    
}
    

 
    