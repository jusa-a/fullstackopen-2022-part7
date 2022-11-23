import { Link } from 'react-router-dom'

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
export default Menu
