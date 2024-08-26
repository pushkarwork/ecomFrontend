import React from 'react'
import { Route } from "react-router-dom"
import ProductDetails from '../Products/ProductDetails'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import Profile from '../user/Profile'
import UpdateProfile from '../user/UpdateProfile'
import AuthenticatedUser from '../user/AuthenticatedUser'
import UploadAvatar from '../user/UploadAvatar'
import UpdatePassword from '../user/UpdatePassword'
import ForgotPassword from '../Auth/ForgotPassword'
import ResetPassword from '../Auth/ResetPassword'
import Cart from '../cart/Cart'
import Shipping from '../cart/Shipping'
import ConfirmOrder from '../cart/ConfirmOrder'
import PaymentMethod from '../cart/PaymentMethod'
import MyOrders from '../orders/MyOrders'
import OrderDetails from '../orders/OrderDetails'
import Invoice from '../invoice/Invoice'
import Home from '../Home'
const UserRoutes = () => {
    return (
        <>
            <Route path='/' element={<Home />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/shipping' element={<AuthenticatedUser><Shipping /></AuthenticatedUser>} />
            <Route path='/confirm_order' element={<AuthenticatedUser><ConfirmOrder /></AuthenticatedUser>} />
            <Route path='/me/orders' element={<AuthenticatedUser><MyOrders /></AuthenticatedUser>} />
            <Route path='/me/order/:id' element={<AuthenticatedUser><OrderDetails /></AuthenticatedUser>} />
            <Route path='/payment_method' element={<AuthenticatedUser><PaymentMethod /></AuthenticatedUser>} />
            <Route path='/invoice/order/:id' element={<AuthenticatedUser><Invoice /></AuthenticatedUser>} />
            <Route path='/register' element={<Register />} />
            <Route path='/password/forgot' element={<ForgotPassword />} />
            <Route path='/password/reset/:token' element={<ResetPassword />} />
            <Route path='/me/profile' element={<AuthenticatedUser><Profile /></AuthenticatedUser>} />
            <Route path='/me/update_profile' element={<AuthenticatedUser><UpdateProfile /></AuthenticatedUser>} />
            <Route path='/me/upload_avatar' element={<AuthenticatedUser><UploadAvatar /></AuthenticatedUser>} />
            <Route path='/me/update_password' element={<AuthenticatedUser><UpdatePassword /></AuthenticatedUser>} />
        </>
    )
}

export default UserRoutes
