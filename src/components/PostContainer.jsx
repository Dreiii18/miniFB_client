import React, { useEffect, useState } from 'react'
import './PostContainer.css'
import Post from './Post'
import Spinner from './Spinner'

function PostContainer({ posts }) {
    if (posts.length === 0) {
        return <Spinner />;
    }

    return (
        <div className='mb-4'>
            {posts.map((post) => (
                <Post 
                    key={post.post_ID}
                    object={post}
                />
            ))}

        </div>
    )
}

export default PostContainer