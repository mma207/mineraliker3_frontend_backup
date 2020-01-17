import React, { Component } from 'react'
import './nav.css'

export default class Nav extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <nav className="footer-nav">
                        {/* <li>Mineraliker3</li> */}
                    <ul>
                        <li><a href="/"><i class="home icon"></i></a></li>
                        <li><a href="/search"><i class="search icon"></i></a></li>
                        <li><a href="/upload"><i class="plus square outline icon"></i></a></li>
                        <li><a href="/notification"><i class="heart outline icon"></i></a></li>
                        <li><a href="/profile"><i class="user outline icon"></i></a></li>
                    </ul>
                    {/* <li><a href="/message">Message</a></li> */}
                    </nav>
                </div>
            </footer>
            // <footer>
            //           <div className="container">
            //             <nav className="footer-nav">
            //               <ul>
            //                 <li><a href="#">About Us</a></li>
            //                 <li><a href="#">Support</a></li>
            //                 <li><a href="#">Jobs</a></li>
            //                 <li><a href="#">Privacy</a></li>
            //                 <li><a href="#">Terms</a></li>
            //               </ul>
            //             </nav>
            //           </div>
            //         </footer>
        )
    }
}

