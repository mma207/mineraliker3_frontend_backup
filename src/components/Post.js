import React from 'react';

const Post = (props) => {
    return (
        <div align="center">
        <div class="ui card" align="left">
            <div class="content">
                <img class="ui avatar image" src="/images/avatar/large/elliot.jpg"/> User
            </div>
            <div class="image">
                <img src={props.img} onClick={() => props.handleLike(props.post)}/>
                <p>{props.caption}</p>
            </div>
            <div class="content">
                <span class="right floated">
                <button><i class="heart outline like icon"></i></button>
                {props.likes}
                </span>
                <i class="comment icon"></i>
                num comments
            </div>
            <div class="extra content">
                <div class="ui large transparent input">
                <input type="text" placeholder="Add Comment..."/>
                </div>
            </div>
        </div>
        <br></br>
        </div>
    );
}

export default Post;

