import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeUsers } from '../reducers/usersReducer'

const User = ({ user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
        </tr>
    )
}

const Users = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

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
                            <User key={user.id} user={user} />
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
