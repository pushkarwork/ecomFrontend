import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from '../Layout/Loader';

const AuthenticatedUser = ({ children, admin }) => {

    const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

    if (loading) {
        return <Loader />
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if (admin && user.role !=="admin" ){
        return <Navigate to="/" replace />
    }
        return (
            children
        )
}

export default AuthenticatedUser
