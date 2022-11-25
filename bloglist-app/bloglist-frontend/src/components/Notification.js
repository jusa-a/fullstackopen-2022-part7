import { useSelector } from 'react-redux'

import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(({ notification }) => {
        return notification
    })

    return (
        <div className='notification row position-absolute container mx-auto text-center'>
            {notification.message && (
                <Alert
                    variant={
                        notification.type === 'error' ? 'danger' : 'success'
                    }
                >
                    {notification.message}
                </Alert>
            )}
        </div>
    )
}

export default Notification
