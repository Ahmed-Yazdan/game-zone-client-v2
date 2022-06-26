import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const AdminRoute = ({ children }) => {
    const { user, isLoading, admin } = useAuth();
    if(isLoading==true){
        return <LoadingSpinner/>
    }
    return user?.email && admin ? children : <Navigate to='/'></Navigate>
};

export default AdminRoute;