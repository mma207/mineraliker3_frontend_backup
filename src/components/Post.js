import React from 'react';

const Post = (props) => {
    return (
        <div>
            {/* on div onclick for like  */}
            <img src={props.img} alt="sorry" height="300" width="300"/>
            <p>{props.comment}</p>
        </div>
    );
}

export default Post;
