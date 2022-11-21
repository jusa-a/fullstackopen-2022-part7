import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        showNotification(_state, action) {
            const notification = action.payload
            return notification
        },
        hideNotification() {
            return {}
        },
    },
})

export const { showNotification, hideNotification } = notificationSlice.actions

let timeoutID

export const setNotification = (object, time) => {
    clearTimeout(timeoutID)

    return async (dispatch) => {
        dispatch(showNotification(object))
        timeoutID = setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
