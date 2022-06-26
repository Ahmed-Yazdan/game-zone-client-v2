import React from 'react';
import { Grid } from '@mui/material';
import Orders from '../../../Components/Orders/Orders';

const DashboardHome = () => {
    return (
        // <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8}>
                <h1 style={{textAlign:'center'}}>My Orders</h1>
                <Orders />
            </Grid>
        // </Grid>
    );
};

export default DashboardHome;