import { combineReducers, configureStore } from '@reduxjs/toolkit'
import ProductsReducer from './slices/ProductSlice'
import Notification from './slices/NotificationSlice'
import CartReducer from './slices/CartSlice'
import UserSlice from './slices/UserSlice'

const rootReducer = combineReducers({
    products: ProductsReducer,
    notification: Notification,
    cart: CartReducer,
    user: UserSlice
})

export const store = configureStore({
    reducer: rootReducer
})
