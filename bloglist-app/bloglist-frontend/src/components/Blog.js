import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id
    const { blogs, user } = useSelector((state) => state)
    const blog = blogs.find((b) => b.id === id)

    const remove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
            navigate('/')
        }
    }

    const like = async (blog) => {
        dispatch(likeBlog(blog))
    }

    const removeButton = () => (
        <button onClick={() => remove(blog)}>remove</button>
    )

    if (!blog) return null

    return (
        <div className='blog'>
            <h1>
                {blog.title}, {blog.author}
            </h1>

            <div>
                <a href={blog.url}>{blog.url}</a>
                <div>
                    {blog.likes} likes{' '}
                    <button onClick={() => like(blog)}>like</button>
                </div>
                <div>added by {blog.user.name}</div>
                {blog.user.username === user.username && removeButton()}
            </div>

            <div>
                <h3>comments</h3>
                <ul>
                    {[...blog.comments].map((comment, i) => (
                        <li key={i}>{comment}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Blog
