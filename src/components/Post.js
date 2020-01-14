import React from 'react';
import { Card } from 'semantic-ui-react'

const Post = (props) => {
    return (
       <Card>
            <div class="content">
                <div class="right floated meta">Time Passed</div>
                <img class="ui avatar image" src="/images/avatar/large/elliot.jpg" /> Elliot
            </div>
            <div class="image">
                <img src={props.img} height="300" width="300"/>
                <br></br>
                {props.caption}
            </div>
            <div class="content">
                <span class="right floated">
                <i class="heart outline like icon"></i>
                {props.likes}
                </span>
                <i class="comment icon"></i>
                number of comments -> make a model for it 
            </div>
            <div class="extra content">
                <div class="ui large transparent left icon input">
                <i class="heart outline icon"></i>
                {/* add on click function to icon */}
                <input type="text" placeholder="Add Comment..."/>
                </div>
            </div>
        </Card>
    );
}

export default Post;

