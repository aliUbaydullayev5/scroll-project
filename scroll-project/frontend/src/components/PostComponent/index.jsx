import React from 'react'
import PostBlock from './style'


const Post = ({title, body}) => {
    return(
        <PostBlock>
            <div className="title">Title: {title}</div>
            <div className="body"><b>Body:</b> {body}</div>
        </PostBlock>
    )
}

export default Post