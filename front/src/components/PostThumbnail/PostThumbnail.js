import React from 'react';
import {apiURL} from "../../constans";

const PostThumbnail = props => {
    if (props.image) {
        return <img className='card-img-top' src={apiURL + '/uploads/' + props.image} alt={props.image}/>
    }
};

export default PostThumbnail;