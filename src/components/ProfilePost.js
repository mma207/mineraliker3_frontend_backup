import React from 'react';

const ProfilePost = (props) => {
    return (
        <div onClick={() => {props.handleDeletePost(props.post)}}>
            <img src={props.img} alt="image not available"/>
            <p>{props.caption}</p>
            <p>{props.likes}</p>
        </div>
    );
}

export default ProfilePost;

