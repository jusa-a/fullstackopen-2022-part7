import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <div className='text-center'>
                    <Button
                        className='text-center'
                        variant='outline-secondary rounded-pill'
                        onClick={toggleVisibility}
                    >
                        {props.buttonLabel}
                    </Button>
                </div>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <div className='text-center'>
                    <Button
                        variant='outline-danger rounded-pill'
                        onClick={toggleVisibility}
                    >
                        cancel
                    </Button>
                </div>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
