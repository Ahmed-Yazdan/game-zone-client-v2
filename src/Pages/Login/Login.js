import { Button, Grid, TextField } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

const Login = () => {

    const [userData, setUserData] = useState({});
    const { loginMessage, loginUserWithEmail, loginUserWithGoogle, user } = useAuth();
    const navigate = useNavigate();

    const handleOnSubmit = e => {
        e.preventDefault();
        loginUserWithEmail(userData.email, userData.password, navigate)
    };

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newUserData = { ...userData };
        newUserData[field] = value;
        setUserData(newUserData);
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <form
                        style={{
                            display: 'flex',
                            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                            width: '100%',
                            marginTop: '30px'
                        }} onSubmit={handleOnSubmit}>
                        <h1 style={{ margin: '50px 0px', color: '#000000' }}>Login</h1>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            variant="standard"
                            className='textField'
                            type="email"
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
                        <button className='login-buttons' type="submit">
                            Login
                        </button>
                        <h2 style={{marginTop:'10px'}}>Or, you can also Login with:</h2>
                        <button onClick={ ()=>loginUserWithGoogle(navigate)} className='login-buttons' type="submit">
                            Google
                        </button>
                        {!user?.displayName && <h3
                            style={
                                loginMessage.includes('successful') ?
                                    { color: 'green', fontWeight: '900', marginTop: '10px' } :
                                    { color: 'green', fontWeight: '900', marginTop: '10px' }}
                        >
                            {loginMessage.slice(10, loginMessage.length)}
                        </h3>}
                            <Button component={Link} sx={{mt:5}} to='/register' className='togglerButton'>New to this site? Register now !</Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;