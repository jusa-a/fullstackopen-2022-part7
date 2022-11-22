import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const { users } = useSelector((state) => state)

    return (
        <>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {[...users]
                        .sort((a, b) => b.blogs.length - a.blogs.length)
                        .map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link to={`/users/${user.id}`}>
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
