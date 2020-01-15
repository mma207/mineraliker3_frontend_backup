import React from 'react';

const ProfilePost = (props) => {
    return (
        <div class="ui three stackable cards">
            <div class="card" onClick={() => {props.handleDeletePost(props.post)}}>
                <div class="image">
                    <img src={props.img} />
                    <p>{props.caption}</p>
                    <p>{props.likes} ♥️</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePost;



