import React from 'react';

const Post = (props) => {
    return (
        <div onClick={() => {props.handleDeletePost(props.post)}}>
            <img src={props.img} alt="sorry"/>
            <p>{props.caption}</p>
        </div>
    );
}

export default Post;

