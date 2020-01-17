import React, { Component } from 'react'
import './nav.css'

export default class Header extends Component {
    render() {
        return (
            <div className="header">
                 <header>
                    <ul>Mineraliker3</ul>
                    <ul><a href="/message"><i class="paper plane outline icon"></i></a></ul>
                </header>
            </div>
        )
    }
}
