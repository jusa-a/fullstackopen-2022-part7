import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initializeUser, login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'

const Menu = ({ user, logout }) => {
    const menuStyle = {
        background: 'lightgrey',
        display: 'flex',
        padding: 7,
    }

    const padding = {
        paddingRight: 5,
    }

    return (
        <div style={menuStyle}>
            <Link style={padding} to='/'>
                blogs
            </Link>
            <Link style={padding} to='/users'>
                users
            </Link>
            <div>
                {user.name} logged-in <button onClick={logout}>logout</button>
            </div>
        </div>
    )
}

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUser())
        dispatch(initializeUsers())
        dispatch(initializeBlogs())
    }, [dispatch])

    const { user } = useSelector((state) => state)

    const handleLogin = (username, password) => {
        loginService
            .login({
                username,
                password,
            })
            .then((user) => {
                dispatch(login(user))
                notify(`${user.name} logged in!`)
            })
            .catch((e) => {
                notify(e.response.data.error, 'error')
            })
    }

    const handleLogout = async () => {
        dispatch(logout())
        notify('logged out')
    }

    const notify = (message, type) => {
        dispatch(setNotification({ message, type }, 3))
    }

    if (user === null) {
        return (
            <>
                <Notification />
                <LoginForm onLogin={handleLogin} />
            </>
        )
    }

    return (
        <>
            <Menu user={user} logout={handleLogout} />

            <h2>Blogs</h2>

            <Notification />

            <Routes>
                <Route path={'/blogs/:id'} element={<Blog />} />
                <Route path={'/users/:id'} element={<User />} />
                <Route path='/' element={<Blogs notify={notify} />} />
                <Route path='/users' element={<Users />} />
            </Routes>
        </>
    )
}

export default App
