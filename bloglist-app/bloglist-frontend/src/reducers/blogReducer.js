import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlog(state, action) {
            const blog = action.payload
            return state.map((b) => (b.id === blog.id ? blog : b))
        },
        setBlogs(_state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
        removeBlog(state, action) {
            const id = action.payload
            return state.filter((b) => b.id !== id)
        },
    },
})

export const { setBlog, setBlogs, appendBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        const newBlog = await blogService.create(blog)
        dispatch(appendBlog(newBlog))
    }
}

export const deleteBlog = (id) => {
    return async (dispatch) => {
        await blogService.remove(id)
        dispatch(removeBlog(id))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.update(blog.id, {
            likes: blog.likes + 1,
        })
        dispatch(setBlog(updatedBlog))
    }
}

export default blogSlice.reducer
