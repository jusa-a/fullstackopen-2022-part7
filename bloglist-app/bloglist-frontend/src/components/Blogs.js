import { useRef } from 'react'
import { useDispatch } from 'react-redux'

import BlogList from './BlogList'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

import { createBlog } from '../reducers/blogReducer'

const Blogs = ({ notify }) => {
    const dispatch = useDispatch()

    const addBlog = (blogObject) => {
        dispatch(createBlog(blogObject))
            .then(() => {
                notify(
                    `a new blog ${blogObject.title} by ${blogObject.author} added`
                )
                blogFormRef.current.toggleVisibility()
            })
            .catch((e) => {
                notify(e.response.data.error, 'error')
            })
    }

    const blogFormRef = useRef()

    return (
        <>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>

            <BlogList />
        </>
    )
}

export default Blogs
