import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import './ManageOrders.css';

const ManageOrders = () => {

    const [allOrders, setAllOrders] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        fetch('https://pure-depths-91725.herokuapp.com/allorders')
            .then(res => res.json())
            .then(data => setAllOrders(data))
    }, []);

    const handleApprove = id => {
        fetch('https://pure-depths-91725.herokuapp.com/allorders', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        .then(res=>res.json())
        .then(data => {
            if(data.modifiedCount){
                alert(`Approved ${id} successfully`)
            }
        })
    }
    const handleDelete = id => {
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
                        const remaningOrders = allOrders.filter(order => order._id !== id);
                        setAllOrders(remaningOrders);
                    }
                })
        }
    }

    return (
        <div className='manageOrders'>
            <h1 style={{ textAlign: 'center' }}>Manage Orders</h1>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Total Cost</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders.map(row => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.email}
                                </TableCell>
                                <TableCell align="right">
                                    {row.gameName}
                                </TableCell>
                                <TableCell align="right">
                                    {row.cost} $
                                </TableCell>
                                <TableCell align="right">
                                    {row.status}
                                </TableCell>
                                <TableCell align="right">
                                    <Button className='manageOrders-buttons' onClick={() => handleDelete(row._id)} sx={{ mx: 1 }}>Delete</Button>
                                    {row.status === 'pending' 
                                    ? 
                                    <Button className='manageOrders-buttons' onClick={() => handleApprove(row._id)} sx={{ mx: 1 }}>Approve</Button>
                                     : 
                                     <Button className='manageOrders-buttons' disabled sx={{ mx: 1 }}>Approve</Button>
                                     }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageOrders;