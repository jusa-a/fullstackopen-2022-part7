import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, useNavigate } from 'react-router-dom'

import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'

import loginService from './services/login'
import userService from './services/user'

import { setNotification } from './reducers/notificationReducer'
import { initializeUser, login, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeUser())
    }, [dispatch])

    const { user } = useSelector((state) => state)

    useEffect(() => {
        if (user !== null) {
            dispatch(initializeUsers())
            dispatch(initializeBlogs()).catch((e) => {
                notify(e.response.data.error, 'error')
                userService.clearUser()
                navigate('/')
            })
        }
    }, [user])

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
            <div className='container'>
                <LoginForm onLogin={handleLogin} />
                <Notification />
            </div>
        )
    }

    return (
        <div className='container'>
            <Menu user={user} logout={handleLogout} />

            <Notification />

            <div className='col-md-7 container mt-2 pt-5'>
                <h2 className='fw-normal mb-4 text-center'>Blogs</h2>

                <Routes>
                    <Route
                        path={'/blogs/:id'}
                        element={<Blog notify={notify} />}
                    />
                    <Route path={'/users/:id'} element={<User />} />
                    <Route path='/' element={<Blogs notify={notify} />} />
                    <Route path='/users' element={<Users />} />
                </Routes>
            </div>
        </div>
    )
}

export default App
