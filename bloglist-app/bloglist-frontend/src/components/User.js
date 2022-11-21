import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
    const id = useParams().id
    const { users } = useSelector((state) => state)
    const user = users.find((user) => user.id === id)

    if (!user) return null

    return (
        <>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map((blog) => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </>
    )
}

export default User
