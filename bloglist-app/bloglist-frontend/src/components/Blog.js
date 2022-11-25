import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Form, ListGroup, Button } from 'react-bootstrap'

import { deleteBlog, likeBlog, comment } from '../reducers/blogReducer'

const Blog = ({ notify }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const id = useParams().id
    const { blogs, user } = useSelector((state) => state)
    const blog = blogs.find((b) => b.id === id)

    const [newComment, setNewComment] = useState('')

    const addComment = (event) => {
        event.preventDefault()
        dispatch(comment(newComment, blog)).catch(() => {
            notify('comment is empty', 'error')
        })
        setNewComment('')
    }

    const remove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(deleteBlog(blog.id))
            navigate('/')
        }
    }

    const like = async (blog) => {
        dispatch(likeBlog(blog))
    }

    const removeButton = () => (
        <Button
            variant='outline-danger rounded-pill'
            onClick={() => remove(blog)}
        >
            remove
        </Button>
    )

    if (!blog) return null

    return (
        <div className='blog container'>
            <h3 className='fw-normal pb-2'>
                {blog.title}, {blog.author}
            </h3>

            <div>
                <div className='pb-3'>
                    <a className='text-decoration-none' href={blog.url}>
                        {blog.url}
                    </a>
                </div>
                <div className='pb-3'>
                    {blog.likes} likes{' '}
                    <Button
                        variant='outline-secondary rounded-pill'
                        onClick={() => like(blog)}
                    >
                        like
                    </Button>
                </div>
                <div className='pb-3'>added by {blog.user.name}</div>
            </div>

            <div>
                <h4 className='fw-normal pt-2'>comments</h4>

                <Form className='d-flex' onSubmit={addComment}>
                    <Form.Group>
                        <Form.Control
                            value={newComment}
                            onChange={({ target }) =>
                                setNewComment(target.value)
                            }
                        />
                    </Form.Group>
                    <Button
                        variant='outline-secondary rounded-pill'
                        type='submit'
                    >
                        add comment
                    </Button>
                </Form>

                <ListGroup className='py-4'>
                    {[...blog.comments].map((comment, i) => (
                        <ListGroup.Item key={i}>{comment}</ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className='pt-3 pb-3 text-center'>
                {blog.user.username === user.username && removeButton()}
            </div>
        </div>
    )
}

export default Blog
