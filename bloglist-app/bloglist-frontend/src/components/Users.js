import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const Users = () => {
    const { users } = useSelector((state) => state)

    return (
        <div className='col-md-8 container'>
            <h2 className='fw-normal'>Users</h2>
            <Table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>

                    {[...users]
                        .sort((a, b) => b.blogs.length - a.blogs.length)
                        .map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <Link
                                        className='text-decoration-none'
                                        to={`/users/${user.id}`}
                                    >
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Users
