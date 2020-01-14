import React, { Component } from 'react'

export default class Nav extends Component {
    render() {
        return (
            <nav>
                <div>
                    <ul>
                        <li>Mineraliker3</li>
                        <li><a href="/">Feed</a></li>
                        <li><a href="/search">Search</a></li>
                        <li><a href="/upload">Upload</a></li>
                        <li><a href="/notification">Notification Center</a></li>
                        <li><a href="/profile">Profile</a></li>
                    </ul>
                    <li><a href="/message">Message</a></li>
                </div>
            </nav>
        )
    }
}
