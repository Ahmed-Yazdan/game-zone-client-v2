import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
    return (
        <div
            style={{
                width:'100%',
                height:'100vh',
                backgroundColor:'rgba(0,0,0,0)',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}>
            <CircularProgress size='3rem'/>
        </div>
    );
};

export default LoadingSpinner;