import { configureStore } from '@reduxjs/toolkit'
import { productApi } from './Api/productsApi'
import { authApi } from './Api/authApi'
import { userApi } from './Api/userApi'
import userReducer from "../Redux/features/userSlice"
import cartReducer from "./features/cartSlice"
import { orderApi } from './Api/orderApi'

export const store = configureStore({
    reducer: { auth: userReducer, cart: cartReducer, [productApi.reducerPath]: productApi.reducer, [authApi.reducerPath]: authApi.reducer, [userApi.reducerPath]: userApi.reducer, [orderApi.reducerPath]: orderApi.reducer },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([productApi.middleware, authApi.middleware, userApi.middleware, orderApi.middleware])
})