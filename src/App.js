import React, { Component } from 'react'
import './App.css';
import LogIn from './components/Login'
import MainContainer from './components/MainContainer';


export default class App extends Component {
  
    state = {
      loggedInUserId: null,
      token: null
    }

    logOutClick = () => {
      localStorage.removeItem("loggedInUserId")
      localStorage.removeItem("token")
      this.setState({
        loggedInUserId: null,
        token: null
      })
    }

    loggedIn = () => {
      return !!this.state.token
    }

    componentDidMount(){
      this.setState({
        token: localStorage.token,
        loggedInUserId: localStorage.loggedInUserId
      })
    }

    setToken = (token, loggedInUserId, loggedInUser) => {
      localStorage.token = token;
      localStorage.loggedInUserId = loggedInUserId

      this.setState({
        token: token,
        loggedInUserId: loggedInUserId
      })
    }

    render(){
      return (<main>
        <header>{ this.loggedIn() 
                  ? <button onClick={ this.logOutClick }>Log out</button> 
                  : "" 
                }</header>
        {
          this.loggedIn()
            ? <MainContainer loggedInUserId={ this.state.loggedInUserId } 
                              token={ this.state.token } />
            : <LogIn setToken={ this.setToken }  />
        }
      </main>);
    }
}
