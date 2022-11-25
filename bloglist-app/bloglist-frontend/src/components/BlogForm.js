import { useState } from 'react'

import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [newBlog, setNewBlog] = useState({})

    const handleChange = (event) => {
        const blogObject = {
            ...newBlog,
            [event.target.name]: event.target.value,
        }
        setNewBlog(blogObject)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog({})
    }

    return (
        <div className='blogFormDiv px-5'>
            <h3 className='fw-normal '>Create a new blog</h3>

            <Form onSubmit={addBlog}>
                <Form.Group className='mb-3'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={newBlog.title || ''}
                        name='title'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        value={newBlog.author || ''}
                        name='author'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Url</Form.Label>
                    <Form.Control
                        value={newBlog.url || ''}
                        name='url'
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='text-center'>
                    <Button
                        variant='outline-secondary rounded-pill'
                        type='submit'
                        className='mb-2'
                    >
                        create
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default BlogForm
