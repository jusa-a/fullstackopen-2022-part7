import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { ListGroup } from 'react-bootstrap'

const User = () => {
    const id = useParams().id
    const { users } = useSelector((state) => state)
    const user = users.find((user) => user.id === id)

    if (!user) return null

    return (
        <div className='container'>
            <h2 className='fw-normal pb-2'>{user.name}</h2>
            <h3 className='fw-normal'>added blogs</h3>
            <ListGroup>
                {user.blogs.map((blog) => (
                    <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default User
