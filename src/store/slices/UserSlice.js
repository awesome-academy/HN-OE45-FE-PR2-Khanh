import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const displayName = localStorage.getItem('customer-info') ? (JSON.parse(localStorage.getItem('customer-info'))).fullName : ''

const initialState = {
    displayName,
    error: '',
    isLoading: false
}

export const addUserDbJson = createAsyncThunk(
    'user/post',
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:4000/user', user)
            return res.data
        } 
        catch (err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getUserDetailDbJson = createAsyncThunk(
    'user/getDetail',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:4000/user/${id}`)
            return res.data
        } 
        catch (err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetailDbJson.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetailDbJson.fulfilled, (state, action) => {
                state.isLoading = false
                const { fullName, email, phone } = action.payload
                localStorage.setItem('customer-info', JSON.stringify({
                    fullName,
                    email,
                    phone
                }))
            })
            .addCase(getUserDetailDbJson.rejected, (state, action) => {
                state.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
    }
})

export const { } = UserSlice.actions
export default UserSlice.reducer
