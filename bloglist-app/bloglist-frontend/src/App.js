import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import loginService from './services/login'
import userService from './services/user'

import { setNotification } from './reducers/notificationReducer'
import {
    initializeBlogs,
    createBlog,
    deleteBlog,
    likeBlog,
} from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()

    const [user, setUser] = useState(null)

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector((state) => {
        return state.blogs
    })

    useEffect(() => {
        const loggedUser = userService.getUser()
        loggedUser && setUser(loggedUser)
    }, [])

    const handleLogin = (username, password) => {
        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                console.log(user)
                setUser(user)
                userService.setUser(user)
                notify(`${user.name} logged in!`)
            })
            .catch((e) => {
                notify(e.response.data.error, 'error')
            })
    }

    const handleLogout = async () => {
        setUser(null)
        userService.clearUser()
        notify('logged out')
    }

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

    const removeBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
        }
    }

    const like = async (blog) => {
        dispatch(likeBlog(blog))
    }

    const notify = (message, type) => {
        dispatch(setNotification({ message, type }, 3))
    }

    const blogFormRef = useRef()

    const blogView = () => (
        <div>
            <h2>Blogs</h2>

            <div>
                {user.name} logged-in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog} />
            </Togglable>
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

    return (
        <div>
            <Notification />
            {user === null ? <LoginForm onLogin={handleLogin} /> : blogView()}
        </div>
    )
}

export default App
