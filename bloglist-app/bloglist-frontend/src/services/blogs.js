import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => {
    return {
        headers: {
            Authorization: `bearer ${userService.getToken()}`,
        },
    }
}

const getAll = () => {
    const request = axios.get(baseUrl, config())
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject, config())
    return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
    return response.data
}

const remove = async (id) => {
    return await axios.delete(`${baseUrl}/${id}`, config())
}

const addComment = async (id, commentObject) => {
    const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        commentObject
    )
    return response.data
}

export default { getAll, create, update, remove, addComment }
