import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NavbarCustom from '../../Components/Home/NavbarCustom/NavbarCustom';
import useAuth from '../../hooks/useAuth';
import "./Cart.css";

const Cart = () => {
    const [items, setItems] = useState([]);
    const { user, token } = useAuth();

    useEffect(() => {
        const url = `https://pure-depths-91725.herokuapp.com/cart?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setItems(data));
    }, []);

    const handleRemove = (id, name) => {
        fetch('https://pure-depths-91725.herokuapp.com/cart', {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount === 1) {
                    alert(`Deleted item ${name} from your cart successfully`)
                    const remaningItems = items.filter(item => item._id !== id);
                    setItems(remaningItems);
                }
            })
    }
    return (
        <div className='cart'>
            <NavbarCustom />
            <TableContainer component={Paper}>
                <Table className='tableMui' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    {row.price} $
                                </TableCell>
                                <TableCell align="right">
                                    <Button className='action-buttons' sx={{ mx: 1 }} as={Link} to={`/purchase/${row.gameId}`}>Buy now</Button>
                                    <Button className='action-buttons' sx={{ mx: 1 }} onClick={() => handleRemove(row._id, row.name)}>Remove</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Cart;