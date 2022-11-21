import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import {
    initializeBlogs,
    createBlog,
    deleteBlog,
    likeBlog,
} from './reducers/blogReducer'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const blogs = useSelector((state) => {
        return state.blogs
    })

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username,
                password,
            })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            notify(e.response.data.error, 'error')
        }
    }

    const handleLogout = async () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
        blogService.setToken('')
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
            {user === null ? (
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            ) : (
                blogView()
            )}
        </div>
    )
}

export default App
