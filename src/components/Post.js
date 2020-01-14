import React from 'react';


const Post = (props) => {
    return (
        // <div class="ui card">
        //     <div class="content">
        //         <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> Elliot
        //     </div>
        //     <div class="image">
        //         <img/>
        //     </div>
        //     <div class="content">
        //         <span class="right floated">
        //         <i class="heart outline like icon"></i>
        //         17 likes
        //         </span>
        //         <i class="comment icon"></i>
        //         3 comments
        //     </div>
        //     <div class="extra content">
        //         <div class="ui large transparent left icon input">
        //         <i class="heart outline icon"></i>
        //         <input type="text" placeholder="Add Comment..."/>
        //         </div>
        //     </div>
        // </div>

        <div>
            <img src={props.img} height="300" width="300"/>
            <br></br>
            <p>{props.caption}</p>
        </div>
    );
}

export default Post;

