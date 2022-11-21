import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(_state, action) {
            return action.payload
        },
    },
})

export const { setUser } = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUser = await userService.getUser()
        dispatch(setUser(loggedUser))
    }
}

export const login = (user) => {
    return async (dispatch) => {
        userService.setUser(user)
        dispatch(setUser(user))
    }
}

export const logout = () => {
    return async (dispatch) => {
        dispatch(setUser(null))
        userService.clearUser()
    }
}

export default userSlice.reducer
