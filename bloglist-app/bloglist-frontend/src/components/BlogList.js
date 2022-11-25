import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import { Table } from 'react-bootstrap'

const BlogList = () => {
    const { blogs } = useSelector((state) => state)

    return (
        <>
            <Table className='mt-4 mb-5'>
                <tbody>
                    {[...blogs]
                        .sort((a, b) => b.likes - a.likes)
                        .map((blog) => (
                            <tr key={blog.id}>
                                <td>
                                    <LinkContainer to={`/blogs/${blog.id}`}>
                                        <Link className='text-decoration-none'>
                                            {blog.title}
                                        </Link>
                                    </LinkContainer>
                                </td>
                                <td>{blog.author}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}

export default BlogList
