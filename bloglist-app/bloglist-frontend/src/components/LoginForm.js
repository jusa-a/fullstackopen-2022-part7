import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }

    return (
        <form onSubmit={handleSubmit} id='login-form'>
            <h2>Log in to application</h2>

            <div>
                username{' '}
                <input
                    id='username'
                    type='text'
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password{' '}
                <input
                    id='password'
                    type='password'
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id='login-button' type='submit'>
                login
            </button>
        </form>
    )
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default LoginForm
