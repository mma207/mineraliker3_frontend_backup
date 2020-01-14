import React from 'react';

const News = (props) => {
    
    return (
        
        <div>
            <img src={props.url} alt="Image Not Available"/>
            <h2>{props.title}</h2>
            <p>Written By: {props.author}</p>
            <p>{props.description}</p>
            <a href={props.link}>read more</a>
        </div>


        
    )
}

export default News;




