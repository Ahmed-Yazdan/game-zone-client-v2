import React, { useState } from 'react';
import { Alert, Button, Container, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import NavbarCustom from '../../Components/Home/NavbarCustom/NavbarCustom';
import useAuth from '../../hooks/useAuth';
import './Purchase.css';

const Purchase = (props) => {
    const { user, token } = useAuth();
    const params = useParams();
    const gameId = params._id;
    const [gameInfo, setGameInfo] = useState({});
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        const url = `https://pure-depths-91725.herokuapp.com/games/${gameId}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setGameInfo(data);
            })
    }, [])
    const initialInfo = {
        email: user.email,
        activeEmail: user.email,
        username: user?.displayName,
        phoneNumber: ''
    };
    const [orderInfo, setOrderInfo] = useState(initialInfo);
    const [orderDone, setOrderDone] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const order = {
            ...orderInfo,
            gameName: gameInfo.name,
            gameId: gameInfo.gameId,
            cost: gameInfo.price * quantity,
            status: 'pending'
        };
        fetch('https://pure-depths-91725.herokuapp.com/orders', {
            method: "POST",
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId)
                    setOrderDone(true);
            });
    };
    const handleQuantityChange = e => {
        const value = e.target.value;
        if (value < 1 || value > 10) {
            setQuantity(1);
            return;
        } else {
            setQuantity(value);
        }
    }
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newOrderData = { ...orderInfo, quantity: quantity };
        newOrderData[field] = value;
        setOrderInfo(newOrderData);

    };

    return (
        <div>
            <NavbarCustom />
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} style={{
                                display: 'flex',
                                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                                width: '100%'
                            }}>
                        <h1>Game Info</h1>
                        <h2>Name: {gameInfo.name}</h2>
                        <h2>Price: {gameInfo.price}$</h2>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <form
                            style={{
                                display: 'flex',
                                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                                width: '100%',
                                marginTop: '30px'
                            }} onSubmit={handleOnSubmit}>
                            <h1 style={{ margin: '50px 0px', color: '#000000' }}>Order Form</h1>
                            <TextField
                                id="email"
                                name="email"
                                label="Order Email"
                                variant="standard"
                                className='textField'
                                type="email"
                                onBlur={handleOnBlur}
                                defaultValue={user.email}
                                placeholder='Email'
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField
                                id="activeEmail"
                                name="activeEmail"
                                label="Purchasing for (email)"
                                variant="standard"
                                className='textField'
                                type="email"
                                onBlur={handleOnBlur}
                                defaultValue={user.email}
                                placeholder='Email'
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField
                                id="username"
                                name="username"
                                label="Name"
                                type="text"
                                variant="standard"
                                className='textField'
                                onBlur={handleOnBlur}
                                defaultValue={user?.displayName}
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                type="number"
                                variant="standard"
                                className='textField'
                                onBlur={handleOnBlur}
                                sx={{ mb: 2 }}
                                required
                            />
                            <TextField
                                id="quantity"
                                name="quantity"
                                label="Quantity"
                                type="number"
                                variant="standard"
                                className='textField'
                                InputProps={{
                                    inputProps: {
                                        max: 10, min: 1
                                    }
                                }}
                                pattern="[0-9]"
                                onBlur={handleOnBlur}
                                onChange={handleQuantityChange}
                                sx={{ mb: 2 }}
                                required
                                defaultValue={1}
                            />
                            <h1>Total cost: {gameInfo.price * quantity} $</h1>
                            {orderDone && <Alert severity="success">Order done successfully. Go to <NavLink to="/dashboard">Dashboard</NavLink> for more details.</Alert>}
                            <button className='purchase-button' type="submit">
                                Confirm order
                            </button>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Purchase;