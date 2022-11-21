import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'

import loginService from './services/login'

import { setNotification } from './reducers/notificationReducer'
import { initializeUser, login, logout } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUser())
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
            <h2>Blogs</h2>

            <Notification />

            <div>
                {user.name} logged-in{' '}
                <button onClick={handleLogout}>logout</button>
            </div>

            <Routes>
                <Route path='/' element={<Blogs notify={notify} />} />
                <Route path='/users' element={<Users />} />
            </Routes>
        </>
    )
}

export default App
