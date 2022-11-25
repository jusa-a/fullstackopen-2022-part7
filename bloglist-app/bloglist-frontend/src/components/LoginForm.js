import { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(username, password)
    }

    return (
        <div className='row justify-content-center py-5'>
            <Form className='col-3' onSubmit={handleSubmit} id='login-form'>
                <h2 className='fw-normal mb-3 mt-5 text-center'>Login</h2>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        placeholder='username'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        id='password'
                        type='password'
                        placeholder='********'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </Form.Group>

                <div className='mt-4 text-center'>
                    <Button
                        variant='outline-secondary rounded-pill'
                        id='login-button'
                        type='submit'
                    >
                        login
                    </Button>
                </div>
            </Form>
        </div>
    )
}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
}

export default LoginForm
