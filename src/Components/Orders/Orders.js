import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import "./Orders.css";

const Orders = () => {

    const { user, token } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const url = `https://pure-depths-91725.herokuapp.com/orders?email=${user.email}`;
        fetch(url, {
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data);
            });
    }, []);

    const handleOrderCancel = id => {
        const isExecute = confirm(`Do you really want to DELETE order no. ${id} ?`)
        if (isExecute) {
            fetch('https://pure-depths-91725.herokuapp.com/allorders', {
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
                        alert(`Deleted order ${id} successfully`)
                        const remaningOrders = orders.filter(order => order._id !== id);
                        setOrders(remaningOrders);
                    }
                })
        }
    }

    return (
        <div className='orders'>
            <h4>Total orders: {orders.length}</h4>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Owner Email</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Total Cost</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.gameName}
                                </TableCell>
                                <TableCell align="right">
                                    {row.activeEmail}
                                </TableCell>
                                <TableCell align="right">
                                    {row.quantity}
                                </TableCell>
                                <TableCell align="right">
                                    {row.status}
                                </TableCell>
                                <TableCell align="right">
                                    {row.cost} $
                                </TableCell>
                                <TableCell align="right">
                                    {row.status === 'pending'
                                        ?
                                        <Button onClick={() => handleOrderCancel(row._id)} className='orders-buttons'>Cancel</Button>
                                        :
                                        <Button className='orders-buttons' disabled>Cancel</Button>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Orders;