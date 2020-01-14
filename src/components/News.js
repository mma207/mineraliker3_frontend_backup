import React from 'react';
import { Image } from 'semantic-ui-react'


const News = (props) => {
    return (
        <Image
            src={props.url} alt="Image Not Available"
            height="300"
            width="300"
            href={props.link}
        />
        // <div>
        //     <img src={props.url} alt="Image Not Available"/>
        //     <h2>{props.title}</h2>
        //     <p>Written By: {props.author}</p>
        //     <p>{props.description}</p>
        //     <a href={props.link}>read more</a>
        // </div>
   
    )
}

export default News;



