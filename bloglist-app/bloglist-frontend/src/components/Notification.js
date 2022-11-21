import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector(({ notification }) => {
        return notification
    })

    const notificationStyle = {
        color: notification.type === 'error' ? 'red' : 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return (
        notification.message && (
            <div className='notification' style={notificationStyle}>
                {notification.message}
            </div>
        )
    )
}

export default Notification
