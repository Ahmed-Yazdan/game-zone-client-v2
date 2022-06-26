import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if(isLoading==true){
        return <LoadingSpinner/>
    }
    return user?.email ? children : <Navigate to='/login'></Navigate>
};

export default PrivateRoute;