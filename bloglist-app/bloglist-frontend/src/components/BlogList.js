import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const { blogs } = useSelector((state) => state)

    const blogStyle = {
        paddingTop: 8,
        paddingLeft: 5,
        paddingBottom: 3,
        border: 'solid',
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
    }

    return (
        <>
            {[...blogs]
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                    <div key={blog.id} style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}, {blog.author}
                        </Link>
                    </div>
                ))}
        </>
    )
}

export default BlogList
