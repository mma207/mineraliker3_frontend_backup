import React, { Component } from 'react'
import './nav.css'

export default class Header extends Component {
    render() {
        return (
            // <div className="header">
            //      <header>
            //         <ul>Mineraliker3</ul>
            //         <ul><a href="/message"><i className="paper plane outline icon"></i></a></ul>
            //     </header>
            // </div>
            <nav className="Nav">
                 <div className="Nav-menus">
                   <div className="Nav-brand">
                     <a className="Nav-brand-logo" href="/">
                       Mineraliker3
                     </a>
                     <a href="/message"><i className="paper plane outline icon"></i></a>
                   </div>
                 </div>
            </nav>
        )
    }
}
