import React, { Component } from 'react'
import './nav.css'

export default class Nav extends Component {
    render() {
        return (
            <div>
                <footer>
                    <div className="container">
                        <nav className="footer-nav">
                        <ul>
                            <li><a href="/"><i className="home icon"></i></a></li>
                            <li><a href="/search"><i className="search icon"></i></a></li>
                            <li><a href="/upload"><i className="plus square outline icon"></i></a></li>
                            <li><a href="/notification"><i className="heart outline icon"></i></a></li>
                            <li><a href="/profile"><i className="user outline icon"></i></a></li>
                        </ul>
                        </nav>
                    </div>
                </footer>
            </div>
        )
    }
}

