import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    formEdit: {},
    isOpenEditModal: false,
    isOpenAddModal: false,
}

export const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setFormEdit : (state, action) => {
            console.log(action.payload)
            state.formEdit = action.payload
        },
        setIsOpenEditModal: (state, action) => {
            state.isOpenEditModal = action.payload
        },
        setIsOpenAddModal: (state, action) => {
            state.isOpenAddModal = action.payload
        }
    },
    extraReducers: (builder) => {
        }
    })

export const { setFormEdit, setIsOpenEditModal, setIsOpenAddModal } = AdminSlice.actions
export default AdminSlice.reducer
