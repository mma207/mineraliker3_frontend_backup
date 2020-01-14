import React, { Component } from 'react'


export default class Login extends Component {

    state = {
        logIn: true,
        username: "",
        password: "",
        email: "",
        errors: [],
        users: []
      }
    
      onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
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
              this.props.setToken(data.token, data.user_id)
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
          email: this.state.email
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
              {/* add a link to profile form component */}
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
                <input type="submit" />
              </form>
            </>
          }
        </section>
    }
    
}
    