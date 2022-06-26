import { Alert, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import './MakeAdmin.css';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [adminMade, setAdminMade] = useState(false);
    const { token } = useAuth();

    const handleOnSubmit = e => {
        const user = { email };
        fetch('https://pure-depths-91725.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setAdminMade(true);
                }
            });
        e.preventDefault();
    }
    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    return (
        <div className='addAdmin'>
            <h1 style={{ textAlign: 'center' }}>Make admin</h1>
            <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} onSubmit={handleOnSubmit}>
                <TextField required sx={{ width: '75%' }} type='email' onBlur={handleOnBlur} id='standard-basic' label='Email for admin role' variant='standard' />
                <Button type='submit' sx={{ display: 'block', my: 5, p:1 }} className='addAdmin-button'>It's Admin Time!</Button>
            </form>
            {adminMade && <Alert severity="success">{email} is an Admin now !</Alert>}
        </div>
    );
};

export default MakeAdmin;