import React from 'react';

const News = (props) => {
    
    return (
        <div align="center">
        <div class="ui card">
            <a class="image" href={props.link} target="_blank">
                <img src={props.url}/>
            </a>
            <div class="content">
                <div class="header">
                    <h2>{props.title}</h2>
                    <p>Written By: {props.author}</p>
                </div>
                <div class="meta">
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
        <br></br>
        </div>
    )
}

export default News;




