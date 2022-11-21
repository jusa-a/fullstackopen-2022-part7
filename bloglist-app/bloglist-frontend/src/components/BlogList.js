import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = () => {
    const dispatch = useDispatch()

    const { user, blogs } = useSelector((state) => state)

    const removeBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
        }
    }

    const like = async (blog) => {
        dispatch(likeBlog(blog))
    }

    return (
        <div>
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={user}
                        handleLike={like}
                        deleteBlog={removeBlog}
                    />
                ))}
        </div>
    )
}

export default BlogList
