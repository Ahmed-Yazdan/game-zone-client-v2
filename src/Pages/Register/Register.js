import { Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import './Register.css'

const Register = () => {
    const [userData, setUserData] = useState({});
    const { regUserWithEmail, regMessage, isLoading } = useAuth();
    const navigate = useNavigate();
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUserData = { ...userData };
        newUserData[field] = value;
        setUserData(newUserData);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        if (userData.password !== userData.password2) {
            alert("Your password didn't match")
            return;
        }
        regUserWithEmail(userData.email, userData.password, userData.username, navigate);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    {!isLoading && <form
                        style={{
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                            width: '100%',
                            marginTop: '30px'
                        }} onSubmit={handleOnSubmit}>
                        <h1 style={{ margin: '50px 0px', color: '#000000' }}>Register</h1>
                        <TextField
                            id="username"
                            name="username"
                            label="User name"
                            variant="standard"
                            className='textField'
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            variant="standard"
                            className='textField'
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            className='textField'
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            id="password"
                            name="password2"
                            label="Re-type password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            className='textField'
                            onBlur={handleOnBlur}
                        />
                        <button className='register-button' type="submit">
                            Register
                        </button>
                        <h3
                            style={
                                regMessage.includes('successful') ?
                                    { color: 'green', fontWeight: '900', marginTop: '10px' } :
                                    { color: 'green', fontWeight: '900', marginTop: '10px' }}
                        >
                            {regMessage.slice(10, regMessage.length)}
                        </h3>
                            <Button component={NavLink} to='/login' className='togglerButton' sx={{ mt: 5 }} variant='text'>Already have an account? Login !</Button>
                    </form>}
                    {isLoading && <LoadingSpinner />}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;