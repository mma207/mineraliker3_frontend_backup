import React from 'react';

const ProfilePost = (props) => {
    return (
        <div onClick={() => {props.handleDeletePost(props.post)}}>
            <img src={props.img} height="300" width="300"/>
            <p>{props.caption}</p>
            <p>{props.likes}</p>
        </div>
    );
}

export default ProfilePost;

