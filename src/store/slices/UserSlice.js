import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import queryString from 'query-string'

const displayName = localStorage.getItem('customer-info') ? (JSON.parse(localStorage.getItem('customer-info'))).fullName : ''
const role = localStorage.getItem('customer-info') ? (JSON.parse(localStorage.getItem('customer-info'))).role : ''

const initialState = {
    displayName,
    error: '',
    isLoading: false,
    role,
    allUser: {
        listAllUsers: [], 
        isLoading: false
    },
    paginationUser: {
        _limit: 8,
        _totalRows: 1,
        isLoading: false
    },
    filterUser: {
        _limit: 8,
        _page: 1
    },
    userInfo: {}
}

export const getPaginationUser = createAsyncThunk(
    'pagination',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`${process.env.REACT_APP_DATA}/user?${paramString}`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getAllUser = createAsyncThunk(
    'user/all',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`${process.env.REACT_APP_DATA}/user?${paramString}`)
            console.log(res.data)
            return res.data
        } 
        catch (err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const addUserDbJson = createAsyncThunk(
    'user/post',
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post('${process.env.REACT_APP_DATA}/user', user)
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
            const res = await axios.get(`${process.env.REACT_APP_DATA}/user/${id}`)
            return res.data
        } 
        catch (err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const deleteUserItemDbJson = createAsyncThunk(
    'user/delete',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DATA}/user/${id}`)
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
        setFilterUser : (state, action) => {
            state.filterUser = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPaginationUser.pending, (state) => {
                state.paginationUser.isLoading = true
            })
            .addCase(getPaginationUser.fulfilled, (state, action) => {
                state.paginationUser._totalRows = action.payload.length
            })
            .addCase(getPaginationUser.rejected, (state, action) => {
                state.paginationUser.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getAllUser.pending, (state) => {
                state.allUser.isLoading = true
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                console.log(action.payload)
                state.allUser.isLoading = false
                state.allUser.listAllUsers = action.payload
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.allUser.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getUserDetailDbJson.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserDetailDbJson.fulfilled, (state, action) => {
                state.isLoading = false
                const { fullName, email, phone, role } = action.payload
                state.userInfo = action.payload
                state.role = role
                console.log(role)
                localStorage.setItem('customer-info', JSON.stringify({
                    fullName,
                    email,
                    phone,
                    role
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

export const { setFilterUser } = UserSlice.actions
export default UserSlice.reducer
