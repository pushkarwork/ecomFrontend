import React from 'react'
import { Route } from "react-router-dom"
import Dashboard from '../admin/Dashboard'
import AuthenticatedUser from '../user/AuthenticatedUser'
import ListProducts from '../admin/ListProducts'
import NewProduct from '../admin/NewProduct'
import UpdateProduct from '../admin/UpdateProduct'
import UploadImages from '../admin/UploadImages'
import ListOrder from '../admin/ListOrder'
import ProcessOrder from '../admin/ProcessOrder'
import ListUsers from '../admin/ListUsers'
import UpdateUserRole from '../admin/UpdateUserRole'
import ProductReviews from '../admin/ProductReviews'
const AdminRoutes = () => {
    return (
        <>
            <Route path='/admin/dashboard' element={<AuthenticatedUser admin={true}><Dashboard /></AuthenticatedUser>} />
            <Route path='/admin/products' element={<AuthenticatedUser admin={true}><ListProducts /></AuthenticatedUser>} />
            <Route path='/admin/orders' element={<AuthenticatedUser admin={true}><ListOrder /></AuthenticatedUser>} />
            <Route path='/admin/users' element={<AuthenticatedUser admin={true}><ListUsers /></AuthenticatedUser>} />
            <Route path='/admin/reviews' element={<AuthenticatedUser admin={true}><ProductReviews /></AuthenticatedUser>} />
            <Route path='/admin/user/:id' element={<AuthenticatedUser admin={true}><UpdateUserRole /></AuthenticatedUser>} />
            <Route path='/admin/order/:id' element={<AuthenticatedUser admin={true}><ProcessOrder /></AuthenticatedUser>} />
            <Route path='/admin/product/new' element={<AuthenticatedUser admin={true}><NewProduct /></AuthenticatedUser>} />
            <Route path='/admin/product/:id' element={<AuthenticatedUser admin={true}><UpdateProduct /></AuthenticatedUser>} />
            <Route path='/admin/product/:id/upload_images' element={<AuthenticatedUser admin={true}><UploadImages /></AuthenticatedUser>} />
        </>
    )
}

export default AdminRoutes
