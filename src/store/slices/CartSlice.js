import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const cartItems = localStorage.getItem('local-cart') ? JSON.parse(localStorage.getItem('local-cart')) : []

const initialState = {
    cartItems,
    cartsLength: cartItems.length,
    paymentInfo: {
        fullName: '',
        email: '',
        phone: '',
        address: ''
    }
}

export const AddOrderToDbJson = createAsyncThunk(
    'cart/add',
    async (order, { rejectWithValue }) => {
        try {
            const res = await axios.post('${process.env.REACT_APP_DATA}/order', order)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const CartSlice = createSlice({
    name: 'cart', 
    initialState,
    reducers: {
        setCartsLength: (state, action) => {
            state.cartsLength = action.payload
        },
        setValueInputPayment: (state, action) => {
            state.paymentInfo = action.payload
        }
    }
})

export const { setCartsLength, setValueInputPayment } = CartSlice.actions
export default CartSlice.reducer
