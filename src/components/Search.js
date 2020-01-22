import React, { Component } from 'react'
import News from './News'

export default class Search extends Component {

    state = {
        searchField: "",
        news: []
    }

    handleSearch = (event) => {
        this.setState({
            searchField: event.target.value
        })
    }
  
    searchNews = (event) => {
        event.preventDefault()
        let apiKey = process.env.REACT_APP_API_KEY_GOOGLE_NEWS
        fetch(`https://newsapi.org/v2/everything?q=${this.state.searchField}&apiKey=${apiKey}`) 
          .then(r => r.json())
          .then(newsArray => {
              this.setState({
                  news: newsArray.articles
              })
          })
          event.target.reset()
    }

    renderNews = () => {
        return this.state.news.map(obj => 
            <News link={obj.url} author={obj.author} title={obj.title} url={obj.urlToImage} description={obj.description}/> 
        )
    }

    render() {
        return (
            <div>
                <h1 align="center">Search</h1>
                <form onSubmit={this.searchNews} align="center">
                    <input onChange={this.handleSearch} type="text" placeholder="search"/>
                    <button>Search</button>
                </form>
                <br></br>
                {this.renderNews()}
            </div>
        )
    }
}
