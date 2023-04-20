import React from 'react'
import {Link, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectPostById } from './postSlice';

export const SinglePostPage = () => {
    const postId = useParams().postId;

    const post = useSelector(state => selectPostById(state, postId))

    if (!post) {
        return (
        <section>
            <h2>页面未找到！</h2>
        </section>
        )
    }

    return (
        <section>
        <article className="post">
            <h2>{post.title}</h2>
            <p className="post-content">{post.content}</p>
            <Link to={`/editPost/${postId}`} className='button'>
                Edit Post
            </Link>
        </article>
        </section>
    )
}